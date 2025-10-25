'use server';

import prisma from './prisma';

const MAX_LINKS_PER_CONTENT = 5;

interface LinkMapItem {
    keyword: string;
    url: string;
    targetId: string;
}

const cleanFromMarkdownLinks = (text: string | null | undefined): string => {
    if (!text) return '';
    return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
};

export async function autoLinkContent(
    content: string,
    currentContentId: string,
): Promise<string> {
    
    let strippedContent = content.replace(/<a[^>]*>([^<]*)<\/a>/gi, '$1');
    strippedContent = strippedContent.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    const [posts, tags] = await Promise.all([
        prisma.post.findMany({ 
            where: {
                status: 'PUBLISHED',
                id: { not: currentContentId }
            },
            select: { id: true, title: true, slug: true }
        }),
        prisma.tag.findMany({ select: { id: true, name: true, slug: true } }),
    ]);

    const linkMap: LinkMapItem[] = [];
    posts.forEach(p => {
        linkMap.push({ keyword: p.title, url: `/blog/${p.slug}`, targetId: p.id });
    });
    tags.forEach(t => {
        linkMap.push({ keyword: t.name, url: `/blog/etiket/${t.slug}`, targetId: t.id });
    });
    linkMap.sort((a, b) => b.keyword.length - a.keyword.length);

    const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const protectedTagsRegex = /(<h[1-3][^>]*>.*?<\/h[1-3]>|<pre[^>]*>.*?<\/pre>|<code[^>]*>.*?<\/code>)/gs;
    const placeholders = new Map<string, string>();
    let placeholderIndex = 0;

    let safeContent = strippedContent.replace(protectedTagsRegex, (match) => {
        const placeholder = `__PROTECTED_TAG_${placeholderIndex++}__`;
        placeholders.set(placeholder, match);
        return placeholder;
    });

    let linkCount = 0;
    const linkedKeywords = new Set<string>();

    for (const item of linkMap) {
        if (linkCount >= MAX_LINKS_PER_CONTENT) break;

        const lowerCaseKeyword = item.keyword.toLowerCase();
        if (!item.keyword || linkedKeywords.has(lowerCaseKeyword)) {
            continue;
        }

        const keywordRegex = new RegExp(`(?<!\\[|\\w])\\b(${escapeRegExp(item.keyword)})\\b(?!\\w|\\]|\\()`, 'ig');
        let matchFound = false;
        safeContent = safeContent.replace(keywordRegex, (match) => {
            if (!matchFound) {
                matchFound = true;
                return `[${match}](${item.url})`;
            }
            return match;
        });

        if (matchFound) {
            linkCount++;
            linkedKeywords.add(lowerCaseKeyword);
        }
    }

    let finalContent = safeContent;
    for (const [placeholder, originalHtml] of placeholders.entries()) {
        finalContent = finalContent.replace(placeholder, originalHtml);
    }

    return finalContent;
}
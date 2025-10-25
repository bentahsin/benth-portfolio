import { visit } from 'unist-util-visit';
import type { Root, Element } from 'hast';
import type { Plugin } from 'unified';

const getYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const rehypeMedia: Plugin<[], Root> = () => {
    return (tree) => {
        visit(tree, 'element', (node, index, parent) => {
            if (node.tagName !== 'p' || index === null || !parent) {
                return;
            }

            if (node.children.length === 1 && node.children[0].type === 'element' && node.children[0].tagName === 'a') {
                const linkNode = node.children[0];
                if (linkNode.children.length === 1 && linkNode.children[0].type === 'text') {
                    const textNode = linkNode.children[0];
                    const href = String(linkNode.properties?.href || '');
                    if (href === textNode.value) {
                        const youtubeId = getYouTubeId(href);
                        if (youtubeId) {
                            const mediaDiv: Element = {
                                type: 'element',
                                tagName: 'div',
                                properties: { className: 'media-embed' },
                                children: [
                                    {
                                        type: 'element',
                                        tagName: 'div',
                                        properties: { className: 'responsive-iframe-container' },
                                        children: [
                                            {
                                                type: 'element',
                                                tagName: 'iframe',
                                                properties: {
                                                    src: `https://www.youtube.com/embed/${youtubeId}`,
                                                    frameBorder: 0,
                                                    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                                                    allowFullScreen: true,
                                                    title: 'Embedded YouTube video',
                                                },
                                                children: [],
                                            },
                                        ],
                                    },
                                ],
                            };
                            parent.children[index] = mediaDiv;
                        }
                    }
                }
            }
        });
    };
};

export default rehypeMedia;
import { NextResponse } from 'next/server';
import { serialize } from 'next-mdx-remote/serialize';

import remarkGfm from 'remark-gfm';
import rehypeMedia from '@/lib/rehype-media';
import remarkShortcodes from '@/lib/remark-shortcodes';
import { rehypeCodeMeta, rehypePrettyCodeTuple } from '@/lib/rehype-pretty-code';

const remarkPlugins = [remarkGfm, remarkShortcodes];

export async function POST(request: Request) {
    try {
        const { source } = await request.json();

        if (typeof source !== 'string') {
            return NextResponse.json({ error: 'Invalid source' }, { status: 400 });
        }

        const serialized = await serialize(source, {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: remarkPlugins,
                rehypePlugins: [ rehypeMedia, rehypePrettyCodeTuple, rehypeCodeMeta ],
            },
        });

        return NextResponse.json(serialized);

    } catch (error) {

        console.error('MDX Serialization Error:', (error as Error).message);

        const errorMdxSource = `
<Callout type="danger" title="Önizleme Derleme Hatası">
Aşağıdaki hata nedeniyle önizleme oluşturulamadı:

\`\`\`
${(error as Error).message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
\`\`\`
</Callout>
`;

        try {

            const errorSerialized = await serialize(errorMdxSource, {
                mdxOptions: {
                    remarkPlugins: [remarkGfm]
                },
            });

            return NextResponse.json(errorSerialized, { status: 200 }); 

        } catch (serializeError) {

            const plainError = {
                compiledSource: 'alert("Kritik önizleme hatası, lütfen konsolu kontrol edin.")',
                frontmatter: {},
                scope: {}
            };
            return NextResponse.json(plainError, { status: 500 });
        }
    }
}
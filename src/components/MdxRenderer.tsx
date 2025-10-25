import React from 'react';
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import { Callout } from './mdx/Callout';
import { Spoiler } from './mdx/Spoiler';
import { GitHubCard } from './mdx/GitHubCard';

import AntiAfkBlockText from './Images/AntiAfkBlockText';
import BenthDungeonsBlockText from './Images/BenthDungeonsBlockText';
import BenthFarmingBlockText from './Images/BenthFarmingBlockText';
import BenthLicenseAPIBlockText from './Images/BenthLicenseAPIBlockText';
import BenthPapiMgrBlockText from './Images/BenthPapiMgrBlockText';
import BenthPatcherBlockText from './Images/BenthPatcherBlockText';
import CustomBTimeBlockText from './Images/CustomBTimeBlockText';
import LicenseLibBlockText from './Images/LicenseLibBlockText';
import MynerithBlockText from './Images/MynerithBlockText';


import remarkGfm from 'remark-gfm';
import rehypeMedia from '@/lib/rehype-media';
import remarkShortcodes from '@/lib/remark-shortcodes';
import { rehypeCodeMeta, rehypePrettyCodeTuple } from '@/lib/rehype-pretty-code';
import { CodeBlock } from './mdx/CodeBlock';

const components: MDXRemoteProps['components'] = {
    Callout,
    Spoiler,
    GitHubCard,
    AntiAfkBlockText,
    BenthDungeonsBlockText,
    BenthFarmingBlockText,
    BenthLicenseAPIBlockText,
    BenthPapiMgrBlockText,
    BenthPatcherBlockText,
    CustomBTimeBlockText,
    LicenseLibBlockText,
    MynerithBlockText,
    pre: CodeBlock,
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
        if (props.href && (props.href.startsWith('http') || props.href.startsWith('//'))) {
            return <a {...props} target="_blank" rel="noopener noreferrer" />;
        }
        return <a {...props} />;
    },
};

interface MdxRendererProps {
    source: string;
}

export function MdxRenderer({ source }: MdxRendererProps) {
    return (
        <div className="markdown-content">
            <MDXRemote
                source={source}
                components={components}
                options={{
                    mdxOptions: {
                        remarkPlugins: [
                            remarkGfm,
                            remarkShortcodes,
                        ],
                        rehypePlugins: [
                            rehypeMedia, rehypePrettyCodeTuple, rehypeCodeMeta
                        ],
                    },
                }}
            />
        </div>
    );
}

export default MdxRenderer;
'use client';

import React from 'react';
import { MDXRemote, type MDXRemoteProps, type MDXRemoteSerializeResult } from 'next-mdx-remote';

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

interface MdxPreviewProps {
  serializedResult: MDXRemoteSerializeResult | null;
}

export default function MdxPreview({ serializedResult }: MdxPreviewProps) {
    if (serializedResult === null) {
        return <div className="markdown-content"><p>Önizleme yükleniyor...</p></div>;
    }

    if (!serializedResult.compiledSource) {
        return <div className="markdown-content"><p>Önizleme için bir şeyler yazın...</p></div>;
    }

    return (
        <div className="markdown-content">
            <MDXRemote
                {...serializedResult}
                components={components}
            />
        </div>
    );
}
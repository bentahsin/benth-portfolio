'use client';

import React, { useState, useEffect, isValidElement, ReactNode } from 'react';
import ReactMarkdown, { Options } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import SyntaxHighlighter from 'react-syntax-highlighter';
import copy from 'clipboard-copy';

import AntiAfkBlockText from './Images/AntiAfkBlockText';
import BenthDungeonsBlockText from './Images/BenthDungeonsBlockText';
import BenthFarmingBlockText from './Images/BenthFarmingBlockText';
import BenthLicenseAPIBlockText from './Images/BenthLicenseAPIBlockText';
import BenthPapiMgrBlockText from './Images/BenthPapiMgrBlockText';
import BenthPatcherBlockText from './Images/BenthPatcherBlockText';
import CustomBTimeBlockText from './Images/CustomBTimeBlockText';
import LicenseLibBlockText from './Images/LicenseLibBlockText';
import MynerithBlockText from './Images/MynerithBlockText';

interface MarkdownRendererProps {
  content: string;
}

interface CodeRendererProps {
    node?: unknown;
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
}

interface ShortcodeProps {
    slug?: string;
}

const shortcodes: { [key: string]: React.ComponentType<ShortcodeProps> } = {
    'AntiAfkBlockText': AntiAfkBlockText,
    'BenthDungeonsBlockText': BenthDungeonsBlockText,
    'BenthFarmingBlockText': BenthFarmingBlockText,
    'BenthLicenseAPIBlockText': BenthLicenseAPIBlockText,
    'BenthPapiMgrBlockText': BenthPapiMgrBlockText,
    'BenthPatcherBlockText': BenthPatcherBlockText,
    'CustomBTimeBlockText': CustomBTimeBlockText,
    'LicenseLibBlockText': LicenseLibBlockText,
    'MynerithBlockText': MynerithBlockText,
};

const parseShortcodes = (text: string, keyPrefix: string): (string | React.ReactElement)[] => {
    const shortcodeRegex = /\[([A-Za-z0-9_]+)(?::([^\]]+))?\]/g;
    const parts: (string | React.ReactElement)[] = [];
    let lastIndex = 0;
    let match;

    while ((match = shortcodeRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }

        const [fullMatch, componentKey, value] = match;
        const Component = shortcodes[componentKey];
        const key = `${keyPrefix}-${componentKey}-${lastIndex}`;

        if (Component) {
            const props: ShortcodeProps = value ? { slug: value } : {};
            parts.push(<span key={key}><Component {...props} /></span>);
        } else {
            parts.push(fullMatch);
        }
        lastIndex = match.index + fullMatch.length;
    }

    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }

    return parts;
};

const processChildren = (children: ReactNode, parentKey: string): ReactNode => {
    return React.Children.map(children, (child, index) => {
        const key = `${parentKey}-child-${index}`;

        if (typeof child === 'string') {
            return parseShortcodes(child, key);
        }

        if (isValidElement<{ children?: ReactNode }>(child) && child.props.children) {
            return React.cloneElement(child, {
                ...child.props,
                key: key,
                children: processChildren(child.props.children, key)
            });
        }

        return child;
    });
};

const CodeRenderer: React.FC<CodeRendererProps> = ({ node, inline, className, children, ...props }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [style, setStyle] = useState<{ [key: string]: React.CSSProperties } | null>(null);

    useEffect(() => {

        const stylePath = 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';

        import(stylePath)
            .then(mod => {
                setStyle(mod.default as { [key: string]: React.CSSProperties });
            })
            .catch(err => {

                console.warn("ESM stil import'u başarısız, CJS deneniyor...", err);
                const cjsStylePath = 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus';
                import(cjsStylePath)
                    .then(mod_cjs => {
                        setStyle(mod_cjs.default as { [key: string]: React.CSSProperties });
                    })
                    .catch(err_cjs => console.error("SyntaxHighlighter stili hem CJS hem de ESM olarak yüklenemedi:", err_cjs));
            });
    }, []); 

    const match = /language-(\w+)/.exec(className || '');
    const codeString = String(children || '').replace(/\n$/, '');

    const handleCopy = () => {
        copy(codeString);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    if (!inline && match) {

        if (!style) {
            return (
                <div className="code-block">
                    <pre style={{ 
                        padding: '1rem', 
                        backgroundColor: '#1E1E1E', 
                        color: '#D4D4D4', 
                        borderRadius: '0.3rem' 
                    }}>
                        {codeString}
                    </pre>
                </div>
            );
        }

        return (
            <div className="code-block">
                <div className="code-header">
                    <span>{match[1]}</span>
                    <button onClick={handleCopy} className="copy-button">
                        {isCopied ? '✓ Kopyalandı!' : '❐ Kopyala'}
                    </button>
                </div>
                <SyntaxHighlighter
                    style={style} 
                    language={match[1]}
                    PreTag="div"
                    {...props}
                >
                    {codeString}
                </SyntaxHighlighter>
            </div>
        );
    }

    return (
        <code className={className || 'inline-code'} {...props}>
            {children}
        </code>
    );
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    if (!content) {
        return <div className="markdown-content"><p>Önizleme için bir şeyler yazın...</p></div>;
    }

    const components: Options['components'] = {
        p: ({ node, ...props }) => <p {...props}>{processChildren(props.children, 'p')}</p>,
        h1: ({ node, ...props }) => <h1 {...props}>{processChildren(props.children, 'h1')}</h1>,
        h2: ({ node, ...props }) => <h2 {...props}>{processChildren(props.children, 'h2')}</h2>,
        h3: ({ node, ...props }) => <h3 {...props}>{processChildren(props.children, 'h3')}</h3>,
        h4: ({ node, ...props }) => <h4 {...props}>{processChildren(props.children, 'h4')}</h4>,
        h5: ({ node, ...props }) => <h5 {...props}>{processChildren(props.children, 'h6')}</h5>,
        h6: ({ node, ...props }) => <h6 {...props}>{processChildren(props.children, 'h6')}</h6>,
        li: ({ node, ...props }) => <li {...props}>{processChildren(props.children, 'li')}</li>,
        blockquote: ({ node, ...props }) => <blockquote {...props}>{processChildren(props.children, 'blockquote')}</blockquote>,
        td: ({ node, ...props }) => <td {...props}>{processChildren(props.children, 'td')}</td>,
        th: ({ node, ...props }) => <th {...props}>{processChildren(props.children, 'th')}</th>,
        a: ({ node, ...props }) => <a {...props}>{processChildren(props.children, 'a')}</a>,

        code: CodeRenderer as Options['components']['code'],
    };

    return (
        <div className="markdown-content">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={components}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
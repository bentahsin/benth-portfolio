import rehypePrettyCode from 'rehype-pretty-code';
import type { Options } from 'rehype-pretty-code';
import { visit } from 'unist-util-visit';

const prettyCodeOptions: Partial<Options> = {
  theme: 'dark-plus',
  keepBackground: true,

  onVisitHighlightedLine(element) {
    element.properties.className.push('highlighted');
  },
};

export const rehypePrettyCodeTuple: [typeof rehypePrettyCode, Partial<Options>] = [
  rehypePrettyCode,
  prettyCodeOptions
];

export const rehypeCodeMeta: any = () => {
    return (tree: any) => {
        visit(tree, 'element', (node) => {
            if (node.tagName === 'figure' && node.properties?.['data-rehype-pretty-code-figure']) {
                const preElement = node.children.find((child: any) => child.tagName === 'pre');
                if (!preElement) return;
                const titleElement = node.children.find((child: any) => child.properties?.['data-rehype-pretty-code-title']);
                if (titleElement) {
                    preElement.properties['data-title'] = titleElement.children[0].value;
                    node.children = node.children.filter((child: any) => !child.properties?.['data-rehype-pretty-code-title']);
                }

                const codeElement = preElement.children.find((child: any) => child.tagName === 'code');
                if (codeElement) {
                  preElement.properties['data-language'] = codeElement.properties['data-language'];
                }
            }
        });
    };
};
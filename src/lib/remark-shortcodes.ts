import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';
import type { MdxJsxFlowElement } from 'mdast-util-mdx-jsx';
import type { Plugin } from 'unified';

const shortcodeComponents = [
  'AntiAfkBlockText', 'BenthDungeonsBlockText', 'BenthFarmingBlockText',
  'BenthLicenseAPIBlockText', 'BenthPapiMgrBlockText', 'BenthPatcherBlockText',
  'CustomBTimeBlockText', 'LicenseLibBlockText', 'MynerithBlockText'
];

const shortcodeRegex = /\[([A-Za-z0-9_]+)\]/g;

const remarkShortcodes: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'paragraph', (paragraphNode) => {
      if (paragraphNode.children.length === 1 && paragraphNode.children[0].type === 'text') {
        const textNode = paragraphNode.children[0];
        const componentNameMatch = textNode.value.match(/^\[([A-Za-z0-9_]+)\]$/);

        if (componentNameMatch) {
          const componentName = componentNameMatch[1];
          if (shortcodeComponents.includes(componentName)) {
            const jsxNode: MdxJsxFlowElement = {
              type: 'mdxJsxFlowElement',
              name: componentName,
              attributes: [],
              children: []
            };
            (paragraphNode as any).type = jsxNode.type;
            (paragraphNode as any).name = jsxNode.name;
            (paragraphNode as any).attributes = jsxNode.attributes;
            (paragraphNode as any).children = jsxNode.children;
          }
        }
      }
    });
  };
};

export default remarkShortcodes;
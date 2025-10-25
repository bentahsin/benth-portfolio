export interface TextUpdate {
    newText: string;
    newSelection: {
        start: number;
        end: number;
    };
}

export const applyFormat = (
    currentText: string,
    selectionStart: number,
    selectionEnd: number,
    formatStart: string, 
    formatEnd: string = formatStart,
    placeholder: string = "metin"
): TextUpdate => {
    const selectedText = currentText.substring(selectionStart, selectionEnd);
    const beforeText = currentText.substring(0, selectionStart);
    const afterText = currentText.substring(selectionEnd);

    if (selectedText) {
        const newSegment = formatStart + selectedText + formatEnd;
        return {
            newText: beforeText + newSegment + afterText,
            newSelection: { start: selectionStart, end: selectionStart + newSegment.length }
        };
    } else {
        const newSegment = formatStart + placeholder + formatEnd;
        return {
            newText: beforeText + newSegment + afterText,
            newSelection: {
                start: selectionStart + formatStart.length,
                end: selectionStart + formatStart.length + placeholder.length
            }
        };
    }
};

export const applyLink = (
    currentText: string,
    selectionStart: number,
    selectionEnd: number
): TextUpdate | null => {
    const selectedText = currentText.substring(selectionStart, selectionEnd) || "link metni";
    const url = prompt("Lütfen URL'i girin:", "https://");
    if (url) {
        const newSegment = `[${selectedText}](${url})`;
        const beforeText = currentText.substring(0, selectionStart);
        const afterText = currentText.substring(selectionEnd);

        return {
            newText: beforeText + newSegment + afterText,
            newSelection: {
                start: selectionStart + newSegment.length,
                end: selectionStart + newSegment.length
            }
        };
    }
    return null;
};

export const applyCodeBlock = (
    currentText: string,
    selectionStart: number,
): TextUpdate => {
    const placeholder = "// Kodunuzu buraya yazın";
    const codeBlock = `\n\`\`\`java title="DosyaAdi.java"\n${placeholder}\n\`\`\`\n`;

    const beforeText = currentText.substring(0, selectionStart);
    const afterText = currentText.substring(selectionStart);

    return {
        newText: beforeText + codeBlock + afterText,
        newSelection: {
            start: selectionStart + "\n```java title=\"".length,
            end: selectionStart + "\n```java title=\"DosyaAdi.java".length
        }
    };
};

export const applyLinePrefix = (
    currentText: string,
    selectionStart: number,
    selectionEnd: number,
    prefix: string
): TextUpdate => {
    const startOfLine = currentText.lastIndexOf('\n', selectionStart - 1) + 1;
    const endOfLine = currentText.indexOf('\n', selectionEnd);
    const selectionBlock = currentText.substring(startOfLine, endOfLine === -1 ? currentText.length : endOfLine);

    const lines = selectionBlock.split('\n');
    let newSelectionLength = 0;

    const transformedLines = lines.map(line => {
        const newLine = prefix + line;
        newSelectionLength += prefix.length;
        return newLine;
    });

    const newSegment = transformedLines.join('\n');
    const beforeText = currentText.substring(0, startOfLine);
    const afterText = currentText.substring(endOfLine === -1 ? currentText.length : endOfLine);

    return {
        newText: beforeText + newSegment + afterText,
        newSelection: {
            start: selectionStart + prefix.length,
            end: selectionEnd + newSelectionLength
        }
    };
};

export const applyCallout = (
    currentText: string,
    selectionStart: number,
    selectionEnd: number
): TextUpdate => {
    const selectedText = currentText.substring(selectionStart, selectionEnd) || "Bilgi mesajı buraya gelecek...";
    const template = `<Callout type="info" title="Başlık">\n  ${selectedText}\n</Callout>`;

    const beforeText = currentText.substring(0, selectionStart);
    const afterText = currentText.substring(selectionEnd);

    return {
        newText: beforeText + template + afterText,
        newSelection: { 
            start: selectionStart + template.length,
            end: selectionStart + template.length
        }
    };
};

export const applySpoiler = (
    currentText: string,
    selectionStart: number,
    selectionEnd: number
): TextUpdate => {
    const selectedText = currentText.substring(selectionStart, selectionEnd) || "Gizli içerik buraya...";
    const template = `<Spoiler title="Genişletmek için tıkla">\n  ${selectedText}\n</Spoiler>`;

    const beforeText = currentText.substring(0, selectionStart);
    const afterText = currentText.substring(selectionEnd);

    return {
        newText: beforeText + template + afterText,
        newSelection: {
            start: selectionStart + template.indexOf('>') + 1,
            end: selectionStart + template.indexOf('>') + 1
        }
    };
};
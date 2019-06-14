import * as vscode from 'vscode';
import { generateLorem } from './generateLorem';

const reLorem = /^ctlorem(\d*)$/i;

export class LoremCompletionProvider implements vscode.CompletionItemProvider {
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext
  ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
    const line = document.getText(document.getWordRangeAtPosition(position));
    const m = line.match(reLorem);

    if (!m) {
      return undefined;
    }

    const wordCount = m[1] || '30';
    const completionItem = new vscode.CompletionItem(
      m[0],
      vscode.CompletionItemKind.Snippet
    );
    completionItem.insertText = new vscode.SnippetString(
      generateLorem(parseInt(wordCount))
    );
    completionItem.kind = vscode.CompletionItemKind.Snippet;
    completionItem.documentation = completionItem.insertText.value;
    completionItem.detail = `產生 ${wordCount} 字數中文假文`;
    return new vscode.CompletionList([completionItem], true);
  }
}

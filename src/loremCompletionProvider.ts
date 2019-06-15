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

    const wordCount = (m && +m[1]) || 30;
    const itemLabel = (m && m[0]) || 'ctlorem';
    const completionItem = new vscode.CompletionItem(
      itemLabel,
      vscode.CompletionItemKind.Snippet
    );
    completionItem.insertText = new vscode.SnippetString(
      generateLorem(wordCount)
    );
    completionItem.kind = vscode.CompletionItemKind.Snippet;
    completionItem.documentation = completionItem.insertText.value;
    completionItem.detail = `產生 ${wordCount} 字數中文假文`;
    const items = [completionItem];
    return new vscode.CompletionList(items, true);
  }
}

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { generateLorem } from './generateLorem';

const reLorem = /^ctlorem(\d*)$/i;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.languages.registerCompletionItemProvider(
    [
      { scheme: 'file', language: 'html' },
      { scheme: 'untitled', language: 'html' }
    ],
    {
      provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position
      ) {
        return new Promise(resolve => {
          const line = document.getText(
            document.getWordRangeAtPosition(position)
          );
          const m = line.match(reLorem);

          if (m === null) {
            return resolve(undefined);
          }
          const wordCount = m[1] || '10';
          const completionItem = new vscode.CompletionItem(m[0]);
          completionItem.insertText = new vscode.SnippetString(
            generateLorem(parseInt(wordCount))
          );
          completionItem.kind = vscode.CompletionItemKind.Snippet;
          completionItem.documentation = completionItem.insertText.value;
          completionItem.detail = `產生 ${wordCount} 字數中文假文`;
          return resolve(new vscode.CompletionList([completionItem]));
        });
      }
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

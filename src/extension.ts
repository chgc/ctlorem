import * as vscode from 'vscode';
import { LoremCompletionProvider } from './loremCompletionProvider';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.languages.registerCompletionItemProvider(
    [
      { scheme: 'file', language: 'html' },
      { scheme: 'untitled', language: 'html' }
    ],
    new LoremCompletionProvider(),
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0'
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

import * as vscode from 'vscode';
import {
  LoremCompletionProvider,
  getIncludedLangues
} from './loremCompletionProvider';

export function activate(context: vscode.ExtensionContext) {
  getIncludedLangues().forEach(language => {
    let disposable = vscode.languages.registerCompletionItemProvider(
      [{ scheme: 'file', language }, { scheme: 'untitled', language }],
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
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}

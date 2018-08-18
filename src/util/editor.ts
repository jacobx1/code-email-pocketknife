import * as vscode from 'vscode';

export const getText = (textEditor: vscode.TextEditor): string => {
  return textEditor.document.getText(textEditor.selection);
};

type ReplaceFunctionSync = (data: string) => string;
type ReplaceFunctionAsync = (data: string) => PromiseLike<string>;
type ReplaceFunction = ReplaceFunctionSync | ReplaceFunctionAsync;

export function replaceSelection(
  textEditor: vscode.TextEditor,
  edit: vscode.TextEditorEdit,
  replacer: ReplaceFunction
): void | PromiseLike<void> {
  const text = getText(textEditor);
  const update = replacer(text);
  if (typeof update === 'string') {
    edit.replace(textEditor.selection, update);
  } else {
    return update.then(text => edit.replace(textEditor.selection, text));
  }
}

export function replaceSelectionCommand(replacer: ReplaceFunction) {
  return (
    textEditor: vscode.TextEditor,
    edit: vscode.TextEditorEdit,
    ...args: any[]
  ) => {
    replaceSelection(textEditor, edit, replacer);
  };
}

'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { replaceSelectionCommand } from './util/editor';
import { qpDecode, qpEncode } from './util/quotedPrintable';
import { b64encode, b64decode } from './util/base64';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const editorCommands: any = {
    'editor.qpEncode': replaceSelectionCommand(qpEncode),
    'editor.qpDecode': replaceSelectionCommand(qpDecode),
    'editor.b64Encode': replaceSelectionCommand(b64encode),
    'editor.b64Decode': replaceSelectionCommand(b64decode),
  };

  Object.keys(editorCommands)
    .map(cmd =>
      vscode.commands.registerTextEditorCommand(cmd, editorCommands[cmd])
    )
    .forEach(d => context.subscriptions.push(d));
}

// this method is called when your extension is deactivated
export function deactivate() {}

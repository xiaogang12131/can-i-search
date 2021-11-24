import * as vscode from "vscode";
import { Plugins } from "./plugins";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const plugins = new Plugins();

  const openWeb = vscode.commands.registerCommand("can-i-search.web", () => {
    plugins.openWeb();
  });
  const openNpm = vscode.commands.registerCommand("can-i-search.npm", () => {
    plugins.openNpm();
  });
  const openTranslate = vscode.commands.registerCommand(
    "can-i-search.translate",
    () => {
      plugins.openTranslate();
    }
  );
  const insertConsole = vscode.commands.registerCommand(
    "can-i-search.console",
    () => {
      plugins.insertConsole();
    }
  );

  context.subscriptions.push(openWeb, openNpm, openTranslate, insertConsole);
}

// this method is called when your extension is deactivated
export function deactivate() {}

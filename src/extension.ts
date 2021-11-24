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
  const addConsole = vscode.commands.registerCommand(
    "can-i-search.addConsole",
    () => {
      plugins.addConsole();
    }
  );
  const deleteConsole = vscode.commands.registerCommand(
    "can-i-search.deleteConsole",
    () => {
      plugins.deleteConsole();
    }
  );

  context.subscriptions.push(
    openWeb,
    openNpm,
    openTranslate,
    addConsole,
    deleteConsole
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}

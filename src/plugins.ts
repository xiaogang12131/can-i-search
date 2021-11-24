import * as vscode from "vscode";
import { openBrowser } from "./utils";

export class Plugins {
  config: vscode.WorkspaceConfiguration;
  constructor() {
    this.config = vscode.workspace.getConfiguration("can-i-search") || {};
  }
  openWeb() {
    openBrowser(this.config.web || "https://www.google.com/search?q={query}");
  }
  openNpm() {
    openBrowser(this.config.npm || "https://www.npmjs.com/{query}");
  }
  openTranslate() {
    openBrowser(
      this.config.translate || "https://translate.google.cn/?text={query}"
    );
  }
  insertConsole() {
    // 获取编辑器
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const selection = editor.selection;
      const text = editor.document.getText(selection);
      // 插入下一行
      vscode.commands
        .executeCommand("editor.action.insertLineAfter")
        .then(() => {
          const afterSelection = editor.selection;
          const range = new vscode.Range(
            afterSelection.start,
            afterSelection.end
          );
          editor.edit((editBuilder) => {
            editBuilder.replace(
              range,
              text ? `console.log('${text}: ', ${text});` : "console.log();"
            );
          });
        });
    }
  }
}

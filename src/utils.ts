import * as vscode from "vscode";
import * as open from "open";

/**
 * 打开浏览器
 * @param {string} url
 */
const openBrowser = (url: string) => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }
  const selection = editor.selection;
  const text = editor.document.getText(selection);
  open(url.replace(/{query}/, text ?? ""));
};

export { openBrowser };

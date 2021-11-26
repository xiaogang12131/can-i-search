import * as vscode from "vscode";
import * as open from "open";

/**
 * 打开浏览器
 * @param {string} url
 */
const openBrowser = (url: string, query?: string) => {
  if (query) {
    open(encodeURI(url.replace(/{query}/, query)));
  } else {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }
    const selection = editor.selection;
    const text = editor.document.getText(selection);
    open(encodeURI(url.replace(/{query}/, text ?? "")));
  }
};

export { openBrowser };

import * as vscode from "vscode";
import { openBrowser } from "./utils";

export class Plugins {
  config: vscode.WorkspaceConfiguration;
  constructor() {
    const vscodeConfig =
      vscode.workspace.getConfiguration("can-i-search") || {};
    this.config = {
      web: "https://www.baidu.com/s?wd={query}",
      npm: "https://www.npmjs.com/{query}",
      gh: "https://github.com/search?q={query}",
      tr: "https://fanyi.baidu.com/translate?lang=auto2zh&query={query}",
      ...vscodeConfig,
    };
  }
  openWeb() {
    openBrowser(this.config.web);
  }
  openNpm() {
    openBrowser(this.config.npm);
  }
  openGithub() {
    openBrowser(this.config.gh);
  }
  openTranslate() {
    openBrowser(this.config.tr);
  }
  openSearch() {
    let quickPick = vscode.window.createQuickPick();
    quickPick.placeholder = "you can search";
    quickPick.onDidChangeValue((val) => {
      const query = val.trim();
      const index = query.indexOf(" ");
      const key = query.slice(0, index) ?? "";
      const value = query.slice(index + 1) ?? "";
      quickPick.items = [];
      if (Object.keys(this.config).includes(key)) {
        quickPick.items = [
          {
            alwaysShow: true,
            label: `search ${key} for ${value}`,
          },
        ];
      }
    });
    quickPick.onDidAccept(() => {
      const query = quickPick.value.trim();
      const index = query.indexOf(" ");
      const key = query.slice(0, index) ?? "";
      const value = query.slice(index + 1) ?? "";
      if (Object.keys(this.config).includes(key)) {
        openBrowser(this.config[key], value);
      } else {
        openBrowser(this.config.web, query);
      }
    });
    quickPick.onDidHide(() => quickPick.dispose());
    quickPick.show();
  }
  addConsole() {
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
  deleteConsole() {
    // 正则 匹配console.log、console.info等代码，以及log()函数
    const logRegex =
      /console.(log|debug|info|warn|error|assert|dir|dirxml|trace|group|groupEnd|time|timeEnd|profile|profileEnd|count)\((.*)\);?/g;
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }
    const document = editor.document;
    const documentText = document.getText();
    // 正则匹配的range数组
    const ranges: vscode.Range[] = [];

    let match;
    // 注意：exec match全局匹配时没有index
    while ((match = logRegex.exec(documentText))) {
      // document.positionAt(字符位数) 可以获取到 position
      // 再用 position 生成 range
      const matchRange = new vscode.Range(
        document.positionAt(match.index),
        document.positionAt(match.index + match[0].length)
      );
      if (!matchRange.isEmpty) {
        ranges.push(matchRange);
      }
    }

    editor
      .edit((editBuilder) => {
        ranges.forEach((range) => {
          editBuilder.replace(range, "");
        });
      })
      .then(() => {
        // 输出提示
        vscode.window.showInformationMessage(
          `${ranges.length} console.logs deleted`
        );
      });
  }
}

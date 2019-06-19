import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export default function run(templatesManager: any, args: any) {
  /**
   * gets the file contents of the current selected file.
   * if this is toggled via context menu, we can get it directly from args,
   * otherwise we will use the current active file in the editor.
   */
  var filePath = args
    ? args.fsPath
    : !!vscode.window.activeTextEditor &&
      vscode.window.activeTextEditor.document.fileName;
  var fileName = path.basename(filePath);
  // ask for filename
  var inputOptions = {
    prompt: "Please enter the desired filename",
    value: fileName
  };
  vscode.window.showInputBox(inputOptions).then(function(filename) {
    if (!filename) return;
    var fileContents = fs.readFileSync(filePath);
    var templateFile = path.join(
      templatesManager.getTemplatesDir(),
      path.basename(filename)
    );
    fs.writeFile(templateFile, fileContents, function(err) {
      if (err) {
        vscode.window.showErrorMessage(err.message);
      } else {
        vscode.window
          .showQuickPick(["Yes", "No"], {
            placeHolder: "Edit the new template?"
          })
          .then(function(choice) {
            if (choice === "Yes") {
              vscode.workspace
                .openTextDocument(templateFile)
                .then(function(doc) {
                  var editor = vscode.window.activeTextEditor;
                  if (editor) {
                    vscode.window.showTextDocument(doc, editor.viewColumn);
                  }
                });
            }
          });
      }
    });
  });
}

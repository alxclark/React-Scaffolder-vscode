import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import TemplatesManager from "../../templatesManager";
import { FunctionComponent, FunctionComponentOptions } from "./partials/FunctionComponent";
import ComponentIndex from "./partials/ComponentIndex";
import ComponentQuery from "./partials/ComponentQuery";
import ComponentTest from "./partials/ComponentTest";
import ComponentTranslation from "./partials/ComponentTranslation";

/**
 * Main command to create a file from a template.
 * This command can be invoked by the Command Palette or in a folder context menu on the explorer view.
 * @export
 * @param {TemplatesManager} templatesManager
 * @param {*} args
 * @returns
 */
export default async function run(
  templatesManager: TemplatesManager,
  args: any
) {
  // gets the target folder. if its invoked from a context menu,
  // we use that reference, otherwise we use the file system path
  let targetFolder = args ? args.fsPath : vscode.workspace.rootPath;

  // show the list of available templates.

  const choices = [
    '1- index.ts (Component default)',
    '2- Component.tsx',
    '3- Component.scss',
    '4- With subcomponents',
    '5- With translations',
    '6- With a graphQL query/mutation',
    '7- With tests',
  ];

  // A: Select all files to be created
  const selections = await vscode.window.showQuickPick(choices,{canPickMany: true});
  if (!selections || (selections && selections.length === 0)) return;

  // B: Ask for componentName
  let inputOptions = <vscode.InputBoxOptions>{
    prompt: "Please enter the desired component name (camelCased)",
    value: 'NewComponent'
  };

  const componentName = await vscode.window.showInputBox(inputOptions);
  if (!componentName) return;

  selections.forEach(selection => {
    switch(selection.substring(0, 1)){
      case '1': {
        const componentIndex = new ComponentIndex(componentName);
        const fileName = path.join(targetFolder, "index.ts");
        fs.writeFile(fileName, componentIndex.renderContent(), (err) => {
          if (err) {
            vscode.window.showErrorMessage(err.message);
          }
        });
        break;
      }
      case '2': {
        const options: FunctionComponentOptions = {
          hasStyles: !!selections.find(selection => selection.substring(0, 1) === '3'),
          hasTranslations: !!selections.find(selection => selection.substring(0, 1) === '5'),
          hasGraphQLQuery: !!selections.find(selection => selection.substring(0, 1) === '6'),
        }
        const FC = new FunctionComponent(componentName, options);
        const fileName = path.join(targetFolder, `${componentName}.tsx`);
        fs.writeFile(fileName, FC.renderContent(), (err) => {
          if (err) {
            vscode.window.showErrorMessage(err.message);
          }
        });
        break;
      }
      case '3': {
        const fileName = path.join(targetFolder, `${componentName}.scss`);
        fs.writeFile(fileName, '', (err) => {
          if (err) {
            vscode.window.showErrorMessage(err.message);
          }
        });
        break;
      }
      case '4': {
        const newDir = path.join(targetFolder, 'components');
        fs.mkdirSync(newDir);
        fs.writeFile(path.join(newDir, "index.ts"), '', (err) => {
          if (err) {
            vscode.window.showErrorMessage(err.message);
          }
        });
        break;
      }
      case '5': {
        const newDir = path.join(targetFolder, 'translations');
        const componentTranslation = new ComponentTranslation(componentName);
        fs.mkdirSync(newDir);
        fs.writeFile(path.join(newDir, "en.json"), componentTranslation.renderContent(), (err) => {
          if (err) {
            vscode.window.showErrorMessage(err.message);
          }
        });
        break;
      }
      case '6': {
        const newDir = path.join(targetFolder, 'graphql');
        const componentQuery = new ComponentQuery(componentName);
        fs.mkdirSync(newDir);
        fs.writeFile(path.join(newDir, `${componentName}Query.graphql`), componentQuery.renderContent(), (err) => {
          if (err) {
            vscode.window.showErrorMessage(err.message);
          }
        });
        break;
      }
      case '7': {
        const newDir = path.join(targetFolder, 'tests');
        const componentTest = new ComponentTest(componentName);
        fs.mkdirSync(newDir);
        fs.writeFile(path.join(newDir, `${componentName}.test.tsx`), componentTest.renderContent(), (err) => {
          if (err) {
            vscode.window.showErrorMessage(err.message);
          }
        });
        break;
      }
    }
  })
}

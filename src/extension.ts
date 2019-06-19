// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import FilesFromTemplateCommand from './commands/newFilesFromTemplate';
import TemplateFromFilesCommand from './commands/newTemplateFromFiles';
import generateReactComponent from './commands/interactive/generateReactComponent';
import TemplateManager from './templatesManager';

export function activate(context: vscode.ExtensionContext) {
	const templatesManager = new TemplateManager(vscode.workspace.getConfiguration('fileTemplates'));
    templatesManager.createTemplatesDirIfNotExists();

	context.subscriptions.push(vscode.commands.registerCommand('extension.generateReactComponent', generateReactComponent.bind(undefined, templatesManager)));
	context.subscriptions.push(vscode.commands.registerCommand('extension.newFilesFromTemplate', FilesFromTemplateCommand.bind(undefined, templatesManager)));
    context.subscriptions.push(vscode.commands.registerCommand('extension.newTemplateFromFiles', TemplateFromFilesCommand.bind(undefined, templatesManager)));
}

// this method is called when your extension is deactivated
export function deactivate() {}

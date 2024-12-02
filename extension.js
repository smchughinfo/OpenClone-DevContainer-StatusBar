const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    // Create a status bar item
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);

    // Read the custom text from the configuration
    const config = vscode.workspace.getConfiguration('opencloneDevContainerStatusBar');
    statusBarItem.text = config.get('text', 'THIS IS A TEST'); // Default if not set

    statusBarItem.show();

    // Update the text dynamically if the setting changes
    vscode.workspace.onDidChangeConfiguration((e) => {
        if (e.affectsConfiguration('opencloneDevContainerStatusBar.text')) {
            const updatedConfig = vscode.workspace.getConfiguration('opencloneDevContainerStatusBar');
            statusBarItem.text = updatedConfig.get('text', 'THIS IS A TEST');
        }
    });

    // Add the status bar item to the context's subscriptions
    context.subscriptions.push(statusBarItem);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};

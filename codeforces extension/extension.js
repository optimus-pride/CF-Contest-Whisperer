const vscode = require('vscode');
const axios = require('axios');

async function getCodeforcesSubmissions(handle) {
    //make GET request to codeforces API
    const response = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}&count=5`);
    /*
        response.data contains the whole JSON object returned by the API
        response.data.result contains the array of last 5 submission objects since we put count = 5
    */
    return response.data.result;
}

async function changeStatusBarColor(themeName) {
    // Retrieve the configuration object for the 'workbench' namespace
    const themeConfig = vscode.workspace.getConfiguration('workbench');
    
    // Update the 'colorTheme' setting to the specified themeName
    // The change is applied globally, affecting all VS Code workspaces
    await themeConfig.update('colorTheme', themeName, vscode.ConfigurationTarget.Global);
}

async function getHandle() {
    // Retrieve the configuration object for the 'codeforces-extension' namespace
    const config = vscode.workspace.getConfiguration('codeforces-extension');

    // Get the 'handle' setting from the configuration
    let handle = config.get('handle');

    // If the handle is not set, prompt the user to enter their Codeforces handle
    if (!handle) {
        handle = await vscode.window.showInputBox({
            // Prompt message for the input box
            prompt: 'Please enter your Codeforces handle',
            // Keep the input box open even if the user clicks outside of it
            ignoreFocusOut: true,
        });

        // If the user enters a handle, update the configuration with the new handle
        if (handle) {
            await config.update('handle', handle, vscode.ConfigurationTarget.Global);
        } else {
            // If the user does not enter a handle, show an error message
            vscode.window.showErrorMessage('Codeforces handle is required for the extension to work');
        }
    }

    // Return the handle, either retrieved from the configuration or entered by the user
    return handle;
}

async function activate(context) {
    // Initialize the last submission ID to null
    let lastSubmissionId = null;

    // Initialize a flag to indicate whether the checking process is running
    let running = false;

    // Retrieve the Codeforces handle from the configuration or prompt the user to enter it
    const cfh = await getHandle();

    // Display the Codeforces handle in an information message
    vscode.window.showInformationMessage(cfh);

    // Define an asynchronous function to check for new Codeforces submissions
    async function checkSubmissions() {
        try {
            // Get the latest submissions for the Codeforces handle
            let submissions = await getCodeforcesSubmissions(cfh);

            // If there are no submissions, return early
            if (submissions.length === 0) {
                return;
            }

            // Get the latest submission from the list
            let latestSubmission = submissions[0];

            // If this is the first check, set the last submission ID to the latest submission's ID
            if (lastSubmissionId === null) {
                lastSubmissionId = latestSubmission.id;
            } else {
                // If the latest submission is not in the TESTING state and its ID is different from the last recorded submission ID
                if (latestSubmission.verdict !== 'TESTING' && lastSubmissionId !== latestSubmission.id && latestSubmission.verdict !== 'undefined') {
                    // Update the last submission ID to the latest submission's ID
                    lastSubmissionId = latestSubmission.id;

                    // Get the verdict of the latest submission
                    let verdict = latestSubmission.verdict;

                    // Display an information message with the problem name, index, and verdict
                    vscode.window.showInformationMessage(`${latestSubmission.problem.index}-${latestSubmission.problem.name}: ${verdict}`);
                }
            }
        } catch (error) {
            // Log an error message if there is an issue fetching submissions
            console.error('Failed to fetch Codeforces submissions:', error);
        }
    }

    // Set an interval to check submissions every 500 milliseconds
    const interval = setInterval(checkSubmissions, 500);

    // Add the interval to the context's subscriptions so it is cleaned up when the extension is deactivated
    context.subscriptions.push(vscode.Disposable.from({ dispose: () => clearInterval(interval) }));
}

//the exports object is used to expose the activate and deactivate functions so that VS Code can call them when necessary.

/*
    This line assigns the activate function to the activate property of the exports object.
    This makes the activate function available to VS Code, which calls this function when the extension is activated.
*/
exports.activate = activate;

//currently empty, but can use it to clean up resources, such as disposing of disposables or stopping background tasks.
function deactivate() {}

/* 
    This exports an object with two properties: activate and deactivate.
    This is another way to export the functions, and it's equivalent to:
    exports.activate = activate;
    exports.deactivate = deactivate;
*/
module.exports = {
    activate,
    deactivate
};



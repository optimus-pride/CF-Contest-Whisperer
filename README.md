# CF-Contest-Whisperer
A lightweight and powerful VS Code extension that helps competitive programmers track their Codeforces submissions in real-time directly inside VS Code.

No more switching tabs during contests — get instant verdict notifications and a smart status bar showing solved/unsolved problems.

🚀 Features
✅ Real-time submission tracking

Checks Codeforces every few seconds

Detects new submissions intelligently

Prevents duplicate notifications

✅ Instant verdict popups

Shows VS Code notifications like:

A - Theatre Square: OK
B - Borze: WRONG_ANSWER

✅ Live contest progress bar

During a live contest, the status bar displays:

Contest 1975: A: ✔️ | B: ❌ | C: ⚪


Meaning:

✔️ Solved

❌ Attempted but incorrect

⚪ Not attempted

✅ Handle auto-save

Your Codeforces handle is saved globally so you don’t need to enter it again.

✅ Efficient API usage

Avoids rate limits

Uses Axios with async/await

Prevents overlapping background checks

📦 Installation

You can install CF Contest Whisperer using any of the methods below.

1️⃣ Install from VS Code Marketplace (Recommended)

👉 https://marketplace.visualstudio.com/items?itemName=optimuspride.cf-contest-whisperer

Inside VS Code:

Extensions → Search → CF Contest Whisperer → Install

2️⃣ Install via Command Line
code --install-extension optimuspride.cf-contest-whisperer

3️⃣ Install Using .vsix File (Offline Method)

Download the .vsix file from the Releases section

In VS Code, open Command Palette (Ctrl+Shift+P)

Type:

Extensions: Install from VSIX...


Select the .vsix file

Reload VS Code


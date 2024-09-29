
# Copy Markdown Button for ChatGPT Outputs

This project adds a Copy Markdown button to conversation turns in ChatGPT-like outputs, allowing users to easily copy markdown content to their clipboard. The project dynamically adds these buttons to all conversation turns attributed to an assistant, making it easier to extract and reuse markdown-formatted responses.

## Features
- Adds a Copy Markdown button to each conversation turn that hasn't been processed yet.
- Supports dynamically loaded content via MutationObserver.
- Provides immediate feedback via alert() to indicate whether markdown text has been copied successfully or if an error occurred.
- Graceful fallback for missing or non-markdown content.

## How It Works
- The script targets div elements with the attribute data-message-author-role="assistant".
- A Copy Markdown button is appended to these elements if they contain markdown content.
- When the button is clicked, the markdown text is copied to the clipboard, and the user is notified via an alert().
- The script automatically monitors for new content being loaded and applies the buttons dynamically.
- HTML Structure: ChatGPT conversation turn elements have the following structure:
```html
<div data-message-author-role="assistant">
    <div class="markdown prose">
        <!-- ChatGPT output here -->
    </div>
</div>
```

## Installation

- Clone or download the repository.

```bash
git clone https://github.com/yourusername/chatgpt-copy.git
```

- Include the script in your HTML file or application where you have assistant-like outputs (e.g., in a ChatGPT-like web app).

- Ensure that the structure of your conversation turns matches the expected structure (i.e., div elements with data-message-author-role="assistant" and markdown content inside a .markdown.prose class).

## Script: 
- Use the JavaScript provided in copy-button-script.js (or a similar file) to add the copy buttons and enable clipboard copying functionality.

## Customizing: 
- You can modify the button’s styling, confirmation messages, and behaviors in the JavaScript file according to your needs.

## Development

If you want to contribute or modify the project:

- Fork the repository.
- Create a new feature branch (git checkout -b feature-branch-name).
- Make your changes.
- Push to the branch (git push origin feature-branch-name).
- Create a pull request to the main branch.

## Known Issues
- The script uses alert() for notifications. You can replace it with a more user-friendly notification system, such as a toast or snackbar.
- If the HTML structure differs from the expected format, the buttons may not work as expected.

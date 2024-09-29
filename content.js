// Function to add copy buttons to existing ChatGPT outputs
function addCopyButtons() {
    // Select all conversation turns that haven't been processed
    const conversationTurns = document.querySelectorAll('div[data-message-author-role="assistant"]:not(.copy-button-added)');

    conversationTurns.forEach((turn) => {
        // Mark this turn as processed
        turn.classList.add('copy-button-added');

        // Create the copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-markdown-button';
        copyButton.innerHTML = `
            <div class="flex gap-1 items-center py-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path>
                </svg>
                Copy Markdown
            </div>
        `;

        // Style the button (optional, additional styles can be defined in style.css)
        copyButton.style.cursor = 'pointer';
        copyButton.style.marginTop = '10px'; // Adjust as needed

        // Insert the button into the conversation turn
        turn.appendChild(copyButton);

        // Add click event listener to the button
        copyButton.addEventListener('click', () => {
            copyMarkdown(turn);
        });
    });
}

// Function to copy markdown text to clipboard
function copyMarkdown(turnElement) {
    // Find the markdown content within the assistant's output
    const markdownContent = turnElement.querySelector('.markdown.prose');

    if (markdownContent) {
        const textToCopy = markdownContent.innerText;

        navigator.clipboard.writeText(textToCopy).then(
            () => {
                // Provide feedback using alert
                alert('Markdown text copied to clipboard!');
            },
            (err) => {
                console.error('Failed to copy text: ', err);
                alert('Failed to copy text.');
            }
        );
    } else {
        alert('No markdown content found.');
    }
}

// Function to show a temporary confirmation message
function showConfirmation(turnElement, message) {
    // Ensure the parent has a relative position
    if (window.getComputedStyle(turnElement).position === 'static') {
        turnElement.style.position = 'relative';
    }

    // Create a confirmation message element
    const confirmation = document.createElement('div');
    confirmation.className = 'copy-confirmation';
    confirmation.innerText = message;

    // Style the confirmation
    confirmation.style.position = 'absolute';
    confirmation.style.top = '10px';
    confirmation.style.right = '10px';
    confirmation.style.backgroundColor = '#4BB543'; // Green for success
    confirmation.style.color = '#fff';
    confirmation.style.padding = '5px 10px';
    confirmation.style.borderRadius = '5px';
    confirmation.style.zIndex = '1000';
    confirmation.style.opacity = '0';
    confirmation.style.transition = 'opacity 0.3s ease';

    // Append the confirmation message to the turn element
    turnElement.appendChild(confirmation);

    // Trigger reflow to apply transition
    requestAnimationFrame(() => {
        confirmation.style.opacity = '1';
    });

    // Remove the confirmation message after 2 seconds
    setTimeout(() => {
        confirmation.style.opacity = '0';
        confirmation.addEventListener('transitionend', () => {
            confirmation.remove();
        });
    }, 2000);
}


// Initial call to add copy buttons
addCopyButtons();

// Observe for new messages (handle dynamically loaded content)
const observer = new MutationObserver(() => {
    addCopyButtons();
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});

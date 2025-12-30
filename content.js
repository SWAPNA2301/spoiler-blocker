// content.js

// 1. Get the list of banned words from Chrome Storage
chrome.storage.sync.get(['bannedWords'], function(result) {
    const words = result.bannedWords || [];
    if (words.length > 0) {
        blurSpoilers(words);
        observePage(words); // Start watching for new content (scrolling)
    }
});

function blurSpoilers(words) {
    // 2. Iterate over all HTML elements
    const elements = document.querySelectorAll('p, span, h1, h2, h3, li, div');

    elements.forEach((element) => {
        // Only check elements that actually have text directly inside them
        if (element.children.length === 0 && element.innerText) { 
            const text = element.innerText.toLowerCase();
            
            // 3. Check if any banned word exists in the text
            const containsSpoiler = words.some(word => text.includes(word.toLowerCase()));

            if (containsSpoiler) {
                // 4. Apply the BLUR effect
                element.style.filter = "blur(6px)";
                element.style.cursor = "pointer";
                element.title = "Spoiler hidden! Click to reveal.";
                
                // Optional: Allow user to click to reveal
                element.onclick = () => {
                    element.style.filter = "none";
                };
            }
        }
    });
}

// 5. Advanced: Use MutationObserver for infinite scroll sites (Twitter, Facebook)
function observePage(words) {
    const observer = new MutationObserver(() => {
        blurSpoilers(words);
    });
    observer.observe(document.body, { childList: true, subtree: true });
}
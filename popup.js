document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('wordInput');
    const addBtn = document.getElementById('addBtn');
    const list = document.getElementById('wordList');

    // Load saved words
    chrome.storage.sync.get(['bannedWords'], (result) => {
        const words = result.bannedWords || [];
        words.forEach(addWordToUI);
    });

    // Add new word
    addBtn.addEventListener('click', () => {
        const word = input.value.trim();
        if (word) {
            chrome.storage.sync.get(['bannedWords'], (result) => {
                const words = result.bannedWords || [];
                if (!words.includes(word)) {
                    const newWords = [...words, word];
                    chrome.storage.sync.set({ bannedWords: newWords }, () => {
                        addWordToUI(word);
                        input.value = '';
                        // Reload the current tab to apply changes immediately
                        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                            chrome.tabs.reload(tabs[0].id);
                        });
                    });
                }
            });
        }
    });

    function addWordToUI(word) {
        const li = document.createElement('li');
        li.textContent = word;
        const removeBtn = document.createElement('span');
        removeBtn.textContent = 'x';
        removeBtn.className = 'remove';
        
        // Remove word logic
        removeBtn.onclick = () => {
            chrome.storage.sync.get(['bannedWords'], (result) => {
                const words = result.bannedWords || [];
                const newWords = words.filter(w => w !== word);
                chrome.storage.sync.set({ bannedWords: newWords }, () => {
                    li.remove();
                    // Reload tab to un-blur
                     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                        chrome.tabs.reload(tabs[0].id);
                    });
                });
            });
        };
        
        li.appendChild(removeBtn);
        list.appendChild(li);
    }
});
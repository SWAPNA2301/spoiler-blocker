# 🚫 Spoiler Blocker Extension

A privacy-focused Chrome Extension that uses DOM manipulation to detect and blur specific keywords in real-time, preventing involuntary information exposure (spoilers) across web applications.

## 🔗 Quick Links
* **[🔴 Live Simulator Demo](https://swapna2301.github.io/spoiler-blocker/demo.html)** (Try the logic without installing anything)
* **[⬇️ Download Global Extension](https://github.com/SWAPNA2301/spoiler-blocker/releases/tag/v1.0)** (The official release)

## 🚀 Key Features
* **Real-time Content Analysis:** Scans DOM text nodes and injects CSS blur filters immediately upon page load.
* **Dynamic Content Handling:** Utilizes `MutationObserver` API to detect and process content loaded asynchronously (e.g., Infinite Scroll on Twitter/Reddit) without performance degradation.
* **Persistent Configuration:** Leverages Chrome's `Storage` API to sync user preferences across browser sessions.
* **Interactive UI:** Custom "Frosted Glass" effect with click-to-reveal interactivity.

## 🛠️ Tech Stack
* **JavaScript (ES6):** Core logic and DOM traversal.
* **Chrome Extension API (Manifest V3):** Background service workers and permission management.
* **CSS3:** Glassmorphism UI effects and transitions.

## 📦 How to Run Locally (For Developers)
1. Clone this repo.
2. Open Chrome and navigate to `chrome://extensions`.
3. Toggle "Developer Mode" (top right).
4. Click "Load Unpacked" and select the project folder.

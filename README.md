# 🔥 AI Content Generator

![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=nextdotjs)
![Powered by Gemini](https://img.shields.io/badge/Powered%20by-Gemini-blue?style=for-the-badge&logo=google)
![Styled with Tailwind](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

A smart, template-based content generator built with **Next.js 14 (App Router)** and powered by the **Google Gemini API**. This application provides a seamless, chat-like experience for generating professional-grade content for various platforms, all while maintaining a persistent, client-side history.
---
[Live Demo] (https://ai-content-generator-three-livid.vercel.app/)

## ✨ Features

* **🤖 AI-Powered Content:** Leverages the Google Gemini API (via a secure Next.js API Route) to generate high-quality, contextual content.
* **📋 Template-Driven Generation:** Users can select from pre-defined templates (e.g., "LinkedIn", "E-mail", "Product Advertisement") to get perfectly formatted results.
* **💾 Persistent Chat History:** Automatically saves all conversations (prompt, response, and title) to **`localStorage`**. Your history stays with you, even after closing the browser.
* **🔄 Global State Management:** Uses **React Context API** (`HistoryContext`) to manage and synchronize state between the sidebar and the main chat window efficiently (No prop drilling!).
* **⏱️ Auto-Saving Drafts:** Automatically saves your work-in-progress prompts to `localStorage` after you stop typing (using `use-debounce`) to prevent data loss.
* **🚀 Modern Tech Stack:** Built with the latest Next.js App Router, TypeScript, and styled with Tailwind CSS.

---

## 🛠️ Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **AI:** [Google Gemini API](https://ai.google.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **State Management:** React Context API
* **Utilities:** `use-debounce` (for auto-saving drafts)

---

## 🚀 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

You need to have the following installed on your machine:
* [Node.js](https://nodejs.org/en) (v18 or later)
* npm or yarn

### 1. Clone the Repository

```bash
git clone [https://github.com/Rawan-Amr111/ai-content-generator.git](https://github.com/Rawan-Amr111/ai-content-generator.git)
cd ai-content-generator
```
### 2. Install Dependencies
```bash
npm install
# or
yarn install
```
### 3. Set Up Environment Variables
This project requires a Google Gemini API key to function.

Create a new file named .env.local in the root of your project.

Add your API key to this file:
```bash
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
```
### 4. Run the server
```bash
npm run dev
# or
yarn dev
```
Open http://localhost:3000 with your browser to see the result

### ⚙️ How It Works
This application uses a client-server architecture, all neatly packaged within Next.js.

Client-Side (Page & Sidebar):

The HistoryProvider (React Context) wraps the entire application, holding the history and selectedItem state.
The AppSidebar and Home page (app/page.tsx) both subscribe to this context.
When a user clicks a history item in the sidebar, setSelectedItem is called, and the Home page's useEffect hook catches this change and displays the old chat.

Server-Side (API Route):

When a user submits a prompt, the client sends a POST request to /api/generate.
This API route (running on the server) securely accesses the GEMINI_API_KEY from .env.local.
It uses a masterPromptTemplate to format the user's messy prompt and selected template into a high-quality instruction for the Gemini API.
It parses the AI's response, extracts the content and title, and sends it back to the client.

The Loop Closes:

The client receives the JSON response.
It calls addHistoryItem (from the context) with the new data.
The context updates its state, which triggers a save to localStorage and causes the AppSidebar to re-render instantly with the new chat title.
```bash
git clone [https://github.com/Rawan-Amr111/ai-content-generator.git](https://github.com/Rawan-Amr111/ai-content-generator.git)
cd ai-content-generator

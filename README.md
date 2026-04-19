# Harsh Srivastava | Vibrant Neo-Pop Portfolio

A high-energy, modern digital portfolio featuring a vibrant "Neo-Pop" aesthetic, integrated AI assistance, and professional documentation.

## 🚀 How This Site Was Made

This project was developed using **[Google AI Studio Build](https://ai.studio/build)**, an environment that allows for rapid full-stack iteration through natural language prompting. 

### Core Technologies
- **Framework**: [React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/) for robust, type-safe components.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for a modern utility-first approach.
- **Animations**: [Motion](https://motion.dev/) (formerly Framer Motion) for fluid, physics-based interactions.
- **Icons**: [Lucide React](https://lucide.dev/) for elegant, consistent iconography.
- **AI Intelligence**: Powered by **Google Gemini 1.5 Flash** through the `@google/genai` SDK.
- **Build System**: [Vite](https://vitejs.dev/) for lightning-fast development and optimized production builds.

## ✨ Key Features

### 1. Interactive AI Assistant
The site features a custom-tuned AI representative that knows about my projects, skills, and background. It's designed to respond in an **energetic, punchy, and modern** tone that matches the portfolio's vibrant aesthetic.

### 2. Cartoon Pop / Neo-Brutalist Theme
- **Typography**: Uses **Fredoka** for punchy, fun, and rounded headers, and **Quicksand** for clean but approachable body text.
- **Visual Style**: High-energy **Neo-Brutalism** featuring thick black outlines, stark contrast, and solid, hard-edged drop shadows instead of soft blurs.
- **Accents**: Striking primary colors like **Vibrant Pink (`#FF3366`)**, **Electric Blue (`#00E5FF`)**, and **Flash Yellow (`#FFDE00`)** layered over a warm halftone-style dot background.
- **Responsiveness**: Mobile-first design with fluid typography and tap-optimized interactions.
- **AI Chatbot**: The AI assistant UI has been redesigned to look like an interactive comic book with directional speech bubbles.

### 3. Automated CI/CD
The project uses **GitHub Actions** for automated deployment. Every push to the `main` branch triggers a workflow that:
- Installs dependencies.
- Injects the `GEMINI_API_KEY` from GitHub Secrets at build time for the AI assistant.
- Compiles the React application using Vite.
- Deploys the optimized static assets directly to **GitHub Pages**.

> **Note for GitHub Pages Deployment**: To ensure the AI assistant functions on the live site, you must add your Gemini API key as a repository secret. Go to your GitHub repository -> **Settings** -> **Secrets and variables** -> **Actions** -> **New repository secret**. Name it `GEMINI_API_KEY` and paste your key.

### 4. Functional Contact System
Integrated with [Formspree](https://formspree.io/) to handle contact form submissions directly to my email without requiring a standalone backend server.

### 5. Verified Project Links
My selected works are linked directly to their respective verified repositories on GitHub, including:
- **Project Manna** (Social Impact)
- **Project Sanjeevani** (Healthcare Response)
- **Sentiment Engine** (NLP Pipeline)
- **SAP Labs Case Study** (Interview Documentation)

## 🛠️ Local Development

If you wish to run this project locally:

1. **Clone the repo**:
   ```bash
   git clone https://github.com/harshsri2208/harshsri2208.github.io.git
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up Environment Variables**: Create a `.env` file and add your Gemini API Key. 

   > **How to get a Gemini API Key:**
   > 1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
   > 2. Sign in with your Google account.
   > 3. Click the **"Create API key"** button.
   > 4. Create the key in a New Project or existing Google Cloud project.
   > 5. Copy the generated key.

   ```env
   GEMINI_API_KEY=your_key_here
   ```
4. **Start the dev server**:
   ```bash
   npm run dev
   ```

## 📬 Connect
- **LinkedIn**: [harshsri2208](https://linkedin.com/in/harshsri2208)
- **GitHub**: [harshsri2208](https://github.com/harshsri2208)
- **Email**: harshsri2208@gmail.com

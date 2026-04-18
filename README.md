# Harsh Srivastava | Editorial Portfolio

A high-end, sophisticated digital portfolio featuring an editorial design aesthetic, integrated AI assistance, and professional documentation.

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

### 1. Integrated AI Assistant
The site features a custom-tuned AI representative that knows about my projects, skills, and background. It's designed to respond in an editorial, slightly literary tone that matches the portfolio's "Sophisticated Dark" aesthetic.

### 2. Sophisticated Dark Theme
- **Typography**: A balanced pairing of *Playfair Display* (Serif) for headlines and *Inter* (Sans) for body text.
- **Visual Style**: Minimalist borders, deep charcoal palettes (`#0D0D0D`), and refined beige accents (`#D9C5B2`).
- **Layout**: A fixed navigational sidebar designed for a premium, editorial reading experience.

### 3. Automated CI/CD
The project uses **GitHub Actions** for automated deployment. Every push to the `main` branch triggers a workflow that:
- Installs dependencies.
- Compiles the React application.
- Deploys the optimized static assets directly to **GitHub Pages**.

### 4. Functional Contact System
Integrated with [Formspree](https://formspree.io/) to handle contact form submissions directly to my email without requiring a standalone backend server.

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
3. **Set up Environment Variables**: Create a `.env` file and add your Gemini API Key:
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

<div align="center">
  
# 🤖 Nova AI - Customer Service Assistant

**A modern, conversational AI customer service interface powered by React, Vite, and the Gemini 2.5 Flash API.**

[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Gemini](https://img.shields.io/badge/gemini-8E75B2.svg?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

</div>

---

## ✨ Features

- **🧠 Intelligent Conversations**: Powered by Google's state-of-the-art `gemini-2.5-flash` model.
- **🎨 Modern UI/UX**: A sleek, responsive, and aesthetically pleasing chat interface inspired by industry-leading AI tools. Includes beautiful glassmorphism effects.
- **📱 Fully Responsive**: Seamless experience across mobile and desktop devices with a toggleable sidebar.
- **⚡ Fast & Lightweight**: Built on top of Vite for lightning-fast HMR and optimized builds.
- **🔄 Robust Error Handling**: Built-in automatic retry mechanism for API rate limits and graceful error display.
- **💬 Real-time Typing Indicators**: Enhances the conversational experience, making interactions feel more natural.

## 🛠️ Technology Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Markdown Parsing**: `react-markdown`
- **AI Integration**: Gemini API

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Navigate to the project directory**
   ```bash
   cd "imter 2 proj"
   ```

2. **Install the dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory and add your Gemini API Key:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *(You can get your API key from [Google AI Studio](https://aistudio.google.com/))*

4. **Start the Development Server**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   Navigate to `http://localhost:5173` to see Nova in action!

## 💡 How It Works

Nova is configured with a specific system instruction to act as a helpful, professional, and concise customer service representative. When a user sends a message, the app communicates with the Gemini API. It handles potential API overloads smoothly by employing an automatic retry strategy before informing the user.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

This project is open-source and available under the MIT License.

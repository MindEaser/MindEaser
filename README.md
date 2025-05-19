# 🧠 MindEaser — A Friendly Mental Health Companion for Teens

[![Netlify Status](https://api.netlify.com/api/v1/badges/85a1ee82-d902-4c97-8fef-bcab213b4750/deploy-status)](https://app.netlify.com/projects/mindeaser/deploys)

👉 **Live Site:** [Try MindEaser Now](https://mindeaser.netlify.app/)

MindEaser is a teen-friendly AI-powered mental health web app built to offer emotional support and promote well-being. With an intelligent AI therapist, a simple self-check quiz, and calming mini-games — MindEaser is a safe, private, and peaceful corner of the internet, just for you.

---

## 🌟 Key Features

### 💬 AI Therapist (Powered by LLaMA 3.3 70B Instruct)

* A supportive chatbot for venting, reflection, and emotional connection
* Conversational and teen-friendly tone
* Private and judgment-free

### 🧠 20-Question Self-Check Quiz

* Quick, science-backed questions to help you reflect on your mental state
* Instant feedback and insights

### 🎮 Calming Games & Tools

* Mini-games like breathing bubbles, simple puzzles, and mandala coloring
* Designed to help you relax and focus

### 🎨 Soothing Design

* Soft pastel green and pink color palette
* Fully responsive layout for mobile, tablet, and desktop
* Uses TailwindCSS and Framer Motion for a smooth user experience

---

## 🧪 Tech Stack

| Layer      | Technology                              |
| ---------- | --------------------------------------- |
| Frontend   | Vite, React, TailwindCSS                |
| AI Chat    | LLaMA 3.3 70B Instruct (via OpenRouter) |
| Hosting    | Netlify                                 |
| Animation  | Framer Motion                           |
| State Mgmt | React Hooks                             |

---

## ⚙️ Example `.env` File

To use LLaMA 3.3 70B via OpenRouter, create a `.env` file in your project root:

```env
VITE_OPENROUTER_API_KEY=your_openrouter_key_here
```

You can get an API key at [https://openrouter.ai](https://openrouter.ai)

---

## 🛠 Development Guidelines

* Modify `index.html` and `src/App.jsx` as needed
* Create new folders or files in `src/` directory as needed
* Style components using TailwindCSS utility classes
* Avoid modifying `src/main.jsx` and `src/index.css`
* Only modify `vite.config.js` if absolutely necessary

---

## 🚀 Available Scripts

```bash
npm install       # Install all dependencies
npm run dev       # Run local dev server
npm run lint      # Check code for issues
```

---

## 📦 Deployment

This project is auto-deployed to Netlify. Just push to the main branch to trigger a redeploy.

If you're deploying manually:

```bash
npm run build
# Then drag-and-drop the `dist/` folder to Netlify or connect your repo
```

---

## 📌 Roadmap

* [ ] Add journaling feature with autosave
* [ ] Add secure user authentication (optional)
* [ ] Expand mini-game library

---

## 🤝 Contributing

Want to help improve MindEaser? We'd love your contributions!

```bash
# Fork the repository
git checkout -b feature/your-feature
git commit -m "Add your feature"
git push origin feature/your-feature
# Then create a pull request
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## ⚠️ Disclaimer

> **MindEaser is not a substitute for professional medical advice or therapy.**
> If you're struggling, please seek help from a trusted adult or a mental health professional.

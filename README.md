# Juan Frois — Professional Portfolio

> Modern, interactive portfolio highlighting solutions in Software Engineering, RPA Automation, and Data Intelligence.

---

## 🚀 Overview

This repository contains the source code for Juan de Lucas Frois's professional portfolio. Built with **React 19** and **Vite**, it features custom canvas particle dynamics, scroll-driven interactive energy lines, responsive layouts, and a clean data-driven architecture.

### ✨ Key Features

- **Interactive Canvas Background**: Real-time particle and code matrix animations responding to viewport scrolling.
- **Scroll-Driven Hero**: 400vh scroll trajectory with reactive opacity transitions and orbital energy waveforms.
- **Career Timeline**: Interactive expandable trajectory showcasing experiences at IBM, 99 (DiDi), VOSS Automotive, QuintoAndar, and Loft.
- **Project Showcase**: Bento-style grid with custom layouts, impact metrics, and technology chips.
- **Data-Driven Architecture**: Separation of concerns between UI components and structured JSON data.
- **Accessibility & Performance**: Semantic HTML5, smooth scroll behavior, responsive clamp-based typography, and zero heavy styling dependencies.

---

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Bundler / Dev Server**: [Vite 8](https://vite.dev/)
- **Styling**: Vanilla CSS (CSS Variables, Modern Flexbox & Grid, Glassmorphism, Micro-animations)
- **Linting & Formatting**: [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)
- **Typography**: Outfit, JetBrains Mono, DM Serif Display (Google Fonts)

---

## 📁 Project Architecture

```
professional-page/
├── public/                 # Static public assets
│   ├── curriculos/         # PDF Resumes (EN & PT-BR)
│   └── favicon.svg         # Site favicon
├── src/
│   ├── assets/             # Images and local graphic assets
│   │   └── perfillinkedin.jpeg
│   ├── components/         # Reusable React UI components
│   │   ├── About.jsx       # Biography, metrics, education, and language proficiencies
│   │   ├── BackgroundCanvas.jsx # Interactive particle canvas animation
│   │   ├── Contato.jsx     # Contact info and social profile links
│   │   ├── Cursor.jsx      # Fluid custom cursor
│   │   ├── Footer.jsx      # Semantic footer with navigation links
│   │   ├── Hero.jsx        # Landing hero section with scroll indicators
│   │   ├── Navbar.jsx      # Sticky navigation bar with smooth scroll
│   │   ├── ProjectCard.jsx # Modular project card with hover states
│   │   ├── Projetos.jsx    # Projects grid showcase
│   │   ├── Skills.jsx      # Technical skills categorized by domain
│   │   └── Trajetoria.jsx  # Interactive career timeline
│   ├── data/               # Structured data layer
│   │   ├── experiences.json # Career history and key accomplishments
│   │   ├── profile.json    # Personal info, stats, certifications, and code snippets
│   │   ├── projects.json   # Featured projects, impacts, and technologies
│   │   └── skills.json     # Technical and domain skills
│   ├── App.jsx             # Root layout and scroll coordination
│   ├── index.css           # Global design tokens, typography, and utility classes
│   └── main.jsx            # Application entry point
├── .gitignore              # Git ignore rules for Node, IDEs, and OS
├── .prettierrc             # Code formatting configuration
├── eslint.config.js        # ESLint flat config
├── index.html              # HTML5 entry template with SEO metadata
├── package.json            # Dependencies and npm scripts
└── vite.config.js          # Vite configuration
```

---

## 💻 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/JFrois/professional-page.git
   cd professional-page
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📜 Available Scripts

| Command           | Description                                                           |
| :---------------- | :-------------------------------------------------------------------- |
| `npm run dev`     | Runs the development server with Hot Module Replacement (HMR).        |
| `npm run build`   | Compiles and bundles production-ready assets into the `dist/` folder. |
| `npm run preview` | Locally serves the production build for testing before deployment.    |
| `npm run lint`    | Runs ESLint to verify code quality and style adherence.               |
| `npm run format`  | Runs Prettier across the codebase to ensure consistent formatting.    |

---

## 👤 Author

**Juan de Lucas Frois**

- **Role**: Desenvolvedor de Soluções | Automação RPA | Dados
- **LinkedIn**: [linkedin.com/in/jfrois](https://www.linkedin.com/in/jfrois/)
- **GitHub**: [@JFrois](https://github.com/JFrois)
- **Email**: [contatoJuanFrois@gmail.com](mailto:contatoJuanFrois@gmail.com)

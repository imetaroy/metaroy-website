# Prasant Roy // Personal Brand Website

A world-class, premium, cinematic personal portfolio site built using a modern Astro + React hybrid architecture. Optimized for fast loading speeds, fluid animations, and deployment on Cloudflare Pages.

---

## 🛠️ Tech Stack & Key Integrations

* **Framework:** [Astro](https://astro.build/) (Static Site Generation for near-perfect 100/100 Lighthouse performance)
* **Libraries:**
  * **React** (For rich interactive components hydrated client-side)
  * **TailwindCSS v4** (Modern CSS utility styling configured via Vite)
  * **Framer Motion** (Staggered entrances and spring physics)
  * **GSAP** (Smooth scroll integrations and loader triggers)
  * **Lenis** (Inertial scroll physics synced with GSAP ScrollTrigger)
* **Icons:** [Lucide React](https://lucide.dev/)

---

## 📂 Project Architecture

```bash
├── public/                  # Static assets (favicons, sitemaps, robots configuration)
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap-index.xml
├── src/
│   ├── components/          # Interactive React sections & components
│   │   ├── About.jsx        # Profile highlights and scroll count-up stats
│   │   ├── BackgroundGlow.jsx # Mouse-following cursor highlight and ambient orbs
│   │   ├── Contact.jsx      # Connection triggers and click-to-copy email
│   │   ├── Experience.jsx   # Timeline tracker with impact metrics and details
│   │   ├── Footer.astro     # Static footer
│   │   ├── Hero.jsx         # Entry positioning statement and scroll indicator
│   │   ├── Loader.jsx       # Entry animation loader lock-out
│   │   ├── Navbar.jsx       # Active section tracker with scroll progress indicators
│   │   ├── Philosophy.jsx   # Wide quote panels highlighting systems thinking
│   │   └── Skills.jsx       # Interative competencies domain layout
│   ├── layouts/
│   │   └── Layout.astro     # Core HTML outline, Google Fonts loading, & Lenis + GSAP initialization
│   ├── pages/
│   │   └── index.astro      # Main page assembling and hydrating components
│   └── styles/
│       └── global.css       # Tailwind v4 theme setups, scrollbars, and card stylings
├── astro.config.mjs         # Astro integrations configuration (React & Tailwind vite integration)
├── package.json             # Build commands and installed package dependencies
└── tsconfig.json            # Strict TypeScript configuration
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Local Dev Server
```bash
npm run dev
```
Open [http://localhost:4321](http://localhost:4321) in your browser.

### 3. Build for Production
```bash
npm run build
```
This command compiles the static website and outputs HTML, CSS, and JS bundles to the `dist/` directory.

---

## ☁️ Deployment to Cloudflare Pages

This website is specifically designed for high-performance static hosting on Cloudflare Pages.

### Git-connected Automatic Deployments (Recommended)

1. **Commit and Push to GitHub**:
   Initialize your repository (already done locally) and push the code to a GitHub repository:
   ```bash
   git remote add origin <your-github-repo-url>
   git branch -M main
   git add .
   git commit -m "Initial commit of premium brand website"
   git push -u origin main
   ```

2. **Configure Cloudflare Pages**:
   - Go to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
   - Navigate to **Workers & Pages** > **Create an application** > **Pages** tab.
   - Click **Connect to Git** and authorize your GitHub account.
   - Select your project repository (`metaroy-website`).

3. **Configure Build Settings**:
   Cloudflare Pages will auto-detect Astro settings. Ensure the configuration matches:
   - **Framework preset**: `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   
4. **Environment Variables (Optional)**:
   - In **Environment variables (advanced)**, you can add a variable:
     - Key: `NODE_VERSION`
     - Value: `20` (recommended)

5. **Deploy**:
   - Click **Save and Deploy**. Cloudflare Pages will fetch the code, run the build, and distribute the static assets to edge locations globally.
   - Subsequent pushes to `main` will automatically trigger new builds and deployments.

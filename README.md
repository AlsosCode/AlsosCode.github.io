# Mathias Alsos Paulsen - Portfolio

A modern, minimalistic portfolio website with Apple-OS inspired design, built for GitHub Pages.

**Live Site:** https://alsoscode.github.io/

![Portfolio Preview](https://img.shields.io/badge/status-live-success)
![GitHub Pages](https://img.shields.io/badge/hosted-GitHub%20Pages-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

- **Single-page Design**: Smooth scrolling navigation between sections
- **Light/Dark Mode**: Toggle with preference saved to localStorage, respects system theme
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Apple-OS Aesthetic**: Clean, minimalistic design with glassmorphism effects
- **Contact Form**: Integrated contact form (requires Formspree setup)
- **Accessible**: Keyboard navigation, ARIA labels, semantic HTML
- **Print-Friendly**: Optimized CSS for printing/PDF export
- **Performance**: Vanilla JavaScript, no frameworks, fast load times

## 🚀 Quick Start

### Viewing Locally

1. Clone the repository:
```bash
git clone https://github.com/AlsosCode/AlsosCode.github.io.git
cd AlsosCode.github.io
```

2. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using VS Code
# Install "Live Server" extension and right-click index.html > "Open with Live Server"
```

3. Visit `http://localhost:8000` in your browser

### Deploying to GitHub Pages

This site is already configured for GitHub Pages:

1. Push your changes to the `main` branch
2. Go to Settings → Pages
3. Ensure Source is set to `main` branch
4. Your site will be live at `https://username.github.io/`

## 📝 Customization Guide

### Change Accent Color

Edit the `--accent` variable in [style.css](style.css) (line 13):

```css
:root {
  --accent: #0071e3; /* Change to your preferred color */
}
```

### Update Personal Information

All content is in [index.html](index.html). Look for these sections:

- **Hero Section**: Name, title, and CTA buttons (lines 35-44)
- **About**: Personal bio (lines 47-62)
- **Projects**: Add/edit project cards (lines 65-105)
- **Skills**: Update technologies (lines 108-153)
- **Experience**: Add work history (lines 156-185)
- **Education**: Update academic background (lines 188-206)
- **Contact**: Email and social links (lines 209-281)

### Add More Projects

Copy and paste a project card in the projects section:

```html
<div class="project-card card">
  <h3 class="project-title">Project Name</h3>
  <p class="project-description">Project description...</p>
  <div class="project-tags">
    <span class="tag">Tech 1</span>
    <span class="tag">Tech 2</span>
  </div>
  <div class="project-links">
    <a href="https://github.com/..." class="project-link">GitHub</a>
    <a href="https://..." class="project-link">Live Demo</a>
  </div>
</div>
```

### Setup Contact Form

The contact form requires a backend service. Using **Formspree** (free):

1. Go to https://formspree.io/ and sign up
2. Create a new form
3. Copy your form ID (looks like `xyzabc123`)
4. In [script.js](script.js) line 232, replace `YOUR_FORM_ID`:
   ```javascript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```

**Alternative services:**
- [EmailJS](https://www.emailjs.com/) - Free tier available
- [Netlify Forms](https://www.netlify.com/products/forms/) - If hosting on Netlify
- [Form.io](https://form.io/) - Open-source option

### Add Your CV

Place your CV as `cv.pdf` in the root directory for the "Download CV" button to work.

## 📁 Project Structure

```
AlsosCode.github.io/
├── index.html          # Main HTML file with all content
├── style.css           # All styles with CSS variables
├── script.js           # JavaScript for interactivity
├── README.md           # This file
├── cv.pdf              # Your CV (add this file)
└── images/             # Image assets (optional)
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**:
  - CSS Variables for theming
  - Flexbox & CSS Grid for layouts
  - CSS backdrop-filter for glassmorphism
  - Media queries for responsiveness
- **JavaScript (ES6+)**:
  - IntersectionObserver API for scroll detection
  - LocalStorage for theme persistence
  - Fetch API for form submission
  - No frameworks or dependencies

## 🎨 Design System

### Colors

**Light Mode:**
- Background: `#ffffff`
- Surface: `#f5f5f7`
- Text: `#1d1d1f`
- Accent: `#0071e3`

**Dark Mode:**
- Background: `#000000`
- Surface: `#1d1d1f`
- Text: `#f5f5f7`
- Accent: `#2997ff`

### Typography

System font stack for native OS feel:
```css
font-family: system-ui, -apple-system, BlinkMacSystemFont,
             "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

### Spacing

- Container max-width: `1120px`
- Section padding: `80px` (desktop), `60px` (mobile)
- Border radius: `12px` (large), `8px` (small)

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels for navigation and interactive elements
- Keyboard navigation support (Tab, Enter, Escape)
- Focus visible states with accent color
- Color contrast ratio > 4.5:1
- Respects `prefers-reduced-motion`
- Screen reader friendly

## 📱 Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

**Required features:**
- CSS Variables
- CSS Grid & Flexbox
- IntersectionObserver API
- LocalStorage
- Fetch API

## 📄 License

© 2025 Mathias Alsos Paulsen. All rights reserved.

Feel free to use this template for your own portfolio, but please:
- Remove my personal information
- Update with your own content
- Give credit if you found it helpful

## 🤝 Contributing

This is a personal portfolio, but if you find bugs or have suggestions:

1. Open an issue describing the problem/suggestion
2. Or submit a pull request with improvements

## 📧 Contact

- **Email**: [Mathias.Alsos03@gmail.com](mailto:Mathias.Alsos03@gmail.com)
- **GitHub**: [@AlsosCode](https://github.com/AlsosCode)
- **LinkedIn**: [Mathias Alsos Paulsen](https://www.linkedin.com/in/mathias-alsos-paulsen-43108a204/)

---

Built with ❤️ using vanilla HTML, CSS, and JavaScript. No frameworks, no build tools, just clean code.

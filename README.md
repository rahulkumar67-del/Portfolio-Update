# Rahul's Portfolio (Refactored)

This is a high-performance, accessible, and easy-to-update portfolio site built with React, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

1.  **Install Dependencies:** `npm install`
2.  **Run Dev Server:** `npm start` (or `npm run dev`)
3.  **Build for Production:** `npm run build`

## 📝 How to Update Content

You do **NOT** need to edit HTML components. All content lives in **`src/content.ts`**.

### 1. Adding a Project
Open `src/content.ts` and add an object to the `projects` array:

```typescript
{
  id: "new-project",
  title: "My New Game",
  category: "Game Dev", // Matches filter buttons
  thumb: "/images/thumb.jpg", // Place image in public/images/
  description: "Short description...",
  tags: ["Unity", "C#"],
  year: 2025,
  role: "Lead Dev",
  images: ["/images/screen1.jpg"],
  repo: "https://github.com/..."
}
```

### 2. Adding Services / Experience
Similarly, add objects to the `services` or `experience` arrays in `content.ts`.

### 3. Images
Place all your images in the `public/images/` folder. Reference them in `content.ts` as `/images/filename.jpg`.

## ⚡ Performance Checklist

- [x] **Lazy Loading:** `loading="lazy"` applied to images.
- [x] **Code Splitting:** Content is separated from logic.
- [x] **Zero Runtime Bloat:** Replaced heavy FontAwesome JS with lightweight Tailwind classes or inline SVGs where possible (FontAwesome CDN is kept in HTML for icon codes in JSON, but can be removed if you switch to SVGs completely).
- [x] **Local Storage:** Testimonials are cached locally.
- [x] **Accessibility:** ARIA labels on modals, keyboard navigation support.

## 🌍 Deployment

**Netlify / Vercel:**
1. Connect your GitHub repo.
2. Build command: `npm run build`
3. Publish directory: `dist` (or `build`)

**Static Hosting:**
Run `npm run build` and upload the contents of the `dist` folder to any web host.
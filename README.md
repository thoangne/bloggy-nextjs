# 📝 Bloggy – Next.js + Supabase + TailwindCSS + ShadCN UI

A modern blog platform built with **Next.js 15**, **Supabase**, **TailwindCSS**, and **ShadCN UI**. Features include dynamic content, responsive UI, category filtering, pagination, and full CMS integration.

*Note: This project is for educational purposes only.*
---

## 🚀 Tech Stack

- **Next.js** 15 (App Router, SSR/ISR)
- **React** 19
- **Supabase** – Backend-as-a-Service (PostgreSQL, Auth, Storage)
- **Tailwind CSS** 4 – Utility-first CSS
- **ShadCN UI** – Component library built on Radix
- **Lucide Icons**, **React-Quill**, **DOMPurify**, and more

---

## 📦 Installation

```bash
# Clone project
git clone https://github.com/your-username/bloggy.git
cd bloggy

# Install dependencies
npm install

# Create .env.local
cp .env.example .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```
## 🧪 Development
```bash
npm run dev

Runs the app locally at: http://localhost:3000
```
##📁 Project Structure (App Router)
```bash
/app
  /[slug]
    page.jsx
  /auth
    /login
        page.jsx
    /register
        page.jsx
  /categories
    /[slug]
        page.jsx
    page.jsx
  /dashboard
    /article
        page.jsx
    /profile
        page.jsx
    page.jsx
       
/lib
  supabase.ts
  utils.ts
/styles
  globals.css
```
##Database 
  [drawsql](https://drawsql.app/teams/thoang-nguy/diagrams/bloggy)
##🙌 Credits 
[NextJs](https://nextjs.org/docs)
[Supabase](https://supabase.com/)
[ShadCN UI](https://ui.shadcn.com/)






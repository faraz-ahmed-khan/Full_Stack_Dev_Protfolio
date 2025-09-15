# 🚀 Faraz Ahmed Khan - 3D Animated Portfolio

A stunning, modern portfolio website featuring 3D animations, interactive elements, and smooth transitions. Built with Next.js 14, Three.js, and Framer Motion.

![Portfolio Preview](https://via.placeholder.com/1200x600/0f172a/3b82f6?text=Faraz+Ahmed+Khan+Portfolio)

## ✨ Features

### 🎨 Modern Design
- **3D Animations**: Interactive Three.js elements and floating objects
- **Smooth Scrolling**: Lenis-powered smooth scroll experience
- **Dark Theme**: Beautiful dark theme with gradient accents
- **Glass Effects**: Modern glassmorphism design elements
- **Responsive Design**: Fully responsive across all devices

### 🚀 3D Elements
- **Hero Section**: Animated 3D background with floating geometry
- **Services Cards**: Interactive 3D service previews
- **Portfolio Showcase**: 3D project gallery with hover effects
- **Smooth Transitions**: Page transitions and micro-interactions

### 📱 Sections
- **Hero**: Dynamic typewriter effect with social links
- **About**: Skills showcase with animated progress bars
- **Services**: Interactive service cards for small businesses
- **Portfolio**: 3D project gallery with filtering
- **Blog**: Article showcase with category filtering
- **Contact**: Animated contact form with validation

### 🛠️ Technical Features
- **Next.js 14**: Latest version with App Router
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Advanced animations
- **Three.js**: 3D graphics and animations
- **React Hook Form**: Form validation with Zod
- **SEO Optimized**: Meta tags and structured data

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/farazahmedkhan/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Homepage
│   ├── components/          # React components
│   │   ├── 3d/             # Three.js components
│   │   ├── ui/             # Reusable UI components
│   │   ├── Hero.tsx        # Hero section
│   │   ├── About.tsx       # About section
│   │   ├── Services.tsx    # Services section
│   │   ├── Portfolio.tsx   # Portfolio showcase
│   │   ├── Blog.tsx        # Blog section
│   │   ├── Contact.tsx     # Contact form
│   │   └── Footer.tsx      # Footer
│   ├── lib/                # Utility functions
│   └── data/               # Static data
├── content/                # Blog posts (Markdown)
├── public/                 # Static assets
├── tailwind.config.js      # Tailwind configuration
├── next.config.js          # Next.js configuration
└── package.json           # Dependencies
```

## 🎨 Customization

### Personal Information
Update your details in `src/data/personal.ts`:

```typescript
export const personalInfo = {
  name: 'Your Name',
  title: 'Your Title',
  email: 'your.email@domain.com',
  // ... more details
}
```

### Services
Modify services in `src/data/personal.ts`:

```typescript
export const services = [
  {
    title: 'Your Service',
    description: 'Service description',
    // ... more details
  }
]
```

### Styling
- **Colors**: Customize in `tailwind.config.js`
- **Fonts**: Update font imports in `src/app/layout.tsx`
- **Animations**: Modify in `src/app/globals.css`

## 🛠️ Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

## 📱 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
```bash
npm run build        # Build the project
npm run start        # Start production server
```

## 🎯 Performance Optimizations

- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Next.js Image component
- **3D Lazy Loading**: Dynamic imports for Three.js components
- **Bundle Analysis**: Built-in with Next.js
- **Caching**: Aggressive caching strategies

## 🔧 Configuration

### Environment Variables
Create `.env.local` for sensitive data:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### Email Integration
The contact form uses a simulated email service. To enable real email:

1. Sign up for [EmailJS](https://www.emailjs.com/)
2. Add your credentials to `.env.local`
3. Update the form handler in `src/components/Contact.tsx`

## 🌟 Features in Detail

### 3D Animations
- **Three.js Integration**: Custom 3D scenes and objects
- **Performance Optimized**: Efficient rendering and animations
- **Interactive Elements**: Hover effects and user interactions
- **Mobile Friendly**: Optimized for mobile devices

### Contact Form
- **Form Validation**: Zod schema validation
- **Animated Transitions**: Smooth form interactions
- **Error Handling**: User-friendly error messages
- **Success States**: Clear feedback on form submission

### Blog System
- **Markdown Support**: Write posts in Markdown
- **Category Filtering**: Organize posts by category
- **Reading Time**: Automatic reading time calculation
- **SEO Friendly**: Optimized for search engines

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Three.js Community** - 3D graphics library
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework

## 📞 Support

Need help or have questions?

- **Email**: hello@farazahmedkhan.dev
- **LinkedIn**: [Faraz Ahmed Khan](https://linkedin.com/in/farazahmedkhan)
- **GitHub**: [farazahmedkhan](https://github.com/farazahmedkhan)

---

**Made with ❤️ and ☕ by Faraz Ahmed Khan**

Built with [Next.js](https://nextjs.org/) • Styled with [Tailwind CSS](https://tailwindcss.com/) • Animated with [Framer Motion](https://www.framer.com/motion/)
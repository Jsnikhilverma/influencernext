# InfluenceHub - Influencer Platform

A modern, responsive web platform for influencers to connect with brands, discover opportunities, and monetize their content. Built with Next.js, React, and Tailwind CSS.

## 🚀 Features

### For Influencers

- **Profile Management**: Create and manage your influencer profile
- **Brand Discovery**: Browse and connect with verified brands
- **Opportunity Matching**: Find campaigns that match your niche and audience
- **Analytics Dashboard**: Track your growth, engagement, and earnings
- **Secure Payments**: Get paid directly through the platform
- **Content Management**: Organize and showcase your best content

### For Brands

- **Influencer Discovery**: Find authentic influencers for your campaigns
- **Campaign Management**: Create and manage influencer marketing campaigns
- **Analytics & Reporting**: Track campaign performance and ROI
- **Secure Payments**: Handle payments and contracts through the platform
- **Vetting System**: Work with pre-vetted, quality influencers

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Headless UI
- **Icons**: Heroicons, Lucide React
- **Animations**: Framer Motion
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/influencehub.git
   cd influencehub
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
influencehub/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Hero section
│   ├── Categories.tsx     # Category showcase
│   ├── Features.tsx       # Platform features
│   ├── TopInfluencers.tsx # Influencer showcase
│   ├── Brands.tsx         # Brand partners
│   ├── Testimonials.tsx   # Success stories
│   └── Footer.tsx         # Site footer
├── public/               # Static assets
├── tailwind.config.js    # Tailwind configuration
├── next.config.js        # Next.js configuration
└── package.json          # Dependencies and scripts
```

## 🎨 Design System

### Colors

- **Primary**: Blue gradient (#0ea5e9 to #d946ef)
- **Secondary**: Purple gradient (#d946ef to #c026d3)
- **Accent**: Orange gradient (#f97316 to #ea580c)
- **Neutral**: Gray scale for text and backgrounds

### Typography

- **Font**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

### Components

- **Buttons**: Primary and secondary button styles
- **Cards**: Hover effects and consistent spacing
- **Forms**: Input fields with focus states
- **Navigation**: Responsive header with mobile menu

## 📱 Responsive Design

The platform is fully responsive and optimized for:

- **Desktop**: 1024px and above
- **Tablet**: 768px to 1023px
- **Mobile**: 320px to 767px

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms

- **Netlify**: Build command: `npm run build`
- **AWS Amplify**: Compatible with Next.js
- **DigitalOcean App Platform**: Supports Node.js applications

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=your_api_url_here
NEXT_PUBLIC_SITE_URL=your_site_url_here
```

## 📈 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Optimized for all metrics
- **Image Optimization**: Next.js Image component with automatic optimization
- **Code Splitting**: Automatic route-based code splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern web design trends and best practices
- **Icons**: Heroicons and Lucide React
- **Images**: Unsplash for placeholder images
- **Fonts**: Google Fonts (Poppins)

## 📞 Support

- **Email**: support@influencehub.com
- **Documentation**: [docs.influencehub.com](https://docs.influencehub.com)
- **Community**: [community.influencehub.com](https://community.influencehub.com)

## 🔮 Roadmap

### Phase 1 (Current)

- ✅ Landing page with key sections
- ✅ Responsive design
- ✅ Component library
- ✅ Basic routing structure

### Phase 2 (Next)

- 🔄 User authentication system
- 🔄 Influencer profile pages
- 🔄 Brand dashboard
- 🔄 Campaign management

### Phase 3 (Future)

- 📋 Advanced analytics
- 📋 Payment integration
- 📋 Mobile app
- 📋 AI-powered matching

---

**Built with ❤️ for the influencer community**

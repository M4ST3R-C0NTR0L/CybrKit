# 🚀 CybrKit

<p align="center">
  <strong>Ship your SaaS in days, not months.</strong>
</p>

<p align="center">
  <a href="https://github.com/M4ST3R-C0NTR0L/cybrkit/stargazers">
    <img src="https://img.shields.io/github/stars/M4ST3R-C0NTR0L/cybrkit?style=for-the-badge&color=yellow" alt="Stars" />
  </a>
  <a href="https://github.com/M4ST3R-C0NTR0L/cybrkit/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/M4ST3R-C0NTR0L/cybrkit?style=for-the-badge&color=blue" alt="License" />
  </a>
  <a href="https://nextjs.org">
    <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  </a>
  <a href="https://www.typescriptlang.org">
    <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  </a>
  <a href="https://tailwindcss.com">
    <img src="https://img.shields.io/badge/Tailwind-3.4-cyan?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
  </a>
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> •
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#customization">Customization</a>
</p>

---

## 📸 Screenshot

<p align="center">
  <img src="./public/screenshot.png" alt="CybrKit Screenshot" width="100%" />
</p>

---

## ✨ Features

Everything you need to launch your SaaS product:

### 🔐 Authentication
- [x] NextAuth.js with multiple providers
- [x] Google OAuth integration
- [x] GitHub OAuth integration
- [x] Email magic link authentication
- [x] Protected routes middleware
- [x] Session management

### 💳 Payments
- [x] Stripe subscription management
- [x] Checkout session creation
- [x] Customer portal integration
- [x] Webhook handling for subscription events
- [x] Three-tier pricing (Free/Pro/Enterprise)
- [x] Subscription status tracking

### 🎨 UI/UX
- [x] Modern dark theme design
- [x] Purple/blue gradient accents
- [x] Fully responsive (mobile + desktop)
- [x] shadcn/ui component library
- [x] Dark/light mode toggle
- [x] Premium landing page
- [x] Clean dashboard interface

### 🛠️ Developer Experience
- [x] TypeScript throughout
- [x] Prisma ORM with PostgreSQL
- [x] Tailwind CSS styling
- [x] ESLint + Prettier ready
- [x] Production-ready structure
- [x] Comprehensive documentation

### 📧 Communications
- [x] Resend email integration
- [x] Transactional email support
- [x] Welcome emails
- [x] Subscription notifications

---

## 🚀 Quick Start

Get your SaaS up and running in 4 simple steps:

### 1. Clone & Install

```bash
git clone https://github.com/M4ST3R-C0NTR0L/cybrkit.git
cd cybrkit
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
- Database URL (PostgreSQL)
- NextAuth secret
- OAuth credentials (Google/GitHub)
- Stripe API keys
- Resend API key

### 3. Setup Database

```bash
npx prisma generate
npx prisma db push
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your SaaS! 🎉

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js 14](https://nextjs.org) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) |
| **Components** | [shadcn/ui](https://ui.shadcn.com) |
| **Auth** | [NextAuth.js](https://next-auth.js.org) |
| **Database** | [PostgreSQL](https://www.postgresql.org) |
| **ORM** | [Prisma](https://www.prisma.io) |
| **Payments** | [Stripe](https://stripe.com) |
| **Email** | [Resend](https://resend.com) |
| **Deployment** | [Vercel](https://vercel.com) |

---

## 📦 Project Structure

```
CybrKit/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth routes (login/signup)
│   │   ├── (dashboard)/       # Dashboard routes
│   │   ├── api/               # API routes
│   │   ├── page.tsx           # Landing page
│   │   └── layout.tsx         # Root layout
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── landing/           # Landing page sections
│   │   ├── dashboard/         # Dashboard components
│   │   └── shared/            # Shared components
│   ├── lib/                   # Utility functions
│   └── types/                 # TypeScript types
├── prisma/
│   └── schema.prisma          # Database schema
└── public/                    # Static assets
```

---

## 🚀 Deployment

### Deploy to Vercel (One-Click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/M4ST3R-C0NTR0L/cybrkit)

### Manual Deployment

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `NEXTAUTH_URL` | Your production URL | ✅ |
| `NEXTAUTH_SECRET` | Random secret for JWT | ✅ |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Optional |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | Optional |
| `GITHUB_CLIENT_ID` | GitHub OAuth client ID | Optional |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth secret | Optional |
| `STRIPE_SECRET_KEY` | Stripe secret key | ✅ |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | ✅ |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | ✅ |
| `STRIPE_PRO_PRICE_ID` | Stripe Pro plan price ID | ✅ |
| `STRIPE_ENTERPRISE_PRICE_ID` | Stripe Enterprise price ID | Optional |
| `RESEND_API_KEY` | Resend API key | Optional |
| `EMAIL_FROM` | Sender email address | Optional |

---

## 🎨 Customization

### Branding

1. Update `src/app/page.tsx` with your product name and description
2. Replace `public/logo.svg` with your logo
3. Update colors in `tailwind.config.ts` and `src/app/globals.css`
4. Modify pricing tiers in `src/components/landing/pricing.tsx`

### Database

Edit `prisma/schema.prisma` to add your own models:

```prisma
model Project {
  id        String   @id @default(cuid())
  name      String
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
}
```

Then run:
```bash
npx prisma migrate dev --name add_project
```

### Authentication Providers

Add more OAuth providers in `src/lib/auth.ts`:

```typescript
import DiscordProvider from 'next-auth/providers/discord'

providers: [
  // ...existing providers
  DiscordProvider({
    clientId: process.env.DISCORD_CLIENT_ID!,
    clientSecret: process.env.DISCORD_CLIENT_SECRET!,
  }),
]
```

### Email Templates

Customize emails in your API routes using Resend:

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: process.env.EMAIL_FROM!,
  to: user.email,
  subject: 'Welcome to CybrKit!',
  html: '<p>Your custom email content</p>',
})
```

---

## 📈 Roadmap

- [ ] Team/organization support
- [ ] Role-based access control (RBAC)
- [ ] API key management
- [ ] Webhook management UI
- [ ] Admin dashboard
- [ ] Analytics integration
- [ ] Documentation site template
- [ ] Blog template
- [ ] Multi-language support
- [ ] Mobile app starter (React Native)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read our [Contributing Guide](CONTRIBUTING.md) for more details.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) for the amazing framework
- [shadcn/ui](https://ui.shadcn.com) for the beautiful components
- [Vercel](https://vercel.com) for the deployment platform
- [Stripe](https://stripe.com) for payment processing

---

<p align="center">
  Built by <a href="https://github.com/M4ST3R-C0NTR0L">Cybrflux</a>
</p>

<p align="center">
  ⭐ Star this repo if you found it helpful!
</p>

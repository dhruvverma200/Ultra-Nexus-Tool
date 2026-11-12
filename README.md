# OmniKit - Premium Tools Platform 🚀

A modern, premium SaaS platform offering 100+ tools in one beautiful workspace. Built with React, TypeScript, TanStack Start, Firebase, and Razorpay.

## ✨ Features

### Core Features
- **100+ Premium Tools** - PDF editing, image processing, media conversion, text utilities, developer tools, calculators
- **Free Tier** - 20 operations/day per tool, no watermarks
- **₹1 Trial** - 7 days of unlimited access
- **Pro Plans** - Monthly (₹299) and Annual (₹2,499)
- **Firebase Auth** - Email/password + Google OAuth
- **Razorpay Payments** - Secure payment processing
- **Firestore Database** - Real-time user management
- **Cloud Storage** - Temporary file uploads

### UI/UX
- **Premium Black & White Theme** - OKLCH color space
- **Glassmorphism Effects** - Modern, elegant design
- **Smooth Animations** - Framer Motion powered
- **Responsive Design** - Mobile, tablet, desktop optimized
- **Dark Mode Support** - Built-in dark mode
- **Loading States** - Skeleton loaders everywhere
- **Error Handling** - Comprehensive error pages
- **Accessibility** - WCAG 2.1 compliant

### Dashboard
- **Subscription Management** - View and upgrade plans
- **Usage Tracking** - Monitor daily quotas
- **Profile Settings** - Manage account information
- **Admin Panel** - Role-based access control
- **Payment History** - View all transactions

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, TanStack Router, TanStack Query
- **Styling**: Tailwind CSS 4, Framer Motion
- **UI Components**: Radix UI, shadcn/ui
- **Backend**: Nitro (TanStack Start), Node.js
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Storage**: Firebase Cloud Storage
- **Payments**: Razorpay
- **Forms**: React Hook Form, Zod
- **Notifications**: Sonner
- **Icons**: Lucide React
- **PDF**: pdf-lib

## 📋 Prerequisites

- Node.js 18+
- npm or pnpm
- Firebase project
- Razorpay merchant account

## 🚀 Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/ultra-tool-nexus.git
cd ultra-tool-nexus
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Update `.env` with your credentials:

```bash
# Firebase
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_ADMIN_EMAIL=your_email@example.com

# Razorpay
VITE_RAZORPAY_KEY_ID=your_public_key
RAZORPAY_SECRET_KEY=your_secret_key  # Server-side only
```

### 3. Set Up Firebase

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Email/Password + Google)
3. Create Firestore Database
4. Set up Cloud Storage
5. Copy credentials to `.env`

### 4. Configure Razorpay

1. Create a Razorpay account at [razorpay.com](https://razorpay.com)
2. Get API keys from dashboard
3. Add public key to `.env`
4. Add secret key to server environment (never in .env)

### 5. Set Up Firestore Rules

Replace Firestore rules with:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /subscriptions/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    match /users/{userId}/quotas/{document=**} {
      allow read, write: if request.auth.uid == userId;
    }
    
    match /payments/{document=**} {
      allow read: if request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
  }
}
```

### 6. Start Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 📁 Project Structure

```
src/
├── routes/                 # TanStack Router pages
│   ├── index.tsx          # Landing page
│   ├── auth.tsx           # Auth pages
│   ├── pricing.tsx        # Pricing page
│   ├── dashboard/         # Dashboard pages
│   ├── admin.tsx          # Admin panel
│   ├── tools/             # Tool pages
│   └── api/               # API endpoints
├── components/
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Footer
│   ├── PageShell.tsx      # Layout wrapper
│   ├── ToolCard.tsx       # Tool grid card
│   ├── ui/                # Radix UI components
│   └── skeletons.tsx      # Loading skeletons
├── lib/
│   ├── firebase.ts        # Firebase setup
│   ├── auth-context.tsx   # Auth provider
│   ├── subscription.ts    # Subscription logic
│   ├── razorpay.ts        # Payment utilities
│   ├── tools.ts           # Tools list
│   └── utils.ts           # Helper functions
├── styles.css             # Global styles
└── server.ts              # Server entry
```

## 🔐 Security

### Authentication
- Firebase Auth handles all authentication
- Passwords hashed with bcrypt
- Google OAuth for social login
- Email verification required

### Payments
- Razorpay signature verification
- Server-side payment validation
- Secret key never exposed to client
- PCI DSS compliant

### Data
- All data encrypted in transit (HTTPS)
- Firestore security rules enforce access control
- Files deleted after 1 hour
- No tracking or analytics

## 📚 API Endpoints

### POST /api/razorpay/create-order
Create a Razorpay order for payment

**Request:**
```json
{
  "userId": "user_id",
  "planId": "pro_monthly",
  "amount": 299,
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "orderId": "order_123",
  "key": "rzp_live_key",
  "amount": 29900,
  "currency": "INR"
}
```

### POST /api/razorpay/verify-payment
Verify payment and create subscription

**Request:**
```json
{
  "razorpay_order_id": "order_123",
  "razorpay_payment_id": "pay_123",
  "razorpay_signature": "signature",
  "userId": "user_id",
  "planId": "pro_monthly"
}
```

## 🎨 Theming

The app uses OKLCH color space for superior color management:

- **Light Mode**: Clean whites and subtle grays
- **Dark Mode**: Deep blacks with accent colors
- **Brand Color**: Purple/Violet gradient
- **Accent**: Cyan accent color

Modify colors in `src/styles.css`:

```css
:root {
  --brand: oklch(0.55 0.25 295);
  --accent-cyan: oklch(0.74 0.14 210);
}
```

## 🔄 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "run", "start"]
```

### Environment Variables (Production)

Add to your hosting platform:
- All `VITE_*` variables
- `RAZORPAY_SECRET_KEY`
- Database credentials

## 📊 Monitoring

### Analytics
- Track active users
- Monitor tool usage
- Payment success rates
- Error rates

### Logging
- Server-side logs in Firestore
- Client-side error tracking
- Payment webhook logs

## 🐛 Troubleshooting

### Build Issues
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Firebase Connection
- Verify credentials in `.env`
- Check Firestore security rules
- Enable required APIs in Google Cloud Console

### Payment Issues
- Verify Razorpay credentials
- Check webhook configuration
- Review Razorpay logs

## 📖 Documentation

- [Firebase Docs](https://firebase.google.com/docs)
- [Razorpay Docs](https://razorpay.com/docs)
- [TanStack Router](https://tanstack.com/router/latest)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 💬 Support

- Email: support@omnikit.com
- Discord: [Join our community](#)
- Issues: [GitHub Issues](https://github.com/yourusername/ultra-tool-nexus/issues)

## 🙏 Acknowledgments

- Inspired by Vercel, Stripe, Linear, Notion, Framer, Raycast
- Built with TanStack ecosystem
- Powered by Firebase and Razorpay

---

**Made with ❤️ by the OmniKit team**

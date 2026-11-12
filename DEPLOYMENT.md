# Deployment Checklist

## Pre-Deployment

### Code Quality
- [ ] Run `npm run build` successfully
- [ ] No TypeScript errors: `npm run typecheck`
- [ ] No ESLint warnings: `npm run lint`
- [ ] All tests passing: `npm run test`
- [ ] No console errors in dev mode

### Configuration
- [ ] Environment variables set correctly
- [ ] Firebase credentials valid
- [ ] Razorpay keys configured
- [ ] Admin email set
- [ ] Database rules updated

### Security
- [ ] No secrets in code
- [ ] HTTPS enabled
- [ ] CORS configured properly
- [ ] Firestore rules reviewed
- [ ] Storage rules updated

## Vercel Deployment

### 1. Connect Repository
```bash
# Push to GitHub
git push origin main

# Import on Vercel
# https://vercel.com/new
```

### 2. Configure Environment
Add to Vercel project settings:
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_ADMIN_EMAIL=...
VITE_RAZORPAY_KEY_ID=...
RAZORPAY_SECRET_KEY=...
```

### 3. Deploy
```bash
# Automatic on push to main
# Or manually:
vercel --prod
```

## Firebase Setup

### 1. Create Project
- Go to [Firebase Console](https://console.firebase.google.com)
- Create new project
- Enable Blaze plan (for Cloud Functions)

### 2. Enable Services
- [ ] Authentication (Email/Password + Google)
- [ ] Firestore Database
- [ ] Cloud Storage
- [ ] Cloud Functions (for webhooks)

### 3. Configure OAuth
- Add authorized redirect URIs:
  - `http://localhost:3000`
  - `https://yourdomain.com`
  - `https://yourdomain.com/auth`

### 4. Backup Rules
Export and backup your Firestore rules regularly

## Razorpay Setup

### 1. Create Account
- Sign up at [razorpay.com](https://razorpay.com)
- Complete KYC verification
- Activate merchant account

### 2. Get API Keys
- Go to Settings > API Keys
- Copy Public Key (VITE_RAZORPAY_KEY_ID)
- Copy Secret Key (RAZORPAY_SECRET_KEY)

### 3. Webhook Setup
- Go to Settings > Webhooks
- Add endpoint: `https://yourdomain.com/api/razorpay/webhook`
- Select events:
  - `payment.authorized`
  - `payment.failed`
  - `subscription.halted`
  - `subscription.paused`
  - `subscription.resumed`
  - `subscription.cancelled`

### 4. Test Payments
- Use test cards in test mode
- Verify webhook delivery
- Test error scenarios

## DNS Configuration

### Vercel
```
# Add to DNS provider
Name: yourdomain.com
Type: A
Value: 76.76.19.21

Name: www
Type: CNAME
Value: cname.vercel-dns.com
```

### SSL Certificate
- Automatically provisioned by Vercel (Let's Encrypt)
- Valid for 90 days, auto-renews

## Monitoring

### Vercel
- [ ] Set up project analytics
- [ ] Configure error tracking
- [ ] Set up performance monitoring

### Firebase
- [ ] Enable Cloud Logging
- [ ] Set up Firestore metrics
- [ ] Monitor storage usage

### Razorpay
- [ ] Monitor payment success rates
- [ ] Review failed payments
- [ ] Check webhook delivery logs

## Post-Deployment

### Verification
- [ ] Site loads correctly
- [ ] Auth flow works (signup/signin)
- [ ] Payment flow works (use test card)
- [ ] Tools function properly
- [ ] Admin panel accessible
- [ ] Mobile responsive

### Testing
- [ ] Test signup flow
- [ ] Test payment flow (test mode)
- [ ] Test tool usage
- [ ] Test quota limits
- [ ] Test error pages

### Scaling
- [ ] Monitor Firestore reads/writes
- [ ] Monitor storage usage
- [ ] Monitor cloud function execution
- [ ] Optimize queries if needed

## Rollback

If something goes wrong:

### Vercel
```bash
# Revert to previous deployment
vercel rollback
```

### Database
- Restore from backup
- Check Firestore audit logs

## Maintenance

### Weekly
- [ ] Check error logs
- [ ] Monitor payment success rates
- [ ] Review user feedback

### Monthly
- [ ] Update dependencies
- [ ] Security audit
- [ ] Performance review
- [ ] Cost analysis

### Quarterly
- [ ] Major updates
- [ ] Feature releases
- [ ] Infrastructure review

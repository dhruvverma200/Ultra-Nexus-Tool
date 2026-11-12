# Troubleshooting Guide

## Installation Issues

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Node Version
```bash
# Check version
node --version

# Need 18+? Use nvm
nvm install 18
nvm use 18
```

## Development Issues

### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### Module Not Found
```typescript
// Check path aliases in vite.config.ts
// Should resolve @/ to src/

// Clear cache
rm -rf .vite
npm run dev
```

### TypeScript Errors
```bash
# Check strict mode
npm run typecheck

# Fix types
npm install --save-dev @types/node
```

## Firebase Issues

### Connection Failed
```typescript
// Check credentials in .env
// Verify keys are correct
console.log(import.meta.env.VITE_FIREBASE_PROJECT_ID);

// Check Firestore security rules
// Enable debug mode
setLogLevel('debug');
```

### Firestore Rules Error
```firestore
// Temporarily allow all for testing
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}

// Then restrict appropriately
```

### Storage Upload Fails
```typescript
// Check file size limit
// Firebase default: 5GB per file
// Check CORS configuration

// Enable CORS
gsutil cors set cors.json gs://bucket-name
```

### Auth Not Working
```typescript
// Check enabled providers
// Firebase Console > Authentication > Sign-in method

// Verify redirect URLs
// Firebase Console > Authentication > Authorized domains

// Check localStorage
console.log(localStorage.getItem('firebase:authUser'));
```

## Razorpay Issues

### Payment Not Processing
```typescript
// Verify API keys
console.log(import.meta.env.VITE_RAZORPAY_KEY_ID);

// Check payment status
// Razorpay Dashboard > Payments

// Verify webhook delivery
// Razorpay Dashboard > Webhooks
```

### Signature Verification Failed
```typescript
// Check secret key is correct
// Verify order ID and payment ID match
// Check signature calculation

const expectedSignature = crypto
  .createHmac('sha256', secretKey)
  .update(`${orderId}|${paymentId}`)
  .digest('hex');
```

### Test Card Not Working
```
// Use official test cards
// 4111 1111 1111 1111 (Visa)
// 5555 5555 5555 4444 (Mastercard)
// Any future date for expiry
// Any 3-digit CVV
```

## Performance Issues

### Slow Build
```bash
# Check bundle size
npm run build -- --analyze

# Use esbuild for faster builds
npm run build -- --esbuild
```

### High Firestore Costs
```typescript
// Optimize queries
// Add composite indexes
// Use pagination

// Monitor with Firebase Console
// Set up budget alerts
```

### Slow Page Load
```bash
# Run Lighthouse
npm install -g lighthouse
lighthouse https://yourdomain.com

# Optimize images
# Defer non-critical JS
# Cache aggressively
```

## Deployment Issues

### Vercel Build Fails
```bash
# Check build command
npm run build

# Check environment variables in Vercel
# Verify all VITE_* vars are set

# Review build logs
# https://vercel.com/dashboard/project/settings/environment-variables
```

### Site Returns 404
```bash
# Check vercel.json configuration
# Ensure rewrites are set for SPA

# Verify domain DNS
nslookup yourdomain.com

# Check SSL certificate
https://crt.sh/?q=yourdomain.com
```

### Environment Variables Not Set
```bash
# Vercel doesn't access local .env
# Must add via dashboard or CLI

vercel env pull  # Pull from production
vercel env push  # Push from local
```

## Browser Issues

### Blank Page
```typescript
// Check console for errors
// Open DevTools > Console

// Check network tab
// Look for failed requests

// Clear cache and reload
// Ctrl+Shift+R (hard refresh)
```

### Auth Redirect Loop
```typescript
// Check route configuration
// Verify auth provider is initialized
// Check localStorage for auth state

console.log(localStorage.getItem('firebase:authUser'));
```

### Style Not Applied
```typescript
// Check Tailwind configuration
// Verify classes are in content array

// Clear Tailwind cache
rm -rf .next node_modules/.cache
npm run dev
```

## Debugging Tips

### 1. Use Browser DevTools
- Console: Check for JS errors
- Network: Monitor API calls
- Application: Check localStorage/sessionStorage
- Performance: Profile runtime performance

### 2. Enable Debug Logging
```typescript
// Firebase
import { enableLogging } from 'firebase/firestore';
enableLogging(true);

// React
const logger = (name, delta, phase) => {
  console.log(`${name} (${phase}) took ${delta}ms`);
};
```

### 3. Use React DevTools
- Inspect component props
- Track state changes
- Profile components
- View render times

### 4. Network Throttling
```
// Chrome DevTools > Network
// Throttle to 3G/4G
// Simulate slow connection
```

## Getting Help

### Resources
- [TanStack Docs](https://tanstack.com)
- [Firebase Docs](https://firebase.google.com/docs)
- [Razorpay Docs](https://razorpay.com/docs)
- [Stack Overflow](https://stackoverflow.com)

### Support
- Email: support@omnikit.com
- Discord: [Community Link]
- GitHub Issues: [Report Bug]

## Common Error Messages

### "Firebase: Error (auth/invalid-api-key)"
→ Invalid or missing Firebase API key
→ Check VITE_FIREBASE_API_KEY in .env

### "Uncaught ReferenceError: process is not defined"
→ Using Node module in browser
→ Check import statements
→ Use dynamic imports for server-only code

### "CORS policy: No 'Access-Control-Allow-Origin'"
→ Cross-origin request blocked
→ Configure CORS in Firebase
→ Check API endpoint

### "Firestore: Permission denied"
→ Security rules blocking access
→ Check user authentication
→ Review Firestore rules

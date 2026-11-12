# Development Guide

## Adding New Tools

### 1. Update Tools List

Edit `src/lib/tools.ts`:

```typescript
export const TOOLS = [
  {
    slug: 'my-new-tool',
    name: 'My New Tool',
    description: 'Description here',
    category: 'text',
    icon: 'Wand2',
    implemented: true,
    freeLimit: 10,
  },
];
```

### 2. Create Tool Page

Create `src/routes/tools/my-new-tool.tsx`:

```typescript
import { createFileRoute } from '@tanstack/react-router';
import { PageShell } from '@/components/PageShell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useState } from 'react';
import { canUseFree, incrementQuota } from '@/lib/subscription';
import { useAuth } from '@/lib/auth-context';

export const Route = createFileRoute('/tools/my-new-tool')(() => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleProcess = async () => {
    if (!user) {
      toast.error('Please sign in');
      return;
    }

    const canUse = await canUseFree(user.uid, 'my-new-tool', 10);
    if (!canUse) {
      toast.error('Daily limit reached. Upgrade to Pro.');
      return;
    }

    setLoading(true);
    try {
      // Your tool logic here
      await incrementQuota(user.uid, 'my-new-tool', 10);
      toast.success('Done!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell>
      <div className="container mx-auto px-4 py-10">
        <h1 className="font-display text-3xl font-bold">My New Tool</h1>
        <Card className="mt-8 p-8">
          <Button onClick={handleProcess} disabled={loading}>
            Process
          </Button>
        </Card>
      </div>
    </PageShell>
  );
});

export default Route.component;
```

## Styling Guidelines

### Colors
```typescript
// Brand colors
className="text-brand"            // Primary brand color
className="bg-gradient-brand"     // Brand gradient
className="text-brand-foreground" // Text on brand

// Status colors
className="text-success"  // Success/positive
className="text-destructive" // Error/negative
className="text-muted-foreground" // Secondary text
```

### Spacing
```typescript
// Use Tailwind spacing
className="p-4" // Padding
className="m-4" // Margin
className="gap-4" // Gap between flex items
```

### Typography
```typescript
className="font-display" // Headings (Space Grotesk)
className="font-sans" // Body text (Inter)
```

## Component Patterns

### Forms
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
});

const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});
```

### Auth Protected Pages
```typescript
const { user, loading } = useAuth();

if (loading) return <Spinner />;
if (!user) return navigate({ to: '/auth' });
```

### Async Operations
```typescript
const [loading, setLoading] = useState(false);

const handleAction = async () => {
  setLoading(true);
  try {
    // Your logic
    toast.success('Success!');
  } catch (err: any) {
    toast.error(err.message);
  } finally {
    setLoading(false);
  }
};
```

## Performance Tips

### Code Splitting
```typescript
import { lazy, Suspense } from 'react';
const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Skeleton />}>
  <HeavyComponent />
</Suspense>
```

### Query Optimization
```typescript
const { data } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => getUser(userId),
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

### Image Optimization
```typescript
// Use Radix Avatar for user images
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
```

## Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

## Debugging

### React DevTools
```bash
# Install extension
# Available for Chrome, Firefox, Safari
```

### Firebase Emulator
```bash
npm install -g firebase-tools
firebase emulators:start
```

## Common Issues

### Hydration Mismatch
- Check server/client rendering differences
- Use `suppressHydrationWarning` carefully

### CORS Issues
- Configure CORS in Firebase
- Set proper headers in API responses

### Route Not Found
- Ensure route file is in `src/routes/`
- Check file naming conventions

## Resources

- [TanStack Router Docs](https://tanstack.com/router/latest)
- [React Patterns](https://patterns.dev/posts/react-patterns/)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)

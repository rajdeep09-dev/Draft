# Deployment Checklist

## Pre-Deployment Verification

### Project Structure
- [x] `src/app/layout.tsx` - Root layout with metadata
- [x] `src/app/page.tsx` - Home page with content
- [x] `src/styles/` - All CSS files imported
- [x] `src/lib/` - Utility functions and helpers
- [x] `public/fonts/` - All custom fonts copied
- [x] `public/images/` - All image assets copied
- [x] `public/scripts/` - Animation libraries ready
- [x] `package.json` - Dependencies configured
- [x] `tsconfig.json` - TypeScript configured
- [x] `next.config.js` - Next.js configured
- [x] `.gitignore` - Proper git ignores set

### Code Quality
- [x] No TypeScript errors
- [x] No ESLint warnings (run `npm run lint`)
- [x] No console errors in development
- [x] Page loads without 404 errors
- [x] All routes accessible

### Assets Verification
- [x] Fonts loading: Check Network tab for WOFF2 files
- [x] Images loading: Check `/public/images/` directory
- [x] Scripts loaded: Check `/public/scripts/` for animation libraries
- [x] CSS files imported: Check `src/styles/` directory
- [x] No broken image links: Test with network throttling

### Performance
- [x] Build completes successfully: `npm run build`
- [x] No build warnings: Check terminal output
- [x] Production bundle optimized: Check Next.js output
- [x] Page loads in reasonable time: <3 seconds LCP
- [x] No memory leaks: Check DevTools Memory tab

### Testing Checklist
- [x] Home page loads
- [x] Fonts display correctly
- [x] Images render properly
- [x] Scripts execute without errors
- [x] Responsive design works (test on mobile, tablet)
- [x] Dark mode theme functioning
- [x] Light mode theme functioning
- [x] All links functional
- [x] Forms submit correctly
- [x] Analytics scripts initialize

## Deployment Steps

### 1. Vercel Deployment (Recommended)

```bash
# Option A: Using Vercel CLI
vercel deploy

# Option B: Connect GitHub repository
# 1. Push code to GitHub: rajdeep09-dev/Draft
# 2. Go to https://vercel.com/new
# 3. Import repository
# 4. Configure build settings (should auto-detect Next.js)
# 5. Deploy
```

### 2. Environment Variables Setup

```bash
# Add to Vercel dashboard or .env.production
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA_ID=G-XXXXXXX
```

### 3. Domain Configuration

1. Go to Vercel Dashboard → Project Settings
2. Add custom domain: `www.trydraftt.com`
3. Configure DNS records:
   - A record: `76.76.19.165`
   - CNAME record: `cname.vercel-dns.com`
4. Wait for DNS propagation (up to 24 hours)

### 4. SSL Certificate

- Vercel automatically provides free SSL via Let's Encrypt
- Certificate should be provisioned within minutes
- Verify HTTPS works: `https://www.trydraftt.com`

## Post-Deployment Verification

### URL Testing
- [ ] `https://www.trydraftt.com` loads successfully
- [ ] Redirect from `https://trydraftt.com` works
- [ ] Mobile version accessible and responsive
- [ ] No 404 errors on main page

### Functionality Testing
- [ ] Hero section displays correctly
- [ ] Images load without 404 errors
- [ ] Custom fonts render properly
- [ ] Animations play on scroll
- [ ] Form submission works
- [ ] Links navigate correctly
- [ ] Mobile menu toggles properly
- [ ] Theme switcher works (if applicable)

### Performance Testing
- [ ] Page Speed Insights score > 75
- [ ] Lighthouse performance report good
- [ ] Core Web Vitals healthy:
  - LCP < 2.5 seconds
  - FID < 100 milliseconds
  - CLS < 0.1
- [ ] No console errors in production
- [ ] No 404 errors in network tab

### SEO Testing
- [ ] Meta tags present in page source
- [ ] Open Graph tags configured correctly
- [ ] Twitter Card tags working
- [ ] Canonical URL set correctly
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`

### Security Testing
- [ ] No sensitive data in environment variables
- [ ] API keys secured (if applicable)
- [ ] CORS headers configured correctly
- [ ] CSP headers set appropriately
- [ ] Security headers present:
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY
  - Strict-Transport-Security: enabled

### Analytics Testing
- [ ] Google Analytics tracking working
- [ ] Google Tag Manager initialized
- [ ] Facebook Pixel firing (if configured)
- [ ] Custom events logging correctly

## Rollback Procedure

If issues occur after deployment:

```bash
# Option 1: Revert to previous deployment on Vercel
# Dashboard → Deployments → Select previous version → Promote to Production

# Option 2: Revert Git commits
git revert HEAD
git push origin main

# Option 3: Manual rollback
vercel rollback
```

## Monitoring Post-Deployment

### Daily Checks (First Week)
- Monitor error logs on Vercel dashboard
- Check page performance metrics
- Verify analytics data flowing correctly
- Test user interactions and forms

### Weekly Checks (Ongoing)
- Review Vercel analytics and metrics
- Check for any error patterns
- Monitor page speed trends
- Review user feedback and issues

### Monthly Checks (Ongoing)
- Full regression testing
- Security scanning
- Performance optimization review
- SEO audit

## Rollout Timeline

- **T+0 hours**: Deployment to staging
- **T+1 hours**: QA testing and verification
- **T+2 hours**: Deploy to production
- **T+3 hours**: Monitor error rates and performance
- **T+24 hours**: Full regression testing
- **T+7 days**: Weekly performance review

## Support Contacts

- **Vercel Support**: https://vercel.com/help
- **GitHub Issues**: Create issue in repository
- **Email**: [support email if applicable]

## Final Sign-Off

- [ ] All checklist items completed
- [ ] Project manager approval
- [ ] Development team sign-off
- [ ] QA sign-off
- [ ] Ready for production deployment

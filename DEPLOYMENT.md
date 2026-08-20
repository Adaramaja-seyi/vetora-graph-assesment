# 🚀 Deployment Guide

This guide walks you through deploying Vetora AI to Vercel (recommended) or other platforms.

---

## Option 1: Vercel (Recommended - 5 minutes)

Vercel is built by the creators of Next.js and offers the best deployment experience.

### Step 1: Commit Your Code

```bash
# Check current status
git status

# Add all changes
git add .

# Commit with a clear message
git commit -m "Ready for deployment - Vetora AI veterinary knowledge graph"

# Push to GitHub
git push origin main
```

### Step 2: Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and choose "Continue with GitHub"
3. Authorize Vercel to access your GitHub account

### Step 3: Import Your Project

1. Click "Add New..." → "Project"
2. Select your `vetora-graph` repository
3. Vercel will auto-detect Next.js settings ✅
4. **Don't click Deploy yet!** First, add environment variables ⬇️

### Step 4: Configure Environment Variables

In the "Environment Variables" section, add these three variables:

| Name | Value |
|------|-------|
| `COGNODB_URI` | `bolt+s://your-instance-id.databases.cognodb.cloud` |
| `COGNODB_USERNAME` | `cognodb` |
| `COGNODB_PASSWORD` | Your actual CognoDB password |

**Where to find these?**
- Copy from your `.env.local` file
- Or get them from [console.cognodb.com](https://console.cognodb.com)

**Important**: Make sure you select "All Environments" (Production, Preview, Development)

### Step 5: Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes for the build to complete
3. You'll get a live URL like: `https://vetora-graph-xyz123.vercel.app`

### Step 6: Test Your Deployment

Visit your live URL and test:
- ✅ Home page loads
- ✅ Select species and symptoms
- ✅ Click "Diagnose" - check if results appear
- ✅ Click on a disease - verify graph visualization works

**If you see "Failed to connect to CognoDB":**
- Check environment variables are set correctly
- Verify your CognoDB instance is running
- Check the Vercel deployment logs

### Step 7: Update README

Add your live URL to the README:

```bash
# Edit README.md and update these lines:
# **Live Demo**: [https://your-actual-url.vercel.app](https://your-actual-url.vercel.app)
# **Project Link**: [https://github.com/yourusername/vetora-graph](https://github.com/yourusername/vetora-graph)

git add README.md
git commit -m "Add live demo URL"
git push
```

Vercel will auto-redeploy when you push to `main` branch.

---

## Option 2: Railway

1. Sign up at [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variables in the "Variables" tab
5. Railway will build and deploy automatically

---

## Option 3: Render

1. Sign up at [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Set:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Add environment variables
6. Click "Create Web Service"

---

## Option 4: Netlify

1. Sign up at [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repo
4. Netlify auto-detects Next.js
5. Add environment variables
6. Deploy

---

## 📸 Taking Screenshots

After deployment, capture these screenshots for your README:

### Using Browser (macOS)
```bash
# Full page screenshot in Chrome/Edge/Safari
# Press Cmd + Shift + 5, select area, save to docs folder
```

### What to capture:

1. **Home page** (`screenshot-home.png`):
   - Show the diagnosis form with species and symptom selection
   - Capture the header and hero section

2. **Results page** (`screenshot-results.png`):
   - Select a species and symptoms, click Diagnose
   - Capture the ranked results with match percentages
   - Show the "Top Match" card highlighted

3. **Disease detail page** (`screenshot-disease-detail.png`):
   - Click on a disease from results
   - Show disease info with species and symptoms
   - Scroll to show the similar diseases section

4. **Knowledge graph** (`screenshot-graph.png`):
   - On the disease detail page, capture the interactive graph
   - Show the Species-Disease-Symptom node connections
   - Make sure the graph is zoomed appropriately

### Save screenshots:
```bash
# Move screenshots to docs folder
mv ~/Desktop/screenshot-*.png docs/

# Update README image paths if needed
# Then commit
git add docs/*.png
git commit -m "Add application screenshots"
git push
```

---

## 🎥 Recording a Demo Video (Optional but Recommended)

### Using QuickTime (macOS)
1. Open QuickTime Player
2. File → New Screen Recording
3. Click record button
4. Record a 2-3 minute walkthrough

### What to show:
1. **Opening** (5 seconds): Show the home page
2. **Diagnosis flow** (45 seconds):
   - Select "Dog" as species
   - Check "Vomiting", "Diarrhea", "Fever"
   - Click "Diagnose"
   - Show results ranked by match percentage
3. **Disease details** (45 seconds):
   - Click on "Parvovirus" (top match)
   - Show disease description, affected species, symptoms
   - Scroll to knowledge graph
4. **Graph interaction** (30 seconds):
   - Zoom and pan the graph
   - Show the node connections
   - Scroll to similar diseases section
5. **Similar diseases** (15 seconds):
   - Show similar diseases based on symptom overlap
   - Click on a similar disease

### Export and upload:
- Export as .mp4
- Upload to YouTube (Unlisted) or Loom
- Add link to README: `**Demo Video**: [Watch here](your-video-url)`

---

## 🔍 Troubleshooting

### Build fails on Vercel

**Error: "Module not found"**
```bash
# Make sure all dependencies are in package.json
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

**Error: "Environment variables not defined"**
- Double-check you added all three variables in Vercel dashboard
- Variable names are case-sensitive: `COGNODB_URI`, not `cognodb_uri`

### Database connection fails

**Error: "Failed to connect to CognoDB"**
1. Check your CognoDB instance is running at [console.cognodb.com](https://console.cognodb.com)
2. Verify the URI format: `bolt+s://instance-id.databases.cognodb.cloud`
3. Test locally first: `npm run dev` and visit diagnosis page

**Error: "No data found"**
- Make sure you ran the seed script: `npm run seed`
- Check CognoDB console to verify data exists

### Performance issues

If the app is slow:
- CognoDB free tier has limited resources (0.5 vCPU, 256 MB RAM)
- This is expected and fine for a demo
- In production, upgrade to a larger instance

---

## ✅ Pre-Submission Checklist

Before submitting to Wexa AI:

- [ ] Code pushed to GitHub (public or private with access granted)
- [ ] Deployed to Vercel (or other platform)
- [ ] Live demo URL works and loads correctly
- [ ] CognoDB environment variables configured
- [ ] Database seeded with sample data
- [ ] All features working:
  - [ ] Symptom-based diagnosis
  - [ ] Ranked results display
  - [ ] Disease detail pages
  - [ ] Knowledge graph visualization
  - [ ] Similar diseases section
- [ ] README.md complete with:
  - [ ] "Why a graph database?" section
  - [ ] Data model diagram
  - [ ] Setup instructions
  - [ ] Cypher queries explained
  - [ ] Live demo URL
  - [ ] Screenshots
- [ ] Screenshots taken and added to README
- [ ] Demo video recorded (optional but recommended)
- [ ] `.env.local` NOT committed to git (security ✅)

---

## 📧 Submission

Send to: **hr@wexa.ai**

**Email subject**: `Technical Assessment Submission - [Your Name]`

**Email body**:
```
Hi Wexa Team,

I've completed the graph database technical assessment.

Project: Vetora AI - Veterinary Disease Diagnosis Assistant

🔗 GitHub Repository: https://github.com/yourusername/vetora-graph
🚀 Live Demo: https://vetora-graph-xyz.vercel.app
🎥 Demo Video: [Optional: your video link]

The application uses CognoDB to power a veterinary knowledge graph with:
- Multi-hop graph traversals for symptom-based diagnosis
- Disease similarity analysis using Jaccard coefficient
- Interactive graph visualization with React Flow
- 5 Cypher queries including complex bidirectional pattern matching

All requirements completed:
✅ Graph data model with documented schema
✅ Real seed data with loading script
✅ Multi-hop traversals and graph-appropriate queries
✅ Parameterized Cypher queries
✅ Functional web application with polished UI
✅ Environment variables properly managed
✅ Comprehensive README with "Why graph?" section
✅ Hosted demo and screenshots

Thank you for the opportunity!

Best regards,
[Your Name]
```

---

**Good luck with your submission! 🎉**

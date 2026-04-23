# Video URLs - Updated & Guide

## ✅ Videos Have Been Fixed

All video URLs in the following sections have been replaced with working, publicly available YouTube videos:

### 1. **Parent Awareness Section**
- ✅ Understanding Autism (2 videos)
- ✅ Communication Strategies (2 videos)
- ✅ Emotional Regulation (2 videos)
- ✅ Behavioral Support (2 videos)
- ✅ Supporting Independence (2 videos)
- ✅ Helpful Resources (1 video)

**Location**: `src/pages/parent/AutismAwareness.tsx` (Lines 15-38)

### 2. **Kids Story Generator**
- ✅ Kindness Stories (2 videos)
- ✅ Honesty Stories (2 videos)
- ✅ Teamwork Stories (2 videos)
- ✅ Patience Stories (2 videos)
- ✅ Bravery Stories (2 videos)

**Location**: `src/pages/kids/StoryGenerator.tsx` (Lines 33-54)

---

## 📺 How Videos Are Embedded

Videos use YouTube's embed format:
```
https://www.youtube.com/embed/{VIDEO_ID}
```

Example: `https://www.youtube.com/embed/fsKL2JvwIQg`

---

## 🔧 If Videos Still Don't Show

If you see "Video unavailable" messages, it could be due to:

1. **Regional Restrictions** - Video not available in your region
2. **Private Videos** - Video made private by uploader
3. **Deleted Videos** - Video removed from YouTube
4. **Restricted Content** - Video has age restrictions or embedding disabled

### Solution: Replace with Your Own Videos

You can replace any video URL with your own choice:

#### Find Videos on YouTube
1. Go to https://www.youtube.com
2. Search for topic (e.g., "autism education")
3. Find a public video
4. Copy the URL: `https://www.youtube.com/watch?v=VIDEO_ID`
5. Extract just the `VIDEO_ID` part
6. Use in embed: `https://www.youtube.com/embed/VIDEO_ID`

#### Update in Code

**For Parent Awareness Videos**:
```tsx
// File: src/pages/parent/AutismAwareness.tsx
const videosMap = {
  understandingAutism: [
    { 
      title: "Your Title", 
      url: "https://www.youtube.com/embed/YOUR_VIDEO_ID", 
      description: "Your description" 
    },
    // ...
  ],
};
```

**For Story Videos**:
```tsx
// File: src/pages/kids/StoryGenerator.tsx
const storyVideos = {
  kindness: [
    { 
      title: "Your Title", 
      url: "https://www.youtube.com/embed/YOUR_VIDEO_ID", 
      description: "Your description" 
    },
    // ...
  ],
};
```

---

## 📝 Recommended Video Sources

For reliable videos, look for channels that have:
- ✅ Public/shareable videos
- ✅ Embedding enabled
- ✅ No region restrictions
- ✅ Educational content

### Good Channel Examples:
- **TED-Ed** - Educational explanations
- **Sesame Street** - Children's content
- **Khan Academy** - Learning videos
- **Crash Course Kids** - Educational series
- **Mental Floss** - Interesting facts
- **Kurzgesagt** - Animated explanations

---

## ✅ How to Test Videos

After making changes:

1. Save the file
2. Run: `npm run build`
3. Test locally at: `http://localhost:8080`
4. Navigate to the page with videos
5. Verify videos load and play

---

## 🔍 Checking If a Video Works

Before adding a YouTube video to the app:

1. **Find the video URL**:
   ```
   https://www.youtube.com/watch?v=dQSYc8tz-5o
   ```

2. **Extract the ID** (after `v=`):
   ```
   dQSYc8tz-5o
   ```

3. **Test the embed URL**:
   ```
   https://www.youtube.com/embed/dQSYc8tz-5o
   ```

4. **Visit the embed URL** in browser to verify it works
5. If it shows the video, it will work in the app!

---

## 📋 Current Video Setup

### Parent Awareness Section
File: `src/pages/parent/AutismAwareness.tsx`

```tsx
const videosMap = {
  // Understanding Autism (2 videos)
  understandingAutism: [
    { title: "What is Autism?", url: "https://www.youtube.com/embed/fsKL2JvwIQg", description: "..." },
    { title: "Autism Explained", url: "https://www.youtube.com/embed/V-ANcml9tEY", description: "..." },
  ],
  
  // Communication Strategies (2 videos)
  communicationStrategies: [
    { title: "Communication Tips", url: "https://www.youtube.com/embed/tZo0R_XU8l4", description: "..." },
    { title: "Social Communication Skills", url: "https://www.youtube.com/embed/P3FP5a0eP1I", description: "..." },
  ],
  
  // ... (more sections)
};
```

### Story Generator Section
File: `src/pages/kids/StoryGenerator.tsx`

```tsx
const storyVideos = {
  // Kindness (2 videos)
  kindness: [
    { title: "The Greatest Commandment - Kindness", url: "https://www.youtube.com/embed/LDf2ZsNpkMY", description: "..." },
    { title: "Kindness Boomerang", url: "https://www.youtube.com/embed/xRRQAJGtzag", description: "..." },
  ],
  
  // ... (more themes)
};
```

---

## 🚀 Video Availability Best Practices

1. **Use Popular Videos** - Well-known videos are less likely to be removed
2. **Check Regularly** - Verify videos work periodically
3. **Have Backups** - Consider having 2-3 videos per topic
4. **Use Trusted Channels** - Stick with established educational channels
5. **Embed Responsibly** - Only embed videos you have permission to use

---

## 📊 Summary

**Total Videos**: 21 videos across all sections
- Parent Awareness: 11 videos (6 topics)
- Kids Stories: 10 videos (5 themes)

**Status**: ✅ All URLs have been updated to working videos

**Next Step**: If issues persist, use the replacement guide above to add your own videos!

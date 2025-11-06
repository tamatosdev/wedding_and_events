# Assets Directory

This directory contains image assets for the Wedding & Events website.

## Required Images

### Logo
- **logo-new.png** - New logo file (should be ~150x48px or similar aspect ratio)
  - Currently referenced in: `components/Header.tsx`
  - Placeholder location: `/public/assets/logo-new.png`

### Channel Images
- **channel1.jpg** - Channel 1 featured image
- **channel2.jpg** - Channel 2 featured image
- **channel3.jpg** - Channel 3 featured image
- **channel4.jpg** - Channel 4 featured image
- **channel5.jpg** - Channel 5 featured image

All channel images should be:
- High quality (at least 1920x1080px recommended)
- Optimized for web (compressed)
- Related to wedding venues/channels

### Current Status
- ⚠️ All images are placeholders and need to be replaced with actual assets
- 📝 Search codebase for `TODO:` comments to find all image references
- 🖼️ Use placeholder-image.jpg from `/public/` as temporary fallback

## Image Optimization Guidelines

1. **Format**: Use JPEG for photos, PNG for logos with transparency
2. **Size**: Compress images before uploading (use tools like TinyPNG, ImageOptim)
3. **Dimensions**: 
   - Channel images: 1920x1080px (16:9 aspect ratio)
   - Logo: 150x48px or scalable vector format
4. **Naming**: Use lowercase with hyphens (e.g., `channel-1.jpg`)

## Next Steps
1. Add logo-new.png to this directory
2. Add channel1.jpg through channel5.jpg
3. Update image paths in code if naming differs
4. Test all pages to ensure images load correctly


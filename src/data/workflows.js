export const workflowsList = [
  {
    id: 'optimize-web-image',
    icon: '🚀',
    title: 'Optimize Image for Web',
    desc: 'The fastest route to make an image web-ready and reduce loading times.',
    steps: [
      { toolId: 'image-resizer', action: 'Resize the image to your desired display dimensions.' },
      { toolId: 'image-compressor', action: 'Compress the resized image to reduce file size.' },
      { toolId: 'image-base64', action: 'Convert to Base64 to embed directly in your HTML/CSS.' }
    ]
  },
  {
    id: 'secure-pdf-email',
    icon: '🔒',
    title: 'Secure & Compress PDF for Email',
    desc: 'Prepare a confidential PDF document to be sent safely via email.',
    steps: [
      { toolId: 'merge-pdf', action: 'Combine all your documents into one single PDF.' },
      { toolId: 'compress-pdf', action: 'Compress the merged PDF so it meets email size limits.' },
      { toolId: 'pdf-security', action: 'Add a password so only authorized people can open it.' }
    ]
  },
  {
    id: 'create-social-post',
    icon: '📱',
    title: 'Create Social Media Post',
    desc: 'Generate the perfect caption, hashtags, and visual assets for your post.',
    steps: [
      { toolId: 'social-post-generator', action: 'Generate a catchy caption using AI.' },
      { toolId: 'hashtag-generator', action: 'Find trending hashtags for maximum reach.' },
      { toolId: 'social-resizer', action: 'Resize your image perfectly for Instagram or Twitter.' }
    ]
  },
  {
    id: 'extract-text-data',
    icon: '🔍',
    title: 'Extract Data from Image',
    desc: 'Pull text or data from a scanned document or photo.',
    steps: [
      { toolId: 'image-to-text', action: 'Use OCR to extract readable text from the image.' },
      { toolId: 'json-formatter', action: 'Format the extracted data if it is in JSON format.' }
    ]
  }
];

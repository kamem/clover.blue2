export const jsonld = {
  "@context": 'http://schema.org',
  "@type": 'website',
  "name":process.env.TITLE,
  "description": process.env.DESCRIPTION,
  "headline": process.env.TITLE,
  "inLanguage": 'jp',
  "url": `https://${process.env.TITLE}/`,
  "image": {
    "@type": "ImageObject",
    "url": `https://${process.env.TITLE}/icons/144.png`,
    "width": 144,
    "height": 144
  },
  "publisher": {
    "@type": "Organization",
    "name": process.env.TITLE,
    "logo": {
      "@type": "ImageObject",
      "url": `https://${process.env.TITLE}/icons/144.png`
    }
  },
  "author": {
    "@type": 'Person',
    "name": process.env.AUTHOR_NAME
  },
}
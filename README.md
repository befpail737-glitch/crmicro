# CRMICRO Distributor Website

## Overview
This is a static website for LiTong Electronics, an authorized distributor for CR Micro (CRMICRO) power semiconductors. The site features product information, solutions, technical support, and company details.

## Site Structure
- `/` - Homepage
- `/products/` - Product categories (MOSFETs, IGBTs, Power ICs, etc.)
- `/solutions/` - Industry solutions (EV charging, power inverters, etc.)
- `/support/` - Technical resources and articles
- `/news/` - Company and industry news
- `/about/` - Company information
- `/contact/` - Contact information and global sales network

## Features
- Fully responsive design
- Comprehensive SEO implementation
- Structured data markup
- Technical articles and resources
- Product information and specifications
- Solutions for various industries

## Technology Stack
- HTML5
- CSS3
- SVG graphics
- JSON-LD structured data

## Deployment

### Cloudflare Pages Deployment

1. **Connect your GitHub repository** to Cloudflare Pages
2. **Set build configuration:**
   - Build command: `echo "Build not required for static site"`
   - Build output directory: `./`
3. **Environment variables (if needed):**
   - None required for this static site

### Manual Deployment
1. Copy all files from this directory to your web server
2. Ensure the following directory structure is maintained:
   ```
   / (root)
   ├── index.html
   ├── css/
   │   └── style.css
   ├── js/
   ├── images/
   ├── svg/
   ├── products/
   ├── solutions/
   ├── support/
   ├── news/
   ├── about/
   ├── contact/
   └── sitemap.xml
   ```

### Configuration Files
- `sitemap.xml` - Complete sitemap for SEO
- `_headers` - HTTP headers configuration (if needed)
- `_redirects` - URL redirect rules (if needed)

## SEO Features
- Meta tags on all pages
- Open Graph and Twitter Card tags
- Structured data (JSON-LD)
- Breadcrumb navigation
- Canonical URLs
- Mobile-optimized content

## Performance
- Optimized images and assets
- Minimal JavaScript
- Efficient CSS
- Gzip compression ready

## Support
For technical issues with the website, please contact the site administrator.

## Updates
To add new content:
1. Create new HTML pages following the existing template structure
2. Update the navigation menu in all relevant files
3. Update the sitemap.xml if adding new major pages
4. Add appropriate meta tags and structured data

## License
This website is proprietary to LiTong Electronics. All content is copyrighted.
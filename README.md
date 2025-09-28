# 🦊 FOXSEEK - Cyberpunk Search Engine

![FOXSEEK](https://img.shields.io/badge/FOXSEEK-Cyberpunk%20Search%20Engine-purple?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDRMMTMgN0gxNkwxOSAxMFYxNEwxNiAxN0gxM0wxMCAyMFg2TDMgMTdWMTNMNiAxMEg5TDEwIDRaIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPg==)
![Version](https://img.shields.io/badge/version-0.1.0-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

Experience the future of search with FOXSEEK - a cyberpunk-themed search engine powered by AI. Enter the digital void and explore the web with neon aesthetics and cutting-edge technology.

## ✨ **Features**

- 🔍 **AI-Powered Search**: Powered by ZAI Web Dev SDK for intelligent web search
- 🎨 **Cyberpunk Design**: Neon colors, glitch effects, and futuristic animations
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- ⚡ **Real-time Results**: Fast search with loading animations and error handling
- 💡 **Smart Suggestions**: Trending search suggestions for cyberpunk topics
- 🌙 **Smooth Animations**: Custom CSS animations for immersive experience

## 🚀 **Quick Start**

### **Prerequisites**

- Node.js 18+ 
- npm or yarn
- ZAI API credentials (optional, has fallback)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd foxseek-cyberpunk-search
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup ZAI SDK Configuration (Optional)**
   
   **Option 1: Interactive Setup (Recommended)**
   ```bash
   npm run setup-zai
   ```
   
   **Option 2: Manual Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your ZAI credentials
   ```
   
   **Note**: If you skip ZAI configuration, the app will automatically use mock search for demo purposes.

4. **Run the application**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 **ZAI SDK Configuration (Optional)**

FOXSEEK works with or without ZAI SDK credentials. For AI-powered search, configure ZAI. For demo/testing, skip this step - the app will automatically use mock search.

### **Get ZAI Credentials**

1. **Visit ZAI Platform**: Go to [https://z.ai](https://z.ai)
2. **Sign Up/Login**: Create an account or sign in
3. **Get API Key**: Navigate to Developer section → API Keys
4. **Create Project**: Create a new project to get Project ID

### **Environment Variables**

Create a `.env.local` file in the root directory:

```bash
# ZAI SDK Configuration (OPTIONAL)
ZAI_API_KEY=your_api_key_here
ZAI_ENDPOINT=https://api.z.ai/v1
ZAI_PROJECT_ID=your_project_id_here

# Optional Configuration
ZAI_TIMEOUT=30000
ZAI_MAX_RETRIES=3

# Application Configuration
NEXT_PUBLIC_APP_NAME=FOXSEEK
NEXT_PUBLIC_APP_VERSION=0.1.0
```

### **Setup Script**

Use the interactive setup script for easy configuration:

```bash
npm run setup-zai
```

This script will:
- Prompt you for required credentials
- Create `.env.local` file automatically
- Validate the configuration
- Provide setup instructions

## 📁 **Project Structure**

```
foxseek-cyberpunk-search/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── search/
│   │   │   │   └── route.ts          # ZAI search API endpoint
│   │   │   └── alternatives/
│   │   │       └── route.ts         # Alternative search methods
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main search page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   └── ui/                 # shadcn/ui components
│   ├── hooks/                  # Custom React hooks
│   └── lib/                    # Utility functions
├── scripts/
│   └── setup-zai.js           # ZAI setup script
├── prisma/                    # Database schema
├── public/                    # Static assets
├── .env.example              # Environment template
├── .env.local                # Environment variables (create this)
├── package.json              # Dependencies and scripts
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## 🎨 **Design System**

### **Color Palette**
- **Primary**: Cyan (#00ffff) - Neon glow effects
- **Secondary**: Purple (#a855f7) - Gradient accents
- **Accent**: Pink (#ec4899) - Highlights and animations
- **Background**: Dark gradient (#111827 → #581c87 → #6b21a8)

### **Typography**
- **Headings**: Bold gradient text with glitch effects
- **Body**: Clean, readable fonts with proper spacing
- **Monospace**: For technical elements and code

### **Animations**
- **Glitch Effect**: Text distortion for cyberpunk feel
- **Neon Flicker**: Realistic neon sign lighting
- **Pulse Glow**: Breathing glow effects
- **Scanlines**: CRT monitor-style scanning

## 🛠️ **Development**

### **Available Scripts**

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:push      # Push schema to database
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run migrations
npm run db:reset     # Reset database

# Setup
npm run setup-zai    # Interactive ZAI setup
```

### **Tech Stack**

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui
- **AI SDK**: ZAI Web Dev SDK (optional)
- **Icons**: Lucide React
- **Database**: Prisma (optional)
- **State Management**: React hooks

## 🔧 **Configuration**

### **Environment Variables**

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `ZAI_API_KEY` | ZAI API authentication key | ❌ No | - |
| `ZAI_ENDPOINT` | ZAI service endpoint | ❌ No | `https://api.z.ai/v1` |
| `ZAI_PROJECT_ID` | ZAI project identifier | ❌ No | - |
| `ZAI_TIMEOUT` | Request timeout in milliseconds | ❌ No | `30000` |
| `ZAI_MAX_RETRIES` | Maximum retry attempts | ❌ No | `3` |

### **Customization**

#### **Search Suggestions**
Edit `src/app/page.tsx` to modify search suggestions:

```javascript
const searchSuggestions = [
  "cyberpunk technology",
  "neon city nightlife",
  "artificial intelligence",
  // Add your own suggestions
];
```

#### **Color Theme**
Modify colors in `src/app/globals.css`:

```css
:root {
  --primary-cyan: #00ffff;
  --primary-purple: #a855f7;
  --primary-pink: #ec4899;
}
```

## 🚀 **Deployment**

### **Vercel (Recommended)**

1. **Connect Repository**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Set Environment Variables (Optional)**
   ```bash
   vercel env add ZAI_API_KEY
   vercel env add ZAI_ENDPOINT
   vercel env add ZAI_PROJECT_ID
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

### **Other Platforms**

- **Netlify**: Set environment variables in build settings
- **Heroku**: Use `heroku config:set` for environment variables
- **Docker**: Use environment variables in Dockerfile

## 🐛 **Troubleshooting**

### **Common Issues**

#### **ZAI Configuration Error**
```bash
Error: ZAI not configured
```
**Solution**: The app will automatically fallback to mock search. No action needed.

#### **API Key Invalid**
```bash
Error: Invalid API key
```
**Solution**: Get a new API key from ZAI platform or continue with mock search.

#### **Search Not Working**
```bash
Error: Failed to perform search
```
**Solution**: Check internet connection and ZAI service status, or use mock search.

### **Mock Search Always Works**
If ZAI is not configured, the app automatically uses mock search with sample data. This is perfect for demos and testing!

### **Debug Mode**

Enable debug logging:
```bash
DEBUG=zai:* npm run dev
```

### **Logs**

Check development logs:
```bash
cat dev.log
```

## 📝 **API Reference**

### **Search Endpoint**

```
GET /api/search?q={query}
```

**Response**:
```json
{
  "results": [
    {
      "url": "https://example.com",
      "name": "Page Title",
      "snippet": "Page description...",
      "host_name": "example.com",
      "rank": 1,
      "date": "2024-01-01",
      "favicon": "data:image/..."
    }
  ],
  "query": "search term",
  "totalResults": 10
}
```

## 🔄 **Alternative Search Methods**

If you don't want to use ZAI SDK, FOXSEEK supports multiple search methods:

- **Mock Search**: Works immediately without API keys
- **DuckDuckGo API**: Free search without authentication
- **Google Custom Search**: High-quality results with free tier
- **Bing Search API**: Microsoft's search API with free tier

For more information, see [ALTERNATIVE_SEARCH.md](./ALTERNATIVE_SEARCH.md)

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- [ZAI](https://z.ai) for the powerful AI SDK (optional)
- [Next.js](https://nextjs.org) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com) for the beautiful UI components
- [Lucide](https://lucide.dev) for the awesome icon library

## 📞 **Support**

- **Documentation**: [ZAI Docs](https://docs.z.ai)
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Email**: support@foxseek.com
- **Community**: [Discord Server](https://discord.gg/foxseek)

---

🦊 **FOXSEEK** - Enter the digital frontier with style!
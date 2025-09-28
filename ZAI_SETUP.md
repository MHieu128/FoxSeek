# ZAI SDK Configuration Guide

## 📋 **Overview**

FOXSEEK uses **ZAI Web Dev SDK** to perform search functionality. For the application to work when you download it, you need to configure ZAI SDK with appropriate authentication information.

## 🔑 **How to Get ZAI Configuration Information**

### **Step 1: Access ZAI Platform**
1. Log in to your ZAI account at: [https://z.ai](https://z.ai)
2. Go to **Developer** or **API Keys** section
3. Create a new API key if you don't have one

### **Step 2: Get API Key**
- **API Key**: String of characters to authenticate your application
- **Endpoint**: URL of ZAI service
- **Project ID**: Your project ID on ZAI platform

### **Step 3: Environment Setup**

#### **Create `.env.local` file**
In the project root directory, create a `.env.local` file with the following content:

```bash
# ZAI SDK Configuration
ZAI_API_KEY=your_api_key_here
ZAI_ENDPOINT=https://api.z.ai/v1
ZAI_PROJECT_ID=your_project_id_here

# Optional Configuration
ZAI_TIMEOUT=30000
ZAI_MAX_RETRIES=3
```

#### **Replace information**
- `your_api_key_here`: API key you get from ZAI platform
- `your_project_id_here`: Project ID from ZAI platform
- `https://api.z.ai/v1`: ZAI endpoint (may vary depending on environment)

## 🛠️ **Detailed Configuration**

### **1. ZAI SDK Configuration**

File `src/app/api/search/route.ts` will automatically read configuration from environment:

```javascript
import ZAI from 'z-ai-web-dev-sdk';

// ZAI SDK will automatically use environment variables
const zai = await ZAI.create();
```

### **2. Supported Environment Variables**

| Environment Variable | Description | Required | Default |
|---------------------|-------------|----------|---------|
| `ZAI_API_KEY` | API key for authentication | ✅ Yes | - |
| `ZAI_ENDPOINT` | URL of ZAI service | ❌ No | `https://api.z.ai/v1` |
| `ZAI_PROJECT_ID` | Project ID | ❌ No | - |
| `ZAI_TIMEOUT` | Request timeout (ms) | ❌ No | `30000` |
| `ZAI_MAX_RETRIES` | Maximum retry attempts | ❌ No | `3` |

### **3. Check Configuration**

After configuration, you can test by:

```bash
# Run the application
npm run dev

# Check logs
cat dev.log
```

## 🔧 **Troubleshooting**

### **Common Errors**

#### **1. "ZAI not configured"**
- **Cause**: Missing API key or incorrect configuration
- **Fix**: Check `.env.local` file and ensure environment variables are correct

#### **2. "Invalid API key"**
- **Cause**: Invalid or expired API key
- **Fix**: Get a new API key from ZAI platform

#### **3. "Connection timeout"**
- **Cause**: Unstable network or wrong endpoint
- **Fix**: Check network connection and endpoint URL

#### **4. "Project not found"**
- **Cause**: Incorrect Project ID
- **Fix**: Confirm Project ID on ZAI platform

### **Debug Mode**

To enable debug mode, add environment variable:

```bash
DEBUG=zai:*
```

## 📝 **Complete Configuration Example**

### **Sample `.env.local` file**

```bash
# ZAI SDK Configuration
ZAI_API_KEY=sk-1234567890abcdef1234567890abcdef
ZAI_ENDPOINT=https://api.z.ai/v1
ZAI_PROJECT_ID=proj_1234567890abcdef

# Optional Configuration
ZAI_TIMEOUT=30000
ZAI_MAX_RETRIES=3

# Debug Mode (uncomment to enable)
# DEBUG=zai:*
```

### **Connection Test**

Create a simple test file:

```javascript
// test-zai.js
const ZAI = require('z-ai-web-dev-sdk');

async function testZAI() {
  try {
    const zai = await ZAI.create();
    console.log('ZAI initialized successfully');
    
    const result = await zai.functions.invoke("web_search", {
      query: "test",
      num: 1
    });
    
    console.log('Search test successful:', result.length, 'results');
  } catch (error) {
    console.error('ZAI test failed:', error.message);
  }
}

testZAI();
```

Run test:
```bash
node test-zai.js
```

## 🚀 **Production Deployment**

When deploying to production, remember:

1. **Set environment variables** on hosting platform
2. **Do not commit `.env.local` file** to git
3. **Use environment variables** of hosting service
4. **Check API key access permissions**

### **Examples on platforms**

#### **Vercel**
```bash
vercel env add ZAI_API_KEY
vercel env add ZAI_ENDPOINT
vercel env add ZAI_PROJECT_ID
```

#### **Heroku**
```bash
heroku config:set ZAI_API_KEY=your_api_key
heroku config:set ZAI_ENDPOINT=https://api.z.ai/v1
heroku config:set ZAI_PROJECT_ID=your_project_id
```

#### **Docker**
```dockerfile
ENV ZAI_API_KEY=your_api_key
ENV ZAI_ENDPOINT=https://api.z.ai/v1
ENV ZAI_PROJECT_ID=your_project_id
```

## 📞 **Support**

If you encounter issues with ZAI SDK:

1. **Check documentation**: [ZAI Documentation](https://docs.z.ai)
2. **Contact support**: support@z.ai
3. **Community**: [ZAI Community](https://community.z.ai)
4. **Report issues**: [GitHub Issues](https://github.com/z-ai/web-dev-sdk/issues)

---

**Important Notes**: 
- Always keep your API key secure
- Do not commit `.env.local` file to version control
- Use environment variables for production deployment
- Monitor usage limits and billing on ZAI platform
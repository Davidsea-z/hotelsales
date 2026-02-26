# 表单数据持久化解决方案

## 📬 当前状态

**问题**：表单提交后，数据只打印到控制台，没有持久化存储。

**影响**：
- ❌ 数据无法保存
- ❌ 无法查询历史咨询记录
- ❌ 无法及时跟进客户

---

## 🎯 解决方案对比

| 方案 | 难度 | 成本 | 适用场景 | 推荐度 |
|------|------|------|----------|--------|
| 方案1: Cloudflare D1数据库 | ⭐⭐ | 免费 | 正式生产环境 | ⭐⭐⭐⭐⭐ |
| 方案2: 邮件通知 | ⭐ | 低 | 快速上线 | ⭐⭐⭐⭐ |
| 方案3: 第三方表单服务 | ⭐ | 免费/付费 | 快速原型 | ⭐⭐⭐ |

---

## 方案1️⃣：Cloudflare D1 数据库 ⭐ 推荐

**最专业的解决方案，适合正式生产环境**

### 优点
✅ 完全免费（D1免费额度：每天100万读取、10万写入）
✅ 全球分布式数据库，访问速度快
✅ 与Cloudflare Pages完美集成
✅ 支持SQL查询，数据管理方便
✅ 可以构建管理后台

### 实施步骤

#### 1. 创建D1数据库
\`\`\`bash
cd /home/user/webapp

# 创建生产数据库
npx wrangler d1 create microconnect-contacts

# 复制输出的database_id到wrangler.jsonc
\`\`\`

#### 2. 创建数据库表结构
创建 `migrations/0001_create_contacts.sql`:
\`\`\`sql
-- 联系人咨询表
CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  wechat TEXT,
  hotel_name TEXT,
  message TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'new' CHECK(status IN ('new', 'contacted', 'converted', 'lost')),
  notes TEXT
);

-- 创建索引加速查询
CREATE INDEX IF NOT EXISTS idx_contacts_phone ON contacts(phone);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
\`\`\`

#### 3. 更新wrangler.jsonc配置
\`\`\`jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "microconnect",
  "compatibility_date": "2024-01-01",
  "pages_build_output_dir": "./dist",
  "compatibility_flags": ["nodejs_compat"],
  
  // 添加D1数据库配置
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "microconnect-contacts",
      "database_id": "你的数据库ID"  // 从第1步获取
    }
  ]
}
\`\`\`

#### 4. 应用数据库迁移
\`\`\`bash
# 本地开发环境
npx wrangler d1 migrations apply microconnect-contacts --local

# 生产环境（部署时）
npx wrangler d1 migrations apply microconnect-contacts
\`\`\`

#### 5. 更新API代码
\`\`\`typescript
// src/index.tsx
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/api/*', cors())
app.use('/static/*', serveStatic({ root: './public' }))

// 保存联系人咨询
app.post('/api/contact', async (c) => {
  try {
    const { name, phone, wechat, hotelName, message } = await c.req.json()
    const { env } = c
    
    // 获取请求信息
    const ipAddress = c.req.header('cf-connecting-ip') || 'unknown'
    const userAgent = c.req.header('user-agent') || 'unknown'
    
    // 插入数据库
    const result = await env.DB.prepare(\`
      INSERT INTO contacts (name, phone, wechat, hotel_name, message, ip_address, user_agent)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    \`).bind(name, phone, wechat, hotelName, message, ipAddress, userAgent).run()
    
    console.log('新咨询已保存:', { id: result.meta.last_row_id, name, phone })
    
    return c.json({ 
      success: true, 
      message: '感谢您的咨询，我们会尽快与您联系！',
      id: result.meta.last_row_id
    })
  } catch (error) {
    console.error('保存失败:', error)
    return c.json({ 
      success: false, 
      message: '提交失败，请稍后再试' 
    }, 500)
  }
})

// 查询所有咨询（管理后台用）
app.get('/api/contacts', async (c) => {
  try {
    const { env } = c
    const { results } = await env.DB.prepare(\`
      SELECT * FROM contacts 
      ORDER BY created_at DESC 
      LIMIT 100
    \`).all()
    
    return c.json({ success: true, data: results })
  } catch (error) {
    return c.json({ success: false, message: '查询失败' }, 500)
  }
})

// 更新咨询状态
app.put('/api/contacts/:id', async (c) => {
  try {
    const { env } = c
    const id = c.req.param('id')
    const { status, notes } = await c.req.json()
    
    await env.DB.prepare(\`
      UPDATE contacts 
      SET status = ?, notes = ?
      WHERE id = ?
    \`).bind(status, notes, id).run()
    
    return c.json({ success: true, message: '更新成功' })
  } catch (error) {
    return c.json({ success: false, message: '更新失败' }, 500)
  }
})

export default app
\`\`\`

#### 6. 本地测试
\`\`\`bash
# 重新构建
npm run build

# 使用D1启动（修改ecosystem.config.cjs）
# args: 'wrangler pages dev dist --d1=microconnect-contacts --local --ip 0.0.0.0 --port 3000'

# 重启服务
pm2 restart webapp

# 测试表单提交
curl -X POST http://localhost:3000/api/contact \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "测试用户",
    "phone": "13800138000",
    "wechat": "test123",
    "hotelName": "测试酒店",
    "message": "测试消息"
  }'

# 查询数据
npx wrangler d1 execute microconnect-contacts --local --command="SELECT * FROM contacts"
\`\`\`

#### 7. 创建简单的管理后台
\`\`\`typescript
// 添加管理页面路由
app.get('/admin', (c) => {
  return c.html(\`
    <!DOCTYPE html>
    <html>
    <head>
      <title>咨询管理后台</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-100 p-8">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl font-bold mb-6">咨询管理</h1>
        <div id="contacts"></div>
      </div>
      
      <script>
        async function loadContacts() {
          const res = await fetch('/api/contacts')
          const data = await res.json()
          
          const html = data.data.map(contact => \`
            <div class="bg-white p-4 rounded-lg shadow mb-4">
              <div class="flex justify-between">
                <div>
                  <p class="font-bold">\${contact.name} - \${contact.phone}</p>
                  <p class="text-sm text-gray-600">\${contact.hotel_name || '未提供酒店名称'}</p>
                  <p class="text-sm mt-2">\${contact.message || '无留言'}</p>
                  <p class="text-xs text-gray-400 mt-2">\${contact.created_at}</p>
                </div>
                <div>
                  <span class="px-3 py-1 rounded text-sm \${
                    contact.status === 'new' ? 'bg-blue-100 text-blue-800' :
                    contact.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                    contact.status === 'converted' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }">\${contact.status}</span>
                </div>
              </div>
            </div>
          \`).join('')
          
          document.getElementById('contacts').innerHTML = html
        }
        
        loadContacts()
      </script>
    </body>
    </html>
  \`)
})
\`\`\`

---

## 方案2️⃣：邮件通知服务

**最快速的解决方案，适合快速上线**

### 推荐服务商
- **Resend**: 每月3000封免费邮件
- **SendGrid**: 每月100封免费邮件
- **Mailgun**: 前5000封免费

### 使用Resend实施

#### 1. 注册Resend并获取API Key
- 访问 https://resend.com
- 注册账号并验证域名
- 获取API Key

#### 2. 安装依赖
\`\`\`bash
cd /home/user/webapp
npm install resend
\`\`\`

#### 3. 更新API代码
\`\`\`typescript
import { Resend } from 'resend'

app.post('/api/contact', async (c) => {
  try {
    const { name, phone, wechat, hotelName, message } = await c.req.json()
    
    // 初始化Resend（API Key存储在环境变量）
    const resend = new Resend(c.env.RESEND_API_KEY)
    
    // 发送邮件通知
    await resend.emails.send({
      from: 'noreply@yourdomain.com',
      to: 'your-email@example.com',  // 你的邮箱
      subject: \`【新咨询】\${name} - \${hotelName}\`,
      html: \`
        <h2>新咨询信息</h2>
        <p><strong>姓名：</strong>\${name}</p>
        <p><strong>电话：</strong>\${phone}</p>
        <p><strong>微信：</strong>\${wechat || '未提供'}</p>
        <p><strong>酒店名称：</strong>\${hotelName || '未提供'}</p>
        <p><strong>留言：</strong>\${message || '无'}</p>
        <p><strong>时间：</strong>\${new Date().toLocaleString('zh-CN')}</p>
      \`
    })
    
    return c.json({ 
      success: true, 
      message: '感谢您的咨询，我们会尽快与您联系！' 
    })
  } catch (error) {
    console.error('发送失败:', error)
    return c.json({ 
      success: false, 
      message: '提交失败，请稍后再试' 
    }, 500)
  }
})
\`\`\`

#### 4. 配置环境变量
\`\`\`bash
# 本地开发（创建.dev.vars文件）
echo "RESEND_API_KEY=你的API密钥" > .dev.vars

# 生产环境
npx wrangler pages secret put RESEND_API_KEY --project-name microconnect
\`\`\`

---

## 方案3️⃣：第三方表单服务

**最简单的解决方案，无需写代码**

### 推荐服务
1. **Tally.so** (免费，支持中文)
2. **Google Forms** (免费)
3. **Typeform** (美观，有免费版)
4. **金数据** (国内服务，支持微信通知)

### 实施步骤
1. 在第三方平台创建表单
2. 获取嵌入代码或表单链接
3. 替换网站上的表单为iframe嵌入

\`\`\`html
<!-- 示例：使用Tally嵌入表单 -->
<iframe 
  src="https://tally.so/r/your-form-id" 
  width="100%" 
  height="600" 
  frameborder="0"
></iframe>
\`\`\`

---

## 🎯 推荐选择

### 如果您想要专业的生产环境
👉 **选择方案1：Cloudflare D1数据库**
- 完全免费
- 数据完全可控
- 可以构建管理后台
- 支持数据分析

### 如果您想要快速上线
👉 **选择方案2：邮件通知**
- 最快15分钟完成
- 直接收邮件，及时跟进
- 成本极低

### 如果您是个人测试
👉 **选择方案3：第三方表单**
- 5分钟搞定
- 完全不用写代码

---

## 📊 数据查看方式

### 方案1（D1数据库）
\`\`\`bash
# 查询所有咨询
npx wrangler d1 execute microconnect-contacts --command="SELECT * FROM contacts ORDER BY created_at DESC"

# 查询今天的咨询
npx wrangler d1 execute microconnect-contacts --command="SELECT * FROM contacts WHERE DATE(created_at) = DATE('now')"

# 统计咨询数量
npx wrangler d1 execute microconnect-contacts --command="SELECT status, COUNT(*) as count FROM contacts GROUP BY status"
\`\`\`

### 方案2（邮件）
- 直接查看邮箱收件箱

### 方案3（第三方）
- 登录第三方平台查看

---

## 🚀 需要我帮您实施吗？

我可以立即帮您实施任一方案，请告诉我：
1. 您选择哪个方案？
2. 是否需要管理后台？
3. 是否需要邮件通知？

只需要一句话，我就可以帮您完成全部配置！

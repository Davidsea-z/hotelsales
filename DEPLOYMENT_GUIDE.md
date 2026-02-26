# GitHub和Cloudflare部署完整指南

## 📋 部署清单

### 准备阶段
- [ ] GitHub账号
- [ ] Cloudflare账号
- [ ] GitHub仓库
- [ ] Cloudflare API Token

---

## 🔐 方式一：通过沙盒界面配置（最简单）

### Step 1: 配置GitHub

1. **点击沙盒界面的"GitHub"标签**
2. **授权GitHub访问**
3. **选择或创建仓库**
   - 仓库名称建议：`microconnect-hotel` 或 `hotel-esports-renovation`
4. **推送代码**
   - 沙盒会自动推送所有代码到GitHub

### Step 2: 配置Cloudflare

1. **点击沙盒界面的"Deploy"标签**
2. **配置Cloudflare API Token**
3. **选择部署目标：Cloudflare Pages**
4. **点击部署**

---

## 💻 方式二：手动命令行部署

### Step 1: GitHub推送

\`\`\`bash
# 1. 在GitHub上创建新仓库
# 访问: https://github.com/new
# 仓库名称: microconnect-hotel
# 不要初始化README

# 2. 在沙盒中配置远程仓库
cd /home/user/webapp

# 3. 添加GitHub远程仓库（替换为您的仓库地址）
git remote add origin https://github.com/YOUR_USERNAME/microconnect-hotel.git

# 4. 配置GitHub认证
# 方式A: 在沙盒界面配置（推荐）
# 方式B: 使用Personal Access Token
# git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/microconnect-hotel.git

# 5. 推送代码
git branch -M main
git push -u origin main
\`\`\`

### Step 2: Cloudflare Pages部署

#### 2.1 获取Cloudflare API Token

1. **登录Cloudflare**: https://dash.cloudflare.com
2. **进入API Tokens**: 右上角头像 → My Profile → API Tokens
3. **创建Token**: Create Token → Edit Cloudflare Workers
4. **权限设置**:
   - Account - Cloudflare Pages: Edit
   - Account - D1: Edit
5. **复制Token**: 保存好这个Token

#### 2.2 在沙盒配置Cloudflare

\`\`\`bash
# 配置Cloudflare API Token（在沙盒中运行）
# 方式A: 使用沙盒Deploy标签配置（推荐）
# 方式B: 手动设置环境变量
export CLOUDFLARE_API_TOKEN="your-api-token-here"
\`\`\`

#### 2.3 创建生产D1数据库

\`\`\`bash
cd /home/user/webapp

# 创建生产数据库
npx wrangler d1 create microconnect-contacts-prod

# 输出示例：
# ✅ Successfully created DB 'microconnect-contacts-prod'
# 
# [[d1_databases]]
# binding = "DB"
# database_name = "microconnect-contacts-prod"
# database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

# 复制database_id备用
\`\`\`

#### 2.4 更新wrangler.jsonc配置

\`\`\`bash
# 编辑wrangler.jsonc，更新database_id
# 将"database_id"从"local-dev-db"改为实际的生产ID
\`\`\`

\`\`\`jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "webapp",
  "compatibility_date": "2026-02-26",
  "pages_build_output_dir": "./dist",
  "compatibility_flags": ["nodejs_compat"],
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "microconnect-contacts-prod",
      "database_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"  // 替换为实际ID
    }
  ]
}
\`\`\`

#### 2.5 应用数据库迁移到生产

\`\`\`bash
# 应用迁移到生产数据库（注意：不加--local）
npx wrangler d1 migrations apply microconnect-contacts-prod

# 输出示例：
# 🌀 Executing on microconnect-contacts-prod (xxxxxxxx):
# 🚣 Executing 0001_create_contacts.sql
# ✅ Successfully applied 1 migration
\`\`\`

#### 2.6 创建Cloudflare Pages项目

\`\`\`bash
# 构建项目
npm run build

# 创建Pages项目
npx wrangler pages project create microconnect --production-branch main

# 或使用自定义项目名
npx wrangler pages project create YOUR_PROJECT_NAME --production-branch main
\`\`\`

#### 2.7 部署到Cloudflare Pages

\`\`\`bash
# 部署到生产环境
npx wrangler pages deploy dist --project-name microconnect

# 或使用自定义项目名
npx wrangler pages deploy dist --project-name YOUR_PROJECT_NAME

# 部署成功后会显示URL，例如：
# ✨ Deployment complete! Take a peek over at https://xxxxxxxx.microconnect.pages.dev
\`\`\`

---

## 📊 部署后验证

### 1. 访问生产网站

\`\`\`
https://microconnect.pages.dev
或
https://YOUR_PROJECT_NAME.pages.dev
\`\`\`

### 2. 测试表单提交

1. 访问首页
2. 填写表单提交
3. 访问 `/admin` 查看数据

### 3. 测试管理后台

1. 访问 `https://YOUR_PROJECT_NAME.pages.dev/admin`
2. 查看统计数据
3. 测试导出CSV功能

### 4. 验证数据库

\`\`\`bash
# 查询生产数据库
npx wrangler d1 execute microconnect-contacts-prod --command="SELECT * FROM contacts"
\`\`\`

---

## 🔧 常见问题

### Q1: Cloudflare API Token权限不足

**错误信息**: "Authentication error" 或 "Insufficient permissions"

**解决方法**:
1. 重新创建API Token
2. 确保包含以下权限：
   - Account - Cloudflare Pages: Edit
   - Account - D1: Edit
   - Zone - Workers Routes: Edit

### Q2: D1数据库ID未更新

**错误信息**: "D1 binding not found"

**解决方法**:
1. 确认已创建生产数据库
2. 复制正确的database_id
3. 更新wrangler.jsonc中的database_id
4. 重新部署

### Q3: GitHub推送失败

**错误信息**: "Authentication failed"

**解决方法**:
- 使用沙盒界面的GitHub集成（推荐）
- 或使用Personal Access Token

### Q4: 表单提交后数据未保存

**可能原因**:
- 生产数据库迁移未应用
- wrangler.jsonc配置错误

**解决方法**:
\`\`\`bash
# 重新应用迁移
npx wrangler d1 migrations apply microconnect-contacts-prod

# 验证表结构
npx wrangler d1 execute microconnect-contacts-prod --command="SELECT name FROM sqlite_master WHERE type='table'"
\`\`\`

---

## 📝 部署检查清单

### GitHub部署
- [ ] GitHub仓库已创建
- [ ] 代码已推送到main分支
- [ ] README.md已更新
- [ ] .gitignore正确配置

### Cloudflare部署
- [ ] Cloudflare API Token已配置
- [ ] 生产D1数据库已创建
- [ ] database_id已更新到wrangler.jsonc
- [ ] 数据库迁移已应用到生产
- [ ] Pages项目已创建
- [ ] 网站已成功部署
- [ ] 生产URL可以访问
- [ ] 表单提交功能正常
- [ ] 管理后台功能正常
- [ ] CSV导出功能正常

---

## 🌐 生产环境URLs

部署成功后，您将获得：

**主要URL**:
\`\`\`
https://microconnect.pages.dev
或
https://YOUR_PROJECT_NAME.pages.dev
\`\`\`

**管理后台**:
\`\`\`
https://YOUR_PROJECT_NAME.pages.dev/admin
\`\`\`

**分支预览URL** (自动生成):
\`\`\`
https://COMMIT_HASH.YOUR_PROJECT_NAME.pages.dev
\`\`\`

---

## 🎯 后续管理

### 更新代码

\`\`\`bash
# 1. 修改代码
# 2. 提交到Git
git add .
git commit -m "更新说明"
git push origin main

# 3. 重新部署
npm run build
npx wrangler pages deploy dist --project-name YOUR_PROJECT_NAME
\`\`\`

### 管理数据库

\`\`\`bash
# 查询生产数据
npx wrangler d1 execute microconnect-contacts-prod --command="SELECT * FROM contacts"

# 备份生产数据
npx wrangler d1 export microconnect-contacts-prod > backup.sql

# 清空测试数据
npx wrangler d1 execute microconnect-contacts-prod --command="DELETE FROM contacts WHERE id IN (1,2,3)"
\`\`\`

### 查看部署日志

\`\`\`bash
# 查看部署历史
npx wrangler pages deployments list --project-name YOUR_PROJECT_NAME

# 查看特定部署详情
npx wrangler pages deployment tail
\`\`\`

---

## 📞 需要帮助？

如果在部署过程中遇到任何问题：

1. **检查文档**: 参考本指南的"常见问题"部分
2. **查看日志**: 使用wrangler命令查看详细错误信息
3. **验证配置**: 确保所有配置文件正确
4. **重新部署**: 有时简单的重新部署就能解决问题

---

**祝部署顺利！** 🚀

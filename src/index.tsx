import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files from public directory
app.use('/static/*', serveStatic({ root: './public' }))

// API endpoint for contact form submission
app.post('/api/contact', async (c) => {
  try {
    const { name, phone, wechat, hotelName, message } = await c.req.json()
    const { env } = c
    
    // 获取请求信息
    const ipAddress = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown'
    const userAgent = c.req.header('user-agent') || 'unknown'
    
    // 插入数据库
    const result = await env.DB.prepare(`
      INSERT INTO contacts (name, phone, wechat, hotel_name, message, ip_address, user_agent)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(name, phone, wechat || null, hotelName || null, message || null, ipAddress, userAgent).run()
    
    console.log('新咨询已保存到数据库:', { 
      id: result.meta.last_row_id, 
      name, 
      phone, 
      hotel_name: hotelName 
    })
    
    return c.json({ 
      success: true, 
      message: '感谢您的咨询，我们会尽快与您联系！',
      id: result.meta.last_row_id
    })
  } catch (error) {
    console.error('保存咨询失败:', error)
    return c.json({ 
      success: false, 
      message: '提交失败，请稍后再试' 
    }, 500)
  }
})

// 查询所有咨询记录（管理后台用）
app.get('/api/contacts', async (c) => {
  try {
    const { env } = c
    const { results } = await env.DB.prepare(`
      SELECT 
        id, name, phone, wechat, hotel_name, message, 
        status, created_at, notes
      FROM contacts 
      ORDER BY created_at DESC 
      LIMIT 100
    `).all()
    
    return c.json({ 
      success: true, 
      data: results,
      count: results.length
    })
  } catch (error) {
    console.error('查询失败:', error)
    return c.json({ 
      success: false, 
      message: '查询失败' 
    }, 500)
  }
})

// 更新咨询状态（管理后台用）
app.put('/api/contacts/:id', async (c) => {
  try {
    const { env } = c
    const id = c.req.param('id')
    const { status, notes } = await c.req.json()
    
    await env.DB.prepare(`
      UPDATE contacts 
      SET status = ?, notes = ?
      WHERE id = ?
    `).bind(status, notes || null, id).run()
    
    return c.json({ 
      success: true, 
      message: '更新成功' 
    })
  } catch (error) {
    console.error('更新失败:', error)
    return c.json({ 
      success: false, 
      message: '更新失败' 
    }, 500)
  }
})

// 删除咨询记录（管理后台用）
app.delete('/api/contacts/:id', async (c) => {
  try {
    const { env } = c
    const id = c.req.param('id')
    
    await env.DB.prepare(`
      DELETE FROM contacts WHERE id = ?
    `).bind(id).run()
    
    return c.json({ 
      success: true, 
      message: '删除成功' 
    })
  } catch (error) {
    console.error('删除失败:', error)
    return c.json({ 
      success: false, 
      message: '删除失败' 
    }, 500)
  }
})

// 获取统计数据（管理后台用）
app.get('/api/stats', async (c) => {
  try {
    const { env } = c
    
    // 总数
    const { results: totalResult } = await env.DB.prepare(`
      SELECT COUNT(*) as count FROM contacts
    `).all()
    
    // 按状态统计
    const { results: statusResult } = await env.DB.prepare(`
      SELECT status, COUNT(*) as count 
      FROM contacts 
      GROUP BY status
    `).all()
    
    // 今天的咨询数
    const { results: todayResult } = await env.DB.prepare(`
      SELECT COUNT(*) as count 
      FROM contacts 
      WHERE DATE(created_at) = DATE('now')
    `).all()
    
    // 本周的咨询数
    const { results: weekResult } = await env.DB.prepare(`
      SELECT COUNT(*) as count 
      FROM contacts 
      WHERE DATE(created_at) >= DATE('now', '-7 days')
    `).all()
    
    return c.json({ 
      success: true, 
      data: {
        total: totalResult[0]?.count || 0,
        today: todayResult[0]?.count || 0,
        week: weekResult[0]?.count || 0,
        byStatus: statusResult
      }
    })
  } catch (error) {
    console.error('统计失败:', error)
    return c.json({ 
      success: false, 
      message: '统计失败' 
    }, 500)
  }
})

// 管理后台页面
app.get('/admin', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MICROCONNECT - 咨询管理后台</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'tech-blue': '#0A4D8C',
                  'esports-red': '#E63946',
                }
              }
            }
          }
        </script>
    </head>
    <body class="bg-gray-100">
        <!-- Header -->
        <header class="bg-white shadow-md">
            <div class="container mx-auto px-4 py-4 flex justify-between items-center">
                <div class="flex items-center space-x-2">
                    <i class="fas fa-bolt text-esports-red text-2xl"></i>
                    <span class="text-xl font-black text-tech-blue">MICROCONNECT</span>
                    <span class="text-sm text-gray-500 ml-4">咨询管理后台</span>
                </div>
                <a href="/" class="text-gray-600 hover:text-tech-blue transition">
                    <i class="fas fa-home mr-2"></i>返回首页
                </a>
            </div>
        </header>

        <!-- Main Content -->
        <div class="container mx-auto px-4 py-8">
            <!-- 统计卡片 -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-500 text-sm">总咨询数</p>
                            <p id="stat-total" class="text-3xl font-bold text-tech-blue">0</p>
                        </div>
                        <i class="fas fa-inbox text-4xl text-tech-blue opacity-20"></i>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-500 text-sm">今日咨询</p>
                            <p id="stat-today" class="text-3xl font-bold text-green-600">0</p>
                        </div>
                        <i class="fas fa-calendar-day text-4xl text-green-600 opacity-20"></i>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-500 text-sm">本周咨询</p>
                            <p id="stat-week" class="text-3xl font-bold text-purple-600">0</p>
                        </div>
                        <i class="fas fa-calendar-week text-4xl text-purple-600 opacity-20"></i>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-500 text-sm">待跟进</p>
                            <p id="stat-new" class="text-3xl font-bold text-esports-red">0</p>
                        </div>
                        <i class="fas fa-exclamation-circle text-4xl text-esports-red opacity-20"></i>
                    </div>
                </div>
            </div>

            <!-- 筛选和搜索 -->
            <div class="bg-white rounded-lg shadow p-6 mb-6">
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <input type="text" id="search-input" placeholder="搜索姓名、电话、酒店名称..."
                               class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tech-blue focus:border-transparent">
                    </div>
                    <select id="status-filter" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tech-blue">
                        <option value="">所有状态</option>
                        <option value="new">待跟进</option>
                        <option value="contacted">已联系</option>
                        <option value="converted">已转化</option>
                        <option value="lost">已流失</option>
                    </select>
                    <button onclick="loadContacts()" class="px-6 py-2 bg-tech-blue text-white rounded-lg hover:bg-opacity-90 transition">
                        <i class="fas fa-search mr-2"></i>搜索
                    </button>
                    <button onclick="exportData()" class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-opacity-90 transition">
                        <i class="fas fa-download mr-2"></i>导出
                    </button>
                </div>
            </div>

            <!-- 咨询列表 -->
            <div class="bg-white rounded-lg shadow">
                <div class="p-6 border-b border-gray-200">
                    <h2 class="text-xl font-bold text-gray-800">咨询记录</h2>
                </div>
                <div id="contacts-list" class="divide-y divide-gray-200">
                    <div class="p-8 text-center text-gray-500">
                        <i class="fas fa-spinner fa-spin text-3xl mb-4"></i>
                        <p>加载中...</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 编辑模态框 -->
        <div id="edit-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div class="bg-white rounded-lg shadow-xl w-full max-w-md m-4">
                <div class="p-6 border-b border-gray-200">
                    <h3 class="text-xl font-bold">编辑咨询</h3>
                </div>
                <div class="p-6">
                    <input type="hidden" id="edit-id">
                    <div class="mb-4">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">状态</label>
                        <select id="edit-status" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                            <option value="new">待跟进</option>
                            <option value="contacted">已联系</option>
                            <option value="converted">已转化</option>
                            <option value="lost">已流失</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">备注</label>
                        <textarea id="edit-notes" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg"></textarea>
                    </div>
                </div>
                <div class="p-6 border-t border-gray-200 flex justify-end space-x-3">
                    <button onclick="closeEditModal()" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition">
                        取消
                    </button>
                    <button onclick="saveEdit()" class="px-4 py-2 bg-tech-blue text-white rounded-lg hover:bg-opacity-90 transition">
                        保存
                    </button>
                </div>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script>
            let allContacts = [];

            // 加载统计数据
            async function loadStats() {
                try {
                    const res = await axios.get('/api/stats');
                    if (res.data.success) {
                        const stats = res.data.data;
                        document.getElementById('stat-total').textContent = stats.total;
                        document.getElementById('stat-today').textContent = stats.today;
                        document.getElementById('stat-week').textContent = stats.week;
                        
                        // 计算待跟进数量
                        const newCount = stats.byStatus.find(s => s.status === 'new')?.count || 0;
                        document.getElementById('stat-new').textContent = newCount;
                    }
                } catch (error) {
                    console.error('加载统计失败:', error);
                }
            }

            // 加载咨询列表
            async function loadContacts() {
                try {
                    const res = await axios.get('/api/contacts');
                    if (res.data.success) {
                        allContacts = res.data.data;
                        renderContacts(allContacts);
                    }
                } catch (error) {
                    console.error('加载失败:', error);
                    document.getElementById('contacts-list').innerHTML = \`
                        <div class="p-8 text-center text-red-500">
                            <i class="fas fa-exclamation-triangle text-3xl mb-4"></i>
                            <p>加载失败，请刷新重试</p>
                        </div>
                    \`;
                }
            }

            // 渲染咨询列表
            function renderContacts(contacts) {
                const searchTerm = document.getElementById('search-input').value.toLowerCase();
                const statusFilter = document.getElementById('status-filter').value;
                
                // 筛选
                let filtered = contacts.filter(c => {
                    const matchSearch = !searchTerm || 
                        c.name.toLowerCase().includes(searchTerm) ||
                        c.phone.includes(searchTerm) ||
                        (c.hotel_name && c.hotel_name.toLowerCase().includes(searchTerm));
                    const matchStatus = !statusFilter || c.status === statusFilter;
                    return matchSearch && matchStatus;
                });

                if (filtered.length === 0) {
                    document.getElementById('contacts-list').innerHTML = \`
                        <div class="p-8 text-center text-gray-500">
                            <i class="fas fa-inbox text-3xl mb-4"></i>
                            <p>暂无数据</p>
                        </div>
                    \`;
                    return;
                }

                const html = filtered.map(contact => {
                    const statusColors = {
                        'new': 'bg-blue-100 text-blue-800',
                        'contacted': 'bg-yellow-100 text-yellow-800',
                        'converted': 'bg-green-100 text-green-800',
                        'lost': 'bg-red-100 text-red-800'
                    };
                    const statusLabels = {
                        'new': '待跟进',
                        'contacted': '已联系',
                        'converted': '已转化',
                        'lost': '已流失'
                    };
                    
                    return \`
                        <div class="p-6 hover:bg-gray-50 transition">
                            <div class="flex justify-between items-start">
                                <div class="flex-1">
                                    <div class="flex items-center space-x-3 mb-2">
                                        <h3 class="text-lg font-bold text-gray-900">\${contact.name}</h3>
                                        <span class="px-3 py-1 rounded-full text-xs font-semibold \${statusColors[contact.status]}">
                                            \${statusLabels[contact.status]}
                                        </span>
                                    </div>
                                    <div class="grid md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                                        <p><i class="fas fa-phone text-tech-blue mr-2"></i><strong>电话:</strong> \${contact.phone}</p>
                                        <p><i class="fas fa-weixin text-green-600 mr-2"></i><strong>微信:</strong> \${contact.wechat || '未提供'}</p>
                                        <p><i class="fas fa-hotel text-purple-600 mr-2"></i><strong>酒店:</strong> \${contact.hotel_name || '未提供'}</p>
                                        <p><i class="fas fa-clock text-gray-500 mr-2"></i><strong>时间:</strong> \${new Date(contact.created_at).toLocaleString('zh-CN')}</p>
                                    </div>
                                    \${contact.message ? \`
                                        <div class="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 mb-2">
                                            <strong>留言:</strong> \${contact.message}
                                        </div>
                                    \` : ''}
                                    \${contact.notes ? \`
                                        <div class="bg-yellow-50 rounded-lg p-3 text-sm text-gray-700">
                                            <strong>备注:</strong> \${contact.notes}
                                        </div>
                                    \` : ''}
                                </div>
                                <div class="flex flex-col space-y-2 ml-4">
                                    <button onclick="editContact(\${contact.id})" class="px-4 py-2 bg-tech-blue text-white rounded-lg text-sm hover:bg-opacity-90 transition">
                                        <i class="fas fa-edit mr-1"></i>编辑
                                    </button>
                                    <button onclick="deleteContact(\${contact.id})" class="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-opacity-90 transition">
                                        <i class="fas fa-trash mr-1"></i>删除
                                    </button>
                                    <a href="tel:\${contact.phone}" class="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-opacity-90 transition text-center">
                                        <i class="fas fa-phone mr-1"></i>拨打
                                    </a>
                                </div>
                            </div>
                        </div>
                    \`;
                }).join('');

                document.getElementById('contacts-list').innerHTML = html;
            }

            // 编辑咨询
            function editContact(id) {
                const contact = allContacts.find(c => c.id === id);
                if (!contact) return;

                document.getElementById('edit-id').value = id;
                document.getElementById('edit-status').value = contact.status;
                document.getElementById('edit-notes').value = contact.notes || '';
                document.getElementById('edit-modal').classList.remove('hidden');
            }

            // 关闭编辑模态框
            function closeEditModal() {
                document.getElementById('edit-modal').classList.add('hidden');
            }

            // 保存编辑
            async function saveEdit() {
                const id = document.getElementById('edit-id').value;
                const status = document.getElementById('edit-status').value;
                const notes = document.getElementById('edit-notes').value;

                try {
                    const res = await axios.put(\`/api/contacts/\${id}\`, { status, notes });
                    if (res.data.success) {
                        closeEditModal();
                        await loadContacts();
                        await loadStats();
                        alert('更新成功！');
                    }
                } catch (error) {
                    console.error('保存失败:', error);
                    alert('保存失败，请重试');
                }
            }

            // 删除咨询
            async function deleteContact(id) {
                if (!confirm('确定要删除这条咨询记录吗？')) return;

                try {
                    const res = await axios.delete(\`/api/contacts/\${id}\`);
                    if (res.data.success) {
                        await loadContacts();
                        await loadStats();
                        alert('删除成功！');
                    }
                } catch (error) {
                    console.error('删除失败:', error);
                    alert('删除失败，请重试');
                }
            }

            // 导出数据
            function exportData() {
                // 状态映射
                const statusMap = {
                    'new': '待跟进',
                    'contacted': '已联系',
                    'converted': '已转化',
                    'lost': '已流失'
                };
                
                // 构建CSV内容
                const csv = [
                    ['ID', '姓名', '电话', '微信', '酒店名称', '留言', '状态', '创建时间', '备注'].join(','),
                    ...allContacts.map(c => [
                        c.id,
                        \`"\${c.name}"\`,  // 用双引号包裹，避免逗号问题
                        c.phone,
                        \`"\${c.wechat || ''}"\`,
                        \`"\${c.hotel_name || ''}"\`,
                        \`"\${(c.message || '').replace(/"/g, '""')}"\`,  // 转义双引号
                        statusMap[c.status] || c.status,
                        c.created_at,
                        \`"\${(c.notes || '').replace(/"/g, '""')}"\`
                    ].join(','))
                ].join('\\r\\n');  // 使用Windows换行符

                // 添加UTF-8 BOM，让Excel正确识别编码
                const BOM = '\\uFEFF';
                const csvWithBOM = BOM + csv;
                
                // 创建Blob并下载
                const blob = new Blob([csvWithBOM], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = \`咨询记录_\${new Date().toISOString().split('T')[0]}.csv\`;
                link.click();
                
                // 清理URL对象
                setTimeout(() => URL.revokeObjectURL(link.href), 100);
            }

            // 搜索框实时搜索
            document.getElementById('search-input').addEventListener('input', () => {
                renderContacts(allContacts);
            });

            // 状态筛选
            document.getElementById('status-filter').addEventListener('change', () => {
                renderContacts(allContacts);
            });

            // 页面加载时初始化
            window.addEventListener('load', () => {
                loadStats();
                loadContacts();
                // 每30秒自动刷新
                setInterval(() => {
                    loadStats();
                    loadContacts();
                }, 30000);
            });
        </script>
    </body>
    </html>
  `)
})

// Main page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="MICROCONNECT - 专业酒店闲置房间电竞化改造服务，3-6个月回本，提升30%-80%营收，空置率下降40%">
        <meta name="keywords" content="酒店电竞房改造,电竞酒店,酒店营收提升,闲置房间改造,电竞房方案">
        <title>MICROCONNECT - 酒店闲置房间电竞化改造 | 3-6个月回本 提升营收30%-80%</title>
        
        <!-- Tailwind CSS -->
        <script src="https://cdn.tailwindcss.com"></script>
        
        <!-- Font Awesome -->
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        
        <!-- Google Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap" rel="stylesheet">
        
        <!-- Custom Styles -->
        <link href="/static/styles.css" rel="stylesheet">
        
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'tech-blue': '#0A4D8C',
                  'tech-blue-light': '#1565C0',
                  'tech-blue-dark': '#003366',
                  'esports-red': '#E63946',
                  'esports-red-dark': '#C1121F',
                }
              }
            }
          }
        </script>
    </head>
    <body class="font-sans antialiased">
        <!-- Navigation -->
        <nav id="navbar" class="fixed top-0 left-0 right-0 bg-white shadow-md z-50 transition-all duration-300">
            <div class="container mx-auto px-4 lg:px-8">
                <div class="flex justify-between items-center h-16 lg:h-20">
                    <!-- Logo -->
                    <div class="flex items-center">
                        <a href="#" class="flex items-center space-x-2">
                            <i class="fas fa-bolt text-esports-red text-2xl"></i>
                            <span class="text-xl lg:text-2xl font-black text-tech-blue tracking-wide">MICROCONNECT</span>
                        </a>
                    </div>
                    
                    <!-- Desktop Navigation -->
                    <div class="hidden lg:flex items-center space-x-8">
                        <a href="#solution" class="text-gray-700 hover:text-tech-blue transition font-medium">解决方案</a>
                        <a href="#plans" class="text-gray-700 hover:text-tech-blue transition font-medium">改造方案</a>
                        <a href="#cases" class="text-gray-700 hover:text-tech-blue transition font-medium">成功案例</a>
                        <a href="#process" class="text-gray-700 hover:text-tech-blue transition font-medium">合作流程</a>
                        <a href="#advantages" class="text-gray-700 hover:text-tech-blue transition font-medium">我们的优势</a>
                        <a href="#contact" class="bg-esports-red hover:bg-esports-red-dark text-white px-6 py-2.5 rounded-lg transition font-semibold shadow-lg">
                            <i class="fas fa-phone-alt mr-2"></i>立即咨询
                        </a>
                    </div>
                    
                    <!-- Mobile Menu Button -->
                    <button id="mobile-menu-btn" class="lg:hidden text-gray-700 focus:outline-none">
                        <i class="fas fa-bars text-2xl"></i>
                    </button>
                </div>
                
                <!-- Mobile Menu -->
                <div id="mobile-menu" class="hidden lg:hidden pb-4">
                    <div class="flex flex-col space-y-3">
                        <a href="#solution" class="text-gray-700 hover:text-tech-blue transition font-medium py-2">解决方案</a>
                        <a href="#plans" class="text-gray-700 hover:text-tech-blue transition font-medium py-2">改造方案</a>
                        <a href="#cases" class="text-gray-700 hover:text-tech-blue transition font-medium py-2">成功案例</a>
                        <a href="#process" class="text-gray-700 hover:text-tech-blue transition font-medium py-2">合作流程</a>
                        <a href="#advantages" class="text-gray-700 hover:text-tech-blue transition font-medium py-2">我们的优势</a>
                        <a href="#contact" class="bg-esports-red text-white px-6 py-3 rounded-lg transition font-semibold text-center">
                            <i class="fas fa-phone-alt mr-2"></i>立即咨询
                        </a>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section id="hero" class="relative pt-20 lg:pt-24 bg-gradient-to-br from-tech-blue-dark via-tech-blue to-tech-blue-light text-white overflow-hidden">
            <div class="absolute inset-0 opacity-10">
                <div class="absolute top-20 left-10 w-64 h-64 bg-esports-red rounded-full filter blur-3xl"></div>
                <div class="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
            </div>
            
            <div class="container mx-auto px-4 lg:px-8 py-16 lg:py-24 relative z-10">
                <div class="max-w-4xl mx-auto text-center">
                    <!-- 主标题 -->
                    <h1 class="text-3xl lg:text-5xl xl:text-6xl font-black leading-tight mb-6">
                        闲置客房变身<span class="text-esports-red">高收益电竞房</span><br class="hidden lg:block">
                        <span class="text-2xl lg:text-4xl xl:text-5xl">3-6个月回本，营收提升30%-80%</span>
                    </h1>
                    
                    <!-- 副标题 -->
                    <p class="text-lg lg:text-xl text-gray-200 mb-8 lg:mb-10 leading-relaxed">
                        专业一站式电竞房改造服务，无需酒店投入人力精力<br class="hidden lg:block">
                        从设备采购到装修设计，从客源引流到售后维护，全程托管<br class="hidden lg:block">
                        <span class="text-yellow-300 font-bold">让您的闲置房间成为持续盈利的黄金资产</span>
                    </p>
                    
                    <!-- 数据亮点 -->
                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10 lg:mb-12">
                        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 lg:p-6 border border-white/20">
                            <div class="text-3xl lg:text-4xl font-black text-yellow-300 mb-2">30%-80%</div>
                            <div class="text-sm lg:text-base text-gray-200">营收提升</div>
                        </div>
                        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 lg:p-6 border border-white/20">
                            <div class="text-3xl lg:text-4xl font-black text-yellow-300 mb-2">3-6月</div>
                            <div class="text-sm lg:text-base text-gray-200">回本周期</div>
                        </div>
                        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 lg:p-6 border border-white/20">
                            <div class="text-3xl lg:text-4xl font-black text-yellow-300 mb-2">40%↓</div>
                            <div class="text-sm lg:text-base text-gray-200">空置率下降</div>
                        </div>
                        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 lg:p-6 border border-white/20">
                            <div class="text-3xl lg:text-4xl font-black text-yellow-300 mb-2">85%+</div>
                            <div class="text-sm lg:text-base text-gray-200">客户复购率</div>
                        </div>
                    </div>
                    
                    <!-- CTA Buttons -->
                    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a href="#contact" class="w-full sm:w-auto bg-esports-red hover:bg-esports-red-dark text-white px-8 lg:px-10 py-4 lg:py-5 rounded-lg transition font-bold text-base lg:text-lg shadow-2xl transform hover:scale-105">
                            <i class="fas fa-gift mr-2"></i>免费获取改造方案
                        </a>
                        <a href="#cases" class="w-full sm:w-auto bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white px-8 lg:px-10 py-4 lg:py-5 rounded-lg transition font-bold text-base lg:text-lg">
                            <i class="fas fa-chart-line mr-2"></i>查看成功案例
                        </a>
                    </div>
                </div>
            </div>
            
            <!-- Wave Bottom -->
            <div class="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
                    <path d="M0 0L60 8C120 16 240 32 360 37.3C480 43 600 37 720 32C840 27 960 21 1080 21.3C1200 21 1320 27 1380 29.3L1440 32V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V0Z" fill="white"/>
                </svg>
            </div>
        </section>

        <!-- Pain Points Section -->
        <section id="pain-points" class="py-16 lg:py-24 bg-gray-50">
            <div class="container mx-auto px-4 lg:px-8">
                <div class="text-center mb-12 lg:mb-16">
                    <h2 class="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
                        您的酒店是否面临这些困境？
                    </h2>
                    <p class="text-lg lg:text-xl text-gray-600">
                        传统酒店经营模式已经无法满足市场需求，转型迫在眉睫
                    </p>
                </div>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    <!-- Pain Point 1 -->
                    <div class="bg-white rounded-xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition group">
                        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-esports-red transition">
                            <i class="fas fa-bed text-2xl text-red-500 group-hover:text-white transition"></i>
                        </div>
                        <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-4">闲置房间多，利用率低</h3>
                        <p class="text-gray-600 leading-relaxed">
                            淡季空置率高达50%以上，房间空着就是亏钱，每天都在损失成本
                        </p>
                    </div>
                    
                    <!-- Pain Point 2 -->
                    <div class="bg-white rounded-xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition group">
                        <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-esports-red transition">
                            <i class="fas fa-chart-line text-2xl text-orange-500 group-hover:text-white transition" style="transform: rotate(180deg);"></i>
                        </div>
                        <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-4">营收持续下滑</h3>
                        <p class="text-gray-600 leading-relaxed">
                            房价上不去，入住率下不来，年营收逐年下降，投资回报周期越来越长
                        </p>
                    </div>
                    
                    <!-- Pain Point 3 -->
                    <div class="bg-white rounded-xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition group">
                        <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-esports-red transition">
                            <i class="fas fa-users text-2xl text-yellow-600 group-hover:text-white transition"></i>
                        </div>
                        <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-4">客群老化，年轻人不来</h3>
                        <p class="text-gray-600 leading-relaxed">
                            缺乏吸引年轻客群的特色项目，18-35岁高消费人群流失严重
                        </p>
                    </div>
                    
                    <!-- Pain Point 4 -->
                    <div class="bg-white rounded-xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition group">
                        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-esports-red transition">
                            <i class="fas fa-clone text-2xl text-green-600 group-hover:text-white transition"></i>
                        </div>
                        <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-4">同质化严重，缺乏竞争力</h3>
                        <p class="text-gray-600 leading-relaxed">
                            周边酒店价格战激烈，没有差异化卖点，只能靠降价吸引客户
                        </p>
                    </div>
                    
                    <!-- Pain Point 5 -->
                    <div class="bg-white rounded-xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition group">
                        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-esports-red transition">
                            <i class="fas fa-calendar-alt text-2xl text-blue-600 group-hover:text-white transition"></i>
                        </div>
                        <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-4">淡旺季明显，收益不稳</h3>
                        <p class="text-gray-600 leading-relaxed">
                            旺季赚钱淡季亏，全年收益波动大，现金流不稳定影响经营
                        </p>
                    </div>
                    
                    <!-- Pain Point 6 -->
                    <div class="bg-white rounded-xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition group">
                        <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-esports-red transition">
                            <i class="fas fa-money-bill-wave text-2xl text-purple-600 group-hover:text-white transition"></i>
                        </div>
                        <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-4">改造成本高，不敢尝试</h3>
                        <p class="text-gray-600 leading-relaxed">
                            担心投入大量资金后效果不佳，不知道如何选择靠谱的改造方案
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Solution Section -->
        <section id="solution" class="py-16 lg:py-24 bg-white">
            <div class="container mx-auto px-4 lg:px-8">
                <div class="text-center mb-12 lg:mb-16">
                    <div class="inline-block bg-tech-blue/10 text-tech-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <i class="fas fa-lightbulb mr-2"></i>解决方案
                    </div>
                    <h2 class="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
                        电竞房改造：盘活闲置资产的<span class="text-esports-red">有效方案</span>
                    </h2>
                    <p class="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                        抓住电竞市场机遇，将闲置客房升级为特色电竞房<br class="hidden lg:block">
                        吸引年轻消费群体，提升房间利用率和营收水平
                    </p>
                </div>
                
                <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
                    <div>
                        <div class="space-y-6">
                            <div class="flex items-start space-x-4">
                                <div class="flex-shrink-0 w-12 h-12 bg-tech-blue rounded-lg flex items-center justify-center">
                                    <i class="fas fa-rocket text-white text-xl"></i>
                                </div>
                                <div>
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">合理提升房价</h3>
                                    <p class="text-gray-600">根据区域定位，电竞房定价在200-600元/晚，比普通客房有一定溢价空间</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start space-x-4">
                                <div class="flex-shrink-0 w-12 h-12 bg-tech-blue rounded-lg flex items-center justify-center">
                                    <i class="fas fa-users text-white text-xl"></i>
                                </div>
                                <div>
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">吸引18-35岁年轻客群</h3>
                                    <p class="text-gray-600">电竞爱好者对配置要求高，愿意为优质体验支付合理溢价，复购意愿较强</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start space-x-4">
                                <div class="flex-shrink-0 w-12 h-12 bg-tech-blue rounded-lg flex items-center justify-center">
                                    <i class="fas fa-calendar-check text-white text-xl"></i>
                                </div>
                                <div>
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">稳定提升入住率</h3>
                                    <p class="text-gray-600">电竞房受节假日和季节影响较小，有助于提高闲置房间的整体利用率</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start space-x-4">
                                <div class="flex-shrink-0 w-12 h-12 bg-tech-blue rounded-lg flex items-center justify-center">
                                    <i class="fas fa-shield-alt text-white text-xl"></i>
                                </div>
                                <div>
                                    <h3 class="text-xl font-bold text-gray-900 mb-2">零风险一站式托管</h3>
                                    <p class="text-gray-600">从设计到运营全程托管，您只需提供场地，坐等收益</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-tech-blue to-tech-blue-light rounded-2xl p-8 lg:p-12 text-white">
                        <h3 class="text-3xl lg:text-4xl font-black mb-6">真实改造案例数据</h3>
                        <div class="mb-6 text-base text-blue-100">
                            <i class="fas fa-map-marker-alt mr-2"></i>浙江某连锁酒店（人民广场核心商圈）
                        </div>
                        <div class="space-y-6">
                            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                                <div class="flex justify-between items-center mb-3">
                                    <span class="text-lg text-gray-200">普通客房（改造前）</span>
                                    <span class="text-3xl font-bold">¥200/晚</span>
                                </div>
                                <div class="text-base text-gray-300">平均入住率：60%</div>
                            </div>
                            
                            <div class="text-center">
                                <i class="fas fa-arrow-down text-4xl text-yellow-300"></i>
                            </div>
                            
                            <div class="bg-esports-red/20 backdrop-blur-sm rounded-lg p-6 border-2 border-yellow-300">
                                <div class="flex justify-between items-center mb-4">
                                    <span class="text-lg text-white font-semibold">电竞房（改造后）</span>
                                    <span class="text-4xl font-black text-yellow-300">¥300/晚</span>
                                </div>
                                <div class="text-center mb-4">
                                    <div class="text-base text-yellow-100 mb-2">房价提升</div>
                                    <div class="text-4xl font-black text-yellow-300">50%</div>
                                </div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="bg-white/10 rounded-lg p-4 text-center">
                                        <div class="text-3xl font-black text-yellow-300">95%+</div>
                                        <div class="text-sm text-gray-300 mt-2">电竞房出租率</div>
                                    </div>
                                    <div class="bg-white/10 rounded-lg p-4 text-center">
                                        <div class="text-3xl font-black text-yellow-300">90%</div>
                                        <div class="text-sm text-gray-300 mt-2">整体入住率</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="bg-yellow-300 text-tech-blue-dark rounded-lg p-6">
                                <div class="text-center mb-4">
                                    <div class="text-base font-semibold mb-4">核心改造成果</div>
                                    <div class="grid grid-cols-2 gap-4">
                                        <div>
                                            <div class="text-4xl font-black">50%</div>
                                            <div class="text-sm mt-2">房价提升</div>
                                        </div>
                                        <div>
                                            <div class="text-4xl font-black">35%↑</div>
                                            <div class="text-sm mt-2">入住率提升</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-sm text-center text-tech-blue pt-4 border-t border-tech-blue/20">
                                    电竞植入能为酒店在淡季产生比普通客房更高的溢价
                                </div>
                            </div>
                            
                            <div class="text-sm text-blue-100 text-center mt-4">
                                *数据来源于真实合作案例，已脱敏处理。实际收益受区域、定位、运营等多因素影响
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Plans Section -->
        <section id="plans" class="py-16 lg:py-24 bg-gray-50">
            <div class="container mx-auto px-4 lg:px-8">
                <div class="text-center mb-12 lg:mb-16">
                    <div class="inline-block bg-tech-blue/10 text-tech-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <i class="fas fa-layer-group mr-2"></i>改造方案
                    </div>
                    <h2 class="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
                        三款实战方案，适配不同区域
                    </h2>
                    <p class="text-lg lg:text-xl text-gray-600">
                        存量商旅酒店改造中高端电竞房，预期入住率85%，回本周期2.5-10年
                    </p>
                </div>
                
                <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
                    <!-- Plan 1: 核心商圈旗舰版 - 投资最高80万，回本最快4-5个月 -->
                    <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 relative flex flex-col">
                        <div class="absolute top-4 right-4 bg-esports-red text-white px-3 py-1 text-xs font-bold rounded-full">
                            推荐
                        </div>
                        <div class="bg-gradient-to-br from-tech-blue to-tech-blue-light p-6 text-white text-center">
                            <h3 class="text-2xl font-black mb-2">核心商圈旗舰版</h3>
                            <p class="text-blue-100 text-sm">中高端定位，快速回本</p>
                            <div class="mt-6">
                                <div class="text-4xl font-black">¥80万</div>
                                <div class="text-blue-100 text-sm mt-1">总改造成本 | 30间房</div>
                            </div>
                        </div>
                        
                        <div class="p-6 lg:p-8 flex-1 flex flex-col">
                            <div class="mb-6">
                                <div class="bg-blue-50 rounded-lg p-4 mb-4">
                                    <div class="flex justify-between items-center text-sm mb-2">
                                        <span class="text-gray-700">改造规模</span>
                                        <span class="font-bold text-tech-blue">1-2层，30间</span>
                                    </div>
                                    <div class="flex justify-between items-center text-sm mb-2">
                                        <span class="text-gray-700">均价定位</span>
                                        <span class="font-bold text-tech-blue">¥360/晚</span>
                                    </div>
                                    <div class="flex justify-between items-center text-sm">
                                        <span class="text-gray-700">投资回报</span>
                                        <span class="font-bold text-esports-red">4-5个月回本</span>
                                    </div>
                                </div>
                                
                                <div class="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-4">
                                    <div class="text-sm text-gray-700 mb-2"><strong>财务预期：</strong></div>
                                    <div class="text-sm text-gray-600 space-y-1">
                                        <div>• 年营业额：约300万</div>
                                        <div>• 年利润：约220万</div>
                                        <div>• 业主投入：80万</div>
                                        <div>• 入住率：85%</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="mb-6">
                                <h4 class="font-bold text-gray-900 mb-3">房型配置：</h4>
                                <ul class="space-y-2 text-sm">
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-tech-blue mr-2 mt-1"></i>
                                        <span class="text-gray-700">单人间 30%（RTX5060）</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-tech-blue mr-2 mt-1"></i>
                                        <span class="text-gray-700">大床房 50%（双RTX5060Ti/5070）核心</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-tech-blue mr-2 mt-1"></i>
                                        <span class="text-gray-700">双床房 20%（双RTX5070）溢价</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div class="mb-6 text-sm text-gray-600">
                                <div class="font-semibold mb-1">预算构成：</div>
                                <div>电竞设备60万（75%）+ 软装店招弱电千兆宽带等20万</div>
                            </div>
                            
                            <div class="mt-auto">
                                <a href="#contact" class="block w-full bg-tech-blue hover:bg-tech-blue-dark text-white text-center py-3 rounded-lg font-bold transition">
                                    获取详细方案
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Plan 2: 城市开发区版 - 投资中等60万，回本中等8个月 -->
                    <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 flex flex-col">
                        <div class="bg-gradient-to-br from-green-500 to-green-600 p-6 text-white text-center">
                            <h3 class="text-2xl font-black mb-2">城市开发区版</h3>
                            <p class="text-green-100 text-sm">中等规模，稳健运营</p>
                            <div class="mt-6">
                                <div class="text-4xl font-black">¥60万</div>
                                <div class="text-green-100 text-sm mt-1">总改造成本 | 20间房</div>
                            </div>
                        </div>
                        
                        <div class="p-6 lg:p-8 flex-1 flex flex-col">
                            <div class="mb-6">
                                <div class="bg-green-50 rounded-lg p-4 mb-4">
                                    <div class="flex justify-between items-center text-sm mb-2">
                                        <span class="text-gray-700">改造规模</span>
                                        <span class="font-bold text-green-600">1-2层，20间</span>
                                    </div>
                                    <div class="flex justify-between items-center text-sm mb-2">
                                        <span class="text-gray-700">均价定位</span>
                                        <span class="font-bold text-green-600">¥270/晚</span>
                                    </div>
                                    <div class="flex justify-between items-center text-sm">
                                        <span class="text-gray-700">投资回报</span>
                                        <span class="font-bold text-esports-red">8个月回本</span>
                                    </div>
                                </div>
                                
                                <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
                                    <div class="text-sm text-gray-700 mb-2"><strong>财务预期：</strong></div>
                                    <div class="text-sm text-gray-600 space-y-1">
                                        <div>• 年营业额：约150万</div>
                                        <div>• 年利润：约90万</div>
                                        <div>• 总投入：60万</div>
                                        <div>• 入住率：85%</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="mb-6">
                                <h4 class="font-bold text-gray-900 mb-3">配置亮点：</h4>
                                <ul class="space-y-2 text-sm">
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                                        <span class="text-gray-700">RTX5060及以上显卡</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                                        <span class="text-gray-700">2K高刷显示器</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                                        <span class="text-gray-700">千兆宽带机房</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                                        <span class="text-gray-700">复用原运营团队</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div class="mb-6 text-sm text-gray-600">
                                <div class="font-semibold mb-1">预算构成：</div>
                                <div>电竞设备40万（67%）+ 软装店招机房弱电等20万</div>
                            </div>
                            
                            <div class="mt-auto">
                                <a href="#contact" class="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-lg font-bold transition">
                                    获取详细方案
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Plan 3: 产城融合区商圈版 - 投资最低50万，回本最慢11个月 -->
                    <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 flex flex-col">
                        <div class="bg-gradient-to-br from-purple-600 to-purple-700 p-6 text-white text-center">
                            <h3 class="text-2xl font-black mb-2">产城融合区商圈版</h3>
                            <p class="text-purple-100 text-sm">高性价比，分期扩展</p>
                            <div class="mt-6">
                                <div class="text-4xl font-black">¥50万</div>
                                <div class="text-purple-100 text-sm mt-1">首期成本 | 20间（规划34间）</div>
                            </div>
                        </div>
                        
                        <div class="p-6 lg:p-8 flex-1 flex flex-col">
                            <div class="mb-6">
                                <div class="bg-purple-50 rounded-lg p-4 mb-4">
                                    <div class="flex justify-between items-center text-sm mb-2">
                                        <span class="text-gray-700">改造规模</span>
                                        <span class="font-bold text-purple-600">首期20间</span>
                                    </div>
                                    <div class="flex justify-between items-center text-sm mb-2">
                                        <span class="text-gray-700">均价定位</span>
                                        <span class="font-bold text-purple-600">¥200/晚</span>
                                    </div>
                                    <div class="flex justify-between items-center text-sm">
                                        <span class="text-gray-700">投资回报</span>
                                        <span class="font-bold text-orange-600">11个月回本</span>
                                    </div>
                                </div>
                                
                                <div class="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-4">
                                    <div class="text-sm text-gray-700 mb-2"><strong>财务预期：</strong></div>
                                    <div class="text-sm text-gray-600 space-y-1">
                                        <div>• 年营业额：约110万</div>
                                        <div>• 年利润：约60万</div>
                                        <div>• 总投入：50万</div>
                                        <div>• 入住率：85%</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="mb-6">
                                <h4 class="font-bold text-gray-900 mb-3">房型配置：</h4>
                                <ul class="space-y-2 text-sm">
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-purple-600 mr-2 mt-1"></i>
                                        <span class="text-gray-700">单电脑大床房 30%（RTX5060Ti）</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-purple-600 mr-2 mt-1"></i>
                                        <span class="text-gray-700">双电脑房 60%（双RTX5070）核心</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-purple-600 mr-2 mt-1"></i>
                                        <span class="text-gray-700">3-4人间 10%（多RTX5070）溢价</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div class="mb-6 text-sm text-gray-600">
                                <div class="font-semibold mb-1">预算构成：</div>
                                <div>电竞设备30万（60%）+ 软装店招机房弱电等20万</div>
                            </div>
                            
                            <div class="mt-auto">
                                <a href="#contact" class="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-3 rounded-lg font-bold transition">
                                    获取详细方案
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 通用改造核心提示 -->
                <div class="mt-12 bg-white rounded-xl p-6 lg:p-8 shadow-lg">
                    <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-6 text-center">
                        <i class="fas fa-lightbulb text-yellow-500 mr-2"></i>
                        通用改造核心提示
                    </h3>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-bold text-tech-blue mb-3">选址与规模：</h4>
                            <ul class="space-y-2 text-gray-700">
                                <li class="flex items-start">
                                    <i class="fas fa-map-marker-alt text-esports-red mr-2 mt-1"></i>
                                    <span>电竞消费集中且中高端空白区域</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-building text-esports-red mr-2 mt-1"></i>
                                    <span>改造1-2独立楼层（20-30间）</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-users text-esports-red mr-2 mt-1"></i>
                                    <span>复用原有运营团队</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-bold text-tech-blue mb-3">硬件与定价：</h4>
                            <ul class="space-y-2 text-gray-700">
                                <li class="flex items-start">
                                    <i class="fas fa-desktop text-esports-red mr-2 mt-1"></i>
                                    <span>RTX5060及以上显卡 + 2K高刷显示器</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-percentage text-esports-red mr-2 mt-1"></i>
                                    <span>电竞设备占总预算75%+</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-money-bill-wave text-esports-red mr-2 mt-1"></i>
                                    <span>按区域定价200-350元/晚</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-bold text-tech-blue mb-3">房型策略：</h4>
                            <ul class="space-y-2 text-gray-700">
                                <li class="flex items-start">
                                    <i class="fas fa-bed text-esports-red mr-2 mt-1"></i>
                                    <span>双人电竞房为核心（占比50%+）</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-chart-pie text-esports-red mr-2 mt-1"></i>
                                    <span>搭配单人入门款和多人溢价款</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-star text-esports-red mr-2 mt-1"></i>
                                    <span>预期入住率85%</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-bold text-tech-blue mb-3">运营支持：</h4>
                            <ul class="space-y-2 text-gray-700">
                                <li class="flex items-start">
                                    <i class="fas fa-globe text-esports-red mr-2 mt-1"></i>
                                    <span>入驻主流OTA + 电竞垂直平台</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-handshake text-esports-red mr-2 mt-1"></i>
                                    <span>品牌运营赋能费按客房收入4.5%</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-tools text-esports-red mr-2 mt-1"></i>
                                    <span>全程托管式服务</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="mt-8 text-center">
                    <p class="text-gray-600 mb-4">想了解更详细的改造方案和投资分析？</p>
                    <a href="#contact" class="inline-block bg-esports-red hover:bg-esports-red-dark text-white px-8 py-3 rounded-lg font-bold transition">
                        <i class="fas fa-phone-alt mr-2"></i>免费上门勘察评估
                    </a>
                </div>
            </div>
        </section>

        <!-- Cases Section -->
        <section id="cases" class="py-16 lg:py-24 bg-white">
            <div class="container mx-auto px-4 lg:px-8">
                <div class="text-center mb-12 lg:mb-16">
                    <div class="inline-block bg-tech-blue/10 text-tech-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <i class="fas fa-trophy mr-2"></i>成功案例
                    </div>
                    <h2 class="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
                        真实数据，看得见的收益
                    </h2>
                    <p class="text-lg lg:text-xl text-gray-600">
                        已为超过200家酒店完成电竞化改造，平均营收提升65%
                    </p>
                </div>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    <!-- Case 1: 华东某全新电竞酒店 -->
                    <div class="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 lg:p-8 border-2 border-gray-200 hover:border-tech-blue transition">
                        <div class="flex items-center justify-between mb-6">
                            <div>
                                <h3 class="text-xl font-bold text-gray-900">华东某全新电竞酒店</h3>
                                <p class="text-sm text-gray-500">全新店整体打造 | 全量房间</p>
                            </div>
                            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <i class="fas fa-star text-green-600 text-xl"></i>
                            </div>
                        </div>
                        
                        <div class="space-y-4 mb-6">
                            <div class="bg-red-50 rounded-lg p-4">
                                <div class="text-sm font-bold text-gray-800 mb-3">改造前：</div>
                                <div class="text-sm text-gray-700 space-y-2">
                                    <div>• 入住率：<span class="font-semibold">约60%</span></div>
                                    <div>• 月营收：<span class="font-semibold">约9.5万元</span></div>
                                    <div>• 空置率：<span class="font-semibold">约40%</span></div>
                                </div>
                            </div>
                            
                            <div class="bg-green-50 rounded-lg p-4">
                                <div class="text-sm font-bold text-gray-800 mb-3">改造后：</div>
                                <div class="text-sm text-gray-700 space-y-2">
                                    <div>• 入住率：<span class="text-green-600 font-black text-base">90%+</span></div>
                                    <div>• 月营收：<span class="text-green-600 font-black text-base">14.6万→20万+</span></div>
                                    <div>• 空置率：<span class="text-green-600 font-black text-base">降至10%以下</span></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-blue-50 rounded-lg p-4 text-center">
                            <div class="text-sm font-semibold text-gray-700 mb-1">总投入 <span class="font-bold">250万元</span></div>
                            <div class="text-3xl font-black text-tech-blue">3年回本</div>
                        </div>
                    </div>
                    
                    <!-- Case 2: 华东某商务酒店 -->
                    <div class="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 lg:p-8 border-2 border-gray-200 hover:border-tech-blue transition">
                        <div class="flex items-center justify-between mb-6">
                            <div>
                                <h3 class="text-xl font-bold text-gray-900">华东某商务酒店</h3>
                                <p class="text-sm text-gray-500">轻量经济型 | 20间改造</p>
                            </div>
                            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <i class="fas fa-building text-blue-600 text-xl"></i>
                            </div>
                        </div>
                        
                        <div class="space-y-4 mb-6">
                            <div class="bg-red-50 rounded-lg p-4">
                                <div class="text-sm font-bold text-gray-800 mb-3">改造前：</div>
                                <div class="text-sm text-gray-700 space-y-2">
                                    <div>• 入住率：<span class="font-semibold">约60%</span></div>
                                    <div>• 月营收：<span class="font-semibold">约13万元</span></div>
                                    <div>• 空置率：<span class="font-semibold">约40%</span></div>
                                </div>
                            </div>
                            
                            <div class="bg-green-50 rounded-lg p-4">
                                <div class="text-sm font-bold text-gray-800 mb-3">改造后：</div>
                                <div class="text-sm text-gray-700 space-y-2">
                                    <div>• 入住率：<span class="text-green-600 font-black text-base">92%+（峰值96%+）</span></div>
                                    <div>• 月营收：<span class="text-green-600 font-black text-base">提升50%+</span></div>
                                    <div>• 空置率：<span class="text-green-600 font-black text-base">不足8%</span></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-green-50 rounded-lg p-4 text-center">
                            <div class="text-sm font-semibold text-gray-700 mb-1">总投入 <span class="font-bold">35万元</span></div>
                            <div class="text-3xl font-black text-green-600">6个月回本</div>
                        </div>
                    </div>
                    
                    <!-- Case 3: 华东某存量酒店 -->
                    <div class="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 lg:p-8 border-2 border-gray-200 hover:border-tech-blue transition">
                        <div class="flex items-center justify-between mb-6">
                            <div>
                                <h3 class="text-xl font-bold text-gray-900">华东某存量酒店</h3>
                                <p class="text-sm text-gray-500">中度进阶方案 | 40间改造</p>
                            </div>
                            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                <i class="fas fa-hotel text-purple-600 text-xl"></i>
                            </div>
                        </div>
                        
                        <div class="space-y-4 mb-6">
                            <div class="bg-red-50 rounded-lg p-4">
                                <div class="text-sm font-bold text-gray-800 mb-3">改造前：</div>
                                <div class="text-sm text-gray-700 space-y-2">
                                    <div>• 入住率：<span class="font-semibold">约50%</span></div>
                                    <div>• 月营收：<span class="font-semibold">约11万元</span></div>
                                    <div>• 空置率：<span class="font-semibold">约50%</span></div>
                                </div>
                            </div>
                            
                            <div class="bg-green-50 rounded-lg p-4">
                                <div class="text-sm font-bold text-gray-800 mb-3">改造后：</div>
                                <div class="text-sm text-gray-700 space-y-2">
                                    <div>• 入住率：<span class="text-green-600 font-black text-base">75%左右</span></div>
                                    <div>• 月营收：<span class="text-green-600 font-black text-base">提升40%+</span></div>
                                    <div>• 空置率：<span class="text-green-600 font-black text-base">降至25%左右</span></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-purple-50 rounded-lg p-4 text-center">
                            <div class="text-sm font-semibold text-gray-700 mb-1">总投入 <span class="font-bold">100万元</span></div>
                            <div class="text-3xl font-black text-purple-600">6个月回本</div>
                        </div>
                    </div>
                </div>
                
                <div class="mt-16 bg-gradient-to-br from-tech-blue to-tech-blue-light rounded-2xl p-8 lg:p-12 text-white">
                    <div class="grid md:grid-cols-4 gap-6 lg:gap-8 text-center">
                        <div>
                            <div class="text-4xl lg:text-5xl font-black mb-2">200+</div>
                            <div class="text-blue-100">合作酒店</div>
                        </div>
                        <div>
                            <div class="text-4xl lg:text-5xl font-black mb-2">3500+</div>
                            <div class="text-blue-100">改造房间</div>
                        </div>
                        <div>
                            <div class="text-4xl lg:text-5xl font-black mb-2">65%</div>
                            <div class="text-blue-100">平均营收提升</div>
                        </div>
                        <div>
                            <div class="text-4xl lg:text-5xl font-black mb-2">98%</div>
                            <div class="text-blue-100">客户满意度</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Process Section -->
        <section id="process" class="py-16 lg:py-24 bg-gray-50">
            <div class="container mx-auto px-4 lg:px-8">
                <div class="text-center mb-12 lg:mb-16">
                    <div class="inline-block bg-tech-blue/10 text-tech-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <i class="fas fa-tasks mr-2"></i>合作流程
                    </div>
                    <h2 class="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
                        简单4步，轻松开启盈利之路
                    </h2>
                    <p class="text-lg lg:text-xl text-gray-600">
                        全程专业团队跟进，零操心托管式服务
                    </p>
                </div>
                
                <div class="max-w-5xl mx-auto">
                    <div class="grid md:grid-cols-4 gap-6 lg:gap-8">
                        <!-- Step 1 -->
                        <div class="relative">
                            <div class="bg-white rounded-xl p-6 lg:p-8 shadow-lg text-center hover:shadow-xl transition">
                                <div class="w-16 h-16 bg-tech-blue rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span class="text-3xl font-black text-white">1</span>
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 mb-3">联系咨询</h3>
                                <p class="text-gray-600 leading-relaxed">
                                    电话/微信联系<br>
                                    了解需求<br>
                                    初步评估
                                </p>
                            </div>
                            <div class="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                                <i class="fas fa-arrow-right text-3xl text-gray-300"></i>
                            </div>
                        </div>
                        
                        <!-- Step 2 -->
                        <div class="relative">
                            <div class="bg-white rounded-xl p-6 lg:p-8 shadow-lg text-center hover:shadow-xl transition">
                                <div class="w-16 h-16 bg-tech-blue rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span class="text-3xl font-black text-white">2</span>
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 mb-3">上门勘察</h3>
                                <p class="text-gray-600 leading-relaxed">
                                    专业团队上门<br>
                                    实地测量评估<br>
                                    定制方案报价
                                </p>
                            </div>
                            <div class="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                                <i class="fas fa-arrow-right text-3xl text-gray-300"></i>
                            </div>
                        </div>
                        
                        <!-- Step 3 -->
                        <div class="relative">
                            <div class="bg-white rounded-xl p-6 lg:p-8 shadow-lg text-center hover:shadow-xl transition">
                                <div class="w-16 h-16 bg-tech-blue rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span class="text-3xl font-black text-white">3</span>
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 mb-3">施工改造</h3>
                                <p class="text-gray-600 leading-relaxed">
                                    签约后快速进场<br>
                                    7-15天完工<br>
                                    验收交付
                                </p>
                            </div>
                            <div class="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                                <i class="fas fa-arrow-right text-3xl text-gray-300"></i>
                            </div>
                        </div>
                        
                        <!-- Step 4 -->
                        <div>
                            <div class="bg-white rounded-xl p-6 lg:p-8 shadow-lg text-center hover:shadow-xl transition">
                                <div class="w-16 h-16 bg-esports-red rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span class="text-3xl font-black text-white">4</span>
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 mb-3">运营支持</h3>
                                <p class="text-gray-600 leading-relaxed">
                                    客源推广引流<br>
                                    售后维护保障<br>
                                    持续盈利
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Advantages Section -->
        <section id="advantages" class="py-16 lg:py-24 bg-white">
            <div class="container mx-auto px-4 lg:px-8">
                <div class="text-center mb-12 lg:mb-16">
                    <div class="inline-block bg-tech-blue/10 text-tech-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <i class="fas fa-crown mr-2"></i>核心优势
                    </div>
                    <h2 class="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
                        为什么选择MICROCONNECT？
                    </h2>
                    <p class="text-lg lg:text-xl text-gray-600">
                        专业团队，成熟体系，让您的投资更安心
                    </p>
                </div>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    <!-- Advantage 1 -->
                    <div class="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 lg:p-8 border-2 border-blue-100 hover:border-tech-blue transition">
                        <div class="w-16 h-16 bg-tech-blue rounded-full flex items-center justify-center mb-6">
                            <i class="fas fa-coins text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-4">低投入高回报</h3>
                        <p class="text-gray-600 leading-relaxed mb-4">
                            单间改造成本2.5万起，3-6个月即可回本，之后全是纯利润，年投资回报率超200%
                        </p>
                        <div class="flex items-center text-esports-red font-semibold">
                            <i class="fas fa-check-circle mr-2"></i>
                            <span>无隐藏费用，报价透明</span>
                        </div>
                    </div>
                    
                    <!-- Advantage 2 -->
                    <div class="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 lg:p-8 border-2 border-green-100 hover:border-tech-blue transition">
                        <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
                            <i class="fas fa-tools text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-4">一站式全包服务</h3>
                        <p class="text-gray-600 leading-relaxed mb-4">
                            从设计、采购、施工到运营推广，全流程托管，您只需提供场地，其他全部交给我们
                        </p>
                        <div class="flex items-center text-esports-red font-semibold">
                            <i class="fas fa-check-circle mr-2"></i>
                            <span>专业团队，省心省力</span>
                        </div>
                    </div>
                    
                    <!-- Advantage 3 -->
                    <div class="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 lg:p-8 border-2 border-purple-100 hover:border-tech-blue transition">
                        <div class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
                            <i class="fas fa-shield-alt text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-4">完善售后保障</h3>
                        <p class="text-gray-600 leading-relaxed mb-4">
                            设备质保2年，免费维修维护，24小时技术支持，设备损坏快速更换，零风险运营
                        </p>
                        <div class="flex items-center text-esports-red font-semibold">
                            <i class="fas fa-check-circle mr-2"></i>
                            <span>长期保障，无后顾之忧</span>
                        </div>
                    </div>
                    
                    <!-- Advantage 4 -->
                    <div class="bg-gradient-to-br from-red-50 to-white rounded-xl p-6 lg:p-8 border-2 border-red-100 hover:border-tech-blue transition">
                        <div class="w-16 h-16 bg-esports-red rounded-full flex items-center justify-center mb-6">
                            <i class="fas fa-users text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-4">客源引流支持</h3>
                        <p class="text-gray-600 leading-relaxed mb-4">
                            接入电竞平台，对接线上渠道，提供营销方案，帮您快速获取精准电竞客户流量
                        </p>
                        <div class="flex items-center text-esports-red font-semibold">
                            <i class="fas fa-check-circle mr-2"></i>
                            <span>不愁客源，持续爆满</span>
                        </div>
                    </div>
                    
                    <!-- Advantage 5 -->
                    <div class="bg-gradient-to-br from-yellow-50 to-white rounded-xl p-6 lg:p-8 border-2 border-yellow-100 hover:border-tech-blue transition">
                        <div class="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-6">
                            <i class="fas fa-laptop text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-4">顶级设备配置</h3>
                        <p class="text-gray-600 leading-relaxed mb-4">
                            与一线品牌直接合作，采购成本低，品质有保障，所有设备均为电竞级专业配置
                        </p>
                        <div class="flex items-center text-esports-red font-semibold">
                            <i class="fas fa-check-circle mr-2"></i>
                            <span>性能强劲，体验一流</span>
                        </div>
                    </div>
                    
                    <!-- Advantage 6 -->
                    <div class="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-6 lg:p-8 border-2 border-indigo-100 hover:border-tech-blue transition">
                        <div class="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-6">
                            <i class="fas fa-chart-line text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-4">数据化运营管理</h3>
                        <p class="text-gray-600 leading-relaxed mb-4">
                            提供智能管理系统，实时监控房间状态、营收数据、客户评价，经营情况一目了然
                        </p>
                        <div class="flex items-center text-esports-red font-semibold">
                            <i class="fas fa-check-circle mr-2"></i>
                            <span>科学管理，精准决策</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="py-16 lg:py-24 bg-gradient-to-br from-gray-900 via-tech-blue-dark to-tech-blue text-white relative overflow-hidden">
            <div class="absolute inset-0 opacity-10">
                <div class="absolute top-10 right-10 w-96 h-96 bg-esports-red rounded-full filter blur-3xl"></div>
                <div class="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
            </div>
            
            <div class="container mx-auto px-4 lg:px-8 relative z-10">
                <div class="text-center mb-12 lg:mb-16">
                    <h2 class="text-3xl lg:text-4xl font-black mb-4">
                        立即咨询，免费获取改造方案
                    </h2>
                    <p class="text-lg lg:text-xl text-gray-300">
                        专业团队为您量身定制最优方案，24小时内响应
                    </p>
                </div>
                
                <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
                    <!-- Contact Info -->
                    <div>
                        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-white/20">
                            <h3 class="text-2xl font-bold mb-8">联系方式</h3>
                            
                            <div class="space-y-6">
                                <div class="flex items-start space-x-4">
                                    <div class="w-12 h-12 bg-esports-red rounded-lg flex items-center justify-center flex-shrink-0">
                                        <i class="fas fa-phone-alt text-white text-xl"></i>
                                    </div>
                                    <div>
                                        <div class="text-sm text-gray-300 mb-1">电话咨询</div>
                                        <div class="text-2xl font-bold">400-888-9999</div>
                                        <div class="text-sm text-gray-400 mt-1">工作日 9:00-18:00</div>
                                    </div>
                                </div>
                                
                                <div class="flex items-start space-x-4">
                                    <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <i class="fab fa-weixin text-white text-xl"></i>
                                    </div>
                                    <div>
                                        <div class="text-sm text-gray-300 mb-1">微信咨询</div>
                                        <div class="text-2xl font-bold">MICROCONNECT01</div>
                                        <div class="text-sm text-gray-400 mt-1">扫码添加，实时在线</div>
                                    </div>
                                </div>
                                
                                <div class="flex items-start space-x-4">
                                    <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <i class="fas fa-envelope text-white text-xl"></i>
                                    </div>
                                    <div>
                                        <div class="text-sm text-gray-300 mb-1">邮箱咨询</div>
                                        <div class="text-xl font-bold">contact@microconnect.com</div>
                                        <div class="text-sm text-gray-400 mt-1">24小时内必回</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="mt-8 pt-8 border-t border-white/20">
                                <h4 class="font-bold mb-4">服务承诺</h4>
                                <ul class="space-y-3 text-gray-300">
                                    <li class="flex items-center">
                                        <i class="fas fa-check-circle text-green-400 mr-3"></i>
                                        <span>免费上门勘察评估</span>
                                    </li>
                                    <li class="flex items-center">
                                        <i class="fas fa-check-circle text-green-400 mr-3"></i>
                                        <span>定制化方案设计</span>
                                    </li>
                                    <li class="flex items-center">
                                        <i class="fas fa-check-circle text-green-400 mr-3"></i>
                                        <span>透明报价无隐藏费用</span>
                                    </li>
                                    <li class="flex items-center">
                                        <i class="fas fa-check-circle text-green-400 mr-3"></i>
                                        <span>2年质保终身维护</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Contact Form -->
                    <div>
                        <div class="bg-white rounded-2xl p-8 lg:p-10 text-gray-900">
                            <h3 class="text-2xl font-bold mb-6 text-gray-900">在线留言</h3>
                            
                            <form id="contact-form" class="space-y-5">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        您的姓名 <span class="text-red-500">*</span>
                                    </label>
                                    <input type="text" name="name" required 
                                           class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tech-blue focus:outline-none transition"
                                           placeholder="请输入您的姓名">
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        联系电话 <span class="text-red-500">*</span>
                                    </label>
                                    <input type="tel" name="phone" required 
                                           class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tech-blue focus:outline-none transition"
                                           placeholder="请输入您的手机号">
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        微信号
                                    </label>
                                    <input type="text" name="wechat" 
                                           class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tech-blue focus:outline-none transition"
                                           placeholder="方便我们添加您（选填）">
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        酒店名称
                                    </label>
                                    <input type="text" name="hotelName" 
                                           class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tech-blue focus:outline-none transition"
                                           placeholder="您的酒店名称（选填）">
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        留言内容
                                    </label>
                                    <textarea name="message" rows="4" 
                                              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tech-blue focus:outline-none transition resize-none"
                                              placeholder="请简单描述您的需求，如：改造房间数量、预算范围、期望回本周期等"></textarea>
                                </div>
                                
                                <button type="submit" 
                                        class="w-full bg-esports-red hover:bg-esports-red-dark text-white py-4 rounded-lg font-bold text-lg transition transform hover:scale-105 shadow-lg">
                                    <i class="fas fa-paper-plane mr-2"></i>
                                    立即提交，获取方案
                                </button>
                                
                                <p class="text-sm text-gray-500 text-center">
                                    <i class="fas fa-lock mr-1"></i>
                                    您的信息我们将严格保密
                                </p>
                            </form>
                            
                            <div id="form-message" class="mt-4 hidden"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-900 text-gray-400 py-8 lg:py-12">
            <div class="container mx-auto px-4 lg:px-8">
                <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-bolt text-esports-red text-2xl"></i>
                        <span class="text-xl font-black text-white">MICROCONNECT</span>
                    </div>
                    
                    <div class="text-center md:text-left">
                        <p>&copy; 2024 MICROCONNECT. 版权所有</p>
                        <p class="text-sm mt-1">专业酒店电竞化改造服务商</p>
                    </div>
                    
                    <div class="flex space-x-4">
                        <a href="#" class="hover:text-white transition">
                            <i class="fab fa-weixin text-2xl"></i>
                        </a>
                        <a href="#" class="hover:text-white transition">
                            <i class="fab fa-weibo text-2xl"></i>
                        </a>
                        <a href="#" class="hover:text-white transition">
                            <i class="fas fa-phone text-2xl"></i>
                        </a>
                    </div>
                </div>
                
                <div class="mt-6 pt-6 border-t border-gray-800 text-center text-sm">
                    <p>服务热线：400-888-9999 | 微信：MICROCONNECT01 | 邮箱：contact@microconnect.com</p>
                </div>
            </div>
        </footer>

        <!-- Back to Top Button -->
        <button id="back-to-top" class="fixed bottom-8 right-8 bg-esports-red hover:bg-esports-red-dark text-white w-12 h-12 rounded-full shadow-lg hidden transition transform hover:scale-110 z-40">
            <i class="fas fa-arrow-up"></i>
        </button>

        <!-- JavaScript -->
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/app.js"></script>
    </body>
    </html>
  `)
})

export default app

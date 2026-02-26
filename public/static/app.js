// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initBackToTop();
    initContactForm();
    initScrollAnimations();
    initCounterAnimations();
});

// 导航栏滚动效果
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// 移动端菜单切换
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // 切换图标
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
        
        // 点击菜单项后关闭移动菜单
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

// 平滑滚动到锚点
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 忽略空锚点
            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 返回顶部按钮
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('hidden');
            } else {
                backToTopBtn.classList.add('hidden');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// 联系表单提交
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                wechat: formData.get('wechat'),
                hotelName: formData.get('hotelName'),
                message: formData.get('message')
            };
            
            // 验证必填字段
            if (!data.name || !data.phone) {
                showMessage('请填写姓名和联系电话', 'error');
                return;
            }
            
            // 验证手机号格式
            const phoneRegex = /^1[3-9]\d{9}$/;
            if (!phoneRegex.test(data.phone)) {
                showMessage('请输入正确的手机号码', 'error');
                return;
            }
            
            // 显示加载状态
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.classList.add('btn-loading');
            submitBtn.disabled = true;
            
            try {
                // 发送数据到后端
                const response = await axios.post('/api/contact', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (response.data.success) {
                    showMessage(response.data.message, 'success');
                    contactForm.reset();
                    
                    // 可以添加更多成功后的操作，如跳转到感谢页面
                    setTimeout(() => {
                        // window.location.href = '/thank-you';
                    }, 2000);
                } else {
                    showMessage(response.data.message || '提交失败，请稍后再试', 'error');
                }
            } catch (error) {
                console.error('表单提交错误:', error);
                showMessage('网络错误，请稍后再试', 'error');
            } finally {
                // 恢复按钮状态
                submitBtn.classList.remove('btn-loading');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }
    
    // 显示消息函数
    function showMessage(message, type) {
        if (formMessage) {
            formMessage.innerHTML = `
                <div class="alert alert-${type}">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} mr-2"></i>
                    ${message}
                </div>
            `;
            formMessage.classList.remove('hidden');
            
            // 3秒后自动隐藏消息
            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 3000);
        } else {
            alert(message);
        }
    }
}

// 滚动动画效果
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// 数字滚动动画
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 动画持续时间
                const step = target / (duration / 16); // 每帧增加的数值
                
                let current = 0;
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 16);
                
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 优化滚动性能
const optimizedScroll = throttle(function() {
    // 滚动时执行的操作
}, 100);

window.addEventListener('scroll', optimizedScroll);

// 图片懒加载（如果需要）
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// 添加页面加载动画
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// 监听页面可见性变化
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面不可见时暂停动画等
        console.log('页面已隐藏');
    } else {
        // 页面可见时恢复
        console.log('页面已显示');
    }
});

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
    // 可以发送错误日志到服务器
});

// 控制台输出品牌信息
console.log('%c MICROCONNECT ', 'background: #0A4D8C; color: #fff; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c 专业酒店电竞化改造服务 ', 'background: #E63946; color: #fff; font-size: 14px; padding: 5px;');
console.log('联系我们: 400-888-9999');

// 统计代码（可以集成 Google Analytics 或其他统计工具）
function trackEvent(category, action, label) {
    // 示例：Google Analytics 事件跟踪
    // gtag('event', action, {
    //     'event_category': category,
    //     'event_label': label
    // });
    console.log(`事件跟踪: ${category} - ${action} - ${label}`);
}

// 跟踪按钮点击
document.querySelectorAll('a[href="#contact"]').forEach(btn => {
    btn.addEventListener('click', function() {
        trackEvent('CTA', 'click', 'Contact Button');
    });
});

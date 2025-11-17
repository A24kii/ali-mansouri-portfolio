const trigger = document.getElementById('logo');
const texts = document.getElementById('texts');
const paragraph = "I am a Front-End Developer with an unexpected foundation: a background in Mathematics education. This unique combination is my greatest strength. Teaching Math taught me how to deconstruct complex problems into logical, step-by-step solutions—a skill I now apply to writing clean, efficient code and creating intuitive user experiences. ";
const texts1 = document.getElementById('texts1');
const paragraph1 = "My passion lies in transforming creative ideas into functional, responsive, and accessible websites. I focus on the front-end, building the visual and interactive parts that users see and love, with a sharp eye for detail and a commitment to modern best practices.";
const fullName = 'MANSOURI';

let timeoutIds = [];
let timeoutIds1 = [];
let splashTimeouts = [];

// دالة شاشة التحميل
function initSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    const splashLogo = document.getElementById('splash-logo');
    
    // إعادة تعيين اللوجو
    splashLogo.textContent = '';
    
    // عرض اللوجو حرفاً حرفاً في شاشة التحميل
    for (let i = 0; i < fullName.length; i++) {
        const timeoutId = setTimeout(() => {
            splashLogo.textContent += fullName[i];
        }, i * 150);
        splashTimeouts.push(timeoutId);
    }
    
    // إخفاء شاشة التحميل بعد الانتهاء من الكتابة
    setTimeout(() => {
        splashScreen.classList.add('fade-out');
        document.body.classList.add('loaded');
        
        // بدء animating النصوص بعد اختفاء الشاشة
        setTimeout(() => {
            showme();
            initScrollAnimations();
        }, 500);
        
    }, fullName.length * 150 + 1000);
}

function showme() {
    // إعادة تعيين العرض
    texts.textContent = '';
    texts1.textContent = '';
    
    // إظهار النص حرفًا بحرف
    for (let i = 0; i < paragraph.length; i++) {
        const timeoutId = setTimeout(() => {
            texts.textContent += paragraph[i];
        }, i * 20);
        timeoutIds1.push(timeoutId);
    }
    
    for (let i = 0; i < paragraph1.length; i++) {
        const timeoutId = setTimeout(() => {
            texts1.textContent += paragraph1[i];
        }, i * 25);
        timeoutIds1.push(timeoutId);
    }
}

function addTitle() {
    // إعادة تعيين العرض
    trigger.textContent = '';
    
    // إظهار الاسم حرفًا بحرف
    for (let i = 0; i < fullName.length; i++) {
        const timeoutId = setTimeout(() => {
            trigger.textContent += fullName[i];
        }, i * 100);
        timeoutIds.push(timeoutId);
    }
}

function outTitle() {
    // إلغاء جميع المؤقتات وإعادة تعيين العرض
    timeoutIds.forEach(id => clearTimeout(id));
    timeoutIds = [];
    trigger.textContent = 'M';
}

// دالة لإظهار/إخفاء القائمة المنسدلة
function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
}

function closeMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('active');
}

// إغلاق القائمة عند النقر خارجها
document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    if (!navbar.contains(event.target)) {
        navMenu.classList.remove('active');
    }
});

// دالة لتحريك العناصر عند التمرير
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 200);
            }
        });
    }, observerOptions);

    // تطبيق الحركات على البطاقات والعناصر
    const animatedElements = document.querySelectorAll('.card, .aboutme, .expr, .stude');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // إغلاق القائمة المنسدلة إذا كانت مفتوحة
            closeMenu();
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// بدء تشغيل الموقع عند تحميل الصفحة
window.addEventListener('load', function() {
    setTimeout(initSplashScreen, 500);
});


// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
}

themeToggle.addEventListener('click', () => {
    const theme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
});

function updateThemeIcon(theme) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Mobile Menu
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    mobileMenuToggle.setAttribute('aria-expanded', 'true');
});

mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Typed Effect
const typed = document.querySelector('.typed');
const strings = ['Full Stack Developer', 'CyberSec Enthusiast', 'Problem Solver'];
let stringIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentString = strings[stringIndex];
    
    if (isDeleting) {
        typed.textContent = currentString.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typed.textContent = currentString.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentString.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        stringIndex = (stringIndex + 1) % strings.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeEffect, typeSpeed);
}

// Start typing effect
if (typed) {
    typeEffect();
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.section-title, .skill-category, .timeline-item, .project-card, .stat-card');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// Counter Animation
const counters = document.querySelectorAll('.stat-number');
let counterStarted = false;

const startCounter = () => {
    if (counterStarted) return;
    
    const statsSection = document.querySelector('.stats-grid');
    const sectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight - 100) {
        counterStarted = true;
        
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = target % 1 === 0 ? Math.floor(current) : current.toFixed(2);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target % 1 === 0 ? target : target.toFixed(2);
                }
            };
            
            updateCounter();
        });
    }
};

window.addEventListener('scroll', startCounter);

// Toast helper
function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Form Submission with Formspree + mailto fallback
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = String(formData.get('name') || '').trim();
        const email = String(formData.get('email') || '').trim();
        const message = String(formData.get('message') || '').trim();

        if (!name || !email || !message) {
            showToast('Please fill out all fields.');
            return;
        }

        // Set your Formspree endpoint here if available
        const formspreeEndpoint = '';
        if (formspreeEndpoint) {
            try {
                const res = await fetch(formspreeEndpoint, {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    body: new URLSearchParams({ name, email, message })
                });
                if (res.ok) {
                    showToast(`Thanks ${name}! Your message was sent.`);
                    contactForm.reset();
                    return;
                }
                throw new Error('Network response was not ok');
            } catch (err) {
                // proceed to mailto fallback
            }
        }

        // mailto fallback
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
        window.location.href = `mailto:singhswayam268@gmail.com?subject=${subject}&body=${body}`;
        showToast('Opening your email client...');
        contactForm.reset();
    });
}

// Navbar Background on Scroll
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(var(--bg-primary-rgb), 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--bg-primary)';
    }
});

// Active Navigation Link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Parallax Effect for Hero Background
const heroSection = document.querySelector('.hero');
const heroBg = document.querySelector('.hero-bg');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (heroBg) {
        heroBg.style.transform = `translateY(${rate}px)`;
    }
});

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.className = 'loading';
    loader.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 300);
    }, 1000);
});

// Add Custom Cursor (optional)
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Easter Egg - Konami Code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiPattern.length - 1, konamiCode.length - konamiPattern.length);
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiPattern)) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    alert('🎉 Congratulations! You found the easter egg! You have a keen eye for detail - just what we need in a developer!');
    document.body.style.animation = 'glitch 0.5s ease';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 500);
}

// Performance Optimization - Lazy Loading Images
const images = document.querySelectorAll('img[data-src]');
const imageOptions = {
    threshold: 0,
    rootMargin: '0px 0px 300px 0px'
};

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
}, imageOptions);

images.forEach(img => imageObserver.observe(img));

// Console Message
console.log('%c👋 Hey there, fellow developer!', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cLooking under the hood? I like your style! Feel free to reach out if you want to discuss code or opportunities.', 'font-size: 16px; color: #818cf8;');
console.log('%c📧 singhswayam268@gmail.com', 'font-size: 14px; color: #a78bfa;');
console.log('%c💼 https://linkedin.com/in/swayam-singh-118774297', 'font-size: 14px; color: #a78bfa;');
console.log('%c🐙 https://github.com/sswayamm7', 'font-size: 14px; color: #a78bfa;');

// Add smooth reveal for about section text
const aboutText = document.querySelector('.about-text');
const aboutStats = document.querySelector('.stats-grid');

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('about-text')) {
                entry.target.classList.add('animate-left');
            }
            if (entry.target.classList.contains('stats-grid')) {
                entry.target.classList.add('animate-right');
            }
        }
    });
}, { threshold: 0.1 });

if (aboutText) aboutObserver.observe(aboutText);
if (aboutStats) aboutObserver.observe(aboutStats);
document.addEventListener('DOMContentLoaded', () => {
    
    // Theme Toggle Logic
    const themeToggle = document.getElementById('themeToggle');
    const htmlEl = document.documentElement;
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlEl.setAttribute('data-theme', savedTheme);
    }
    
    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlEl.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            if (newTheme === 'dark') {
                htmlEl.removeAttribute('data-theme');
            } else {
                htmlEl.setAttribute('data-theme', newTheme);
            }
            
            localStorage.setItem('theme', newTheme);
        });
    }
    
    // Clean URL (Remove index.html, index, and hash) to keep address bar clean
    if (window.history.replaceState) {
        const path = window.location.pathname;
        // Regex to match /index.html or /index at the end of the path
        const cleanPath = path.replace(/\/index(\.html)?$/, '/');
        
        // If path needs cleaning or we have a hash
        if (path !== cleanPath || window.location.hash) {
             window.history.replaceState(null, document.title, cleanPath + window.location.search);
        }
    }

    // Modal Logic
    const modal = document.querySelector('.modal-overlay');
    const modalContainer = document.querySelector('.modal-container');
    const demoTriggers = document.querySelectorAll('.demo-trigger');
    const closeButtons = document.querySelectorAll('.modal-close, .modal-close-btn');

    function openModal(e) {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    demoTriggers.forEach(btn => btn.addEventListener('click', openModal));

    closeButtons.forEach(btn => btn.addEventListener('click', closeModal));

    // Close on click outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }


    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Optional: Do not update URL hash to keep it clean
            // If you wanted to update it, you'd use history.pushState. 
            // By doing nothing here, preventing default keeps URL clean.
        });
    });

    // Intersection Observer for Fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = [
        '.hero-content', 
        '.hero-image', 
        '.about-text', 
        '.skills-grid', 
        '.resume-item',
        '.project-card',
        '.contact-container'
    ];

    animatedElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('fade-in-section');
            observer.observe(el);
        });
    });
});

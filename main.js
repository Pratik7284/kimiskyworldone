// SkyWorld One - Main JavaScript File

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initAnimations();
    initScrollEffects();
    initTypewriter();
    initMobileMenu();
});

// Navigation functionality
function initNavigation() {
    const tradingDropdown = document.getElementById('tradingDropdown');
    const tradingMenu = document.getElementById('tradingMenu');
    
    if (tradingDropdown && tradingMenu) {
        let timeout;
        
        tradingDropdown.addEventListener('mouseenter', () => {
            clearTimeout(timeout);
            tradingMenu.classList.add('active');
        });
        
        tradingDropdown.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => {
                tradingMenu.classList.remove('active');
            }, 100);
        });
        
        tradingMenu.addEventListener('mouseenter', () => {
            clearTimeout(timeout);
            tradingMenu.classList.add('active');
        });
        
        tradingMenu.addEventListener('mouseleave', () => {
            tradingMenu.classList.remove('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Typewriter effect for hero text
function initTypewriter() {
    const heroText = document.getElementById('heroText');
    if (heroText && typeof Typed !== 'undefined') {
        // Only initialize if Typed.js is available
        try {
            new Typed('#heroText', {
                strings: ['A World of Capability', 'Global Excellence', 'Strategic Solutions'],
                typeSpeed: 80,
                backSpeed: 50,
                backDelay: 2000,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        } catch (error) {
            console.log('Typed.js not available, using static text');
        }
    }
}

// Scroll effects and reveal animations
function initScrollEffects() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-bg');
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Main animations using Anime.js
function initAnimations() {
    // Animate practice cards on load
    if (typeof anime !== 'undefined') {
        // Stagger animation for practice cards
        anime({
            targets: '.practice-card',
            translateY: [50, 0],
            opacity: [0, 1],
            delay: anime.stagger(200),
            duration: 800,
            easing: 'easeOutQuart'
        });
        
        // Floating elements animation
        anime({
            targets: '.floating',
            translateY: [-10, 10],
            duration: 3000,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine'
        });
        
        // Market regions hover animation
        const marketRegions = document.querySelectorAll('.market-region');
        marketRegions.forEach(region => {
            region.addEventListener('mouseenter', () => {
                anime({
                    targets: region,
                    scale: 1.1,
                    duration: 300,
                    easing: 'easeOutQuart'
                });
            });
            
            region.addEventListener('mouseleave', () => {
                anime({
                    targets: region,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuart'
                });
            });
        });
    }
}

// Contact form functionality (for contact page)
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateContactForm(data)) {
                // Show loading state
                showFormLoading();
                
                // Simulate form submission
                setTimeout(() => {
                    showFormSuccess();
                }, 2000);
            }
        });
    }
}

// Form validation
function validateContactForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.inquiryType) {
        errors.push('Please select an inquiry type');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters');
    }
    
    if (errors.length > 0) {
        showFormErrors(errors);
        return false;
    }
    
    return true;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Form state handlers
function showFormLoading() {
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    if (submitBtn) {
        submitBtn.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
        `;
        submitBtn.disabled = true;
    }
}

function showFormSuccess() {
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        formContainer.innerHTML = `
            <div class="text-center py-12">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-2">Message Sent Successfully</h3>
                <p class="text-gray-600">Thank you for your enquiry. We'll get back to you within 24 hours.</p>
            </div>
        `;
    }
}

function showFormErrors(errors) {
    const errorContainer = document.getElementById('formErrors');
    if (errorContainer) {
        errorContainer.innerHTML = errors.map(error => 
            `<div class="text-red-600 text-sm mb-2">• ${error}</div>`
        ).join('');
        
        // Clear errors after 5 seconds
        setTimeout(() => {
            errorContainer.innerHTML = '';
        }, 5000);
    }
}

// Utility functions
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

// Initialize contact form when on contact page
if (window.location.pathname.includes('contact.html')) {
    document.addEventListener('DOMContentLoaded', initContactForm);
}

// Export functions for use in other files
window.SkyWorldOne = {
    initContactForm,
    validateContactForm,
    showFormSuccess,
    showFormErrors
};
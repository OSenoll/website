/**
 * ALFAS Portfolio - Modern Interactive JavaScript
 * Enhanced user experience with smooth animations and interactions
 */

(function() {
    'use strict';

    // ========================================
    // GLOBAL VARIABLES
    // ========================================
    let navbar = null;
    let backToTopBtn = null;
    let loader = null;
    let portfolioItems = null;
    let filterBtns = null;

    // ========================================
    // INITIALIZATION
    // ========================================
    document.addEventListener('DOMContentLoaded', function() {
        initializeElements();
        initializeLoader();
        initializeNavigation();
        initializeScrollEffects();
        initializePortfolioFilter();
        initializeContactForm();
        initializeAnimations();
        initializeLightbox();
        
        // Initialize AOS (Animate On Scroll)
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                once: true,
                offset: 100,
                easing: 'ease-out-cubic'
            });
        }
    });

    // ========================================
    // ELEMENT INITIALIZATION
    // ========================================
    function initializeElements() {
        navbar = document.getElementById('mainNav');
        backToTopBtn = document.getElementById('backToTop');
        loader = document.getElementById('loader');
        portfolioItems = document.querySelectorAll('.portfolio-item');
        filterBtns = document.querySelectorAll('.filter-btn');
    }

    // ========================================
    // LOADER FUNCTIONALITY
    // ========================================
    function initializeLoader() {
        if (!loader) return;

        // Hide loader after page load
        window.addEventListener('load', function() {
            setTimeout(function() {
                loader.classList.add('fade-out');
                setTimeout(function() {
                    if (loader.parentNode) {
                        loader.parentNode.removeChild(loader);
                    }
                }, 600);
            }, 500);
        });
    }

    // ========================================
    // NAVIGATION FUNCTIONALITY
    // ========================================
    function initializeNavigation() {
        if (!navbar) return;

        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const offsetTop = target.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                    
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const navbarToggler = document.querySelector('.navbar-toggler');
                        if (navbarToggler) {
                            navbarToggler.click();
                        }
                    }
                }
            });
        });

        // Update active navigation link on scroll
        window.addEventListener('scroll', function() {
            updateActiveNavLink();
        });
    }

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(function(link) {
                        link.classList.remove('active');
                    });
                    navLink.classList.add('active');
                }
            }
        });
    }

    // ========================================
    // SCROLL EFFECTS
    // ========================================
    function initializeScrollEffects() {
        window.addEventListener('scroll', function() {
            handleNavbarScroll();
            handleBackToTopButton();
        });
    }

    function handleNavbarScroll() {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    function handleBackToTopButton() {
        if (!backToTopBtn) return;

        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }

    // Back to top button click handler
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // PORTFOLIO FILTER FUNCTIONALITY
    // ========================================
    function initializePortfolioFilter() {
        if (!filterBtns.length || !portfolioItems.length) return;

        filterBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active filter button
                filterBtns.forEach(function(filterBtn) {
                    filterBtn.classList.remove('active');
                });
                this.classList.add('active');

                // Filter portfolio items
                filterPortfolioItems(filter);
            });
        });
    }

    function filterPortfolioItems(filter) {
        portfolioItems.forEach(function(item) {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.classList.remove('hide');
                item.style.display = 'block';
            } else {
                item.classList.add('hide');
                setTimeout(function() {
                    if (item.classList.contains('hide')) {
                        item.style.display = 'none';
                    }
                }, 300);
            }
        });
    }

    // ========================================
    // CONTACT FORM FUNCTIONALITY
    // ========================================
    function initializeContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactFormSubmission(this);
        });

        // Add floating label functionality
        const formControls = contactForm.querySelectorAll('.form-control');
        formControls.forEach(function(control) {
            control.addEventListener('focus', function() {
                this.parentNode.classList.add('focused');
            });

            control.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentNode.classList.remove('focused');
                }
            });

            // Check if field has value on load
            if (control.value) {
                control.parentNode.classList.add('focused');
            }
        });
    }

    function handleContactFormSubmission(form) {
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual form handling)
        setTimeout(function() {
            // Success state
            submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
            submitBtn.classList.remove('btn-primary');
            submitBtn.classList.add('btn-success');

            // Show success message
            showNotification('Thank you! Your message has been sent successfully.', 'success');

            // Reset form
            form.reset();
            form.querySelectorAll('.form-group').forEach(function(group) {
                group.classList.remove('focused');
            });

            // Reset button after delay
            setTimeout(function() {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('btn-success');
                submitBtn.classList.add('btn-primary');
            }, 3000);
        }, 2000);
    }

    // ========================================
    // ANIMATIONS
    // ========================================
    function initializeAnimations() {
        // Animate stats counters
        animateCounters();
        
        // Add hover effects to service cards
        addServiceCardEffects();
        
        // Add parallax effect to hero section
        initializeParallax();
    }

    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        counters.forEach(function(counter) {
            observer.observe(counter);
        });
    }

    function animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const suffix = element.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 40);
    }

    function addServiceCardEffects() {
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(function(card) {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    function initializeParallax() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;

        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }

    // ========================================
    // LIGHTBOX FUNCTIONALITY
    // ========================================
    function initializeLightbox() {
        const galleryLinks = document.querySelectorAll('.gallery-item a');
        galleryLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const imageSrc = this.getAttribute('href');
                openLightbox(imageSrc);
            });
        });
    }

    function openLightbox(imageSrc) {
        // Create lightbox modal
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-modal';
        lightbox.innerHTML = `
            <div class="lightbox-backdrop"></div>
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <img src="${imageSrc}" alt="Portfolio Image" class="lightbox-image">
            </div>
        `;

        // Add styles
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.9);
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 30px;
            color: white;
            font-size: 40px;
            font-weight: bold;
            background: none;
            border: none;
            cursor: pointer;
            z-index: 10001;
        `;

        const image = lightbox.querySelector('.lightbox-image');
        image.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        `;

        // Add to DOM
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        // Animate in
        setTimeout(function() {
            lightbox.style.opacity = '1';
        }, 10);

        // Close handlers
        function closeLightbox() {
            lightbox.style.opacity = '0';
            setTimeout(function() {
                if (lightbox.parentNode) {
                    lightbox.parentNode.removeChild(lightbox);
                }
                document.body.style.overflow = '';
            }, 300);
        }

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target.classList.contains('lightbox-backdrop')) {
                closeLightbox();
            }
        });

        // ESC key handler
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
    }

    // ========================================
    // NOTIFICATION SYSTEM
    // ========================================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
                ${message}
            </div>
        `;

        // Styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#2563eb'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(function() {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Auto remove
        setTimeout(function() {
            notification.style.transform = 'translateX(400px)';
            setTimeout(function() {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // ========================================
    // LOAD MORE FUNCTIONALITY
    // ========================================
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more content
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Loading...';
            this.disabled = true;

            setTimeout(function() {
                showNotification('All projects are currently displayed!', 'info');
                loadMoreBtn.innerHTML = 'All Projects Loaded <i class="fas fa-check ms-2"></i>';
                loadMoreBtn.disabled = true;
                loadMoreBtn.classList.remove('btn-outline-primary');
                loadMoreBtn.classList.add('btn-success');
            }, 1500);
        });
    }

    // ========================================
    // UTILITY FUNCTIONS
    // ========================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = function() {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Debounced scroll handler for better performance
    window.addEventListener('scroll', debounce(function() {
        // Additional scroll-based functionality can be added here
    }, 10));

})();

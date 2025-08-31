// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        // Accessibility attributes
        mobileMenuToggle.setAttribute('aria-label', 'Ouvrir le menu de navigation');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.setAttribute('aria-controls', 'navLinks');
        navLinks.setAttribute('id', 'navLinks');

        mobileMenuToggle.addEventListener('click', function () {
            const isOpen = navLinks.classList.toggle('active');
            mobileMenuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            mobileMenuToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.style.boxShadow = 'none';
        } else {
            navbar.style.boxShadow = 'var(--shadow)';
        }

        lastScroll = currentScroll;
    });

    // Stats animation
    const stats = document.querySelectorAll('.stat-number');
    const animationDuration = 2000;

    function animateStats() {
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            const increment = target / (animationDuration / 16);
            let current = 0;

            const updateCount = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current) + '+';
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target + '+';
                }
            };

            updateCount();
        });
    }

    // Intersection Observer for stats animation
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // Partners slider auto-scroll
    const partnersSlider = document.querySelector('.partners-slider');
    if (partnersSlider) {
        let isMouseOver = false;

        partnersSlider.addEventListener('mouseover', () => {
            isMouseOver = true;
        });

        partnersSlider.addEventListener('mouseout', () => {
            isMouseOver = false;
        });

        setInterval(() => {
            if (!isMouseOver) {
                partnersSlider.scrollLeft += 1;
                if (partnersSlider.scrollLeft >= partnersSlider.scrollWidth - partnersSlider.clientWidth) {
                    partnersSlider.scrollLeft = 0;
                }
            }
        }, 30);
    }

    // Gestion du formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Ici, vous pouvez ajouter la logique d'envoi du formulaire
            alert('Message envoyé ! Nous vous recontacterons bientôt.');
            contactForm.reset();
        });
    }

    
});



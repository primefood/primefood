// Simple Prime Food Marketing JavaScript - Clean & Minimal

(function() {
    'use strict';

    // ========== HAMBURGER MENU ==========
    function initHamburgerMenu() {
        const hamburger = document.getElementById('hamburgerBtn');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.main-nav a');

        if (!hamburger || !navMenu) return;

        // Toggle menu
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Handle dropdown on mobile
        const dropdownItems = document.querySelectorAll('.dropdown');
        dropdownItems.forEach(dropdown => {
            const dropdownLink = dropdown.querySelector('a');

            dropdownLink.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        });
    }

    // ========== HERO SLIDESHOW ==========
    function initHeroSlideshow() {
        const slides = document.querySelectorAll('.hero-slide');
        let currentSlide = 0;

        function showNextSlide() {
            // Remove active class from current slide
            slides[currentSlide].classList.remove('active');

            // Move to next slide
            currentSlide = (currentSlide + 1) % slides.length;

            // Add active class to new slide
            slides[currentSlide].classList.add('active');
        }

        // Change slide every 4 seconds
        if (slides.length > 1) {
            setInterval(showNextSlide, 4000);
        }
    }

    // ========== IMAGE POPUP GALLERY ==========
    function initImagePopup() {
        const modal = document.getElementById('imagePopupModal');
        const popupImage = document.getElementById('popupImage');
        const closeBtn = document.querySelector('.image-popup-close');
        const prevBtn = document.querySelector('.image-popup-prev');
        const nextBtn = document.querySelector('.image-popup-next');
        const overlay = document.querySelector('.image-popup-overlay');
        const currentIndexSpan = document.getElementById('currentImageIndex');
        const totalImagesSpan = document.getElementById('totalImages');

        let currentIndex = 0;
        let images = [];

        // Collect all gallery images
        function collectGalleryImages() {
            const galleryImages = document.querySelectorAll('.gallery-item');
            images = Array.from(galleryImages).map(img => img.src);
            totalImagesSpan.textContent = images.length;
        }

        // Open modal
        function openModal(index) {
            currentIndex = index;
            showImage();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Close modal
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Show current image
        function showImage() {
            if (images.length > 0) {
                popupImage.src = images[currentIndex];
                currentIndexSpan.textContent = currentIndex + 1;
            }
        }

        // Show next image
        function showNextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage();
        }

        // Show previous image
        function showPrevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage();
        }

        // Event listeners
        function attachClickListeners() {
            const galleryImages = document.querySelectorAll('.gallery-item');
            galleryImages.forEach((img, index) => {
                img.addEventListener('click', () => openModal(index));
            });
        }

        // Close button
        closeBtn.addEventListener('click', closeModal);

        // Overlay click to close
        overlay.addEventListener('click', closeModal);

        // Navigation buttons
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showNextImage();
        });

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showPrevImage();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!modal.classList.contains('active')) return;

            switch(e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    showPrevImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        });

        // Initialize
        collectGalleryImages();
        attachClickListeners();
    }

    // ========== SMOOTH SCROLL FOR NAVIGATION ==========
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // Skip if it's just '#'
                if (href === '#') return;

                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    e.preventDefault();
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ========== CONTACT FORM HANDLER ==========
    function initContactForm() {
        const form = document.getElementById('contactForm');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // Create mailto link
            const mailtoLink = `mailto:sales@primefood.com.sg?subject=${encodeURIComponent(data.subject || 'Contact Form Submission')}&body=${encodeURIComponent(
                `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
            )}`;

            // Open mail client
            window.location.href = mailtoLink;

            // Show confirmation
            alert('Opening your email client. Please send the email to complete your message.');
        });
    }

    // ========== ACTIVE NAVIGATION HIGHLIGHT ==========
    function initActiveNavigation() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

        function highlightNavigation() {
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.style.color = '';
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.style.color = '#21836b';
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', highlightNavigation);
        highlightNavigation(); // Initial call
    }

    // ========== INITIALIZE ALL ==========
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initAll);
        } else {
            initAll();
        }
    }

    function initAll() {
        initHamburgerMenu();
        initHeroSlideshow();
        initImagePopup();
        initSmoothScroll();
        initContactForm();
        initActiveNavigation();
    }

    // Start the application
    init();

})();

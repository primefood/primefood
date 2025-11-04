// Hero Slideshow Script
(function() {
  'use strict';

  let currentSlide = 0;
  const slides = document.querySelectorAll('.hero-slide');
  const totalSlides = slides.length;

  if (totalSlides === 0) return;

  function nextSlide() {
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');

    // Move to next slide
    currentSlide = (currentSlide + 1) % totalSlides;

    // Add active class to new slide
    slides[currentSlide].classList.add('active');
  }

  // Change slide every 5 seconds
  setInterval(nextSlide, 5000);
})();

// Smooth Scroll for Menu Links
(function() {
  'use strict';

  // Add smooth scroll behavior to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Skip if href is just "#" or empty
      if (!href || href === '#') return;

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();

        // Smooth scroll to target
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    });
  });
})();

// Contact Form Mailto Handler
(function() {
  'use strict';

  const contactForm = document.getElementById('comp-kegt3yzq');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form values
      const name = document.querySelector('input[name="name"]').value;
      const email = document.querySelector('input[name="email"]').value;
      const subject = document.querySelector('input[name="subject"]').value;
      const message = document.querySelector('textarea[name="message"]').value;

      // Build email content
      const emailSubject = subject || 'Contact Form Submission from ' + name;
      const emailBody =
        'Name: ' + name + '%0D%0A' +
        'Email: ' + email + '%0D%0A%0D%0A' +
        (subject ? 'Subject: ' + subject + '%0D%0A%0D%0A' : '') +
        'Message:%0D%0A' + message;

      // Create mailto link
      const mailtoLink = 'mailto:sales@primefood.com.sg?subject=' +
        encodeURIComponent(emailSubject) +
        '&body=' + emailBody;

      // Open email client
      window.location.href = mailtoLink;

      // Optional: Reset form after submission
      // contactForm.reset();
    });
  }
})();

// Product Gallery Image Popup
(function() {
  'use strict';

  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initImagePopup);
  } else {
    initImagePopup();
  }

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

    // Find all gallery images in the products section
    function collectGalleryImages() {
      images = [];
      const galleryContainer = document.getElementById('pro-gallery-container-comp-jj43zn07');

      if (!galleryContainer) {
        console.warn('Gallery container not found');
        return;
      }

      const imageElements = galleryContainer.querySelectorAll('img[data-hook="gallery-item-image-img"]');

      imageElements.forEach((img, index) => {
        // Get the highest resolution image from srcSet
        const picture = img.closest('picture');
        const source = picture ? picture.querySelector('source') : null;
        let highResUrl = img.src;

        if (source && source.srcset) {
          // Extract all URLs from srcSet
          const srcSetUrls = source.srcset.split(',').map(s => s.trim().split(' ')[0]);
          // Get the highest resolution (last one in the list)
          if (srcSetUrls.length > 0) {
            highResUrl = srcSetUrls[srcSetUrls.length - 1];
          }
        }

        images.push({
          src: highResUrl,
          alt: img.alt || 'Product image ' + (index + 1)
        });
      });

      // Update total images count
      if (totalImagesSpan) {
        totalImagesSpan.textContent = images.length;
      }
    }

    // Open modal with specific image
    function openModal(index) {
      if (images.length === 0) {
        collectGalleryImages();
      }

      if (index < 0 || index >= images.length) return;

      currentIndex = index;
      popupImage.src = images[currentIndex].src;
      popupImage.alt = images[currentIndex].alt;

      if (currentIndexSpan) {
        currentIndexSpan.textContent = currentIndex + 1;
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Close modal
    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }

    // Show previous image
    function showPrevImage() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      popupImage.src = images[currentIndex].src;
      popupImage.alt = images[currentIndex].alt;

      if (currentIndexSpan) {
        currentIndexSpan.textContent = currentIndex + 1;
      }
    }

    // Show next image
    function showNextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      popupImage.src = images[currentIndex].src;
      popupImage.alt = images[currentIndex].alt;

      if (currentIndexSpan) {
        currentIndexSpan.textContent = currentIndex + 1;
      }
    }

    // Add click listeners to all gallery item actions
    function attachClickListeners() {
      const itemActions = document.querySelectorAll('.item-action[data-hook="item-action"]');

      itemActions.forEach((action) => {
        action.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();

          const idx = parseInt(this.getAttribute('data-idx'));
          openModal(idx);
        });
      });
    }

    // Event listeners
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', showPrevImage);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', showNextImage);
    }

    if (overlay) {
      overlay.addEventListener('click', closeModal);
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
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

    // Re-attach listeners if gallery content changes dynamically
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length > 0) {
          collectGalleryImages();
          attachClickListeners();
        }
      });
    });

    const galleryContainer = document.getElementById('pro-gallery-container-comp-jj43zn07');
    if (galleryContainer) {
      observer.observe(galleryContainer, {
        childList: true,
        subtree: true
      });
    }
  }
})();

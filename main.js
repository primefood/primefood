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

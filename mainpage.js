// Mobile Menu Toggle
const mobileBtn = document.getElementById('mobileBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');
const closeIcon = document.getElementById('closeIcon');

if (mobileBtn && mobileMenu) {
  mobileBtn.addEventListener('click', () => {
    const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
    mobileBtn.setAttribute('aria-expanded', !expanded);
    mobileMenu.classList.toggle('hidden');
    
    // Toggle icons
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
  });

  // Close mobile menu when clicking on a link
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileBtn.setAttribute('aria-expanded', 'false');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    });
  });
}

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

function highlightNavigation() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('text-indigo-600', 'font-bold');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('text-indigo-600', 'font-bold');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNavigation);

// Contact Form Validation
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formStatus = document.getElementById('formStatus');

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(element) {
  element.classList.remove('hidden');
}

function hideError(element) {
  element.classList.add('hidden');
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let isValid = true;

    // Validate name
    if (!nameInput.value.trim()) {
      showError(nameError);
      isValid = false;
    } else {
      hideError(nameError);
    }

    // Validate email
    if (!validEmail(emailInput.value.trim())) {
      showError(emailError);
      isValid = false;
    } else {
      hideError(emailError);
    }

    // Validate message
    if (messageInput.value.trim().length < 10) {
      showError(messageError);
      isValid = false;
    } else {
      hideError(messageError);
    }

    if (!isValid) {
      formStatus.textContent = 'Please fix the errors above.';
      formStatus.style.color = '#dc2626';
      return;
    }

    // Success message (demo mode)
    formStatus.textContent = '✓ Message sent successfully! (Demo mode)';
    formStatus.style.color = '#16a34a';
    
    // Reset form after 2 seconds
    setTimeout(() => {
      form.reset();
      formStatus.textContent = '';
    }, 2000);
  });

  // Real-time validation
  nameInput.addEventListener('input', () => {
    if (nameInput.value.trim()) {
      hideError(nameError);
    }
  });

  emailInput.addEventListener('input', () => {
    if (validEmail(emailInput.value.trim())) {
      hideError(emailError);
    }
  });

  messageInput.addEventListener('input', () => {
    if (messageInput.value.trim().length >= 10) {
      hideError(messageError);
    }
  });
}

// Smooth Scroll Enhancement
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

// Scroll to Top Button (Optional Enhancement)
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'fixed bottom-8 right-8 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all opacity-0 pointer-events-none z-50';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.style.opacity = '1';
    scrollToTopBtn.style.pointerEvents = 'auto';
  } else {
    scrollToTopBtn.style.opacity = '0';
    scrollToTopBtn.style.pointerEvents = 'none';
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});

console.log('Portfolio loaded successfully! 🚀');

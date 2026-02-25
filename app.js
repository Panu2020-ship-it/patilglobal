/* ==================== PATIL GLOBAL — MAIN APPLICATION ==================== */

// ===== State =====
let currentPage = 'home';
let isLoggedIn = false;
let mobileMenuOpen = false;

// ===== Loading Screen =====
document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.getElementById('progress-bar');
  const loadingScreen = document.getElementById('loading-screen');
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress > 100) progress = 100;
    progressBar.style.width = progress + '%';

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
          initScrollReveal();
          animateStats();
        }, 500);
      }, 400);
    }
  }, 200);

  // Theme init
  if (localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }

  // Login state init
  if (localStorage.getItem('pg_logged_in') === 'true') {
    isLoggedIn = true;
  }
});

// ===== Theme Toggle =====
function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}

// ===== Mobile Menu =====
function toggleMobileMenu() {
  mobileMenuOpen = !mobileMenuOpen;
  const menu = document.getElementById('mobile-menu');
  const hamburger = document.getElementById('hamburger-icon');
  const close = document.getElementById('close-icon');
  menu.classList.toggle('hidden', !mobileMenuOpen);
  hamburger.classList.toggle('hidden', mobileMenuOpen);
  close.classList.toggle('hidden', !mobileMenuOpen);
}

// ===== SPA Navigation =====
function navigateTo(page) {
  if (page === currentPage) return;

  // Hide all pages
  document.querySelectorAll('.page-content').forEach(p => p.classList.add('hidden'));

  // Show target page
  const target = document.getElementById('page-' + page);
  if (target) {
    // Load page content if empty (lazy loading)
    if (target.innerHTML.trim() === '') {
      loadPageContent(page);
    }
    target.classList.remove('hidden');
  }

  currentPage = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Re-init animations
  setTimeout(() => {
    initScrollReveal();
    if (page === 'home') animateStats();
  }, 100);
}

function loadPageContent(page) {
  const container = document.getElementById('page-' + page);
  switch (page) {
    case 'background-jobs':
      if (typeof renderBackgroundJobsPage === 'function') renderBackgroundJobsPage(container);
      break;
    case 'resume-optimizer':
      if (typeof renderResumeOptimizerPage === 'function') renderResumeOptimizerPage(container);
      break;
    case 'job-assistant':
      if (typeof renderJobAssistantPage === 'function') renderJobAssistantPage(container);
      break;
    case 'internship':
      if (typeof renderInternshipPage === 'function') renderInternshipPage(container);
      break;
  }
}

// ===== Login Modal =====
function openLoginModal() {
  document.getElementById('login-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
  document.getElementById('login-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

function handleGoogleLogin() {
  isLoggedIn = true;
  localStorage.setItem('pg_logged_in', 'true');
  closeLoginModal();
  showToast('✅ Signed in with Google successfully!');
  // Refresh internship page if open
  if (currentPage === 'internship') {
    const container = document.getElementById('page-internship');
    container.innerHTML = '';
    renderInternshipPage(container);
  }
}

function handleEmailLogin(e) {
  e.preventDefault();
  isLoggedIn = true;
  localStorage.setItem('pg_logged_in', 'true');
  closeLoginModal();
  showToast('✅ Signed in successfully!');
  if (currentPage === 'internship') {
    const container = document.getElementById('page-internship');
    container.innerHTML = '';
    renderInternshipPage(container);
  }
}

// ===== Contact Form =====
function handleContactSubmit(e) {
  e.preventDefault();
  showToast('📩 Message sent successfully! We\'ll get back to you soon.');
  e.target.reset();
}

// ===== Toast =====
function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ===== Scroll Reveal =====
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ===== Stats Counter Animation =====
function animateStats() {
  const statEls = document.querySelectorAll('[data-count]');
  statEls.forEach(el => {
    const target = parseInt(el.dataset.count);
    const suffix = el.textContent.includes('%') ? '%' : '+';
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 25);
  });
}

// ===== Copy to Clipboard =====
function copyToClipboard(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const original = btn.innerHTML;
    btn.innerHTML = '✓ Copied';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.innerHTML = original;
      btn.classList.remove('copied');
    }, 2000);
  });
}

// ===== Navbar Scroll Effect =====
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    navbar.classList.add('shadow-lg', 'shadow-gray-200/20', 'dark:shadow-gray-900/20');
  } else {
    navbar.classList.remove('shadow-lg', 'shadow-gray-200/20', 'dark:shadow-gray-900/20');
  }

  lastScroll = currentScroll;
});

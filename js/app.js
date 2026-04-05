/* ==================== PATIL GLOBAL — MAIN APPLICATION ==================== */

// ===== State =====
let currentPage = 'home';
let mobileMenuOpen = false;
let appBooted = false;

// ===== Boot sequence =====
// Called by auth.js after successful login (or on reload if session exists)
function bootApp() {
  if (appBooted) return;
  appBooted = true;

  // Theme init
  if (localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }

  // Show loading screen briefly then reveal app
  const progressBar = document.getElementById('progress-bar');
  const loadingScreen = document.getElementById('loading-screen');
  loadingScreen.style.display = 'flex';
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 20 + 10;
    if (progress > 100) progress = 100;
    progressBar.style.width = progress + '%';

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.4s ease';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
          // Show home page
          navigateTo('home', true);
          initScrollReveal();
          animateStats();
        }, 400);
      }, 300);
    }
  }, 150);
}

// ===== DOMContentLoaded — auth gate =====
document.addEventListener('DOMContentLoaded', async () => {
  // Theme init early to prevent flash
  if (localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }

  // Check auth state
  const authenticated = await PG_AUTH.init();

  if (authenticated) {
    PG_AUTH.updateNavbarUser();
    bootApp();
  } else {
    // Hide loading screen, show login gate
    document.getElementById('loading-screen').style.display = 'none';
    PG_AUTH.showLoginScreen();
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

// ===== SPA Navigation (auth-guarded) =====
function navigateTo(page, force) {
  // Auth guard — redirect to login if not authenticated
  if (!PG_AUTH.isAuthenticated()) {
    document.getElementById('auth-gate').classList.remove('hidden');
    document.getElementById('app-shell').classList.add('hidden');
    return;
  }

  if (page === currentPage && !force) return;

  // Hide all pages
  document.querySelectorAll('.page-content').forEach(p => p.classList.add('hidden'));

  // Show target page
  const target = document.getElementById('page-' + page);
  if (target) {
    if (target.innerHTML.trim() === '') {
      loadPageContent(page);
    }
    target.classList.remove('hidden');
  }

  currentPage = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });

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
    case 'jobs':
      if (typeof renderJobsPage === 'function') renderJobsPage(container);
      break;
    case 'chat':
      if (typeof renderChatPage === 'function') renderChatPage(container);
      break;
    case 'community':
      if (typeof renderCommunityPage === 'function') renderCommunityPage(container);
      break;
    case 'tools':
      if (typeof renderToolsPage === 'function') renderToolsPage(container);
      break;
    case 'jpg-to-pdf':
      if (typeof renderJpgToPdfPage === 'function') renderJpgToPdfPage(container);
      break;
    case 'pdf-extractor':
      if (typeof renderPdfExtractorPage === 'function') renderPdfExtractorPage(container);
      break;
  }
}

// ===== Toast =====
function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ===== Contact Form =====
function handleContactSubmit(e) {
  e.preventDefault();
  showToast('📩 Message sent! We\'ll get back to you soon.');
  e.target.reset();
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

// ===== Stats Counter =====
function animateStats() {
  const statEls = document.querySelectorAll('[data-count]');
  statEls.forEach(el => {
    const target = parseInt(el.dataset.count);
    const suffix = el.textContent.includes('%') ? '%' : '+';
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { current = target; clearInterval(timer); }
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
    setTimeout(() => { btn.innerHTML = original; btn.classList.remove('copied'); }, 2000);
  });
}

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  if (window.pageYOffset > 50) {
    navbar.classList.add('shadow-lg', 'shadow-gray-200/20', 'dark:shadow-gray-900/20');
  } else {
    navbar.classList.remove('shadow-lg', 'shadow-gray-200/20', 'dark:shadow-gray-900/20');
  }
});

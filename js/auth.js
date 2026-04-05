/* ==================== PATIL GLOBAL — AUTH MODULE ==================== */

const PG_AUTH = (() => {

  const CLIENT_ID = '854529898090-7lfb358gha6u0v9ef2o1g03p27bvjmdb.apps.googleusercontent.com';
  const SESSION_KEY = 'pg_session';

  let _user = null;
  let _gsiReady = false;
  let _needsButton = false; // true if showLoginScreen was called before GSI loaded

  // ── Session storage ──────────────────────────────────────────────────────────
  function _save(user) {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } catch (_) {}
  }

  function _restore() {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (data && data.sub && data.email) return data;
    } catch (_) {}
    return null;
  }

  function _clear() {
    try {
      sessionStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem('pg_logged_in');
    } catch (_) {}
  }

  function _decodeJwt(token) {
    try {
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch (_) { return null; }
  }

  // ── Public API ───────────────────────────────────────────────────────────────
  function isAuthenticated() { return _user !== null; }
  function getUser() { return _user; }

  function init() {
    return new Promise(resolve => {
      const stored = _restore();
      if (stored) {
        _user = stored;
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  // Called by Google GSI after user selects account
  function handleGoogleCredential(response) {
    const payload = _decodeJwt(response.credential);
    if (!payload) { showAuthError('Invalid token. Please try again.'); return; }

    _user = {
      sub:     payload.sub,
      name:    payload.name,
      email:   payload.email,
      picture: payload.picture || '',
    };
    _save(_user);
    onLoginSuccess();
  }

  function logout() {
    _user = null;
    _clear();
    if (window.google && window.google.accounts) {
      try { google.accounts.id.disableAutoSelect(); } catch (_) {}
    }
    showLoginScreen();
    if (typeof showToast === 'function') showToast('👋 Signed out successfully.');
  }

  // ── GSI button rendering ─────────────────────────────────────────────────────
  // Called when GSI script finishes loading (polled from window.onload or interval)
  function onGsiLoad() {
    _gsiReady = true;
    if (_needsButton) {
      _renderGoogleButton();
      _needsButton = false;
    }
  }

  function _renderGoogleButton() {
    if (!window.google || !window.google.accounts) {
      _needsButton = true; // retry when GSI loads
      return;
    }
    const container = document.getElementById('google-signin-btn');
    if (!container) return;

    // Hide placeholder
    const placeholder = document.getElementById('gsi-placeholder');
    if (placeholder) placeholder.style.display = 'none';

    container.innerHTML = '';
    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleGoogleCredential,
      auto_select: false,
      cancel_on_tap_outside: false,
      ux_mode: 'popup',
    });
    google.accounts.id.renderButton(container, {
      theme: 'filled_blue',
      size: 'large',
      width: 320,
      text: 'continue_with',
      shape: 'rectangular',
      logo_alignment: 'left',
    });
  }

  // ── UI helpers ───────────────────────────────────────────────────────────────
  function showLoginScreen() {
    const gate = document.getElementById('auth-gate');
    const shell = document.getElementById('app-shell');
    const loading = document.getElementById('loading-screen');
    if (gate) gate.classList.remove('hidden');
    if (shell) shell.classList.add('hidden');
    if (loading) loading.style.display = 'none';
    _renderGoogleButton();
  }

  function hideLoginScreen() {
    const gate = document.getElementById('auth-gate');
    const shell = document.getElementById('app-shell');
    if (gate) gate.classList.add('hidden');
    if (shell) shell.classList.remove('hidden');
  }

  function onLoginSuccess() {
    hideLoginScreen();
    updateNavbarUser();
    if (typeof showToast === 'function') {
      showToast('✅ Welcome, ' + _user.name.split(' ')[0] + '!');
    }
    if (typeof bootApp === 'function') bootApp();
  }

  function updateNavbarUser() {
    if (!_user) return;
    const initial = _user.name.charAt(0).toUpperCase();

    const desktopArea = document.getElementById('nav-user-area');
    if (desktopArea) {
      desktopArea.innerHTML = `
        <div class="flex items-center gap-2">
          <div class="relative w-8 h-8 flex-shrink-0">
            <img src="${_user.picture}" alt="${_user.name}"
              onerror="this.style.display='none';document.getElementById('nav-avatar-fallback').style.display='flex'"
              class="w-8 h-8 rounded-full border-2 border-brand-200 dark:border-brand-700 object-cover" />
            <div id="nav-avatar-fallback" style="display:none"
              class="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-indigo-600 items-center justify-center text-white text-xs font-bold absolute inset-0">
              ${initial}
            </div>
          </div>
          <div class="hidden lg:block leading-none">
            <div class="text-sm font-semibold text-gray-900 dark:text-white">${_user.name.split(' ')[0]}</div>
            <div class="text-xs text-gray-400 mt-0.5 truncate max-w-[120px]">${_user.email}</div>
          </div>
          <button onclick="PG_AUTH.logout()" title="Sign out"
            class="ml-1 p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
          </button>
        </div>`;
    }

    const mobileArea = document.getElementById('nav-mobile-user');
    if (mobileArea) {
      mobileArea.innerHTML = `
        <div class="flex items-center gap-3 px-4 py-3 border-t border-gray-200 dark:border-gray-800">
          <img src="${_user.picture}" alt="${_user.name}"
            onerror="this.style.display='none'"
            class="w-9 h-9 rounded-full border-2 border-brand-200 dark:border-brand-700 object-cover flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <div class="text-sm font-semibold text-gray-900 dark:text-white truncate">${_user.name}</div>
            <div class="text-xs text-gray-400 truncate">${_user.email}</div>
          </div>
          <button onclick="PG_AUTH.logout(); toggleMobileMenu();"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-500 border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all flex-shrink-0">
            Sign out
          </button>
        </div>`;
    }
  }

  function showAuthError(msg) {
    const el = document.getElementById('auth-error');
    if (!el) return;
    el.textContent = msg;
    el.classList.remove('hidden');
    setTimeout(() => el.classList.add('hidden'), 5000);
  }

  // ── Poll for GSI readiness (handles async script load) ───────────────────────
  // GSI script is async — we poll until google.accounts is available
  function _pollForGsi() {
    if (window.google && window.google.accounts) {
      onGsiLoad();
    } else {
      setTimeout(_pollForGsi, 100);
    }
  }

  // Start polling immediately
  _pollForGsi();

  return {
    init,
    isAuthenticated,
    getUser,
    logout,
    updateNavbarUser,
    showLoginScreen,
    onGsiLoad,
    handleGoogleCredential,
  };

})();

/* ==================== RESUME OPTIMIZER PAGE ==================== */

function renderResumeOptimizerPage(container) {
    container.innerHTML = `
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            ATS Tool
          </div>
          <h1 class="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white leading-tight">
            Job Application <span class="text-emerald-600 dark:text-emerald-400">Optimizer</span>
          </h1>
          <p class="mt-4 text-gray-600 dark:text-gray-400 text-lg max-w-2xl leading-relaxed">
            Upload your resume and paste a job description. Our ATS engine analyzes match score, missing keywords, skill gaps, and generates optimized bullet points — instantly.
          </p>
        </div>
      </div>
    </section>

    <!-- Upload Section -->
    <section class="py-16 bg-white dark:bg-gray-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-8 reveal">
          <!-- Upload Resume -->
          <div class="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 class="font-display font-bold text-lg text-gray-900 dark:text-white mb-4">📄 Upload Resume</h3>
            <div id="upload-zone" class="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center cursor-pointer hover:border-brand-400 dark:hover:border-brand-600 transition-colors" onclick="document.getElementById('file-input').click()" ondragover="event.preventDefault(); this.classList.add('border-brand-500','bg-brand-50','dark:bg-brand-950/20')" ondragleave="this.classList.remove('border-brand-500','bg-brand-50','dark:bg-brand-950/20')" ondrop="handleFileDrop(event)">
              <input type="file" id="file-input" accept=".pdf,.docx" class="hidden" onchange="handleFileSelect(event)" />
              <div class="text-4xl mb-3">📎</div>
              <p class="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Drag & drop your resume here</p>
              <p class="text-gray-400 dark:text-gray-600 text-xs">PDF or DOCX — max 5MB</p>
              <div id="file-name" class="hidden mt-3 px-3 py-1.5 rounded-lg bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 text-sm font-medium inline-flex items-center gap-2">
                <span>📎</span><span id="file-name-text"></span>
              </div>
            </div>
          </div>

          <!-- Paste JD -->
          <div class="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 class="font-display font-bold text-lg text-gray-900 dark:text-white mb-4">📋 Job Description</h3>
            <textarea id="jd-input" rows="8" class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all resize-none" placeholder="Paste the job description here...

Example: We are looking for a Software Engineer with experience in Python, Django, REST APIs, PostgreSQL, and cloud deployment (AWS/GCP). Strong problem-solving skills and experience with CI/CD pipelines required."></textarea>
          </div>
        </div>

        <!-- Tailoring Level -->
        <div class="mt-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 reveal">
          <h3 class="font-display font-bold text-lg text-gray-900 dark:text-white mb-4">🎯 Tailoring Level</h3>
          <div class="flex flex-wrap gap-3">
            <button class="tailoring-btn px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-brand-500 transition-all" onclick="selectTailoring('light', this)">💡 Light</button>
            <button class="tailoring-btn px-4 py-2 rounded-lg text-sm font-medium border-2 border-brand-500 text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/30" onclick="selectTailoring('medium', this)">⚡ Medium</button>
            <button class="tailoring-btn px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-brand-500 transition-all" onclick="selectTailoring('aggressive', this)">🔥 Aggressive</button>
          </div>
          <p class="text-gray-500 text-xs mt-2" id="tailoring-desc">Balanced rewrite — optimizes keywords while keeping your voice intact.</p>
        </div>

        <!-- Analyze Button -->
        <div class="mt-6 text-center reveal">
          <button onclick="runAnalysis()" id="analyze-btn" class="px-10 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-lg shadow-xl shadow-emerald-600/25 hover:shadow-emerald-600/40 transition-all transform hover:-translate-y-0.5">
            🔍 Analyze Resume
          </button>
        </div>
      </div>
    </section>

    <!-- Results Dashboard (initially hidden) -->
    <section id="results-dashboard" class="py-16 bg-gray-50 dark:bg-gray-900/50 hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-display font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white mb-8">📊 Analysis Results</h2>

        <!-- Score + Summary Row -->
        <div class="grid lg:grid-cols-3 gap-6 mb-8">
          <!-- Score Gauge -->
          <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col items-center justify-center">
            <h3 class="font-semibold text-gray-600 dark:text-gray-400 text-sm mb-4">ATS Match Score</h3>
            <div class="score-ring">
              <svg width="160" height="160" viewBox="0 0 160 160">
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#10b981"/>
                    <stop offset="100%" stop-color="#6366f1"/>
                  </linearGradient>
                </defs>
                <circle class="bg-circle" cx="80" cy="80" r="65"/>
                <circle class="progress-circle" id="score-circle" cx="80" cy="80" r="65" stroke-dasharray="408.4" stroke-dashoffset="408.4"/>
              </svg>
              <div class="score-value">
                <span id="score-number" class="text-4xl font-display font-black text-gray-900 dark:text-white">0</span>
                <span class="text-sm text-gray-500 font-medium">/100</span>
              </div>
            </div>
            <div id="score-label" class="mt-3 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">Excellent Match</div>
          </div>

          <!-- Missing Keywords -->
          <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 class="font-semibold text-gray-600 dark:text-gray-400 text-sm mb-4">🔑 Missing Keywords</h3>
            <div id="missing-keywords" class="flex flex-wrap gap-2">
            </div>
          </div>

          <!-- Skill Gaps -->
          <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 class="font-semibold text-gray-600 dark:text-gray-400 text-sm mb-4">⚠️ Skill Gaps</h3>
            <div id="skill-gaps" class="space-y-2">
            </div>
          </div>
        </div>

        <!-- ATS Checklist -->
        <div class="grid lg:grid-cols-2 gap-6 mb-8">
          <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 class="font-semibold text-gray-600 dark:text-gray-400 text-sm mb-4">✅ ATS Checklist</h3>
            <div id="ats-checklist" class="space-y-3">
            </div>
          </div>

          <!-- Keyword Chart -->
          <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 class="font-semibold text-gray-600 dark:text-gray-400 text-sm mb-4">📊 Keyword Frequency</h3>
            <div id="keyword-chart" class="space-y-3">
            </div>
          </div>
        </div>

        <!-- Optimized Summary -->
        <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-8">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-gray-600 dark:text-gray-400 text-sm">✨ Optimized Summary</h3>
            <button class="copy-btn bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700" onclick="copyToClipboard(document.getElementById('optimized-summary').textContent, this)">📋 Copy</button>
          </div>
          <p id="optimized-summary" class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed"></p>
        </div>

        <!-- Bullet Rewrites -->
        <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 class="font-semibold text-gray-600 dark:text-gray-400 text-sm mb-4">📝 Optimized Bullet Points</h3>
          <div id="bullet-rewrites" class="space-y-4">
          </div>
        </div>
      </div>
    </section>
  `;

    initScrollReveal();
}

// ===== File Handling =====
let selectedFile = null;
let selectedTailoring = 'medium';

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        selectedFile = file;
        document.getElementById('file-name').classList.remove('hidden');
        document.getElementById('file-name-text').textContent = file.name;
    }
}

function handleFileDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
        selectedFile = file;
        document.getElementById('file-name').classList.remove('hidden');
        document.getElementById('file-name-text').textContent = file.name;
    }
    e.currentTarget.classList.remove('border-brand-500', 'bg-brand-50', 'dark:bg-brand-950/20');
}

function selectTailoring(level, btn) {
    selectedTailoring = level;
    document.querySelectorAll('.tailoring-btn').forEach(b => {
        b.className = 'tailoring-btn px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-brand-500 transition-all';
    });
    btn.className = 'tailoring-btn px-4 py-2 rounded-lg text-sm font-medium border-2 border-brand-500 text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/30';

    const descs = {
        light: 'Minimal changes — adds only critical missing keywords.',
        medium: 'Balanced rewrite — optimizes keywords while keeping your voice intact.',
        aggressive: 'Full rewrite — maximizes ATS score with industry-standard phrasing.'
    };
    document.getElementById('tailoring-desc').textContent = descs[level];
}

// ===== Run Analysis (Simulated) =====
function runAnalysis() {
    const jd = document.getElementById('jd-input').value;
    if (!jd.trim()) {
        showToast('⚠️ Please paste a job description first.');
        return;
    }

    const btn = document.getElementById('analyze-btn');
    btn.innerHTML = '⏳ Analyzing...';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = '🔍 Analyze Resume';
        btn.disabled = false;
        showResults();
    }, 2000);
}

function showResults() {
    const dashboard = document.getElementById('results-dashboard');
    dashboard.classList.remove('hidden');
    dashboard.scrollIntoView({ behavior: 'smooth' });

    // Animate score
    const score = 87;
    const circle = document.getElementById('score-circle');
    const circumference = 408.4;
    const offset = circumference - (score / 100) * circumference;
    setTimeout(() => {
        circle.style.strokeDashoffset = offset;
    }, 100);

    let current = 0;
    const scoreInterval = setInterval(() => {
        current += 2;
        if (current >= score) { current = score; clearInterval(scoreInterval); }
        document.getElementById('score-number').textContent = current;
    }, 30);

    // Missing Keywords
    const keywords = ['CI/CD', 'Docker', 'Kubernetes', 'Microservices', 'GraphQL', 'TypeScript'];
    document.getElementById('missing-keywords').innerHTML = keywords.map(k =>
        `<span class="px-2.5 py-1 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-medium border border-red-200 dark:border-red-800">${k}</span>`
    ).join('');

    // Skill Gaps
    const gaps = [
        { skill: 'Cloud Deployment', level: 30 },
        { skill: 'Container Orchestration', level: 15 },
        { skill: 'API Design Patterns', level: 55 },
    ];
    document.getElementById('skill-gaps').innerHTML = gaps.map(g => `
    <div>
      <div class="flex justify-between text-xs mb-1">
        <span class="text-gray-700 dark:text-gray-300 font-medium">${g.skill}</span>
        <span class="text-gray-500">${g.level}%</span>
      </div>
      <div class="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
        <div class="h-full rounded-full bg-gradient-to-r from-amber-500 to-red-500 transition-all duration-1000" style="width:${g.level}%"></div>
      </div>
    </div>
  `).join('');

    // ATS Checklist
    const checks = [
        { label: 'Contact information present', pass: true },
        { label: 'Professional summary included', pass: true },
        { label: 'Skills section with keywords', pass: true },
        { label: 'Reverse chronological format', pass: true },
        { label: 'Measurable achievements', pass: false },
        { label: 'No tables or graphics', pass: true },
        { label: 'Standard section headings', pass: true },
        { label: 'Action verbs used', pass: false },
    ];
    document.getElementById('ats-checklist').innerHTML = checks.map(c => `
    <div class="flex items-center gap-3">
      <div class="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${c.pass ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600' : 'bg-red-100 dark:bg-red-900/50 text-red-600'}">
        ${c.pass ? '<svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>' : '<svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"/></svg>'}
      </div>
      <span class="text-sm ${c.pass ? 'text-gray-700 dark:text-gray-300' : 'text-red-600 dark:text-red-400 font-medium'}">${c.label}</span>
    </div>
  `).join('');

    // Keyword Chart
    const kwData = [
        { word: 'Python', count: 8, max: 10 },
        { word: 'Django', count: 5, max: 10 },
        { word: 'REST API', count: 6, max: 10 },
        { word: 'PostgreSQL', count: 3, max: 10 },
        { word: 'AWS', count: 2, max: 10 },
        { word: 'React', count: 4, max: 10 },
    ];
    document.getElementById('keyword-chart').innerHTML = kwData.map(d => `
    <div class="flex items-center gap-3">
      <span class="text-xs font-medium text-gray-600 dark:text-gray-400 w-20 text-right">${d.word}</span>
      <div class="flex-1 h-6 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
        <div class="keyword-bar" style="width: ${(d.count / d.max) * 100}%"></div>
      </div>
      <span class="text-xs text-gray-500 w-8">${d.count}x</span>
    </div>
  `).join('');

    // Optimized Summary
    document.getElementById('optimized-summary').textContent =
        'Results-driven Software Engineer with 3+ years of experience building scalable web applications using Python, Django, and REST APIs. Proven track record of optimizing PostgreSQL databases and implementing CI/CD pipelines on AWS. Passionate about clean architecture, test-driven development, and cross-functional collaboration to deliver high-impact solutions.';

    // Bullet Rewrites
    const bullets = [
        { original: 'Worked on backend development', optimized: 'Architected and maintained RESTful API services using Django REST Framework, serving 50k+ daily active users with 99.9% uptime' },
        { original: 'Helped with database tasks', optimized: 'Optimized PostgreSQL query performance by 40% through indexing strategies and query refactoring, reducing average response time from 800ms to 200ms' },
        { original: 'Did some testing', optimized: 'Implemented comprehensive test suite with 92% code coverage using pytest and GitHub Actions CI/CD pipeline, reducing production bugs by 60%' },
    ];
    document.getElementById('bullet-rewrites').innerHTML = bullets.map(b => `
    <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
      <div class="flex items-start gap-3 mb-3">
        <span class="px-2 py-0.5 rounded text-xs font-semibold bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5">Before</span>
        <p class="text-sm text-gray-500 line-through">${b.original}</p>
      </div>
      <div class="flex items-start gap-3">
        <span class="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5">After</span>
        <p class="text-sm text-gray-700 dark:text-gray-300 font-medium">${b.optimized}</p>
      </div>
      <div class="mt-2 text-right">
        <button class="copy-btn bg-white dark:bg-gray-900 text-gray-500 border-gray-200 dark:border-gray-700 text-xs" onclick="copyToClipboard('${b.optimized.replace(/'/g, "\\'")}', this)">📋 Copy</button>
      </div>
    </div>
  `).join('');
}

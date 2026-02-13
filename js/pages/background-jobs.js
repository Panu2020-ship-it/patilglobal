/* ==================== BACKGROUND JOB PROCESSING PAGE ==================== */

function renderBackgroundJobsPage(container) {
    container.innerHTML = `
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            Developer Tools
          </div>
          <h1 class="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white leading-tight">
            Background Job <span class="text-blue-600 dark:text-blue-400">Processing</span>
          </h1>
          <p class="mt-4 text-gray-600 dark:text-gray-400 text-lg max-w-2xl leading-relaxed">
            Master async task queues and background job processing. Learn the architecture, best practices, and implementation with Python, Node.js, and Ruby.
          </p>
        </div>
      </div>
    </section>

    <!-- Architecture Diagram -->
    <section class="py-16 bg-white dark:bg-gray-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-display font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white mb-8 reveal">System Architecture</h2>
        <div class="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-10 reveal">
          <div class="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6">
            <div class="arch-node bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
              <div class="text-2xl mb-1">🌐</div>
              <div class="text-blue-700 dark:text-blue-300">Web Client</div>
              <div class="text-xs text-gray-500 mt-0.5">HTTP Request</div>
            </div>
            <div class="arch-arrow rotate-90 lg:rotate-0">→</div>
            <div class="arch-node bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 border-emerald-200 dark:border-emerald-800">
              <div class="text-2xl mb-1">⚡</div>
              <div class="text-emerald-700 dark:text-emerald-300">API Server</div>
              <div class="text-xs text-gray-500 mt-0.5">Enqueue Task</div>
            </div>
            <div class="arch-arrow rotate-90 lg:rotate-0">→</div>
            <div class="arch-node bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800">
              <div class="text-2xl mb-1">📦</div>
              <div class="text-amber-700 dark:text-amber-300">Message Queue</div>
              <div class="text-xs text-gray-500 mt-0.5">Redis / RabbitMQ</div>
            </div>
            <div class="arch-arrow rotate-90 lg:rotate-0">→</div>
            <div class="arch-node bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-950 dark:to-violet-900 border-violet-200 dark:border-violet-800">
              <div class="text-2xl mb-1">⚙️</div>
              <div class="text-violet-700 dark:text-violet-300">Worker</div>
              <div class="text-xs text-gray-500 mt-0.5">Process Task</div>
            </div>
            <div class="arch-arrow rotate-90 lg:rotate-0">→</div>
            <div class="arch-node bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950 dark:to-rose-900 border-rose-200 dark:border-rose-800">
              <div class="text-2xl mb-1">✅</div>
              <div class="text-rose-700 dark:text-rose-300">Result Store</div>
              <div class="text-xs text-gray-500 mt-0.5">DB / Cache</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Code Tabs -->
    <section class="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-display font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white mb-8 reveal">Implementation Examples</h2>

        <!-- Tab buttons -->
        <div class="flex flex-wrap gap-2 mb-6 reveal">
          <button class="tab-btn active" onclick="switchJobTab('python', this)">🐍 Python (Celery)</button>
          <button class="tab-btn" onclick="switchJobTab('node', this)">💚 Node.js (Bull)</button>
          <button class="tab-btn" onclick="switchJobTab('ruby', this)">💎 Ruby (Sidekiq)</button>
        </div>

        <!-- Tab content -->
        <div id="job-tab-python" class="job-tab-content reveal">
          <div class="code-block">
            <div class="code-header">
              <span class="code-lang">Python — Celery</span>
              <button class="copy-btn" onclick="copyToClipboard(document.getElementById('code-python').textContent, this)">📋 Copy</button>
            </div>
            <pre id="code-python"><span class="code-comment"># tasks.py — Celery task definition</span>
<span class="code-keyword">from</span> celery <span class="code-keyword">import</span> Celery

app = Celery(<span class="code-string">'tasks'</span>, broker=<span class="code-string">'redis://localhost:6379/0'</span>)

<span class="code-decorator">@app.task</span>(bind=<span class="code-keyword">True</span>, max_retries=<span class="code-number">3</span>)
<span class="code-keyword">def</span> <span class="code-function">process_resume</span>(self, user_id, resume_data):
    <span class="code-string">"""Async resume processing task."""</span>
    <span class="code-keyword">try</span>:
        <span class="code-comment"># Parse PDF content</span>
        parsed = parse_resume(resume_data)

        <span class="code-comment"># Run ATS analysis</span>
        score = analyze_ats_score(parsed)

        <span class="code-comment"># Store results</span>
        save_results(user_id, score)

        <span class="code-keyword">return</span> {<span class="code-string">'status'</span>: <span class="code-string">'completed'</span>, <span class="code-string">'score'</span>: score}
    <span class="code-keyword">except</span> Exception <span class="code-keyword">as</span> exc:
        self.retry(exc=exc, countdown=<span class="code-number">60</span>)

<span class="code-comment"># Calling the task</span>
result = process_resume.delay(user_id=<span class="code-number">42</span>, resume_data=file_bytes)
<span class="code-keyword">print</span>(result.status)  <span class="code-comment"># PENDING → SUCCESS</span></pre>
          </div>
        </div>

        <div id="job-tab-node" class="job-tab-content hidden">
          <div class="code-block">
            <div class="code-header">
              <span class="code-lang">Node.js — Bull</span>
              <button class="copy-btn" onclick="copyToClipboard(document.getElementById('code-node').textContent, this)">📋 Copy</button>
            </div>
            <pre id="code-node"><span class="code-comment">// queue.js — Bull queue setup</span>
<span class="code-keyword">const</span> Queue = <span class="code-function">require</span>(<span class="code-string">'bull'</span>);

<span class="code-keyword">const</span> resumeQueue = <span class="code-keyword">new</span> <span class="code-class">Queue</span>(<span class="code-string">'resume-processing'</span>, {
  redis: { host: <span class="code-string">'127.0.0.1'</span>, port: <span class="code-number">6379</span> }
});

<span class="code-comment">// Define processor</span>
resumeQueue.<span class="code-function">process</span>(<span class="code-keyword">async</span> (job) => {
  <span class="code-keyword">const</span> { userId, resumeData } = job.data;

  <span class="code-comment">// Update progress</span>
  <span class="code-keyword">await</span> job.<span class="code-function">progress</span>(<span class="code-number">25</span>);

  <span class="code-comment">// Parse resume</span>
  <span class="code-keyword">const</span> parsed = <span class="code-keyword">await</span> <span class="code-function">parseResume</span>(resumeData);
  <span class="code-keyword">await</span> job.<span class="code-function">progress</span>(<span class="code-number">50</span>);

  <span class="code-comment">// Analyze ATS score</span>
  <span class="code-keyword">const</span> score = <span class="code-keyword">await</span> <span class="code-function">analyzeATS</span>(parsed);
  <span class="code-keyword">await</span> job.<span class="code-function">progress</span>(<span class="code-number">100</span>);

  <span class="code-keyword">return</span> { status: <span class="code-string">'completed'</span>, score };
});

<span class="code-comment">// Add job to queue</span>
<span class="code-keyword">await</span> resumeQueue.<span class="code-function">add</span>(
  { userId: <span class="code-number">42</span>, resumeData: buffer },
  { attempts: <span class="code-number">3</span>, backoff: { type: <span class="code-string">'exponential'</span>, delay: <span class="code-number">1000</span> } }
);</pre>
          </div>
        </div>

        <div id="job-tab-ruby" class="job-tab-content hidden">
          <div class="code-block">
            <div class="code-header">
              <span class="code-lang">Ruby — Sidekiq</span>
              <button class="copy-btn" onclick="copyToClipboard(document.getElementById('code-ruby').textContent, this)">📋 Copy</button>
            </div>
            <pre id="code-ruby"><span class="code-comment"># resume_worker.rb — Sidekiq worker</span>
<span class="code-keyword">class</span> <span class="code-class">ResumeWorker</span>
  <span class="code-keyword">include</span> Sidekiq::Worker

  sidekiq_options queue: <span class="code-string">:critical</span>,
                  retry: <span class="code-number">3</span>,
                  dead: <span class="code-keyword">false</span>

  <span class="code-keyword">def</span> <span class="code-function">perform</span>(user_id, resume_path)
    <span class="code-comment"># Parse the resume file</span>
    parsed = ResumeParser.<span class="code-function">parse</span>(resume_path)

    <span class="code-comment"># Run ATS analysis</span>
    score = ATSAnalyzer.<span class="code-function">analyze</span>(parsed)

    <span class="code-comment"># Store results in database</span>
    Result.<span class="code-function">create!</span>(
      user_id: user_id,
      score: score,
      status: <span class="code-string">:completed</span>
    )
  <span class="code-keyword">end</span>
<span class="code-keyword">end</span>

<span class="code-comment"># Enqueue the job</span>
ResumeWorker.<span class="code-function">perform_async</span>(<span class="code-number">42</span>, <span class="code-string">"/uploads/resume.pdf"</span>)</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Task Progress Demo -->
    <section class="py-16 bg-white dark:bg-gray-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-display font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white mb-8 reveal">Task Progress Demo</h2>
        <div class="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 reveal">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-gray-900 dark:text-white">Resume Processing Pipeline</h3>
            <button onclick="runProgressDemo()" class="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium transition-all shadow-sm">
              ▶ Run Demo
            </button>
          </div>
          <div class="space-y-4" id="progress-demo">
            <div class="flex items-center gap-4">
              <div id="step1-icon" class="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-sm">⏳</div>
              <div class="flex-1">
                <div class="flex justify-between text-sm mb-1">
                  <span class="font-medium text-gray-700 dark:text-gray-300">Upload & Parse</span>
                  <span id="step1-pct" class="text-gray-500">0%</span>
                </div>
                <div class="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden"><div id="step1-bar" class="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500" style="width:0%"></div></div>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div id="step2-icon" class="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-sm">⏳</div>
              <div class="flex-1">
                <div class="flex justify-between text-sm mb-1">
                  <span class="font-medium text-gray-700 dark:text-gray-300">ATS Analysis</span>
                  <span id="step2-pct" class="text-gray-500">0%</span>
                </div>
                <div class="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden"><div id="step2-bar" class="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500" style="width:0%"></div></div>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div id="step3-icon" class="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-sm">⏳</div>
              <div class="flex-1">
                <div class="flex justify-between text-sm mb-1">
                  <span class="font-medium text-gray-700 dark:text-gray-300">Generate Report</span>
                  <span id="step3-pct" class="text-gray-500">0%</span>
                </div>
                <div class="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden"><div id="step3-bar" class="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500" style="width:0%"></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Queue Monitor -->
    <section class="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-display font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white mb-8 reveal">Queue Monitor</h2>
        <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden reveal">
          <div class="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <span class="font-semibold text-gray-900 dark:text-white text-sm">Live Queue Status</span>
            </div>
            <div class="flex gap-4 text-xs text-gray-500">
              <span>Active: <strong class="text-emerald-500">3</strong></span>
              <span>Waiting: <strong class="text-amber-500">5</strong></span>
              <span>Completed: <strong class="text-blue-500">142</strong></span>
            </div>
          </div>
          <div class="table-wrapper">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th class="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Job ID</th>
                  <th class="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Task</th>
                  <th class="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Status</th>
                  <th class="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Progress</th>
                  <th class="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Duration</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
                <tr class="queue-item" style="animation-delay:0.1s"><td class="px-4 py-3 font-mono text-xs text-gray-500">#a3f8c1</td><td class="px-4 py-3 text-gray-900 dark:text-white">Resume Parse</td><td class="px-4 py-3"><span class="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">Active</span></td><td class="px-4 py-3"><div class="w-24 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full"><div class="h-full bg-emerald-500 rounded-full" style="width:72%"></div></div></td><td class="px-4 py-3 text-gray-500 text-xs">1.2s</td></tr>
                <tr class="queue-item" style="animation-delay:0.2s"><td class="px-4 py-3 font-mono text-xs text-gray-500">#b7d2e4</td><td class="px-4 py-3 text-gray-900 dark:text-white">ATS Analysis</td><td class="px-4 py-3"><span class="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">Active</span></td><td class="px-4 py-3"><div class="w-24 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full"><div class="h-full bg-emerald-500 rounded-full" style="width:45%"></div></div></td><td class="px-4 py-3 text-gray-500 text-xs">0.8s</td></tr>
                <tr class="queue-item" style="animation-delay:0.3s"><td class="px-4 py-3 font-mono text-xs text-gray-500">#c9e1f3</td><td class="px-4 py-3 text-gray-900 dark:text-white">Email Template</td><td class="px-4 py-3"><span class="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300">Waiting</span></td><td class="px-4 py-3"><div class="w-24 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full"><div class="h-full bg-amber-500 rounded-full" style="width:0%"></div></div></td><td class="px-4 py-3 text-gray-500 text-xs">—</td></tr>
                <tr class="queue-item" style="animation-delay:0.4s"><td class="px-4 py-3 font-mono text-xs text-gray-500">#d4f2a5</td><td class="px-4 py-3 text-gray-900 dark:text-white">Cover Letter Gen</td><td class="px-4 py-3"><span class="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">Completed</span></td><td class="px-4 py-3"><div class="w-24 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full"><div class="h-full bg-blue-500 rounded-full" style="width:100%"></div></div></td><td class="px-4 py-3 text-gray-500 text-xs">2.4s</td></tr>
                <tr class="queue-item" style="animation-delay:0.5s"><td class="px-4 py-3 font-mono text-xs text-gray-500">#e5a3b7</td><td class="px-4 py-3 text-gray-900 dark:text-white">Report Export</td><td class="px-4 py-3"><span class="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">Completed</span></td><td class="px-4 py-3"><div class="w-24 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full"><div class="h-full bg-blue-500 rounded-full" style="width:100%"></div></div></td><td class="px-4 py-3 text-gray-500 text-xs">3.1s</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- Best Practices -->
    <section class="py-16 bg-white dark:bg-gray-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-display font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white mb-8 reveal">Best Practices Checklist</h2>
        <div class="grid sm:grid-cols-2 gap-6 reveal">
          <div class="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 class="font-display font-bold text-lg text-gray-900 dark:text-white mb-4">🏗️ Architecture</h3>
            <div class="space-y-3">
              ${['Use idempotent tasks to handle retries safely', 'Separate queue names by priority level', 'Implement dead letter queues for failed jobs', 'Use a persistent broker (Redis/RabbitMQ)', 'Monitor queue depth and worker health'].map(item => `
              <div class="checklist-item">
                <div class="check-icon"><svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div>
                <span class="text-gray-700 dark:text-gray-300 text-sm">${item}</span>
              </div>`).join('')}
            </div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 class="font-display font-bold text-lg text-gray-900 dark:text-white mb-4">🔒 Reliability</h3>
            <div class="space-y-3">
              ${['Set max retries with exponential backoff', 'Log all task start, completion, and failure events', 'Use task timeouts to prevent hangs', 'Implement graceful shutdown for workers', 'Store results for async status polling'].map(item => `
              <div class="checklist-item">
                <div class="check-icon"><svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div>
                <span class="text-gray-700 dark:text-gray-300 text-sm">${item}</span>
              </div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

    initScrollReveal();
}

// ===== Tab switching =====
function switchJobTab(tab, btn) {
    document.querySelectorAll('.job-tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById('job-tab-' + tab).classList.remove('hidden');
    btn.parentElement.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

// ===== Progress Demo =====
function runProgressDemo() {
    const steps = [
        { bar: 'step1-bar', pct: 'step1-pct', icon: 'step1-icon', duration: 1000 },
        { bar: 'step2-bar', pct: 'step2-pct', icon: 'step2-icon', duration: 1500 },
        { bar: 'step3-bar', pct: 'step3-pct', icon: 'step3-icon', duration: 800 },
    ];

    // Reset
    steps.forEach(s => {
        document.getElementById(s.bar).style.width = '0%';
        document.getElementById(s.pct).textContent = '0%';
        document.getElementById(s.icon).textContent = '⏳';
    });

    let delay = 0;
    steps.forEach((s, i) => {
        setTimeout(() => {
            document.getElementById(s.icon).textContent = '🔄';
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 20 + 5;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    document.getElementById(s.icon).textContent = '✅';
                }
                document.getElementById(s.bar).style.width = progress + '%';
                document.getElementById(s.pct).textContent = Math.floor(progress) + '%';
            }, s.duration / 10);
        }, delay);
        delay += s.duration + 300;
    });
}

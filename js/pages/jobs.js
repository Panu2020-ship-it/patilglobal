/* ==================== JOBS PAGE ==================== */

const jobsData = [
  { id: 1, title: 'Frontend Developer', company: 'TechNova', location: 'Bangalore', type: 'Full-time', salary: '₹8–12 LPA', tags: ['React', 'Tailwind', 'TypeScript'], logo: '🏢', posted: '2 days ago', desc: 'Build modern UIs for our SaaS platform. You will work closely with design and backend teams.' },
  { id: 2, title: 'Data Scientist', company: 'AnalyticsPro', location: 'Remote', type: 'Full-time', salary: '₹10–18 LPA', tags: ['Python', 'ML', 'SQL'], logo: '📊', posted: '1 day ago', desc: 'Drive insights from large datasets. Experience with ML pipelines and model deployment required.' },
  { id: 3, title: 'Backend Engineer', company: 'CloudBase', location: 'Hyderabad', type: 'Full-time', salary: '₹12–20 LPA', tags: ['Node.js', 'AWS', 'PostgreSQL'], logo: '☁️', posted: '3 days ago', desc: 'Design and scale REST APIs serving millions of users. Strong system design skills needed.' },
  { id: 4, title: 'Product Manager', company: 'StartupX', location: 'Mumbai', type: 'Full-time', salary: '₹15–25 LPA', tags: ['Agile', 'Roadmap', 'Analytics'], logo: '🚀', posted: '5 days ago', desc: 'Own the product roadmap for our B2B platform. 2+ years PM experience preferred.' },
  { id: 5, title: 'UI/UX Designer', company: 'DesignHub', location: 'Remote', type: 'Contract', salary: '₹5–8 LPA', tags: ['Figma', 'Prototyping', 'Research'], logo: '🎨', posted: '1 week ago', desc: 'Create delightful user experiences. Portfolio with case studies required.' },
  { id: 6, title: 'DevOps Engineer', company: 'InfraCore', location: 'Pune', type: 'Full-time', salary: '₹10–16 LPA', tags: ['Docker', 'Kubernetes', 'CI/CD'], logo: '⚙️', posted: '4 days ago', desc: 'Manage cloud infrastructure and deployment pipelines. AWS/GCP experience a plus.' },
  { id: 7, title: 'ML Engineer Intern', company: 'AILabs', location: 'Chennai', type: 'Internship', salary: '₹25k/month', tags: ['PyTorch', 'Python', 'NLP'], logo: '🤖', posted: '2 days ago', desc: 'Work on cutting-edge NLP models. Final year students and recent grads welcome.' },
  { id: 8, title: 'Full Stack Developer', company: 'WebWorks', location: 'Delhi', type: 'Full-time', salary: '₹7–14 LPA', tags: ['React', 'Django', 'MongoDB'], logo: '💻', posted: '6 days ago', desc: 'End-to-end development of web applications. Strong fundamentals in both frontend and backend.' },
];

let jobsState = { filter: 'All', search: '', selected: null, applyOpen: false };

function renderJobsPage(container) {
  container.innerHTML = getJobsHTML();
  bindJobsEvents();
}

function getJobsHTML() {
  return `
  <!-- Hero -->
  <section class="bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-violet-950 py-16 sm:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <span class="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></span>
          ${jobsData.length} Live Openings
        </div>
        <h1 class="font-display font-black text-3xl sm:text-5xl text-gray-900 dark:text-white leading-tight">
          Find Your Next <span class="text-violet-600 dark:text-violet-400">Opportunity</span>
        </h1>
        <p class="mt-4 text-gray-600 dark:text-gray-400 text-lg">Browse curated jobs from top companies. Apply directly and track your applications.</p>
      </div>
    </div>
  </section>

  <!-- Filters + Listings -->
  <section class="py-10 bg-white dark:bg-gray-950 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Search + Filter Bar -->
      <div class="flex flex-col sm:flex-row gap-3 mb-8">
        <div class="relative flex-1">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input id="jobs-search" type="text" placeholder="Search jobs, companies, skills..." class="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all text-sm" />
        </div>
        <div class="flex gap-2 flex-wrap">
          ${['All','Full-time','Internship','Remote','Contract'].map(f => `
            <button onclick="filterJobs('${f}')" class="jobs-filter-btn px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${f === 'All' ? 'bg-violet-600 text-white border-violet-600' : 'border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-violet-400'}" data-filter="${f}">${f}</button>
          `).join('')}
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Job Cards -->
        <div class="lg:col-span-2 space-y-4" id="jobs-list">
          ${renderJobCards(jobsData)}
        </div>

        <!-- Post a Job Panel -->
        <div class="lg:col-span-1">
          <div class="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl p-6 text-white mb-6">
            <div class="text-3xl mb-3">📢</div>
            <h3 class="font-display font-bold text-xl mb-2">Hiring?</h3>
            <p class="text-violet-100 text-sm mb-4">Post a job and reach thousands of qualified candidates instantly.</p>
            <button onclick="openPostJobModal()" class="w-full py-2.5 rounded-xl bg-white text-violet-700 font-semibold text-sm hover:bg-violet-50 transition-all">Post a Job →</button>
          </div>
          <div class="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h4>
            <div class="space-y-3">
              <div class="flex justify-between text-sm"><span class="text-gray-500">Total Listings</span><span class="font-semibold text-gray-900 dark:text-white">${jobsData.length}</span></div>
              <div class="flex justify-between text-sm"><span class="text-gray-500">Remote Jobs</span><span class="font-semibold text-gray-900 dark:text-white">${jobsData.filter(j=>j.location==='Remote').length}</span></div>
              <div class="flex justify-between text-sm"><span class="text-gray-500">Internships</span><span class="font-semibold text-gray-900 dark:text-white">${jobsData.filter(j=>j.type==='Internship').length}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Job Detail Modal -->
  <div id="job-detail-modal" class="fixed inset-0 z-[100] hidden">
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" onclick="closeJobModal()"></div>
    <div class="relative flex items-center justify-center min-h-full p-4">
      <div id="job-detail-content" class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 w-full max-w-lg p-8 animate-scale-in"></div>
    </div>
  </div>

  <!-- Post Job Modal -->
  <div id="post-job-modal" class="fixed inset-0 z-[100] hidden">
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" onclick="closePostJobModal()"></div>
    <div class="relative flex items-center justify-center min-h-full p-4">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 w-full max-w-lg p-8 animate-scale-in">
        <div class="flex items-center justify-between mb-6">
          <h2 class="font-display font-bold text-xl text-gray-900 dark:text-white">Post a Job</h2>
          <button onclick="closePostJobModal()" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
            <svg class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <form onsubmit="handlePostJob(event)" class="space-y-4">
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Job Title</label>
              <input type="text" required placeholder="e.g. Frontend Developer" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none text-sm transition-all" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Company</label>
              <input type="text" required placeholder="Company name" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none text-sm transition-all" />
            </div>
          </div>
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Location</label>
              <input type="text" required placeholder="City or Remote" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none text-sm transition-all" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Type</label>
              <select class="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none text-sm transition-all">
                <option>Full-time</option><option>Internship</option><option>Contract</option><option>Remote</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Salary Range</label>
            <input type="text" placeholder="e.g. ₹8–12 LPA" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none text-sm transition-all" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
            <textarea rows="3" required placeholder="Describe the role..." class="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none text-sm transition-all resize-none"></textarea>
          </div>
          <button type="submit" class="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-violet-600/25">Post Job</button>
        </form>
      </div>
    </div>
  </div>
  `;
}

function renderJobCards(jobs) {
  if (!jobs.length) return `<div class="text-center py-16 text-gray-400">No jobs found matching your criteria.</div>`;
  return jobs.map(job => `
    <div class="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-200 cursor-pointer" onclick="openJobDetail(${job.id})">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl flex-shrink-0">${job.logo}</div>
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-2">
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">${job.title}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">${job.company} · ${job.location}</p>
            </div>
            <span class="text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${job.type === 'Internship' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300' : job.type === 'Remote' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300' : 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300'}">${job.type}</span>
          </div>
          <div class="flex flex-wrap gap-1.5 mt-3">
            ${job.tags.map(t => `<span class="text-xs px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">${t}</span>`).join('')}
          </div>
          <div class="flex items-center justify-between mt-3">
            <span class="text-sm font-semibold text-gray-900 dark:text-white">${job.salary}</span>
            <span class="text-xs text-gray-400">${job.posted}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function bindJobsEvents() {
  const searchInput = document.getElementById('jobs-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      jobsState.search = e.target.value.toLowerCase();
      updateJobsList();
    });
  }
}

function filterJobs(type) {
  jobsState.filter = type;
  document.querySelectorAll('.jobs-filter-btn').forEach(btn => {
    const isActive = btn.dataset.filter === type;
    btn.className = `jobs-filter-btn px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${isActive ? 'bg-violet-600 text-white border-violet-600' : 'border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-violet-400'}`;
  });
  updateJobsList();
}

function updateJobsList() {
  const { filter, search } = jobsState;
  let filtered = jobsData;
  if (filter !== 'All') {
    filtered = filtered.filter(j => j.type === filter || j.location === filter);
  }
  if (search) {
    filtered = filtered.filter(j =>
      j.title.toLowerCase().includes(search) ||
      j.company.toLowerCase().includes(search) ||
      j.tags.some(t => t.toLowerCase().includes(search))
    );
  }
  const list = document.getElementById('jobs-list');
  if (list) list.innerHTML = renderJobCards(filtered);
}

function openJobDetail(id) {
  const job = jobsData.find(j => j.id === id);
  if (!job) return;
  jobsState.selected = id;
  const content = document.getElementById('job-detail-content');
  content.innerHTML = `
    <div class="flex items-start justify-between mb-6">
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-3xl">${job.logo}</div>
        <div>
          <h2 class="font-display font-bold text-xl text-gray-900 dark:text-white">${job.title}</h2>
          <p class="text-gray-500 text-sm">${job.company} · ${job.location}</p>
        </div>
      </div>
      <button onclick="closeJobModal()" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
        <svg class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="flex flex-wrap gap-2 mb-4">
      <span class="text-xs font-medium px-2.5 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">${job.type}</span>
      <span class="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">${job.salary}</span>
      ${job.tags.map(t => `<span class="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">${t}</span>`).join('')}
    </div>
    <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">${job.desc}</p>
    <div class="flex gap-3">
      <button onclick="openApplyForm(${job.id})" class="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-violet-600/25">Apply Now</button>
      <button onclick="closeJobModal()" class="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">Close</button>
    </div>
  `;
  document.getElementById('job-detail-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function openApplyForm(id) {
  const job = jobsData.find(j => j.id === id);
  if (!job) return;
  const content = document.getElementById('job-detail-content');
  content.innerHTML = `
    <div class="flex items-center justify-between mb-6">
      <h2 class="font-display font-bold text-xl text-gray-900 dark:text-white">Apply — ${job.title}</h2>
      <button onclick="closeJobModal()" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
        <svg class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
    <form onsubmit="handleJobApply(event, ${id})" class="space-y-4">
      <div class="grid sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
          <input type="text" required placeholder="Your name" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none text-sm transition-all" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
          <input type="email" required placeholder="you@email.com" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none text-sm transition-all" />
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">LinkedIn / Portfolio URL</label>
        <input type="url" placeholder="https://linkedin.com/in/..." class="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none text-sm transition-all" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Why are you a good fit?</label>
        <textarea rows="3" required placeholder="Tell us about yourself..." class="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none text-sm transition-all resize-none"></textarea>
      </div>
      <button type="submit" class="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-violet-600/25">Submit Application</button>
    </form>
  `;
}

function handleJobApply(e, id) {
  e.preventDefault();
  closeJobModal();
  showToast('🎉 Application submitted successfully! Good luck!');
}

function closeJobModal() {
  document.getElementById('job-detail-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

function openPostJobModal() {
  document.getElementById('post-job-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closePostJobModal() {
  document.getElementById('post-job-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

function handlePostJob(e) {
  e.preventDefault();
  closePostJobModal();
  showToast('📢 Job posted successfully! It will go live after review.');
}

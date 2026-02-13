/* ==================== IIT & IIM INTERNSHIP PORTAL PAGE ==================== */

function renderInternshipPage(container) {
    const locked = !isLoggedIn;

    container.innerHTML = `
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-amber-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
            Research Portal
          </div>
          <h1 class="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white leading-tight">
            IIT & IIM Research <span class="text-amber-600 dark:text-amber-400">Internship Portal</span>
          </h1>
          <p class="mt-4 text-gray-600 dark:text-gray-400 text-lg max-w-2xl leading-relaxed">
            Browse 1000+ professors across IITs & IIMs. Access emails, research areas, and cold-email templates to land your dream research internship.
          </p>
        </div>
      </div>
    </section>

    <!-- Search & Filters -->
    <section class="py-8 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-16 z-20 backdrop-blur-xl bg-white/80 dark:bg-gray-950/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row gap-3">
          <div class="relative flex-1">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input type="text" id="faculty-search" oninput="filterFaculty()" placeholder="Search by name, institute, or research area..." class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all" />
          </div>
          <select id="filter-institute" onchange="filterFaculty()" class="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none">
            <option value="">All Institutes</option>
            <option>IIT Bombay</option>
            <option>IIT Delhi</option>
            <option>IIT Madras</option>
            <option>IIT Kanpur</option>
            <option>IIT Kharagpur</option>
            <option>IIM Ahmedabad</option>
            <option>IIM Bangalore</option>
            <option>IIM Calcutta</option>
          </select>
          <select id="filter-branch" onchange="filterFaculty()" class="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none">
            <option value="">All Branches</option>
            <option>Computer Science</option>
            <option>Electrical Engineering</option>
            <option>Mechanical Engineering</option>
            <option>Data Science & AI</option>
            <option>Finance & Analytics</option>
            <option>Operations Management</option>
          </select>
          <select id="filter-area" onchange="filterFaculty()" class="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none">
            <option value="">All Research Areas</option>
            <option>Machine Learning</option>
            <option>NLP</option>
            <option>Computer Vision</option>
            <option>Robotics</option>
            <option>Blockchain</option>
            <option>Cybersecurity</option>
            <option>FinTech</option>
            <option>IoT</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Faculty Table -->
    <section class="py-12 bg-white dark:bg-gray-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">

          ${locked ? `
          <!-- Lock Overlay -->
          <div class="lock-overlay rounded-2xl">
            <div class="text-center p-8">
              <div class="text-5xl mb-4">🔒</div>
              <h3 class="font-display font-bold text-xl text-gray-900 dark:text-white mb-2">Login to Access Full Portal</h3>
              <p class="text-gray-500 text-sm mb-6 max-w-sm">Get access to professor emails, download outreach templates, and unlock the complete database.</p>
              <button onclick="openLoginModal()" class="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-lg shadow-amber-500/25 transition-all">
                Login to Unlock 🔓
              </button>
            </div>
          </div>
          ` : ''}

          <div class="table-wrapper ${locked ? 'blur-sm pointer-events-none select-none' : ''}">
            <table class="w-full text-sm" id="faculty-table">
              <thead class="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th class="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Professor</th>
                  <th class="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Institute</th>
                  <th class="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400 hidden sm:table-cell">Branch</th>
                  <th class="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400 hidden md:table-cell">Research Area</th>
                  <th class="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Email</th>
                </tr>
              </thead>
              <tbody id="faculty-tbody" class="divide-y divide-gray-100 dark:divide-gray-800">
              </tbody>
            </table>
          </div>
          <div class="p-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <span id="faculty-count" class="text-sm text-gray-500">Showing 0 professors</span>
            <div class="flex gap-2">
              <button onclick="changeFacultyPage(-1)" class="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-sm hover:border-brand-500 transition-all">← Prev</button>
              <button onclick="changeFacultyPage(1)" class="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-sm hover:border-brand-500 transition-all">Next →</button>
            </div>
          </div>
        </div>

        ${!locked ? `
        <!-- Download Section -->
        <div class="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-2xl border border-amber-200 dark:border-amber-800 p-6 sm:p-8 text-center">
          <h3 class="font-display font-bold text-xl text-gray-900 dark:text-white mb-2">📥 Download Outreach Template</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">Get our proven cold-email template that has a 35% response rate from IIT/IIM professors.</p>
          <button onclick="downloadTemplate()" class="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-lg shadow-amber-500/25 transition-all">
            Download Template 📄
          </button>
        </div>
        ` : ''}
      </div>
    </section>
  `;

    renderFacultyTable();
    initScrollReveal();
}

// ===== Faculty Data =====
const facultyData = [
    { name: 'Dr. Anil Kumar', institute: 'IIT Bombay', branch: 'Computer Science', area: 'Machine Learning', email: 'anil.kumar@iitb.ac.in' },
    { name: 'Dr. Sunita Reddy', institute: 'IIT Delhi', branch: 'Computer Science', area: 'NLP', email: 'sunita.r@iitd.ac.in' },
    { name: 'Dr. Rajesh Iyer', institute: 'IIT Madras', branch: 'Electrical Engineering', area: 'Computer Vision', email: 'rajesh.iyer@iitm.ac.in' },
    { name: 'Dr. Priya Nair', institute: 'IIT Kanpur', branch: 'Computer Science', area: 'Cybersecurity', email: 'priya.nair@iitk.ac.in' },
    { name: 'Dr. Vikram Singh', institute: 'IIT Kharagpur', branch: 'Mechanical Engineering', area: 'Robotics', email: 'v.singh@iitkgp.ac.in' },
    { name: 'Dr. Meena Desai', institute: 'IIM Ahmedabad', branch: 'Finance & Analytics', area: 'FinTech', email: 'm.desai@iima.ac.in' },
    { name: 'Dr. Sanjay Gupta', institute: 'IIM Bangalore', branch: 'Operations Management', area: 'Machine Learning', email: 's.gupta@iimb.ac.in' },
    { name: 'Dr. Neha Sharma', institute: 'IIT Bombay', branch: 'Data Science & AI', area: 'Machine Learning', email: 'neha.s@iitb.ac.in' },
    { name: 'Dr. Arjun Menon', institute: 'IIT Delhi', branch: 'Computer Science', area: 'Blockchain', email: 'a.menon@iitd.ac.in' },
    { name: 'Dr. Kavitha Rajan', institute: 'IIT Madras', branch: 'Computer Science', area: 'NLP', email: 'kavitha.r@iitm.ac.in' },
    { name: 'Dr. Suresh Patel', institute: 'IIT Kanpur', branch: 'Electrical Engineering', area: 'IoT', email: 's.patel@iitk.ac.in' },
    { name: 'Dr. Ananya Das', institute: 'IIM Calcutta', branch: 'Finance & Analytics', area: 'FinTech', email: 'a.das@iimc.ac.in' },
    { name: 'Dr. Rahul Verma', institute: 'IIT Bombay', branch: 'Computer Science', area: 'Computer Vision', email: 'r.verma@iitb.ac.in' },
    { name: 'Dr. Swati Kulkarni', institute: 'IIT Delhi', branch: 'Data Science & AI', area: 'Machine Learning', email: 'swati.k@iitd.ac.in' },
    { name: 'Dr. Deepak Joshi', institute: 'IIT Kharagpur', branch: 'Computer Science', area: 'Cybersecurity', email: 'd.joshi@iitkgp.ac.in' },
    { name: 'Dr. Lakshmi Rao', institute: 'IIM Ahmedabad', branch: 'Operations Management', area: 'Machine Learning', email: 'l.rao@iima.ac.in' },
    { name: 'Dr. Manoj Tiwari', institute: 'IIT Madras', branch: 'Mechanical Engineering', area: 'Robotics', email: 'm.tiwari@iitm.ac.in' },
    { name: 'Dr. Pooja Bhatt', institute: 'IIT Bombay', branch: 'Data Science & AI', area: 'NLP', email: 'p.bhatt@iitb.ac.in' },
    { name: 'Dr. Kiran Malhotra', institute: 'IIM Bangalore', branch: 'Finance & Analytics', area: 'FinTech', email: 'k.malhotra@iimb.ac.in' },
    { name: 'Dr. Ravi Shankar', institute: 'IIT Delhi', branch: 'Electrical Engineering', area: 'IoT', email: 'r.shankar@iitd.ac.in' },
    { name: 'Dr. Geeta Saxena', institute: 'IIT Kanpur', branch: 'Computer Science', area: 'Blockchain', email: 'g.saxena@iitk.ac.in' },
    { name: 'Dr. Amit Chopra', institute: 'IIT Kharagpur', branch: 'Computer Science', area: 'Machine Learning', email: 'a.chopra@iitkgp.ac.in' },
    { name: 'Dr. Divya Pillai', institute: 'IIM Calcutta', branch: 'Operations Management', area: 'Machine Learning', email: 'd.pillai@iimc.ac.in' },
    { name: 'Dr. Harsh Mittal', institute: 'IIT Bombay', branch: 'Computer Science', area: 'Computer Vision', email: 'h.mittal@iitb.ac.in' },
    { name: 'Dr. Rina Agarwal', institute: 'IIT Madras', branch: 'Data Science & AI', area: 'Cybersecurity', email: 'r.agarwal@iitm.ac.in' },
    { name: 'Dr. Vijay Kapoor', institute: 'IIT Delhi', branch: 'Mechanical Engineering', area: 'Robotics', email: 'v.kapoor@iitd.ac.in' },
    { name: 'Dr. Smita Choudhary', institute: 'IIM Ahmedabad', branch: 'Finance & Analytics', area: 'Machine Learning', email: 's.choudhary@iima.ac.in' },
    { name: 'Dr. Nitin Bose', institute: 'IIT Kanpur', branch: 'Computer Science', area: 'NLP', email: 'n.bose@iitk.ac.in' },
    { name: 'Dr. Anjali Mishra', institute: 'IIT Bombay', branch: 'Electrical Engineering', area: 'IoT', email: 'a.mishra@iitb.ac.in' },
    { name: 'Dr. Pankaj Dhawan', institute: 'IIM Bangalore', branch: 'Operations Management', area: 'FinTech', email: 'p.dhawan@iimb.ac.in' },
];

let facultyPage = 0;
const perPage = 10;
let filteredFaculty = [...facultyData];

function filterFaculty() {
    const search = (document.getElementById('faculty-search')?.value || '').toLowerCase();
    const institute = document.getElementById('filter-institute')?.value || '';
    const branch = document.getElementById('filter-branch')?.value || '';
    const area = document.getElementById('filter-area')?.value || '';

    filteredFaculty = facultyData.filter(f => {
        const matchSearch = !search || f.name.toLowerCase().includes(search) || f.institute.toLowerCase().includes(search) || f.area.toLowerCase().includes(search);
        const matchInstitute = !institute || f.institute === institute;
        const matchBranch = !branch || f.branch === branch;
        const matchArea = !area || f.area === area;
        return matchSearch && matchInstitute && matchBranch && matchArea;
    });

    facultyPage = 0;
    renderFacultyTable();
}

function renderFacultyTable() {
    const tbody = document.getElementById('faculty-tbody');
    if (!tbody) return;

    const start = facultyPage * perPage;
    const pageData = filteredFaculty.slice(start, start + perPage);

    tbody.innerHTML = pageData.map(f => `
    <tr class="faculty-row">
      <td class="px-4 py-3">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">${f.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</div>
          <span class="font-medium text-gray-900 dark:text-white">${f.name}</span>
        </div>
      </td>
      <td class="px-4 py-3 text-gray-600 dark:text-gray-400">${f.institute}</td>
      <td class="px-4 py-3 text-gray-600 dark:text-gray-400 hidden sm:table-cell">${f.branch}</td>
      <td class="px-4 py-3 hidden md:table-cell"><span class="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">${f.area}</span></td>
      <td class="px-4 py-3">
        <button class="text-brand-600 dark:text-brand-400 text-xs font-medium hover:underline" onclick="copyToClipboard('${f.email}', this)">${isLoggedIn ? f.email : '••••@••••'}</button>
      </td>
    </tr>
  `).join('');

    const countEl = document.getElementById('faculty-count');
    if (countEl) countEl.textContent = `Showing ${start + 1}–${Math.min(start + perPage, filteredFaculty.length)} of ${filteredFaculty.length} professors`;
}

function changeFacultyPage(dir) {
    const maxPage = Math.ceil(filteredFaculty.length / perPage) - 1;
    facultyPage = Math.max(0, Math.min(maxPage, facultyPage + dir));
    renderFacultyTable();
}

function downloadTemplate() {
    const template = `Subject: Research Internship Inquiry — [Your Name], [Your University]

Dear Professor [Last Name],

I am [Your Name], a [Year] year [Branch] student at [Your University]. I came across your research on [Specific Research Topic] and found it deeply fascinating, particularly your work on [Specific Paper/Project].

I am writing to inquire about the possibility of a research internship in your lab during [Duration, e.g., Summer 2026]. My academic background includes:

• [Relevant Coursework 1]
• [Relevant Coursework 2]
• [Relevant Project/Publication]

I have attached my CV for your reference. I would be grateful for the opportunity to contribute to your research group and learn under your guidance.

Thank you for considering my request. I look forward to hearing from you.

Warm regards,
[Your Name]
[Your University]
[Your Email]
[Your Phone]`;

    const blob = new Blob([template], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Patil_Global_Outreach_Template.txt';
    a.click();
    URL.revokeObjectURL(url);
    showToast('📥 Template downloaded successfully!');
}

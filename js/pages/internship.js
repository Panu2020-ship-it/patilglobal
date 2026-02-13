/* ==================== IIT & IIM INTERNSHIP PORTAL PAGE — ENHANCED ==================== */

// ============================================================================
// SECTION 0: DATA — 1000+ Faculty (procedurally generated)
// ============================================================================

const firstNames = ['Anil', 'Sunita', 'Rajesh', 'Priya', 'Vikram', 'Meena', 'Sanjay', 'Neha', 'Arjun', 'Kavitha', 'Suresh', 'Ananya', 'Rahul', 'Swati', 'Deepak', 'Lakshmi', 'Manoj', 'Pooja', 'Kiran', 'Ravi', 'Geeta', 'Amit', 'Divya', 'Harsh', 'Rina', 'Vijay', 'Smita', 'Nitin', 'Anjali', 'Pankaj', 'Rohan', 'Sneha', 'Gaurav', 'Tanya', 'Ashok', 'Pallavi', 'Manish', 'Nisha', 'Rohit', 'Seema', 'Vivek', 'Jyoti', 'Arun', 'Bhavna', 'Ramesh', 'Aarti', 'Dinesh', 'Chitra', 'Girish', 'Rekha', 'Sandeep', 'Usha', 'Mahesh', 'Leela', 'Naveen', 'Shruti', 'Pranav', 'Anita', 'Sachin', 'Vandana', 'Akash', 'Meghna', 'Sunil', 'Padma', 'Shivam', 'Rashmi', 'Varun', 'Shalini', 'Kunal', 'Nandini', 'Tarun', 'Aparna', 'Vishal', 'Kalyani', 'Alok', 'Savita', 'Dev', 'Mala', 'Hemant', 'Indira', 'Prakash', 'Kamala', 'Kishore', 'Prema', 'Mohan', 'Sarita', 'Nagesh', 'Revathi', 'Ajay', 'Gauri', 'Siddharth', 'Lata', 'Yash', 'Bhavani', 'Utpal', 'Prema', 'Dilip', 'Padmini', 'Prasad', 'Hema'];
const lastNames = ['Kumar', 'Reddy', 'Iyer', 'Nair', 'Singh', 'Desai', 'Gupta', 'Sharma', 'Menon', 'Rajan', 'Patel', 'Das', 'Verma', 'Kulkarni', 'Joshi', 'Rao', 'Tiwari', 'Bhatt', 'Malhotra', 'Shankar', 'Saxena', 'Chopra', 'Pillai', 'Mittal', 'Agarwal', 'Kapoor', 'Choudhary', 'Bose', 'Mishra', 'Dhawan', 'Mehta', 'Banerjee', 'Chatterjee', 'Sen', 'Ghosh', 'Mukherjee', 'Roy', 'Thakur', 'Pandey', 'Chauhan', 'Yadav', 'Sinha', 'Bhatia', 'Arora', 'Mitra', 'Dutta', 'Hegde', 'Kamath', 'Shetty', 'Pai'];
const institutes = ['IIT Bombay', 'IIT Delhi', 'IIT Madras', 'IIT Kanpur', 'IIT Kharagpur', 'IIT Roorkee', 'IIT Guwahati', 'IIT Hyderabad', 'IIT Indore', 'IIT BHU', 'IIM Ahmedabad', 'IIM Bangalore', 'IIM Calcutta', 'IIM Lucknow', 'IIM Kozhikode', 'IIM Indore'];
const branches = ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Data Science & AI', 'Civil Engineering', 'Chemical Engineering', 'Aerospace Engineering', 'Finance & Analytics', 'Operations Management', 'Marketing & Strategy', 'Biotechnology', 'Physics', 'Mathematics', 'Chemistry'];
const areas = ['Machine Learning', 'NLP', 'Computer Vision', 'Robotics', 'Blockchain', 'Cybersecurity', 'FinTech', 'IoT', 'Cloud Computing', 'Quantum Computing', 'Reinforcement Learning', 'Graph Neural Networks', 'Generative AI', 'Edge Computing', 'Autonomous Systems', 'Bioinformatics', 'Signal Processing', 'VLSI', 'Control Systems', 'Optimization'];
const locations = ['Mumbai', 'New Delhi', 'Chennai', 'Kanpur', 'Kharagpur', 'Roorkee', 'Guwahati', 'Hyderabad', 'Indore', 'Varanasi', 'Ahmedabad', 'Bangalore', 'Kolkata', 'Lucknow', 'Kozhikode'];
const domains = { 'IIT Bombay': 'iitb.ac.in', 'IIT Delhi': 'iitd.ac.in', 'IIT Madras': 'iitm.ac.in', 'IIT Kanpur': 'iitk.ac.in', 'IIT Kharagpur': 'iitkgp.ac.in', 'IIT Roorkee': 'iitr.ac.in', 'IIT Guwahati': 'iitg.ac.in', 'IIT Hyderabad': 'iith.ac.in', 'IIT Indore': 'iiti.ac.in', 'IIT BHU': 'iitbhu.ac.in', 'IIM Ahmedabad': 'iima.ac.in', 'IIM Bangalore': 'iimb.ac.in', 'IIM Calcutta': 'iimc.ac.in', 'IIM Lucknow': 'iiml.ac.in', 'IIM Kozhikode': 'iimk.ac.in', 'IIM Indore': 'iimi.ac.in' };

function seededRandom(seed) {
    let s = seed;
    return function () {
        s = (s * 16807 + 0) % 2147483647;
        return (s - 1) / 2147483646;
    };
}

function generateFacultyData() {
    const rng = seededRandom(42);
    const data = [];
    for (let i = 0; i < 1050; i++) {
        const fn = firstNames[Math.floor(rng() * firstNames.length)];
        const ln = lastNames[Math.floor(rng() * lastNames.length)];
        const inst = institutes[Math.floor(rng() * institutes.length)];
        const br = branches[Math.floor(rng() * branches.length)];
        const ar = areas[Math.floor(rng() * areas.length)];
        const locIdx = institutes.indexOf(inst);
        const loc = locations[locIdx] || 'India';
        const emailPrefix = fn.toLowerCase().charAt(0) + '.' + ln.toLowerCase();
        const email = emailPrefix + '@' + (domains[inst] || 'university.ac.in');
        data.push({
            id: i + 1,
            name: 'Dr. ' + fn + ' ' + ln,
            institute: inst,
            branch: br,
            area: ar,
            location: loc,
            email: email
        });
    }
    return data;
}

const facultyData = generateFacultyData();

// ============================================================================
// SECTION 0b: DATA — Internship Openings
// ============================================================================

const internshipOpenings = [
    { id: 1, title: 'AI/ML Research Intern', professor: 'Dr. Neha Sharma', institute: 'IIT Bombay', topic: 'Generative Adversarial Networks for Medical Imaging', duration: '3 Months', stipend: '₹15,000/mo', deadline: '2026-02-28', field: 'Machine Learning', paid: true, status: 'open' },
    { id: 2, title: 'NLP Research Assistant', professor: 'Dr. Sunita Reddy', institute: 'IIT Delhi', topic: 'Multilingual Transformers for Indian Languages', duration: '6 Months', stipend: '₹12,000/mo', deadline: '2026-02-20', field: 'NLP', paid: true, status: 'closing' },
    { id: 3, title: 'Computer Vision Intern', professor: 'Dr. Rajesh Iyer', institute: 'IIT Madras', topic: 'Real-time Object Detection in Autonomous Vehicles', duration: '4 Months', stipend: '₹18,000/mo', deadline: '2026-03-15', field: 'Computer Vision', paid: true, status: 'open' },
    { id: 4, title: 'Cybersecurity Research Fellow', professor: 'Dr. Priya Nair', institute: 'IIT Kanpur', topic: 'Zero-Trust Architecture for IoT Networks', duration: '6 Months', stipend: '₹20,000/mo', deadline: '2026-03-01', field: 'Cybersecurity', paid: true, status: 'open' },
    { id: 5, title: 'Robotics Lab Intern', professor: 'Dr. Vikram Singh', institute: 'IIT Kharagpur', topic: 'Soft Robotics for Surgical Applications', duration: '3 Months', stipend: null, deadline: '2026-02-25', field: 'Robotics', paid: false, status: 'closing' },
    { id: 6, title: 'FinTech Research Intern', professor: 'Dr. Meena Desai', institute: 'IIM Ahmedabad', topic: 'Blockchain-based Decentralized Finance Models', duration: '4 Months', stipend: '₹10,000/mo', deadline: '2026-03-10', field: 'FinTech', paid: true, status: 'open' },
    { id: 7, title: 'Quantum Computing Intern', professor: 'Dr. Harsh Mittal', institute: 'IIT Bombay', topic: 'Quantum Machine Learning Algorithms', duration: '6 Months', stipend: '₹25,000/mo', deadline: '2026-04-01', field: 'Machine Learning', paid: true, status: 'open' },
    { id: 8, title: 'IoT Research Assistant', professor: 'Dr. Suresh Patel', institute: 'IIT Kanpur', topic: 'Smart Agriculture Sensor Networks', duration: '3 Months', stipend: null, deadline: '2026-02-18', field: 'IoT', paid: false, status: 'closed' },
    { id: 9, title: 'Data Analytics Intern', professor: 'Dr. Sanjay Gupta', institute: 'IIM Bangalore', topic: 'Predictive Analytics for Supply Chain Optimization', duration: '4 Months', stipend: '₹14,000/mo', deadline: '2026-03-20', field: 'FinTech', paid: true, status: 'open' },
    { id: 10, title: 'Blockchain Research Intern', professor: 'Dr. Arjun Menon', institute: 'IIT Delhi', topic: 'Smart Contract Verification using Formal Methods', duration: '6 Months', stipend: '₹16,000/mo', deadline: '2026-03-05', field: 'Blockchain', paid: true, status: 'open' },
    { id: 11, title: 'Edge AI Research Intern', professor: 'Dr. Kavitha Rajan', institute: 'IIT Madras', topic: 'TinyML for Edge Devices in Healthcare', duration: '3 Months', stipend: '₹12,000/mo', deadline: '2026-03-25', field: 'Machine Learning', paid: true, status: 'open' },
    { id: 12, title: 'Cloud Computing Intern', professor: 'Dr. Ravi Shankar', institute: 'IIT Delhi', topic: 'Serverless Architectures for Scientific Computing', duration: '4 Months', stipend: '₹15,000/mo', deadline: '2026-02-22', field: 'Cloud Computing', paid: true, status: 'closing' },
    { id: 13, title: 'Bioinformatics Research Intern', professor: 'Dr. Rina Agarwal', institute: 'IIT Madras', topic: 'Protein Structure Prediction with Deep Learning', duration: '6 Months', stipend: '₹18,000/mo', deadline: '2026-04-10', field: 'Machine Learning', paid: true, status: 'open' },
    { id: 14, title: 'Autonomous Systems Intern', professor: 'Dr. Vijay Kapoor', institute: 'IIT Delhi', topic: 'Path Planning for Autonomous Drones', duration: '3 Months', stipend: null, deadline: '2026-03-08', field: 'Robotics', paid: false, status: 'open' },
    { id: 15, title: 'Signal Processing Intern', professor: 'Dr. Anjali Mishra', institute: 'IIT Bombay', topic: 'Adaptive Beamforming for 5G Communications', duration: '4 Months', stipend: '₹14,000/mo', deadline: '2026-03-30', field: 'IoT', paid: true, status: 'open' },
    { id: 16, title: 'Operations Research Intern', professor: 'Dr. Divya Pillai', institute: 'IIM Calcutta', topic: 'Optimization Models for Healthcare Resource Allocation', duration: '3 Months', stipend: '₹10,000/mo', deadline: '2026-02-15', field: 'FinTech', paid: true, status: 'closed' },
];

// ============================================================================
// SECTION 1: RENDER INTERNSHIP PAGE
// ============================================================================

function renderInternshipPage(container) {
    const locked = !isLoggedIn;

    container.innerHTML = `
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-amber-950">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-float"></div>
        <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-float" style="animation-delay:-3s"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
            Research Portal
          </div>
          <h1 class="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white leading-tight">
            IIT & IIM Research <span class="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Internship Portal</span>
          </h1>
          <p class="mt-4 text-gray-600 dark:text-gray-400 text-lg max-w-2xl leading-relaxed">
            Connect with Professors. Apply to Live Openings. Start Research Faster.
          </p>
          <div class="flex flex-wrap gap-4 mt-6">
            <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><span class="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-600">👨‍🏫</span><span><strong class="text-gray-900 dark:text-white">1,050+</strong> Professors</span></div>
            <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><span class="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600">📋</span><span><strong class="text-gray-900 dark:text-white">16</strong> Live Openings</span></div>
            <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><span class="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600">🏛️</span><span><strong class="text-gray-900 dark:text-white">16</strong> Institutes</span></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tab Navigation -->
    <section class="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-16 z-30 backdrop-blur-xl bg-white/90 dark:bg-gray-950/90">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex gap-1 py-3">
          <button id="intern-tab-directory" onclick="switchInternshipTab('directory')" class="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all bg-brand-600 text-white shadow-lg shadow-brand-600/25">👨‍🏫 Professor Directory</button>
          <button id="intern-tab-openings" onclick="switchInternshipTab('openings')" class="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">📋 Internship Openings</button>
        </div>
      </div>
    </section>

    <!-- ============ SECTION 1: PROFESSOR DIRECTORY ============ -->
    <div id="intern-section-directory">
      <!-- Search & Filters -->
      <section class="py-6 bg-gray-50 dark:bg-gray-900/50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col lg:flex-row gap-3">
            <div class="relative flex-1">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <input type="text" id="faculty-search" oninput="debouncedFilterFaculty()" placeholder="Search by name, domain, or institute..." class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all" />
            </div>
            <select id="filter-institute" onchange="filterFaculty()" class="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none">
              <option value="">All Institutes</option>
              ${institutes.map(i => '<option>' + i + '</option>').join('')}
            </select>
            <select id="filter-branch" onchange="filterFaculty()" class="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none">
              <option value="">All Branches</option>
              ${branches.map(b => '<option>' + b + '</option>').join('')}
            </select>
            <select id="filter-area" onchange="filterFaculty()" class="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none">
              <option value="">All Research Areas</option>
              ${areas.map(a => '<option>' + a + '</option>').join('')}
            </select>
            <select id="filter-location" onchange="filterFaculty()" class="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none">
              <option value="">All Locations</option>
              ${[...new Set(locations)].map(l => '<option>' + l + '</option>').join('')}
            </select>
          </div>
        </div>
      </section>

      <!-- Faculty Table -->
      <section class="py-8 bg-white dark:bg-gray-950">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">

            ${locked ? `
            <div class="lock-overlay rounded-2xl">
              <div class="text-center p-8">
                <div class="text-5xl mb-4">🔒</div>
                <h3 class="font-display font-bold text-xl text-gray-900 dark:text-white mb-2">Login to Access Full Portal</h3>
                <p class="text-gray-500 text-sm mb-6 max-w-sm">Unlock professor emails, download CSV data, and access outreach templates.</p>
                <button onclick="openLoginModal()" class="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-lg shadow-amber-500/25 transition-all">Login to Unlock 🔓</button>
              </div>
            </div>
            ` : ''}

            <div class="${locked ? 'blur-sm pointer-events-none select-none' : ''}">
              <!-- Table toolbar -->
              <div class="p-4 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div class="flex items-center gap-3">
                  <div class="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span class="font-semibold text-gray-900 dark:text-white text-sm">Faculty Directory</span>
                  <span id="faculty-badge" class="px-2 py-0.5 rounded-full text-xs font-medium bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300">1,050 professors</span>
                </div>
                <div class="flex gap-2">
                  <button onclick="downloadCSV()" class="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium hover:border-brand-500 hover:text-brand-600 transition-all flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    Download CSV
                  </button>
                  <button onclick="downloadTemplate()" class="px-3 py-1.5 rounded-lg border border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400 text-xs font-medium hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-all flex items-center gap-1.5">
                    📧 Email Template
                  </button>
                </div>
              </div>

              <!-- Table -->
              <div class="table-wrapper">
                <table class="w-full text-sm" id="faculty-table">
                  <thead class="bg-gray-50 dark:bg-gray-800/50 sticky top-0">
                    <tr>
                      <th class="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider">#</th>
                      <th class="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider">Professor</th>
                      <th class="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider">Institute</th>
                      <th class="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider hidden sm:table-cell">Department</th>
                      <th class="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider hidden md:table-cell">Research Area</th>
                      <th class="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider">Email</th>
                      <th class="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody id="faculty-tbody" class="divide-y divide-gray-100 dark:divide-gray-800"></tbody>
                </table>
              </div>

              <!-- Pagination -->
              <div class="p-4 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span id="faculty-count" class="text-sm text-gray-500">Showing 0 professors</span>
                <div class="flex items-center gap-2">
                  <button onclick="changeFacultyPage(-1)" class="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-sm hover:border-brand-500 transition-all disabled:opacity-40" id="prev-page-btn">← Prev</button>
                  <span id="page-indicator" class="text-xs text-gray-500 font-medium px-2">Page 1</span>
                  <button onclick="changeFacultyPage(1)" class="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-sm hover:border-brand-500 transition-all" id="next-page-btn">Next →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- ============ SECTION 2: INTERNSHIP OPENINGS ============ -->
    <div id="intern-section-openings" class="hidden">
      <!-- Filters -->
      <section class="py-6 bg-gray-50 dark:bg-gray-900/50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col sm:flex-row gap-3">
            <select id="opening-filter-institute" onchange="filterOpenings()" class="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none">
              <option value="">All Institutes</option>
              ${[...new Set(internshipOpenings.map(o => o.institute))].map(i => '<option>' + i + '</option>').join('')}
            </select>
            <select id="opening-filter-paid" onchange="filterOpenings()" class="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none">
              <option value="">Paid & Unpaid</option>
              <option value="paid">Paid Only</option>
              <option value="unpaid">Unpaid Only</option>
            </select>
            <select id="opening-filter-duration" onchange="filterOpenings()" class="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none">
              <option value="">All Durations</option>
              <option value="3 Months">3 Months</option>
              <option value="4 Months">4 Months</option>
              <option value="6 Months">6 Months</option>
            </select>
            <select id="opening-filter-field" onchange="filterOpenings()" class="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none">
              <option value="">All Fields</option>
              ${[...new Set(internshipOpenings.map(o => o.field))].map(f => '<option>' + f + '</option>').join('')}
            </select>
            <select id="opening-sort" onchange="filterOpenings()" class="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 outline-none">
              <option value="latest">Sort: Latest</option>
              <option value="deadline">Sort: Deadline</option>
            </select>
          </div>
        </div>
      </section>

      <!-- Opening Cards -->
      <section class="py-8 bg-white dark:bg-gray-950">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div id="openings-grid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          </div>
          <div id="no-openings" class="hidden text-center py-16">
            <div class="text-4xl mb-3">🔍</div>
            <p class="text-gray-500 font-medium">No openings match your filters.</p>
          </div>
        </div>
      </section>
    </div>
  `;

    renderFacultyTable();
    renderOpeningsGrid();
    initScrollReveal();
}

// ============================================================================
// SECTION 2: TAB SWITCHING
// ============================================================================

function switchInternshipTab(tab) {
    const tabs = ['directory', 'openings'];
    tabs.forEach(t => {
        const section = document.getElementById('intern-section-' + t);
        const btn = document.getElementById('intern-tab-' + t);
        if (t === tab) {
            section.classList.remove('hidden');
            btn.className = 'px-5 py-2.5 rounded-lg text-sm font-semibold transition-all bg-brand-600 text-white shadow-lg shadow-brand-600/25';
        } else {
            section.classList.add('hidden');
            btn.className = 'px-5 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all';
        }
    });
}

// ============================================================================
// SECTION 3: FACULTY TABLE — Filter, Render, Paginate
// ============================================================================

let facultyPage = 0;
const perPage = 20;
let filteredFaculty = [...facultyData];
let debounceTimer = null;

function debouncedFilterFaculty() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(filterFaculty, 200);
}

function filterFaculty() {
    const search = (document.getElementById('faculty-search')?.value || '').toLowerCase();
    const institute = document.getElementById('filter-institute')?.value || '';
    const branch = document.getElementById('filter-branch')?.value || '';
    const area = document.getElementById('filter-area')?.value || '';
    const location = document.getElementById('filter-location')?.value || '';

    filteredFaculty = facultyData.filter(f => {
        const matchSearch = !search || f.name.toLowerCase().includes(search) || f.institute.toLowerCase().includes(search) || f.area.toLowerCase().includes(search) || f.branch.toLowerCase().includes(search) || f.email.toLowerCase().includes(search);
        const matchInstitute = !institute || f.institute === institute;
        const matchBranch = !branch || f.branch === branch;
        const matchArea = !area || f.area === area;
        const matchLocation = !location || f.location === location;
        return matchSearch && matchInstitute && matchBranch && matchArea && matchLocation;
    });

    facultyPage = 0;
    renderFacultyTable();
}

function renderFacultyTable() {
    const tbody = document.getElementById('faculty-tbody');
    if (!tbody) return;

    const start = facultyPage * perPage;
    const pageData = filteredFaculty.slice(start, start + perPage);
    const totalPages = Math.ceil(filteredFaculty.length / perPage);

    tbody.innerHTML = pageData.map((f, idx) => `
    <tr class="faculty-row">
      <td class="px-4 py-3 text-gray-400 text-xs font-mono">${start + idx + 1}</td>
      <td class="px-4 py-3">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">${f.name.split(' ').filter(n => n !== 'Dr.').map(n => n[0]).slice(0, 2).join('')}</div>
          <span class="font-medium text-gray-900 dark:text-white text-sm">${f.name}</span>
        </div>
      </td>
      <td class="px-4 py-3 text-gray-600 dark:text-gray-400 text-sm">${f.institute}</td>
      <td class="px-4 py-3 text-gray-600 dark:text-gray-400 text-sm hidden sm:table-cell">${f.branch}</td>
      <td class="px-4 py-3 hidden md:table-cell"><span class="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">${f.area}</span></td>
      <td class="px-4 py-3">
        <span class="text-xs font-mono ${isLoggedIn ? 'text-brand-600 dark:text-brand-400' : 'text-gray-400'}">${isLoggedIn ? f.email : '••••••@••••'}</span>
      </td>
      <td class="px-4 py-3">
        <div class="flex gap-1.5">
          <button onclick="copyToClipboard('${f.email}', this)" class="px-2 py-1 rounded text-xs font-medium bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-brand-900/50 transition-all" title="Copy email">📋</button>
          <a href="mailto:${f.email}" class="px-2 py-1 rounded text-xs font-medium bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all" title="Send email">📧</a>
        </div>
      </td>
    </tr>
  `).join('');

    const countEl = document.getElementById('faculty-count');
    if (countEl) countEl.textContent = 'Showing ' + (start + 1) + '–' + Math.min(start + perPage, filteredFaculty.length) + ' of ' + filteredFaculty.length + ' professors';

    const badgeEl = document.getElementById('faculty-badge');
    if (badgeEl) badgeEl.textContent = filteredFaculty.length.toLocaleString() + ' professors';

    const pageInd = document.getElementById('page-indicator');
    if (pageInd) pageInd.textContent = 'Page ' + (facultyPage + 1) + ' of ' + Math.max(1, totalPages);

    const prevBtn = document.getElementById('prev-page-btn');
    const nextBtn = document.getElementById('next-page-btn');
    if (prevBtn) prevBtn.disabled = facultyPage === 0;
    if (nextBtn) nextBtn.disabled = facultyPage >= totalPages - 1;
}

function changeFacultyPage(dir) {
    const maxPage = Math.ceil(filteredFaculty.length / perPage) - 1;
    facultyPage = Math.max(0, Math.min(maxPage, facultyPage + dir));
    renderFacultyTable();
    // Scroll to table top
    document.getElementById('faculty-table')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================================================
// SECTION 4: CSV DOWNLOAD
// ============================================================================

function downloadCSV() {
    if (!isLoggedIn) { openLoginModal(); return; }
    const headers = ['Name', 'Institute', 'Department', 'Research Area', 'Location', 'Email'];
    const rows = filteredFaculty.map(f => [f.name, f.institute, f.branch, f.area, f.location, f.email].map(v => '"' + v + '"').join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Patil_Global_Faculty_Directory.csv';
    a.click();
    URL.revokeObjectURL(url);
    showToast('📥 CSV downloaded — ' + filteredFaculty.length + ' professors exported!');
}

function downloadTemplate() {
    const template = 'Subject: Research Internship Inquiry — [Your Name], [Your University]\n\nDear Professor [Last Name],\n\nI am [Your Name], a [Year] year [Branch] student at [Your University]. I came across your research on [Specific Research Topic] and found it deeply fascinating, particularly your work on [Specific Paper/Project].\n\nI am writing to inquire about the possibility of a research internship in your lab during [Duration, e.g., Summer 2026]. My academic background includes:\n\n• [Relevant Coursework 1]\n• [Relevant Coursework 2]\n• [Relevant Project/Publication]\n\nI have attached my CV for your reference. I would be grateful for the opportunity to contribute to your research group and learn under your guidance.\n\nThank you for considering my request. I look forward to hearing from you.\n\nWarm regards,\n[Your Name]\n[Your University]\n[Your Email]\n[Your Phone]';
    const blob = new Blob([template], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Patil_Global_Outreach_Template.txt';
    a.click();
    URL.revokeObjectURL(url);
    showToast('📥 Template downloaded successfully!');
}

// ============================================================================
// SECTION 5: INTERNSHIP OPENINGS — Filter & Render
// ============================================================================

let bookmarkedOpenings = JSON.parse(localStorage.getItem('pg_bookmarks') || '[]');

function filterOpenings() {
    const institute = document.getElementById('opening-filter-institute')?.value || '';
    const paid = document.getElementById('opening-filter-paid')?.value || '';
    const duration = document.getElementById('opening-filter-duration')?.value || '';
    const field = document.getElementById('opening-filter-field')?.value || '';
    const sort = document.getElementById('opening-sort')?.value || 'latest';

    let filtered = internshipOpenings.filter(o => {
        return (!institute || o.institute === institute) &&
            (!paid || (paid === 'paid' ? o.paid : !o.paid)) &&
            (!duration || o.duration === duration) &&
            (!field || o.field === field);
    });

    if (sort === 'deadline') {
        filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else {
        filtered.sort((a, b) => b.id - a.id);
    }

    renderOpeningsGrid(filtered);
}

function renderOpeningsGrid(data) {
    const grid = document.getElementById('openings-grid');
    const noResults = document.getElementById('no-openings');
    if (!grid) return;

    const items = data || internshipOpenings;

    if (items.length === 0) {
        grid.innerHTML = '';
        if (noResults) noResults.classList.remove('hidden');
        return;
    }
    if (noResults) noResults.classList.add('hidden');

    grid.innerHTML = items.map(o => {
        const statusMap = { open: { label: 'OPEN', cls: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' }, closing: { label: 'CLOSING SOON', cls: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' }, closed: { label: 'CLOSED', cls: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' } };
        const s = statusMap[o.status] || statusMap.open;
        const isBookmarked = bookmarkedOpenings.includes(o.id);
        const deadlineDate = new Date(o.deadline);
        const deadlineStr = deadlineDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
        const isExpired = o.status === 'closed';

        return `
      <div class="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300 hover:-translate-y-1 ${isExpired ? 'opacity-60' : ''}">
        <div class="flex items-start justify-between mb-3">
          <span class="px-2.5 py-0.5 rounded-full text-xs font-bold ${s.cls}">${s.label}</span>
          <button onclick="toggleBookmark(${o.id})" class="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Bookmark">
            ${isBookmarked ? '<svg class="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>' : '<svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>'}
          </button>
        </div>
        <h3 class="font-display font-bold text-base text-gray-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">${o.title}</h3>
        <p class="text-gray-500 text-xs mb-3 leading-relaxed">${o.topic}</p>
        <div class="space-y-2 text-sm">
          <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400"><span class="text-base">👨‍🏫</span><span>${o.professor}</span></div>
          <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400"><span class="text-base">🏛️</span><span>${o.institute}</span></div>
          <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400"><span class="text-base">⏱️</span><span>${o.duration}</span></div>
          <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400"><span class="text-base">💰</span><span class="${o.paid ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-gray-400'}">${o.stipend || 'Unpaid'}</span></div>
          <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400"><span class="text-base">📅</span><span>Deadline: <strong>${deadlineStr}</strong></span></div>
        </div>
        <div class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          ${isExpired ?
                '<button disabled class="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-400 font-semibold text-sm cursor-not-allowed">Applications Closed</button>' :
                '<button onclick="applyToOpening(' + o.id + ')" class="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-semibold text-sm shadow-lg shadow-brand-600/25 hover:shadow-brand-600/40 transition-all">Apply Now →</button>'
            }
        </div>
      </div>
    `;
    }).join('');
}

function toggleBookmark(id) {
    const idx = bookmarkedOpenings.indexOf(id);
    if (idx > -1) {
        bookmarkedOpenings.splice(idx, 1);
        showToast('🔖 Bookmark removed');
    } else {
        bookmarkedOpenings.push(id);
        showToast('🔖 Bookmark saved!');
    }
    localStorage.setItem('pg_bookmarks', JSON.stringify(bookmarkedOpenings));
    filterOpenings();
}

function applyToOpening(id) {
    if (!isLoggedIn) {
        openLoginModal();
        return;
    }
    const opening = internshipOpenings.find(o => o.id === id);
    if (opening) {
        showToast('🎉 Application submitted for: ' + opening.title + '!');
    }
}

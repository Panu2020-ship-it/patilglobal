/* ==================== JOB APPLY ASSISTANT PAGE ==================== */

function renderJobAssistantPage(container) {
    container.innerHTML = `
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-violet-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            Smart Assistant
          </div>
          <h1 class="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white leading-tight">
            Job Apply <span class="text-violet-600 dark:text-violet-400">Assistant</span>
          </h1>
          <p class="mt-4 text-gray-600 dark:text-gray-400 text-lg max-w-2xl leading-relaxed">
            A step-by-step wizard that helps you craft the perfect application — from analyzing the posting to sending the ideal follow-up email.
          </p>
        </div>
      </div>
    </section>

    <!-- Wizard -->
    <section class="py-16 bg-white dark:bg-gray-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-12 gap-8">

          <!-- Sidebar Steps -->
          <div class="lg:col-span-4">
            <div class="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 sticky top-24">
              <h3 class="font-display font-bold text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 mb-3">Steps</h3>
              <div id="wizard-steps" class="space-y-1">
                <div class="wizard-step active" onclick="goToWizardStep(0)">
                  <div class="step-number">1</div>
                  <div>
                    <div class="text-sm font-semibold text-gray-900 dark:text-white">Analyze Job Posting</div>
                    <div class="text-xs text-gray-500">Extract requirements</div>
                  </div>
                </div>
                <div class="wizard-step" onclick="goToWizardStep(1)">
                  <div class="step-number">2</div>
                  <div>
                    <div class="text-sm font-semibold text-gray-900 dark:text-white">Generate Cover Letter</div>
                    <div class="text-xs text-gray-500">Personalized letter</div>
                  </div>
                </div>
                <div class="wizard-step" onclick="goToWizardStep(2)">
                  <div class="step-number">3</div>
                  <div>
                    <div class="text-sm font-semibold text-gray-900 dark:text-white">Application Answers</div>
                    <div class="text-xs text-gray-500">Common questions</div>
                  </div>
                </div>
                <div class="wizard-step" onclick="goToWizardStep(3)">
                  <div class="step-number">4</div>
                  <div>
                    <div class="text-sm font-semibold text-gray-900 dark:text-white">Find Hiring Manager</div>
                    <div class="text-xs text-gray-500">LinkedIn research</div>
                  </div>
                </div>
                <div class="wizard-step" onclick="goToWizardStep(4)">
                  <div class="step-number">5</div>
                  <div>
                    <div class="text-sm font-semibold text-gray-900 dark:text-white">Follow-up Email</div>
                    <div class="text-xs text-gray-500">Professional follow-up</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Content Area -->
          <div class="lg:col-span-8">
            <!-- Step 0: Analyze -->
            <div id="wizard-content-0" class="wizard-content">
              <div class="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
                <h2 class="font-display font-bold text-xl text-gray-900 dark:text-white mb-2">🔍 Analyze Job Posting</h2>
                <p class="text-gray-500 text-sm mb-6">Paste the job posting below to extract key requirements, skills, and company information.</p>
                <textarea id="wizard-job-input" rows="6" class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all resize-none mb-4" placeholder="Paste the full job posting here..."></textarea>
                <button onclick="analyzeJobPosting()" class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold text-sm shadow-lg shadow-violet-600/25 transition-all">
                  Analyze Posting →
                </button>
                <div id="wizard-analysis-result" class="hidden mt-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                  <h3 class="font-semibold text-gray-900 dark:text-white text-sm mb-3">📋 Extracted Information</h3>
                  <div class="grid sm:grid-cols-2 gap-4 text-sm">
                    <div><span class="text-gray-500 text-xs uppercase tracking-wider">Company</span><p class="font-medium text-gray-900 dark:text-white mt-0.5">TechCorp Solutions</p></div>
                    <div><span class="text-gray-500 text-xs uppercase tracking-wider">Role</span><p class="font-medium text-gray-900 dark:text-white mt-0.5">Senior Software Engineer</p></div>
                    <div><span class="text-gray-500 text-xs uppercase tracking-wider">Location</span><p class="font-medium text-gray-900 dark:text-white mt-0.5">Bangalore, India (Hybrid)</p></div>
                    <div><span class="text-gray-500 text-xs uppercase tracking-wider">Experience</span><p class="font-medium text-gray-900 dark:text-white mt-0.5">3-5 years</p></div>
                  </div>
                  <div class="mt-4">
                    <span class="text-gray-500 text-xs uppercase tracking-wider">Key Skills</span>
                    <div class="flex flex-wrap gap-2 mt-2">
                      ${['Python', 'Django', 'REST APIs', 'PostgreSQL', 'AWS', 'Docker', 'CI/CD', 'Git'].map(s => `<span class="px-2.5 py-1 rounded-lg bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 text-xs font-medium">${s}</span>`).join('')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 1: Cover Letter -->
            <div id="wizard-content-1" class="wizard-content hidden">
              <div class="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h2 class="font-display font-bold text-xl text-gray-900 dark:text-white">✉️ Cover Letter</h2>
                    <p class="text-gray-500 text-sm mt-1">Auto-generated, editable cover letter tailored for this position.</p>
                  </div>
                  <button class="copy-btn bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700" onclick="copyToClipboard(document.getElementById('cover-letter-text').value, this)">📋 Copy</button>
                </div>
                <textarea id="cover-letter-text" rows="16" class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all resize-none leading-relaxed">Dear Hiring Manager,

I am writing to express my strong interest in the Senior Software Engineer position at TechCorp Solutions. With over 4 years of experience building scalable web applications using Python and Django, I am confident in my ability to contribute meaningfully to your engineering team.

In my current role at DataFlow Inc., I have:
• Architected and maintained RESTful API services handling 50k+ daily requests with 99.9% uptime
• Optimized PostgreSQL database performance by 40% through strategic indexing and query refactoring
• Implemented CI/CD pipelines using GitHub Actions and Docker, reducing deployment time by 65%
• Led a team of 3 engineers in migrating legacy monolith to microservices on AWS

I am particularly drawn to TechCorp's mission of democratizing technology education. Your commitment to building developer-first platforms aligns perfectly with my passion for creating tools that empower other engineers.

I would welcome the opportunity to discuss how my technical expertise and collaborative approach can help drive TechCorp's next phase of growth.

Thank you for your consideration.

Best regards,
[Your Name]</textarea>
              </div>
            </div>

            <!-- Step 2: Application Answers -->
            <div id="wizard-content-2" class="wizard-content hidden">
              <div class="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
                <h2 class="font-display font-bold text-xl text-gray-900 dark:text-white mb-2">💬 Application Answers</h2>
                <p class="text-gray-500 text-sm mb-6">Pre-drafted answers to common application questions. Edit as needed.</p>
                <div class="space-y-6">
                  <div>
                    <label class="text-sm font-semibold text-gray-900 dark:text-white block mb-2">Why are you interested in this role?</label>
                    <textarea rows="4" class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all resize-none">I am excited about this role because it combines my deep expertise in Python and Django with the opportunity to work on developer-facing products. TechCorp's focus on scalable education platforms resonates with my belief that technology should empower learning. I see this as a chance to apply my skills in API architecture and cloud deployment to make a meaningful impact on millions of users.</textarea>
                    <div class="text-right mt-2"><button class="copy-btn bg-white dark:bg-gray-800 text-gray-500 text-xs border-gray-200 dark:border-gray-700" onclick="copyToClipboard(this.parentElement.previousElementSibling.value, this)">📋 Copy</button></div>
                  </div>
                  <div>
                    <label class="text-sm font-semibold text-gray-900 dark:text-white block mb-2">Describe a challenging project you've led.</label>
                    <textarea rows="4" class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all resize-none">I led the migration of our core payment processing system from a monolithic Django application to a microservices architecture on AWS ECS. The project involved coordinating with 4 teams, maintaining zero downtime during migration, and implementing comprehensive monitoring with CloudWatch. We achieved a 60% reduction in latency and 40% cost savings on infrastructure within 3 months.</textarea>
                    <div class="text-right mt-2"><button class="copy-btn bg-white dark:bg-gray-800 text-gray-500 text-xs border-gray-200 dark:border-gray-700" onclick="copyToClipboard(this.parentElement.previousElementSibling.value, this)">📋 Copy</button></div>
                  </div>
                  <div>
                    <label class="text-sm font-semibold text-gray-900 dark:text-white block mb-2">What is your expected salary range?</label>
                    <textarea rows="2" class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all resize-none">Based on my experience and the role's requirements, I would be looking for a range of ₹18-25 LPA. However, I am flexible and open to discussing compensation as part of the overall package, including equity and growth opportunities.</textarea>
                    <div class="text-right mt-2"><button class="copy-btn bg-white dark:bg-gray-800 text-gray-500 text-xs border-gray-200 dark:border-gray-700" onclick="copyToClipboard(this.parentElement.previousElementSibling.value, this)">📋 Copy</button></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 3: Find Hiring Manager -->
            <div id="wizard-content-3" class="wizard-content hidden">
              <div class="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
                <h2 class="font-display font-bold text-xl text-gray-900 dark:text-white mb-2">🔎 Find Hiring Manager</h2>
                <p class="text-gray-500 text-sm mb-6">Research the hiring manager to personalize your outreach. Here's a suggested approach.</p>
                <div class="space-y-4">
                  <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                    <div class="flex items-center gap-3 mb-3">
                      <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm">🔗</div>
                      <div>
                        <div class="text-sm font-semibold text-gray-900 dark:text-white">LinkedIn Search Strategy</div>
                        <div class="text-xs text-gray-500">Most effective method</div>
                      </div>
                    </div>
                    <div class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed space-y-2">
                      <p>1. Search: <code class="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-xs">"TechCorp Solutions" "Engineering Manager"</code></p>
                      <p>2. Filter by: <code class="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-xs">Current Company → TechCorp Solutions</code></p>
                      <p>3. Look for titles: VP Engineering, Engineering Director, Head of Engineering</p>
                      <p>4. Check mutual connections for warm introductions</p>
                    </div>
                  </div>
                  <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                    <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">📧 Likely Email Formats</h3>
                    <div class="flex flex-wrap gap-2 text-xs">
                      <span class="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-mono">firstname@techcorp.com</span>
                      <span class="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-mono">firstname.lastname@techcorp.com</span>
                      <span class="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-mono">f.lastname@techcorp.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 4: Follow-up Email -->
            <div id="wizard-content-4" class="wizard-content hidden">
              <div class="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h2 class="font-display font-bold text-xl text-gray-900 dark:text-white">📬 Follow-up Email</h2>
                    <p class="text-gray-500 text-sm mt-1">Send 5-7 days after applying. Professional and concise.</p>
                  </div>
                  <button class="copy-btn bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700" onclick="copyToClipboard(document.getElementById('followup-text').value, this)">📋 Copy</button>
                </div>
                <textarea id="followup-text" rows="14" class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all resize-none leading-relaxed">Subject: Following Up — Senior Software Engineer Application

Dear [Hiring Manager Name],

I hope this message finds you well. I recently applied for the Senior Software Engineer position at TechCorp Solutions and wanted to follow up to reiterate my enthusiasm for the opportunity.

With my experience in building scalable Python/Django applications and managing cloud infrastructure on AWS, I believe I can make an immediate impact on your engineering team. I was particularly excited to learn about your recent product launch in the education space.

I would love the opportunity to discuss how my background aligns with TechCorp's goals. Please let me know if there is any additional information I can provide.

Thank you for your time and consideration.

Best regards,
[Your Name]
[Phone Number]
[LinkedIn Profile URL]</textarea>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex items-center justify-between mt-8">
              <button id="wizard-prev-btn" onclick="prevWizardStep()" class="px-6 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-medium text-sm hover:border-brand-500 hover:text-brand-600 transition-all hidden">
                ← Previous
              </button>
              <div></div>
              <button id="wizard-next-btn" onclick="nextWizardStep()" class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold text-sm shadow-lg shadow-violet-600/25 transition-all">
                Next Step →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

    initScrollReveal();
}

// ===== Wizard State =====
let currentWizardStep = 0;
const totalWizardSteps = 5;

function goToWizardStep(step) {
    currentWizardStep = step;

    // Update step UI
    const steps = document.querySelectorAll('#wizard-steps .wizard-step');
    steps.forEach((s, i) => {
        s.classList.remove('active', 'completed');
        if (i < step) s.classList.add('completed');
        if (i === step) s.classList.add('active');
    });

    // Update completed step numbers
    steps.forEach((s, i) => {
        const numEl = s.querySelector('.step-number');
        if (i < step) {
            numEl.innerHTML = '<svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>';
        } else {
            numEl.textContent = i + 1;
        }
    });

    // Show content
    document.querySelectorAll('.wizard-content').forEach(c => c.classList.add('hidden'));
    document.getElementById('wizard-content-' + step).classList.remove('hidden');

    // Update buttons
    document.getElementById('wizard-prev-btn').classList.toggle('hidden', step === 0);
    const nextBtn = document.getElementById('wizard-next-btn');
    if (step === totalWizardSteps - 1) {
        nextBtn.innerHTML = '✅ Complete';
        nextBtn.onclick = () => showToast('🎉 Application package is ready! Good luck!');
    } else {
        nextBtn.innerHTML = 'Next Step →';
        nextBtn.onclick = nextWizardStep;
    }
}

function nextWizardStep() {
    if (currentWizardStep < totalWizardSteps - 1) {
        goToWizardStep(currentWizardStep + 1);
    }
}

function prevWizardStep() {
    if (currentWizardStep > 0) {
        goToWizardStep(currentWizardStep - 1);
    }
}

function analyzeJobPosting() {
    const input = document.getElementById('wizard-job-input').value;
    if (!input.trim()) {
        showToast('⚠️ Please paste a job posting first.');
        return;
    }
    setTimeout(() => {
        document.getElementById('wizard-analysis-result').classList.remove('hidden');
        showToast('✅ Job posting analyzed successfully!');
    }, 1000);
}

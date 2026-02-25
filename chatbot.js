/* ==================== PATIL GLOBAL CHATBOT ==================== */

let chatbotOpen = false;
let chatbotInitialized = false;

// ===== FAQ Knowledge Base =====
const chatbotKnowledge = {
    email: {
        keywords: ['email', 'professor', 'mail', 'contact professor', 'cold email', 'how to email', 'reach out'],
        answer: `Great question! 📧 Here's how to email professors for research internships:

**Step 1:** Go to our <a href="#" onclick="navigateTo('internship');toggleChatbot();" class="text-brand-600 dark:text-brand-400 font-medium hover:underline">Internship Portal</a> and browse 1,050+ professors.

**Step 2:** Use the search & filters to find professors in your research area.

**Step 3:** Click the 📋 button to copy their email.

**Step 4:** Download our proven cold-email template (35% response rate!) using the "📧 Email Template" button.

**Pro tips:**
• Personalize every email — mention a specific paper or project
• Keep it under 200 words
• Attach your CV as a well-formatted PDF
• Send between Tuesday–Thursday mornings`
    },
    apply: {
        keywords: ['apply', 'internship', 'opening', 'application', 'how to apply', 'research intern', 'available'],
        answer: `Here's how to apply for live internships! 📋

**Step 1:** Go to the <a href="#" onclick="navigateTo('internship');toggleChatbot();" class="text-brand-600 dark:text-brand-400 font-medium hover:underline">Internship Portal</a>.

**Step 2:** Click the "📋 Internship Openings" tab.

**Step 3:** Browse live openings with details like stipend, duration, and deadline.

**Step 4:** Use filters to narrow down by institute, paid/unpaid, duration, or field.

**Step 5:** Click "Apply Now" on any opening you're interested in.

💡 **Tip:** Bookmark openings you like by clicking the 🔖 icon, and check back regularly — new openings are added often!`
    },
    resume: {
        keywords: ['resume', 'cv', 'resume tips', 'write resume', 'improve resume', 'format'],
        answer: `Here are expert resume tips for students! 📄

**Format:**
• Use clean, single-column layout
• Stick to 1 page (2 max for experienced)
• Use consistent fonts (Inter, Calibri, or Arial)
• Save as PDF — always

**Content checklist:**
✅ Contact info at the top
✅ Education with GPA (if > 7.5)
✅ Relevant projects with impact metrics
✅ Technical skills with proficiency levels
✅ Certifications & publications

**Common mistakes to avoid:**
❌ Generic objective statements
❌ Spelling & grammar errors
❌ Irrelevant work experience
❌ Missing keywords from job description

👉 Try our <a href="#" onclick="navigateTo('resume-optimizer');toggleChatbot();" class="text-brand-600 dark:text-brand-400 font-medium hover:underline">Resume Optimizer</a> to get your ATS score instantly!`
    },
    ats: {
        keywords: ['ats', 'ats score', 'applicant tracking', 'score', 'keyword match', 'optimize', 'scan'],
        answer: `Let me explain ATS and how to beat it! 🎯

**What is ATS?**
Applicant Tracking Systems scan resumes before a human ever sees them. ~75% of resumes get rejected by ATS.

**How to boost your ATS score:**
1. **Match keywords** — mirror exact phrases from the job description
2. **Use standard headings** — "Experience", "Education", "Skills"
3. **Avoid tables/columns** — ATS can't parse them well
4. **No images or graphics** — use text only
5. **Simple formatting** — .docx or .pdf only

**Use our tool:**
Our <a href="#" onclick="navigateTo('resume-optimizer');toggleChatbot();" class="text-brand-600 dark:text-brand-400 font-medium hover:underline">Resume Optimizer</a> analyzes your resume against any job description and shows:
• Match score percentage
• Missing keywords
• Skill gaps
• Optimized bullet rewrites

Upload your resume now and get instant results!`
    },
    contact: {
        keywords: ['contact', 'support', 'help', 'issue', 'bug', 'feedback', 'reach you'],
        answer: `We're here to help! 💬

**Get in touch:**
• 📧 Email: support@patilglobal.com
• 💬 Use the contact form on our <a href="#" onclick="navigateTo('home');toggleChatbot();setTimeout(()=>document.getElementById('contact-form')?.scrollIntoView({behavior:'smooth'}),300);" class="text-brand-600 dark:text-brand-400 font-medium hover:underline">Home page</a>
• 🐦 Twitter: @PatilGlobal

**Response time:** We typically reply within 24 hours.

**For urgent issues:**
If you're experiencing a technical issue, please include:
1. What page you're on
2. What you were trying to do
3. Screenshots if possible

We love feedback too — it helps us improve! 🚀`
    },
    tools: {
        keywords: ['tools', 'features', 'what can', 'what do', 'about', 'help me with'],
        answer: `Here's everything Patil Global can do for you! 🚀

**🔧 Our tools:**

1. **⚙️ Background Job Processing** — Learn async task queues with Python (Celery), Node.js (Bull), Ruby (Sidekiq)
   → <a href="#" onclick="navigateTo('background-jobs');toggleChatbot();" class="text-brand-600 dark:text-brand-400 font-medium hover:underline">Go to Background Jobs</a>

2. **📄 Resume Optimizer** — Upload your resume, get ATS score, missing keywords, and smart rewrites
   → <a href="#" onclick="navigateTo('resume-optimizer');toggleChatbot();" class="text-brand-600 dark:text-brand-400 font-medium hover:underline">Go to Resume Optimizer</a>

3. **🤖 Job Apply Assistant** — Step-by-step wizard for cover letters, applications, and follow-ups
   → <a href="#" onclick="navigateTo('job-assistant');toggleChatbot();" class="text-brand-600 dark:text-brand-400 font-medium hover:underline">Go to Job Assistant</a>

4. **🎓 Internship Portal** — 1,050+ professors at IITs & IIMs + live internship openings
   → <a href="#" onclick="navigateTo('internship');toggleChatbot();" class="text-brand-600 dark:text-brand-400 font-medium hover:underline">Go to Internship Portal</a>`
    },
    greeting: {
        keywords: ['hi', 'hello', 'hey', 'good morning', 'good evening', 'good afternoon', 'sup', 'yo'],
        answer: `Hey there! 👋 Welcome to Patil Global!

I'm your assistant and I can help you with:
• 📧 How to email professors for internships
• 📋 Applying to live research openings
• 📄 Resume writing tips
• 🎯 Understanding & improving ATS scores
• 🔧 Navigating our tools

Just type your question or tap one of the quick actions below! 😊`
    },
    login: {
        keywords: ['login', 'sign up', 'register', 'account', 'sign in', 'logged in'],
        answer: `To access all features, you need to be logged in! 🔐

**What you get after logging in:**
✅ View all professor emails
✅ Download CSV of faculty directory
✅ Apply to internship openings
✅ Get the cold-email outreach template
✅ Save bookmarks

Click the **Login** button in the navbar, or I can open it for you:
<button onclick="openLoginModal();toggleChatbot();" class="mt-2 px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-all">Login Now →</button>`
    }
};

// ===== Toggle Chatbot =====
function toggleChatbot() {
    chatbotOpen = !chatbotOpen;
    const win = document.getElementById('chatbot-window');
    const iconOpen = document.getElementById('chatbot-icon-open');
    const iconClose = document.getElementById('chatbot-icon-close');

    if (chatbotOpen) {
        win.classList.remove('hidden');
        requestAnimationFrame(() => {
            win.classList.remove('opacity-0', 'translate-y-4');
            win.classList.add('opacity-100', 'translate-y-0');
        });
        iconOpen.classList.add('hidden');
        iconClose.classList.remove('hidden');
        if (!chatbotInitialized) {
            initChatbot();
            chatbotInitialized = true;
        }
        document.getElementById('chatbot-input')?.focus();
    } else {
        win.classList.add('opacity-0', 'translate-y-4');
        win.classList.remove('opacity-100', 'translate-y-0');
        setTimeout(() => win.classList.add('hidden'), 300);
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
    }
}

// ===== Initialize =====
function initChatbot() {
    addBotMessage(`Hi there! 👋 I'm the **Patil Global Assistant**.

I can help you navigate the platform, find internships, optimize your resume, and more!

What would you like to know?`);
}

// ===== Add Messages =====
function addBotMessage(text) {
    const container = document.getElementById('chatbot-messages');
    if (!container) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'flex gap-2.5 animate-slide-up';
    wrapper.innerHTML = `
    <div class="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">PG</div>
    <div class="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-md px-4 py-3 max-w-[85%]">
      <div class="text-sm text-gray-800 dark:text-gray-200 leading-relaxed chatbot-msg-content">${formatBotMessage(text)}</div>
    </div>
  `;
    container.appendChild(wrapper);
    scrollChatToBottom();
}

function addUserMessage(text) {
    const container = document.getElementById('chatbot-messages');
    if (!container) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'flex justify-end animate-slide-up';
    wrapper.innerHTML = `
    <div class="bg-brand-600 text-white rounded-2xl rounded-tr-md px-4 py-3 max-w-[85%]">
      <div class="text-sm leading-relaxed">${escapeHTML(text)}</div>
    </div>
  `;
    container.appendChild(wrapper);
    scrollChatToBottom();
}

function addTypingIndicator() {
    const container = document.getElementById('chatbot-messages');
    if (!container) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'flex gap-2.5 animate-slide-up';
    wrapper.id = 'typing-indicator';
    wrapper.innerHTML = `
    <div class="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">PG</div>
    <div class="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-md px-4 py-3">
      <div class="flex gap-1.5 items-center">
        <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay:0ms"></span>
        <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay:150ms"></span>
        <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay:300ms"></span>
      </div>
    </div>
  `;
    container.appendChild(wrapper);
    scrollChatToBottom();
}

function removeTypingIndicator() {
    document.getElementById('typing-indicator')?.remove();
}

// ===== Handle Submit =====
function handleChatbotSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('chatbot-input');
    const text = input.value.trim();
    if (!text) return;

    addUserMessage(text);
    input.value = '';

    // Show typing then respond
    addTypingIndicator();
    setTimeout(() => {
        removeTypingIndicator();
        const response = findBestResponse(text);
        addBotMessage(response);
    }, 600 + Math.random() * 800);
}

// ===== Quick Actions =====
function chatbotQuickAction(key) {
    const labels = {
        email: 'How to email professors?',
        apply: 'How to apply for internships?',
        resume: 'Resume tips',
        ats: 'ATS score help',
        contact: 'Contact support'
    };

    addUserMessage(labels[key] || key);
    addTypingIndicator();
    setTimeout(() => {
        removeTypingIndicator();
        const kb = chatbotKnowledge[key];
        if (kb) {
            addBotMessage(kb.answer);
        } else {
            addBotMessage("I'm not sure about that. Try asking about internships, resumes, ATS scores, or our tools!");
        }
    }, 500 + Math.random() * 500);
}

// ===== Find Best Response =====
function findBestResponse(text) {
    const lower = text.toLowerCase();

    // Score each topic by keyword matches
    let bestTopic = null;
    let bestScore = 0;

    for (const [key, topic] of Object.entries(chatbotKnowledge)) {
        let score = 0;
        topic.keywords.forEach(kw => {
            if (lower.includes(kw)) score += kw.length; // Longer keyword = stronger match
        });
        if (score > bestScore) {
            bestScore = score;
            bestTopic = topic;
        }
    }

    if (bestTopic && bestScore > 0) {
        return bestTopic.answer;
    }

    // Fallback responses
    const fallbacks = [
        `I'm not sure about that specific topic, but I can help you with:

• **Emailing professors** for internships
• **Applying** to research openings
• **Resume** optimization tips
• **ATS score** improvement
• **Navigating** our platform tools

Try asking about any of these, or use the quick action buttons below! 👇`,

        `That's a great question! While I may not have a specific answer for that, you can:

1. Check our <a href="#" onclick="navigateTo('internship');toggleChatbot();" class="text-brand-600 dark:text-brand-400 font-medium hover:underline">Internship Portal</a> for opportunities
2. Use the <a href="#" onclick="navigateTo('resume-optimizer');toggleChatbot();" class="text-brand-600 dark:text-brand-400 font-medium hover:underline">Resume Optimizer</a>
3. Contact us via our <a href="#" onclick="navigateTo('home');toggleChatbot();setTimeout(()=>document.getElementById('contact-form')?.scrollIntoView({behavior:'smooth'}),300);" class="text-brand-600 dark:text-brand-400 font-medium hover:underline">contact form</a>

Or try rephrasing your question! 😊`
    ];

    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

// ===== Helpers =====
function formatBotMessage(text) {
    // Convert markdown-style bold
    let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Convert newlines to <br>
    html = html.replace(/\n/g, '<br>');
    return html;
}

function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function scrollChatToBottom() {
    const container = document.getElementById('chatbot-messages');
    if (container) {
        setTimeout(() => {
            container.scrollTop = container.scrollHeight;
        }, 50);
    }
}

/* ==================== CHAT PAGE ==================== */

const chatContacts = [
  { id: 1, name: 'Arjun Sharma', avatar: 'AS', color: 'from-brand-400 to-brand-600', status: 'online', lastMsg: 'Hey, did you check the new internship listings?', time: '2m ago', unread: 2 },
  { id: 2, name: 'Priya Mehta', avatar: 'PM', color: 'from-emerald-400 to-teal-600', status: 'online', lastMsg: 'Thanks for the resume tips!', time: '15m ago', unread: 0 },
  { id: 3, name: 'Rahul Kumar', avatar: 'RK', color: 'from-violet-400 to-purple-600', status: 'offline', lastMsg: 'Let me know when you apply.', time: '1h ago', unread: 0 },
  { id: 4, name: 'Sneha Patel', avatar: 'SP', color: 'from-amber-400 to-orange-500', status: 'online', lastMsg: 'The ATS score jumped to 92%!', time: '3h ago', unread: 1 },
  { id: 5, name: 'Dev Kapoor', avatar: 'DK', color: 'from-pink-400 to-rose-500', status: 'offline', lastMsg: 'Good luck with the interview!', time: 'Yesterday', unread: 0 },
];

const chatHistory = {
  1: [
    { from: 'them', text: 'Hey! Have you seen the new IIT Bombay internship openings?', time: '10:30 AM' },
    { from: 'me', text: 'Not yet, let me check the portal!', time: '10:31 AM' },
    { from: 'them', text: 'There are 3 ML roles open. Deadline is next week.', time: '10:32 AM' },
    { from: 'me', text: 'Thanks for the heads up! I\'ll apply today.', time: '10:33 AM' },
    { from: 'them', text: 'Hey, did you check the new internship listings?', time: '10:45 AM' },
  ],
  2: [
    { from: 'them', text: 'I used the resume optimizer and my ATS score went from 55% to 88%!', time: '9:00 AM' },
    { from: 'me', text: 'That\'s amazing! Which job description did you use?', time: '9:05 AM' },
    { from: 'them', text: 'Thanks for the resume tips!', time: '9:10 AM' },
  ],
  3: [
    { from: 'me', text: 'I\'m applying to the Data Science role at AnalyticsPro.', time: 'Yesterday' },
    { from: 'them', text: 'Let me know when you apply.', time: 'Yesterday' },
  ],
  4: [
    { from: 'them', text: 'The ATS score jumped to 92%!', time: '3h ago' },
  ],
  5: [
    { from: 'me', text: 'I have an interview tomorrow at CloudBase!', time: 'Yesterday' },
    { from: 'them', text: 'Good luck with the interview!', time: 'Yesterday' },
  ],
};

let chatState = { activeContact: 1 };

function renderChatPage(container) {
  container.innerHTML = getChatHTML();
  openChatContact(1);
}

function getChatHTML() {
  return `
  <div class="flex h-[calc(100vh-4rem)] bg-white dark:bg-gray-950 overflow-hidden">
    <!-- Sidebar -->
    <div class="w-full sm:w-80 lg:w-96 border-r border-gray-200 dark:border-gray-800 flex flex-col flex-shrink-0" id="chat-sidebar">
      <!-- Header -->
      <div class="p-4 border-b border-gray-200 dark:border-gray-800">
        <div class="flex items-center justify-between mb-3">
          <h2 class="font-display font-bold text-lg text-gray-900 dark:text-white">Messages</h2>
          <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all" title="New message">
            <svg class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          </button>
        </div>
        <div class="relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input type="text" placeholder="Search conversations..." class="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all" />
        </div>
      </div>
      <!-- Contact List -->
      <div class="flex-1 overflow-y-auto" id="chat-contact-list">
        ${chatContacts.map(c => renderContactItem(c)).join('')}
      </div>
    </div>

    <!-- Chat Window -->
    <div class="flex-1 flex flex-col min-w-0" id="chat-window">
      <!-- Chat Header -->
      <div id="chat-header" class="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3 bg-white dark:bg-gray-950"></div>
      <!-- Messages -->
      <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900/50"></div>
      <!-- Input -->
      <div class="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <form id="chat-form" onsubmit="sendChatMessage(event)" class="flex items-center gap-3">
          <input id="chat-input" type="text" placeholder="Type a message..." class="flex-1 px-4 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all" autocomplete="off" />
          <button type="submit" class="w-11 h-11 rounded-2xl bg-brand-600 hover:bg-brand-700 flex items-center justify-center transition-all shadow-lg shadow-brand-600/25 flex-shrink-0">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
          </button>
        </form>
      </div>
    </div>
  </div>
  `;
}

function renderContactItem(contact) {
  return `
    <div id="contact-item-${contact.id}" onclick="openChatContact(${contact.id})" class="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-all border-b border-gray-100 dark:border-gray-800/50">
      <div class="relative flex-shrink-0">
        <div class="w-11 h-11 rounded-full bg-gradient-to-br ${contact.color} flex items-center justify-center text-white text-sm font-bold">${contact.avatar}</div>
        <span class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-950 ${contact.status === 'online' ? 'bg-emerald-500' : 'bg-gray-400'}"></span>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between">
          <span class="text-sm font-semibold text-gray-900 dark:text-white truncate">${contact.name}</span>
          <span class="text-xs text-gray-400 flex-shrink-0 ml-2">${contact.time}</span>
        </div>
        <div class="flex items-center justify-between mt-0.5">
          <span class="text-xs text-gray-500 dark:text-gray-400 truncate">${contact.lastMsg}</span>
          ${contact.unread > 0 ? `<span class="ml-2 w-5 h-5 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center flex-shrink-0">${contact.unread}</span>` : ''}
        </div>
      </div>
    </div>
  `;
}

function openChatContact(id) {
  chatState.activeContact = id;
  const contact = chatContacts.find(c => c.id === id);
  if (!contact) return;

  // Highlight active contact
  document.querySelectorAll('[id^="contact-item-"]').forEach(el => {
    el.classList.remove('bg-brand-50', 'dark:bg-brand-950/30');
  });
  const activeEl = document.getElementById(`contact-item-${id}`);
  if (activeEl) activeEl.classList.add('bg-brand-50', 'dark:bg-brand-950/30');

  // Render header
  const header = document.getElementById('chat-header');
  if (header) {
    header.innerHTML = `
      <div class="relative">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br ${contact.color} flex items-center justify-center text-white text-sm font-bold">${contact.avatar}</div>
        <span class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-gray-950 ${contact.status === 'online' ? 'bg-emerald-500' : 'bg-gray-400'}"></span>
      </div>
      <div>
        <div class="font-semibold text-gray-900 dark:text-white text-sm">${contact.name}</div>
        <div class="text-xs ${contact.status === 'online' ? 'text-emerald-500' : 'text-gray-400'}">${contact.status === 'online' ? 'Online' : 'Offline'}</div>
      </div>
    `;
  }

  // Render messages
  renderChatMessages(id);

  // Clear unread
  contact.unread = 0;
  const badge = activeEl?.querySelector('.bg-brand-600.rounded-full');
  if (badge) badge.remove();
}

function renderChatMessages(contactId) {
  const msgs = chatHistory[contactId] || [];
  const container = document.getElementById('chat-messages');
  if (!container) return;
  container.innerHTML = msgs.map(msg => `
    <div class="flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'} animate-slide-up">
      <div class="max-w-[75%]">
        <div class="px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.from === 'me' ? 'bg-brand-600 text-white rounded-br-md' : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-md shadow-sm border border-gray-100 dark:border-gray-700'}">${msg.text}</div>
        <div class="text-xs text-gray-400 mt-1 ${msg.from === 'me' ? 'text-right' : 'text-left'}">${msg.time}</div>
      </div>
    </div>
  `).join('');
  container.scrollTop = container.scrollHeight;
}

function sendChatMessage(e) {
  e.preventDefault();
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;

  const id = chatState.activeContact;
  if (!chatHistory[id]) chatHistory[id] = [];

  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  chatHistory[id].push({ from: 'me', text, time });
  input.value = '';
  renderChatMessages(id);

  // Simulate reply after delay
  const contact = chatContacts.find(c => c.id === id);
  if (contact && contact.status === 'online') {
    setTimeout(() => {
      const replies = [
        'That sounds great!',
        'I\'ll check it out.',
        'Thanks for sharing!',
        'Interesting, tell me more.',
        '👍',
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      chatHistory[id].push({ from: 'them', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
      renderChatMessages(id);
    }, 1000 + Math.random() * 1500);
  }
}

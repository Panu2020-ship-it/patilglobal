/* ==================== COMMUNITY PAGE ==================== */

let communityPosts = [
  {
    id: 1, author: 'Arjun Sharma', avatar: 'AS', color: 'from-brand-400 to-brand-600',
    role: 'IIT Delhi · CS', time: '2 hours ago',
    content: 'Just got my ATS score from 42% to 91% using the Resume Optimizer here! The keyword suggestions were spot on. Highly recommend to everyone applying for tech roles. 🚀',
    likes: 34, comments: [
      { author: 'Priya M.', avatar: 'PM', color: 'from-emerald-400 to-teal-600', text: 'That\'s amazing! Which job description did you use?', time: '1h ago' },
      { author: 'Rahul K.', avatar: 'RK', color: 'from-violet-400 to-purple-600', text: 'Congrats! I need to try this.', time: '45m ago' },
    ],
    liked: false, tag: 'Resume Tips'
  },
  {
    id: 2, author: 'Priya Mehta', avatar: 'PM', color: 'from-emerald-400 to-teal-600',
    role: 'IIM Ahmedabad · MBA', time: '5 hours ago',
    content: 'Pro tip for cold emailing professors: mention ONE specific paper of theirs and explain how it connects to your research interest. My response rate went from 5% to 35% after doing this. Quality > Quantity always.',
    likes: 67, comments: [
      { author: 'Dev K.', avatar: 'DK', color: 'from-pink-400 to-rose-500', text: 'This is gold. Saving this post!', time: '4h ago' },
    ],
    liked: false, tag: 'Internship Tips'
  },
  {
    id: 3, author: 'Rahul Kumar', avatar: 'RK', color: 'from-violet-400 to-purple-600',
    role: 'NIT Trichy · Electronics', time: '1 day ago',
    content: 'Question for the community: Is it better to apply to 50 jobs with a generic resume or 10 jobs with a tailored resume? My experience says tailored wins every time. What do you think?',
    likes: 45, comments: [
      { author: 'Arjun S.', avatar: 'AS', color: 'from-brand-400 to-brand-600', text: 'Tailored 100%. Quality over quantity.', time: '23h ago' },
      { author: 'Sneha P.', avatar: 'SP', color: 'from-amber-400 to-orange-500', text: 'Agreed! I got 3 interviews from 8 tailored apps.', time: '20h ago' },
    ],
    liked: false, tag: 'Discussion'
  },
  {
    id: 4, author: 'Sneha Patel', avatar: 'SP', color: 'from-amber-400 to-orange-500',
    role: 'IIT Bombay · Data Science', time: '2 days ago',
    content: 'Sharing my internship journey: Applied to 12 professors at IIT Madras using the portal here. Got 4 replies, 2 interviews, and 1 offer! The email template was a game changer. Starting my ML research internship next month! 🎉',
    likes: 112, comments: [
      { author: 'Priya M.', avatar: 'PM', color: 'from-emerald-400 to-teal-600', text: 'Congratulations!! Well deserved 🎊', time: '2d ago' },
      { author: 'Rahul K.', avatar: 'RK', color: 'from-violet-400 to-purple-600', text: 'Inspiring! Which research area?', time: '2d ago' },
    ],
    liked: false, tag: 'Success Story'
  },
];

let communityState = { activeTab: 'feed', expandedComments: new Set(), newPostOpen: false };

function renderCommunityPage(container) {
  container.innerHTML = getCommunityHTML();
}

function getCommunityHTML() {
  return `
  <!-- Hero -->
  <section class="bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950 py-12 sm:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          ${communityPosts.length} Active Discussions
        </div>
        <h1 class="font-display font-black text-3xl sm:text-5xl text-gray-900 dark:text-white leading-tight">
          The <span class="text-emerald-600 dark:text-emerald-400">Community</span>
        </h1>
        <p class="mt-4 text-gray-600 dark:text-gray-400 text-lg">Share experiences, ask questions, and grow together with thousands of students.</p>
      </div>
    </div>
  </section>

  <!-- Content -->
  <section class="py-8 bg-white dark:bg-gray-950 min-h-screen">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Tabs -->
      <div class="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
        ${['feed','trending','tips'].map(tab => `
          <button onclick="switchCommunityTab('${tab}')" id="comm-tab-${tab}" class="px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === 'feed' ? 'bg-emerald-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}">
            ${{ feed: '🏠 Feed', trending: '🔥 Trending', tips: '💡 Tips' }[tab]}
          </button>
        `).join('')}
        <button onclick="openNewPostModal()" class="ml-auto px-4 py-2 rounded-lg text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          New Post
        </button>
      </div>

      <!-- Posts Feed -->
      <div id="community-feed" class="space-y-5">
        ${communityPosts.map(post => renderPost(post)).join('')}
      </div>
    </div>
  </section>

  <!-- New Post Modal -->
  <div id="new-post-modal" class="fixed inset-0 z-[100] hidden">
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" onclick="closeNewPostModal()"></div>
    <div class="relative flex items-center justify-center min-h-full p-4">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 w-full max-w-lg p-8 animate-scale-in">
        <div class="flex items-center justify-between mb-6">
          <h2 class="font-display font-bold text-xl text-gray-900 dark:text-white">Create Post</h2>
          <button onclick="closeNewPostModal()" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
            <svg class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <form onsubmit="handleNewPost(event)" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Tag</label>
            <select id="post-tag" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm transition-all">
              <option>Discussion</option>
              <option>Resume Tips</option>
              <option>Internship Tips</option>
              <option>Success Story</option>
              <option>Question</option>
              <option>Resource</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">What's on your mind?</label>
            <textarea id="post-content" rows="5" required placeholder="Share your experience, tips, or ask a question..." class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm transition-all resize-none"></textarea>
          </div>
          <button type="submit" class="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-sm hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg shadow-emerald-600/25">Post to Community</button>
        </form>
      </div>
    </div>
  </div>
  `;
}

function renderPost(post) {
  const tagColors = {
    'Resume Tips': 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
    'Internship Tips': 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300',
    'Discussion': 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
    'Success Story': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
    'Question': 'bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300',
    'Resource': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  };
  const showComments = communityState.expandedComments.has(post.id);
  return `
    <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all" id="post-${post.id}">
      <!-- Author -->
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br ${post.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0">${post.avatar}</div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="font-semibold text-gray-900 dark:text-white text-sm">${post.author}</span>
            <span class="text-xs px-2 py-0.5 rounded-full ${tagColors[post.tag] || tagColors['Resource']}">${post.tag}</span>
          </div>
          <div class="text-xs text-gray-400">${post.role} · ${post.time}</div>
        </div>
      </div>
      <!-- Content -->
      <p class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">${post.content}</p>
      <!-- Actions -->
      <div class="flex items-center gap-4 pt-3 border-t border-gray-100 dark:border-gray-800">
        <button onclick="toggleLike(${post.id})" id="like-btn-${post.id}" class="flex items-center gap-1.5 text-sm font-medium transition-all ${post.liked ? 'text-rose-500' : 'text-gray-500 dark:text-gray-400 hover:text-rose-500'}">
          <svg class="w-4 h-4" fill="${post.liked ? 'currentColor' : 'none'}" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          <span id="like-count-${post.id}">${post.likes}</span>
        </button>
        <button onclick="toggleComments(${post.id})" class="flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-emerald-600 transition-all">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
          ${post.comments.length} Comments
        </button>
        <button onclick="navigateTo('chat')" class="flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-brand-600 transition-all ml-auto">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
          Message
        </button>
      </div>
      <!-- Comments Section -->
      <div id="comments-${post.id}" class="${showComments ? '' : 'hidden'} mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
        ${post.comments.map(c => `
          <div class="flex gap-2.5">
            <div class="w-7 h-7 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">${c.avatar}</div>
            <div class="flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2">
              <div class="flex items-center gap-2 mb-0.5">
                <span class="text-xs font-semibold text-gray-900 dark:text-white">${c.author}</span>
                <span class="text-xs text-gray-400">${c.time}</span>
              </div>
              <p class="text-xs text-gray-600 dark:text-gray-400">${c.text}</p>
            </div>
          </div>
        `).join('')}
        <!-- Add Comment -->
        <div class="flex gap-2.5 mt-2">
          <div class="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">Me</div>
          <form onsubmit="addComment(event, ${post.id})" class="flex-1 flex gap-2">
            <input type="text" placeholder="Write a comment..." class="flex-1 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
            <button type="submit" class="px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 transition-all">Post</button>
          </form>
        </div>
      </div>
    </div>
  `;
}

function toggleLike(postId) {
  const post = communityPosts.find(p => p.id === postId);
  if (!post) return;
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;

  const btn = document.getElementById(`like-btn-${postId}`);
  const count = document.getElementById(`like-count-${postId}`);
  if (btn) {
    btn.className = `flex items-center gap-1.5 text-sm font-medium transition-all ${post.liked ? 'text-rose-500' : 'text-gray-500 dark:text-gray-400 hover:text-rose-500'}`;
    btn.querySelector('svg').setAttribute('fill', post.liked ? 'currentColor' : 'none');
  }
  if (count) count.textContent = post.likes;
}

function toggleComments(postId) {
  const section = document.getElementById(`comments-${postId}`);
  if (!section) return;
  const isHidden = section.classList.contains('hidden');
  if (isHidden) {
    section.classList.remove('hidden');
    communityState.expandedComments.add(postId);
  } else {
    section.classList.add('hidden');
    communityState.expandedComments.delete(postId);
  }
}

function addComment(e, postId) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  const text = input.value.trim();
  if (!text) return;

  const post = communityPosts.find(p => p.id === postId);
  if (!post) return;

  post.comments.push({ author: 'You', avatar: 'Me', color: 'from-brand-400 to-brand-600', text, time: 'Just now' });
  input.value = '';

  // Re-render just the comments section
  const section = document.getElementById(`comments-${postId}`);
  if (section) {
    const newComment = document.createElement('div');
    newComment.className = 'flex gap-2.5 animate-slide-up';
    newComment.innerHTML = `
      <div class="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">Me</div>
      <div class="flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2">
        <div class="flex items-center gap-2 mb-0.5">
          <span class="text-xs font-semibold text-gray-900 dark:text-white">You</span>
          <span class="text-xs text-gray-400">Just now</span>
        </div>
        <p class="text-xs text-gray-600 dark:text-gray-400">${text}</p>
      </div>
    `;
    // Insert before the add-comment form (last child)
    section.insertBefore(newComment, section.lastElementChild);
  }
}

function switchCommunityTab(tab) {
  communityState.activeTab = tab;
  ['feed', 'trending', 'tips'].forEach(t => {
    const btn = document.getElementById(`comm-tab-${t}`);
    if (!btn) return;
    btn.className = `px-4 py-2 rounded-lg text-sm font-medium transition-all ${t === tab ? 'bg-emerald-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`;
  });

  const feed = document.getElementById('community-feed');
  if (!feed) return;

  let posts = [...communityPosts];
  if (tab === 'trending') posts = [...posts].sort((a, b) => b.likes - a.likes);
  if (tab === 'tips') posts = posts.filter(p => p.tag === 'Resume Tips' || p.tag === 'Internship Tips');

  feed.innerHTML = posts.length ? posts.map(p => renderPost(p)).join('') : '<div class="text-center py-16 text-gray-400">No posts in this category yet.</div>';
}

function openNewPostModal() {
  document.getElementById('new-post-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeNewPostModal() {
  document.getElementById('new-post-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

function handleNewPost(e) {
  e.preventDefault();
  const content = document.getElementById('post-content').value.trim();
  const tag = document.getElementById('post-tag').value;
  if (!content) return;

  const newPost = {
    id: Date.now(),
    author: 'You',
    avatar: 'Me',
    color: 'from-brand-400 to-brand-600',
    role: 'Patil Global Member',
    time: 'Just now',
    content,
    likes: 0,
    comments: [],
    liked: false,
    tag,
  };

  communityPosts.unshift(newPost);
  closeNewPostModal();

  const feed = document.getElementById('community-feed');
  if (feed) {
    const el = document.createElement('div');
    el.innerHTML = renderPost(newPost);
    feed.insertBefore(el.firstElementChild, feed.firstChild);
  }

  showToast('🌐 Post shared with the community!');
}

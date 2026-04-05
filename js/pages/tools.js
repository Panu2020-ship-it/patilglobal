/* ==================== TOOLS HUB PAGE ==================== */

const toolsRegistry = [
  {
    id: 'jpg-to-pdf',
    icon: '🖼️',
    title: 'JPG to PDF',
    desc: 'Convert multiple images into a single PDF. Drag, reorder, and download instantly.',
    tags: ['Images', 'PDF', 'Convert'],
    color: 'from-orange-500 to-amber-500',
    bg: 'from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30',
    border: 'hover:border-orange-300 dark:hover:border-orange-700',
    status: 'live',
  },
  {
    id: 'pdf-extractor',
    icon: '📄',
    title: 'PDF Extractor',
    desc: 'Extract text, tables, and metadata from any PDF. Export as TXT, CSV, or Excel.',
    tags: ['PDF', 'Extract', 'Tables'],
    color: 'from-blue-500 to-indigo-500',
    bg: 'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30',
    border: 'hover:border-blue-300 dark:hover:border-blue-700',
    status: 'live',
  },
  {
    id: 'pdf-merge',
    icon: '🔗',
    title: 'PDF Merge',
    desc: 'Combine multiple PDF files into one document in seconds.',
    tags: ['PDF', 'Merge'],
    color: 'from-violet-500 to-purple-500',
    bg: 'from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30',
    border: 'hover:border-violet-300 dark:hover:border-violet-700',
    status: 'soon',
  },
  {
    id: 'pdf-split',
    icon: '✂️',
    title: 'PDF Split',
    desc: 'Split a PDF into individual pages or custom page ranges.',
    tags: ['PDF', 'Split'],
    color: 'from-rose-500 to-pink-500',
    bg: 'from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30',
    border: 'hover:border-rose-300 dark:hover:border-rose-700',
    status: 'soon',
  },
  {
    id: 'image-compressor',
    icon: '🗜️',
    title: 'Image Compressor',
    desc: 'Compress JPG/PNG images without visible quality loss.',
    tags: ['Images', 'Compress'],
    color: 'from-emerald-500 to-teal-500',
    bg: 'from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30',
    border: 'hover:border-emerald-300 dark:hover:border-emerald-700',
    status: 'soon',
  },
  {
    id: 'resume-analyzer',
    icon: '🎯',
    title: 'Resume Analyzer',
    desc: 'Deep ATS analysis with keyword gap detection and rewrite suggestions.',
    tags: ['Resume', 'AI'],
    color: 'from-brand-500 to-indigo-500',
    bg: 'from-brand-50 to-indigo-50 dark:from-brand-950/30 dark:to-indigo-950/30',
    border: 'hover:border-brand-300 dark:hover:border-brand-700',
    status: 'soon',
  },
];

function renderToolsPage(container) {
  container.innerHTML = `
  <!-- Hero -->
  <section class="bg-gradient-to-br from-slate-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-slate-950 py-16 sm:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          Utility Tools
        </div>
        <h1 class="font-display font-black text-3xl sm:text-5xl text-gray-900 dark:text-white leading-tight">
          Powerful <span class="bg-gradient-to-r from-orange-500 to-indigo-600 bg-clip-text text-transparent">Tools</span>
        </h1>
        <p class="mt-4 text-gray-600 dark:text-gray-400 text-lg">File conversion, extraction, and processing — all in your browser. No uploads to servers, no sign-up required.</p>
      </div>
    </div>
  </section>

  <!-- Tools Grid -->
  <section class="py-12 bg-white dark:bg-gray-950 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${toolsRegistry.map(tool => `
          <div class="group relative bg-gradient-to-br ${tool.bg} rounded-2xl border border-gray-200 dark:border-gray-800 ${tool.border} p-6 transition-all duration-200 hover:shadow-xl hover:-translate-y-1 ${tool.status === 'live' ? 'cursor-pointer' : 'opacity-75'}"
            ${tool.status === 'live' ? `onclick="navigateTo('${tool.id}')"` : ''}>
            ${tool.status === 'soon' ? `<div class="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400">Coming Soon</div>` : `<div class="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center gap-1"><span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>Live</div>`}
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-2xl mb-5 shadow-lg group-hover:scale-110 transition-transform">${tool.icon}</div>
            <h3 class="font-display font-bold text-lg text-gray-900 dark:text-white mb-2">${tool.title}</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">${tool.desc}</p>
            <div class="flex flex-wrap gap-1.5">
              ${tool.tags.map(t => `<span class="text-xs px-2 py-0.5 rounded-md bg-white/70 dark:bg-gray-800/70 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">${t}</span>`).join('')}
            </div>
            ${tool.status === 'live' ? `<div class="mt-5 flex items-center gap-1 text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:gap-2 transition-all">Open Tool <span>→</span></div>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  `;
}

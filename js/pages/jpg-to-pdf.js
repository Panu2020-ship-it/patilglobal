/* ==================== JPG TO PDF CONVERTER ==================== */

let jpgToPdfState = {
  files: [],       // { id, file, dataUrl, name }
  dragging: null,  // index being dragged
  converting: false,
};

function renderJpgToPdfPage(container) {
  container.innerHTML = getJpgToPdfHTML();
  bindJpgToPdfEvents();
}

function getJpgToPdfHTML() {
  return `
  <!-- Breadcrumb -->
  <div class="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 lg:px-8 py-3">
    <div class="max-w-5xl mx-auto flex items-center gap-2 text-sm text-gray-500">
      <button onclick="navigateTo('tools')" class="hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center gap-1">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        Tools
      </button>
      <span>/</span>
      <span class="text-gray-900 dark:text-white font-medium">JPG to PDF</span>
    </div>
  </div>

  <!-- Main -->
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-950 dark:via-gray-900 dark:to-orange-950/20 py-10">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="text-center mb-10">
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-3xl mx-auto mb-4 shadow-xl shadow-orange-500/25">🖼️</div>
        <h1 class="font-display font-black text-3xl sm:text-4xl text-gray-900 dark:text-white">JPG to PDF Converter</h1>
        <p class="mt-2 text-gray-500 dark:text-gray-400">Upload images, reorder them, and download as a single PDF — all in your browser.</p>
      </div>

      <!-- Drop Zone -->
      <div id="jpg-dropzone"
        class="relative border-2 border-dashed border-orange-300 dark:border-orange-700 rounded-2xl p-10 text-center transition-all duration-200 cursor-pointer hover:border-orange-500 hover:bg-orange-50/50 dark:hover:bg-orange-950/20 bg-white dark:bg-gray-900"
        onclick="document.getElementById('jpg-file-input').click()"
        ondragover="handleJpgDragOver(event)"
        ondragleave="handleJpgDragLeave(event)"
        ondrop="handleJpgFileDrop(event)">
        <input id="jpg-file-input" type="file" accept="image/jpeg,image/png,image/webp" multiple class="hidden" onchange="handleJpgFileSelect(event)" />
        <div class="flex flex-col items-center gap-3 pointer-events-none">
          <div class="w-14 h-14 rounded-xl bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
            <svg class="w-7 h-7 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          </div>
          <div>
            <p class="font-semibold text-gray-700 dark:text-gray-300">Drop images here or <span class="text-orange-500">browse</span></p>
            <p class="text-sm text-gray-400 mt-1">JPG, PNG, WebP supported · Multiple files allowed</p>
          </div>
        </div>
      </div>

      <!-- Image Preview Grid (shown after upload) -->
      <div id="jpg-preview-section" class="hidden mt-8">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="font-display font-bold text-lg text-gray-900 dark:text-white">Images <span id="jpg-count" class="text-orange-500">0</span></h2>
            <p class="text-sm text-gray-400">Drag cards to reorder pages in the PDF</p>
          </div>
          <div class="flex gap-2">
            <button onclick="document.getElementById('jpg-file-input').click()" class="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">+ Add More</button>
            <button onclick="clearJpgFiles()" class="px-4 py-2 rounded-xl border border-red-200 dark:border-red-900 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all">Clear All</button>
          </div>
        </div>

        <!-- Sortable Grid -->
        <div id="jpg-grid" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"></div>

        <!-- PDF Settings -->
        <div class="mt-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 class="font-semibold text-gray-900 dark:text-white mb-4">PDF Settings</h3>
          <div class="grid sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Page Size</label>
              <select id="pdf-page-size" class="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all">
                <option value="a4">A4</option>
                <option value="letter">Letter</option>
                <option value="fit">Fit to Image</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Orientation</label>
              <select id="pdf-orientation" class="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all">
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Margin</label>
              <select id="pdf-margin" class="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all">
                <option value="0">No Margin</option>
                <option value="10" selected>Small (10px)</option>
                <option value="20">Medium (20px)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Convert Button -->
        <div class="mt-6 flex flex-col sm:flex-row items-center gap-4">
          <button id="convert-btn" onclick="convertJpgToPdf()" class="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-base shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            Convert & Download PDF
          </button>
          <p class="text-sm text-gray-400">Processed entirely in your browser — files never leave your device.</p>
        </div>

        <!-- Progress -->
        <div id="jpg-progress" class="hidden mt-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300" id="jpg-progress-label">Processing images...</span>
            <span class="text-sm font-semibold text-orange-500" id="jpg-progress-pct">0%</span>
          </div>
          <div class="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div id="jpg-progress-bar" class="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-300" style="width:0%"></div>
          </div>
        </div>

        <!-- Success -->
        <div id="jpg-success" class="hidden mt-6 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white text-xl flex-shrink-0">✓</div>
          <div class="flex-1">
            <div class="font-semibold text-emerald-800 dark:text-emerald-300">PDF created successfully!</div>
            <div class="text-sm text-emerald-600 dark:text-emerald-400 mt-0.5">Your download should start automatically.</div>
          </div>
          <button onclick="resetJpgTool()" class="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-all">Convert More</button>
        </div>
      </div>

    </div>
  </div>
  `;
}

function bindJpgToPdfEvents() {
  // Reset state on page load
  jpgToPdfState.files = [];
  jpgToPdfState.converting = false;
}

// ===== File Handling =====
function handleJpgFileSelect(e) {
  addJpgFiles(Array.from(e.target.files));
  e.target.value = ''; // allow re-selecting same files
}

function handleJpgDragOver(e) {
  e.preventDefault();
  document.getElementById('jpg-dropzone').classList.add('border-orange-500', 'bg-orange-50/50', 'dark:bg-orange-950/20');
}

function handleJpgDragLeave(e) {
  document.getElementById('jpg-dropzone').classList.remove('border-orange-500', 'bg-orange-50/50', 'dark:bg-orange-950/20');
}

function handleJpgFileDrop(e) {
  e.preventDefault();
  handleJpgDragLeave(e);
  const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
  addJpgFiles(files);
}

function addJpgFiles(files) {
  const readers = files.map(file => new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = (e) => resolve({
      id: Date.now() + Math.random(),
      file,
      dataUrl: e.target.result,
      name: file.name,
    });
    reader.readAsDataURL(file);
  }));

  Promise.all(readers).then(newFiles => {
    jpgToPdfState.files.push(...newFiles);
    renderJpgGrid();
    document.getElementById('jpg-preview-section').classList.remove('hidden');
    document.getElementById('jpg-success').classList.add('hidden');
  });
}

function renderJpgGrid() {
  const grid = document.getElementById('jpg-grid');
  const count = document.getElementById('jpg-count');
  if (!grid) return;
  count.textContent = jpgToPdfState.files.length;

  grid.innerHTML = jpgToPdfState.files.map((f, i) => `
    <div class="jpg-card group relative bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden cursor-grab active:cursor-grabbing transition-all hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-lg"
      draggable="true"
      data-index="${i}"
      ondragstart="onJpgCardDragStart(event, ${i})"
      ondragover="onJpgCardDragOver(event, ${i})"
      ondrop="onJpgCardDrop(event, ${i})"
      ondragend="onJpgCardDragEnd(event)">
      <div class="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img src="${f.dataUrl}" alt="${f.name}" class="w-full h-full object-cover pointer-events-none" />
      </div>
      <div class="p-2">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-orange-500">#${i + 1}</span>
          <button onclick="removeJpgFile(${i})" class="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-red-400 hover:text-red-500">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <p class="text-xs text-gray-400 truncate mt-0.5">${f.name}</p>
      </div>
    </div>
  `).join('');
}

// ===== Drag-to-Reorder =====
function onJpgCardDragStart(e, index) {
  jpgToPdfState.dragging = index;
  e.dataTransfer.effectAllowed = 'move';
  setTimeout(() => e.target.classList.add('opacity-50'), 0);
}

function onJpgCardDragOver(e, index) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  document.querySelectorAll('.jpg-card').forEach((c, i) => {
    c.classList.toggle('border-orange-500', i === index && i !== jpgToPdfState.dragging);
  });
}

function onJpgCardDrop(e, targetIndex) {
  e.preventDefault();
  const fromIndex = jpgToPdfState.dragging;
  if (fromIndex === null || fromIndex === targetIndex) return;
  const files = jpgToPdfState.files;
  const [moved] = files.splice(fromIndex, 1);
  files.splice(targetIndex, 0, moved);
  jpgToPdfState.dragging = null;
  renderJpgGrid();
}

function onJpgCardDragEnd(e) {
  e.target.classList.remove('opacity-50');
  document.querySelectorAll('.jpg-card').forEach(c => c.classList.remove('border-orange-500'));
  jpgToPdfState.dragging = null;
}

function removeJpgFile(index) {
  jpgToPdfState.files.splice(index, 1);
  if (jpgToPdfState.files.length === 0) {
    document.getElementById('jpg-preview-section').classList.add('hidden');
  } else {
    renderJpgGrid();
  }
}

function clearJpgFiles() {
  jpgToPdfState.files = [];
  document.getElementById('jpg-preview-section').classList.add('hidden');
}

function resetJpgTool() {
  clearJpgFiles();
  document.getElementById('jpg-success').classList.add('hidden');
  document.getElementById('jpg-progress').classList.add('hidden');
}

// ===== PDF Conversion (using jsPDF via CDN) =====
async function convertJpgToPdf() {
  if (jpgToPdfState.files.length === 0 || jpgToPdfState.converting) return;
  jpgToPdfState.converting = true;

  const progressEl = document.getElementById('jpg-progress');
  const progressBar = document.getElementById('jpg-progress-bar');
  const progressPct = document.getElementById('jpg-progress-pct');
  const progressLabel = document.getElementById('jpg-progress-label');
  const successEl = document.getElementById('jpg-success');
  const convertBtn = document.getElementById('convert-btn');

  progressEl.classList.remove('hidden');
  successEl.classList.add('hidden');
  convertBtn.disabled = true;
  convertBtn.classList.add('opacity-60', 'cursor-not-allowed');

  const setProgress = (pct, label) => {
    progressBar.style.width = pct + '%';
    progressPct.textContent = pct + '%';
    if (label) progressLabel.textContent = label;
  };

  try {
    // Load jsPDF dynamically if not already loaded
    if (!window.jspdf) {
      setProgress(10, 'Loading PDF library...');
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
    }

    const { jsPDF } = window.jspdf;
    const pageSize = document.getElementById('pdf-page-size').value;
    const orientation = document.getElementById('pdf-orientation').value;
    const margin = parseInt(document.getElementById('pdf-margin').value);
    const files = jpgToPdfState.files;

    setProgress(20, 'Initializing PDF...');

    let pdf = null;

    for (let i = 0; i < files.length; i++) {
      const pct = Math.round(20 + ((i / files.length) * 70));
      setProgress(pct, `Processing image ${i + 1} of ${files.length}...`);

      await new Promise(resolve => setTimeout(resolve, 30)); // yield to UI

      const img = new Image();
      img.src = files[i].dataUrl;
      await new Promise(r => { img.onload = r; });

      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;

      let pdfW, pdfH;
      if (pageSize === 'fit') {
        pdfW = imgW * 0.264583; // px to mm (96dpi)
        pdfH = imgH * 0.264583;
      } else if (pageSize === 'a4') {
        pdfW = orientation === 'portrait' ? 210 : 297;
        pdfH = orientation === 'portrait' ? 297 : 210;
      } else { // letter
        pdfW = orientation === 'portrait' ? 215.9 : 279.4;
        pdfH = orientation === 'portrait' ? 279.4 : 215.9;
      }

      if (i === 0) {
        pdf = new jsPDF({ orientation: pageSize === 'fit' ? (imgW > imgH ? 'landscape' : 'portrait') : orientation, unit: 'mm', format: pageSize === 'fit' ? [pdfW, pdfH] : pageSize });
      } else {
        pdf.addPage(pageSize === 'fit' ? [pdfW, pdfH] : pageSize, pageSize === 'fit' ? (imgW > imgH ? 'landscape' : 'portrait') : orientation);
      }

      const m = margin * 0.264583;
      const drawW = pdfW - m * 2;
      const drawH = pdfH - m * 2;

      // Fit image within page preserving aspect ratio
      const ratio = Math.min(drawW / imgW, drawH / imgH);
      const finalW = imgW * ratio;
      const finalH = imgH * ratio;
      const x = m + (drawW - finalW) / 2;
      const y = m + (drawH - finalH) / 2;

      const fmt = files[i].file.type === 'image/png' ? 'PNG' : 'JPEG';
      pdf.addImage(files[i].dataUrl, fmt, x, y, finalW, finalH);
    }

    setProgress(95, 'Finalizing PDF...');
    await new Promise(r => setTimeout(r, 200));

    pdf.save('patilglobal-images.pdf');

    setProgress(100, 'Done!');
    setTimeout(() => {
      progressEl.classList.add('hidden');
      successEl.classList.remove('hidden');
    }, 600);

  } catch (err) {
    console.error(err);
    progressLabel.textContent = 'Error: ' + err.message;
    progressBar.classList.add('bg-red-500');
  } finally {
    jpgToPdfState.converting = false;
    convertBtn.disabled = false;
    convertBtn.classList.remove('opacity-60', 'cursor-not-allowed');
  }
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

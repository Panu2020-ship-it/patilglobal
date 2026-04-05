/* ==================== PDF EXTRACTOR ==================== */

let pdfExtractorState = {
  file: null,
  pdfDoc: null,
  totalPages: 0,
  extractedText: '',
  extractedTables: [],
  metadata: {},
  processing: false,
  activeTab: 'text',
};

function renderPdfExtractorPage(container) {
  container.innerHTML = getPdfExtractorHTML();
  pdfExtractorState = { file: null, pdfDoc: null, totalPages: 0, extractedText: '', extractedTables: [], metadata: {}, processing: false, activeTab: 'text' };
}

function getPdfExtractorHTML() {
  return `
  <!-- Breadcrumb -->
  <div class="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 lg:px-8 py-3">
    <div class="max-w-5xl mx-auto flex items-center gap-2 text-sm text-gray-500">
      <button onclick="navigateTo('tools')" class="hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center gap-1">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        Tools
      </button>
      <span>/</span>
      <span class="text-gray-900 dark:text-white font-medium">PDF Extractor</span>
    </div>
  </div>

  <!-- Main -->
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20 py-10">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="text-center mb-10">
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-3xl mx-auto mb-4 shadow-xl shadow-blue-500/25">📄</div>
        <h1 class="font-display font-black text-3xl sm:text-4xl text-gray-900 dark:text-white">PDF Extractor</h1>
        <p class="mt-2 text-gray-500 dark:text-gray-400">Extract text, tables, and metadata from any PDF. Export as TXT or CSV.</p>
      </div>

      <!-- Upload Zone -->
      <div id="pdf-dropzone"
        class="relative border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-2xl p-10 text-center transition-all duration-200 cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 bg-white dark:bg-gray-900"
        onclick="document.getElementById('pdf-file-input').click()"
        ondragover="handlePdfDragOver(event)"
        ondragleave="handlePdfDragLeave(event)"
        ondrop="handlePdfFileDrop(event)">
        <input id="pdf-file-input" type="file" accept="application/pdf" class="hidden" onchange="handlePdfFileSelect(event)" />
        <div class="flex flex-col items-center gap-3 pointer-events-none">
          <div class="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
            <svg class="w-7 h-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          </div>
          <div>
            <p class="font-semibold text-gray-700 dark:text-gray-300">Drop a PDF here or <span class="text-blue-500">browse</span></p>
            <p class="text-sm text-gray-400 mt-1">PDF files only · Max 50MB</p>
          </div>
        </div>
      </div>

      <!-- File Info Bar -->
      <div id="pdf-file-info" class="hidden mt-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-5 py-3 flex items-center gap-4">
        <div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-500 flex-shrink-0">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
        </div>
        <div class="flex-1 min-w-0">
          <div class="font-medium text-gray-900 dark:text-white text-sm truncate" id="pdf-filename">file.pdf</div>
          <div class="text-xs text-gray-400" id="pdf-filesize">0 KB</div>
        </div>
        <button onclick="resetPdfExtractor()" class="text-xs text-red-400 hover:text-red-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30">Remove</button>
      </div>

      <!-- Extraction Options -->
      <div id="pdf-options" class="hidden mt-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Extraction Options</h3>
        <div class="grid sm:grid-cols-2 gap-6">
          <div class="space-y-3">
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" id="opt-text" checked class="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
              <div><div class="text-sm font-medium text-gray-900 dark:text-white">Full Text</div><div class="text-xs text-gray-400">Extract all readable text, layout-preserved</div></div>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" id="opt-tables" checked class="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
              <div><div class="text-sm font-medium text-gray-900 dark:text-white">Tables</div><div class="text-xs text-gray-400">Auto-detect and extract tabular data</div></div>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" id="opt-meta" checked class="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
              <div><div class="text-sm font-medium text-gray-900 dark:text-white">Metadata</div><div class="text-xs text-gray-400">Author, title, page count, creation date</div></div>
            </label>
          </div>
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Page Range</label>
              <div class="flex items-center gap-2">
                <input type="number" id="page-from" min="1" placeholder="From" class="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
                <span class="text-gray-400 text-sm">to</span>
                <input type="number" id="page-to" min="1" placeholder="To" class="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
              </div>
              <p class="text-xs text-gray-400 mt-1">Leave blank to extract all pages</p>
            </div>
          </div>
        </div>
        <button id="extract-btn" onclick="extractPdf()" class="mt-6 w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold text-base shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          Extract Now
        </button>
      </div>

      <!-- Progress -->
      <div id="pdf-progress" class="hidden mt-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300" id="pdf-progress-label">Loading PDF...</span>
          <span class="text-sm font-semibold text-blue-500" id="pdf-progress-pct">0%</span>
        </div>
        <div class="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div id="pdf-progress-bar" class="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300" style="width:0%"></div>
        </div>
      </div>

      <!-- Results -->
      <div id="pdf-results" class="hidden mt-8">
        <!-- Stats Row -->
        <div id="pdf-stats" class="grid grid-cols-3 gap-4 mb-6"></div>

        <!-- Tabs -->
        <div class="flex gap-2 mb-4 border-b border-gray-200 dark:border-gray-800 pb-3">
          <button onclick="switchPdfTab('text')" id="pdf-tab-text" class="px-4 py-2 rounded-lg text-sm font-medium transition-all bg-blue-600 text-white">📝 Text</button>
          <button onclick="switchPdfTab('tables')" id="pdf-tab-tables" class="px-4 py-2 rounded-lg text-sm font-medium transition-all text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">📊 Tables</button>
          <button onclick="switchPdfTab('meta')" id="pdf-tab-meta" class="px-4 py-2 rounded-lg text-sm font-medium transition-all text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">ℹ️ Metadata</button>
          <!-- Download Buttons -->
          <div class="ml-auto flex gap-2">
            <button onclick="downloadTxt()" class="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              TXT
            </button>
            <button onclick="downloadCsv()" class="px-3 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-200 dark:hover:bg-emerald-900 transition-all flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              CSV
            </button>
          </div>
        </div>

        <!-- Tab Content -->
        <div id="pdf-tab-content" class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"></div>

        <!-- Python Backend Note -->
        <div class="mt-6 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-5">
          <div class="flex gap-3">
            <span class="text-xl flex-shrink-0">🐍</span>
            <div>
              <div class="font-semibold text-amber-800 dark:text-amber-300 text-sm mb-1">Want deeper extraction with pdfplumber?</div>
              <p class="text-amber-700 dark:text-amber-400 text-xs leading-relaxed">For character-level extraction, complex table detection, and layout-preserving output, connect a Python backend using <code class="bg-amber-100 dark:bg-amber-900/50 px-1 rounded">pdfplumber</code> + <code class="bg-amber-100 dark:bg-amber-900/50 px-1 rounded">pandas</code>. The API endpoint <code class="bg-amber-100 dark:bg-amber-900/50 px-1 rounded">POST /api/pdf/extract</code> is ready to wire up.</div>
              <button onclick="showPythonBackendInfo()" class="mt-2 text-xs font-semibold text-amber-700 dark:text-amber-300 hover:underline">View backend setup guide →</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Python Backend Modal -->
      <div id="python-backend-modal" class="fixed inset-0 z-[100] hidden">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" onclick="closePythonModal()"></div>
        <div class="relative flex items-center justify-center min-h-full p-4">
          <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 w-full max-w-2xl p-8 animate-scale-in max-h-[80vh] overflow-y-auto">
            <div class="flex items-center justify-between mb-6">
              <h2 class="font-display font-bold text-xl text-gray-900 dark:text-white">🐍 Python Backend Setup</h2>
              <button onclick="closePythonModal()" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                <svg class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div class="space-y-4 text-sm">
              <div class="code-block">
                <div class="code-header"><span class="code-lang">bash — install</span></div>
                <pre>pip install pdfplumber pandas flask flask-cors</pre>
              </div>
              <div class="code-block">
                <div class="code-header"><span class="code-lang">python — app.py</span></div>
                <pre><span class="code-keyword">from</span> <span class="code-class">flask</span> <span class="code-keyword">import</span> Flask, request, jsonify
<span class="code-keyword">from</span> <span class="code-class">flask_cors</span> <span class="code-keyword">import</span> CORS
<span class="code-keyword">import</span> pdfplumber, pandas <span class="code-keyword">as</span> pd, io

app = Flask(__name__)
CORS(app)

<span class="code-decorator">@app.route</span>(<span class="code-string">'/api/pdf/extract'</span>, methods=[<span class="code-string">'POST'</span>])
<span class="code-keyword">def</span> <span class="code-function">extract_pdf</span>():
    file = request.files[<span class="code-string">'pdf'</span>]
    page_from = int(request.form.get(<span class="code-string">'page_from'</span>, <span class="code-number">1</span>)) - <span class="code-number">1</span>
    page_to = request.form.get(<span class="code-string">'page_to'</span>)

    <span class="code-keyword">with</span> pdfplumber.open(file) <span class="code-keyword">as</span> pdf:
        pages = pdf.pages[page_from:int(page_to)] <span class="code-keyword">if</span> page_to <span class="code-keyword">else</span> pdf.pages[page_from:]
        text = <span class="code-string">'\n\n'</span>.join(p.extract_text() <span class="code-keyword">or</span> <span class="code-string">''</span> <span class="code-keyword">for</span> p <span class="code-keyword">in</span> pages)
        tables = []
        <span class="code-keyword">for</span> i, p <span class="code-keyword">in</span> enumerate(pages):
            <span class="code-keyword">for</span> t <span class="code-keyword">in</span> p.extract_tables():
                df = pd.DataFrame(t[<span class="code-number">1</span>:], columns=t[<span class="code-number">0</span>])
                tables.append({<span class="code-string">'page'</span>: i+<span class="code-number">1</span>, <span class="code-string">'csv'</span>: df.to_csv(index=<span class="code-keyword">False</span>)})
        meta = {<span class="code-string">'pages'</span>: len(pdf.pages), <span class="code-string">'metadata'</span>: pdf.metadata}

    <span class="code-keyword">return</span> jsonify({<span class="code-string">'text'</span>: text, <span class="code-string">'tables'</span>: tables, <span class="code-string">'meta'</span>: meta})

<span class="code-keyword">if</span> __name__ == <span class="code-string">'__main__'</span>:
    app.run(port=<span class="code-number">5000</span>)</pre>
              </div>
              <p class="text-gray-500 dark:text-gray-400">Run with <code class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs">python app.py</code> then update the fetch URL in <code class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs">pdf-extractor.js</code> to <code class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs">http://localhost:5000/api/pdf/extract</code>.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
  `;
}

// ===== File Handling =====
function handlePdfDragOver(e) {
  e.preventDefault();
  document.getElementById('pdf-dropzone').classList.add('border-blue-500', 'bg-blue-50/50');
}

function handlePdfDragLeave(e) {
  document.getElementById('pdf-dropzone').classList.remove('border-blue-500', 'bg-blue-50/50');
}

function handlePdfFileDrop(e) {
  e.preventDefault();
  handlePdfDragLeave(e);
  const file = e.dataTransfer.files[0];
  if (file && file.type === 'application/pdf') loadPdfFile(file);
}

function handlePdfFileSelect(e) {
  const file = e.target.files[0];
  if (file) loadPdfFile(file);
  e.target.value = '';
}

function loadPdfFile(file) {
  pdfExtractorState.file = file;
  document.getElementById('pdf-filename').textContent = file.name;
  document.getElementById('pdf-filesize').textContent = formatBytes(file.size);
  document.getElementById('pdf-file-info').classList.remove('hidden');
  document.getElementById('pdf-options').classList.remove('hidden');
  document.getElementById('pdf-results').classList.add('hidden');
  document.getElementById('pdf-progress').classList.add('hidden');
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

function resetPdfExtractor() {
  pdfExtractorState = { file: null, pdfDoc: null, totalPages: 0, extractedText: '', extractedTables: [], metadata: {}, processing: false, activeTab: 'text' };
  document.getElementById('pdf-file-info').classList.add('hidden');
  document.getElementById('pdf-options').classList.add('hidden');
  document.getElementById('pdf-results').classList.add('hidden');
  document.getElementById('pdf-progress').classList.add('hidden');
}

// ===== Extraction =====
async function extractPdf() {
  if (!pdfExtractorState.file || pdfExtractorState.processing) return;
  pdfExtractorState.processing = true;

  const progressEl = document.getElementById('pdf-progress');
  const progressBar = document.getElementById('pdf-progress-bar');
  const progressPct = document.getElementById('pdf-progress-pct');
  const progressLabel = document.getElementById('pdf-progress-label');
  const extractBtn = document.getElementById('extract-btn');

  progressEl.classList.remove('hidden');
  document.getElementById('pdf-results').classList.add('hidden');
  extractBtn.disabled = true;
  extractBtn.classList.add('opacity-60', 'cursor-not-allowed');

  const setProgress = (pct, label) => {
    progressBar.style.width = pct + '%';
    progressPct.textContent = pct + '%';
    if (label) progressLabel.textContent = label;
  };

  try {
    setProgress(10, 'Loading PDF.js library...');
    await loadPdfJs();

    setProgress(25, 'Reading PDF file...');
    const arrayBuffer = await pdfExtractorState.file.arrayBuffer();

    setProgress(35, 'Parsing PDF structure...');
    const pdfjsLib = window['pdfjs-dist/build/pdf'];
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    pdfExtractorState.pdfDoc = pdfDoc;
    pdfExtractorState.totalPages = pdfDoc.numPages;

    const pageFrom = parseInt(document.getElementById('page-from').value) || 1;
    const pageTo = parseInt(document.getElementById('page-to').value) || pdfDoc.numPages;
    const clampedFrom = Math.max(1, Math.min(pageFrom, pdfDoc.numPages));
    const clampedTo = Math.max(clampedFrom, Math.min(pageTo, pdfDoc.numPages));

    const doText = document.getElementById('opt-text').checked;
    const doTables = document.getElementById('opt-tables').checked;
    const doMeta = document.getElementById('opt-meta').checked;

    // Extract text
    let fullText = '';
    const tables = [];

    for (let p = clampedFrom; p <= clampedTo; p++) {
      const pct = Math.round(35 + ((p - clampedFrom) / (clampedTo - clampedFrom + 1)) * 50);
      setProgress(pct, `Extracting page ${p} of ${clampedTo}...`);
      await new Promise(r => setTimeout(r, 10));

      const page = await pdfDoc.getPage(p);

      if (doText) {
        const content = await page.getTextContent();
        const pageText = buildPageText(content);
        fullText += `--- Page ${p} ---\n${pageText}\n\n`;
      }

      if (doTables) {
        const content = await page.getTextContent();
        const detected = detectTablesFromText(content, p);
        if (detected) tables.push(detected);
      }
    }

    // Metadata
    let meta = {};
    if (doMeta) {
      const info = await pdfDoc.getMetadata().catch(() => ({}));
      meta = {
        'File Name': pdfExtractorState.file.name,
        'File Size': formatBytes(pdfExtractorState.file.size),
        'Total Pages': pdfDoc.numPages,
        'Extracted Pages': `${clampedFrom} – ${clampedTo}`,
        'Title': info?.info?.Title || '—',
        'Author': info?.info?.Author || '—',
        'Creator': info?.info?.Creator || '—',
        'Producer': info?.info?.Producer || '—',
        'Creation Date': info?.info?.CreationDate ? formatPdfDate(info.info.CreationDate) : '—',
        'PDF Version': info?.metadata?.get('pdf:PDFVersion') || '—',
      };
    }

    pdfExtractorState.extractedText = fullText;
    pdfExtractorState.extractedTables = tables;
    pdfExtractorState.metadata = meta;

    setProgress(95, 'Rendering results...');
    await new Promise(r => setTimeout(r, 200));

    setProgress(100, 'Done!');
    setTimeout(() => {
      progressEl.classList.add('hidden');
      renderPdfResults();
    }, 400);

  } catch (err) {
    console.error(err);
    progressLabel.textContent = 'Error: ' + (err.message || 'Failed to parse PDF');
    progressBar.classList.add('bg-red-500');
  } finally {
    pdfExtractorState.processing = false;
    extractBtn.disabled = false;
    extractBtn.classList.remove('opacity-60', 'cursor-not-allowed');
  }
}

// ===== Text Layout Builder =====
function buildPageText(content) {
  if (!content || !content.items.length) return '(No text found on this page)';
  // Group items by approximate Y position (line grouping)
  const lines = {};
  content.items.forEach(item => {
    if (!item.str) return;
    const y = Math.round(item.transform[5]);
    if (!lines[y]) lines[y] = [];
    lines[y].push({ x: item.transform[4], text: item.str });
  });
  return Object.keys(lines)
    .sort((a, b) => b - a) // PDF Y is bottom-up
    .map(y => lines[y].sort((a, b) => a.x - b.x).map(i => i.text).join(' '))
    .join('\n');
}

// ===== Simple Table Detection =====
function detectTablesFromText(content, pageNum) {
  if (!content || !content.items.length) return null;
  // Group items into rows by Y coordinate proximity
  const rows = {};
  content.items.forEach(item => {
    if (!item.str.trim()) return;
    const y = Math.round(item.transform[5] / 5) * 5; // bucket by 5px
    if (!rows[y]) rows[y] = [];
    rows[y].push({ x: item.transform[4], text: item.str.trim() });
  });

  const sortedRows = Object.keys(rows)
    .sort((a, b) => b - a)
    .map(y => rows[y].sort((a, b) => a.x - b.x).map(i => i.text));

  // Heuristic: rows with 2+ columns that appear consistently = table
  const multiColRows = sortedRows.filter(r => r.length >= 2);
  if (multiColRows.length < 2) return null;

  return { page: pageNum, rows: multiColRows };
}

// ===== Results Rendering =====
function renderPdfResults() {
  const resultsEl = document.getElementById('pdf-results');
  resultsEl.classList.remove('hidden');

  // Stats
  const stats = document.getElementById('pdf-stats');
  const wordCount = pdfExtractorState.extractedText.split(/\s+/).filter(Boolean).length;
  const charCount = pdfExtractorState.extractedText.length;
  stats.innerHTML = [
    { label: 'Pages', value: pdfExtractorState.totalPages, icon: '📄' },
    { label: 'Words', value: wordCount.toLocaleString(), icon: '📝' },
    { label: 'Tables Found', value: pdfExtractorState.extractedTables.length, icon: '📊' },
  ].map(s => `
    <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 text-center">
      <div class="text-2xl mb-1">${s.icon}</div>
      <div class="font-display font-bold text-xl text-gray-900 dark:text-white">${s.value}</div>
      <div class="text-xs text-gray-400">${s.label}</div>
    </div>
  `).join('');

  switchPdfTab('text');
}

function switchPdfTab(tab) {
  pdfExtractorState.activeTab = tab;
  ['text', 'tables', 'meta'].forEach(t => {
    const btn = document.getElementById(`pdf-tab-${t}`);
    if (!btn) return;
    btn.className = `px-4 py-2 rounded-lg text-sm font-medium transition-all ${t === tab ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`;
  });

  const content = document.getElementById('pdf-tab-content');
  if (!content) return;

  if (tab === 'text') {
    const text = pdfExtractorState.extractedText || 'No text extracted.';
    content.innerHTML = `
      <div class="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <span class="text-sm text-gray-500">${text.split(/\s+/).filter(Boolean).length.toLocaleString()} words · ${text.length.toLocaleString()} characters</span>
        <button onclick="copyExtractedText()" class="copy-btn">📋 Copy</button>
      </div>
      <div class="p-4 max-h-96 overflow-y-auto">
        <pre class="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed font-mono">${escapeHtmlPdf(text)}</pre>
      </div>
    `;
  } else if (tab === 'tables') {
    const tables = pdfExtractorState.extractedTables;
    if (!tables.length) {
      content.innerHTML = `<div class="p-10 text-center text-gray-400">No tables detected in the extracted pages.<br><span class="text-xs mt-1 block">For complex tables, use the Python backend with pdfplumber.</span></div>`;
      return;
    }
    content.innerHTML = `<div class="divide-y divide-gray-100 dark:divide-gray-800 max-h-[500px] overflow-y-auto">` +
      tables.map((t, ti) => `
        <div class="p-4">
          <div class="text-xs font-semibold text-gray-500 mb-3">Table ${ti + 1} — Page ${t.page}</div>
          <div class="overflow-x-auto">
            <table class="w-full text-xs border-collapse">
              ${t.rows.map((row, ri) => `
                <tr class="${ri === 0 ? 'bg-blue-50 dark:bg-blue-950/30 font-semibold' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}">
                  ${row.map(cell => `<td class="border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-gray-700 dark:text-gray-300">${escapeHtmlPdf(cell)}</td>`).join('')}
                </tr>
              `).join('')}
            </table>
          </div>
        </div>
      `).join('') + `</div>`;
  } else {
    const meta = pdfExtractorState.metadata;
    if (!Object.keys(meta).length) {
      content.innerHTML = `<div class="p-10 text-center text-gray-400">No metadata extracted.</div>`;
      return;
    }
    content.innerHTML = `
      <div class="divide-y divide-gray-100 dark:divide-gray-800">
        ${Object.entries(meta).map(([k, v]) => `
          <div class="flex items-center gap-4 px-5 py-3">
            <span class="text-sm font-medium text-gray-500 dark:text-gray-400 w-36 flex-shrink-0">${k}</span>
            <span class="text-sm text-gray-900 dark:text-white">${escapeHtmlPdf(String(v))}</span>
          </div>
        `).join('')}
      </div>
    `;
  }
}

// ===== Downloads =====
function downloadTxt() {
  const text = pdfExtractorState.extractedText;
  if (!text) return showToast('No text to download.');
  const blob = new Blob([text], { type: 'text/plain' });
  triggerDownload(blob, 'extracted-text.txt');
  showToast('📥 TXT downloaded!');
}

function downloadCsv() {
  const tables = pdfExtractorState.extractedTables;
  if (!tables.length) return showToast('No tables found to export.');
  const csv = tables.map((t, i) =>
    `# Table ${i + 1} - Page ${t.page}\n` + t.rows.map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n')
  ).join('\n\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  triggerDownload(blob, 'extracted-tables.csv');
  showToast('📥 CSV downloaded!');
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function copyExtractedText() {
  navigator.clipboard.writeText(pdfExtractorState.extractedText).then(() => showToast('📋 Text copied to clipboard!'));
}

// ===== Helpers =====
function loadPdfJs() {
  return new Promise((resolve, reject) => {
    if (window['pdfjs-dist/build/pdf']) { resolve(); return; }
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function formatPdfDate(raw) {
  try {
    // PDF date format: D:YYYYMMDDHHmmSSOHH'mm'
    const m = raw.match(/D:(\d{4})(\d{2})(\d{2})/);
    if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  } catch (_) {}
  return raw;
}

function escapeHtmlPdf(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function showPythonBackendInfo() {
  document.getElementById('python-backend-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closePythonModal() {
  document.getElementById('python-backend-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

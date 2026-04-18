<script>
  import { docs, CATEGORIES } from '$lib/store.js';
  import { goto } from '$app/navigation';

  let title = $state('');
  let author = $state('');
  let category = $state('technical');
  let description = $state('');
  let tagsRaw = $state('');
  let file = $state(null);
  let dragOver = $state(false);
  let submitting = $state(false);
  let error = $state('');

  let fileInput;

  function handleDrop(e) {
    e.preventDefault();
    dragOver = false;
    const f = e.dataTransfer?.files?.[0];
    if (f && f.type === 'application/pdf') {
      file = f;
    } else {
      error = 'Only PDF files are accepted.';
    }
  }

  function handleFileChange(e) {
    const f = e.target.files?.[0];
    if (f) {
      if (f.type !== 'application/pdf') {
        error = 'Only PDF files are accepted.';
        return;
      }
      file = f;
      error = '';
    }
  }

  function formatSize(bytes) {
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  async function handleSubmit() {
    error = '';
    if (!title.trim()) { error = 'Title is required.'; return; }
    if (!file) { error = 'Please select a PDF file.'; return; }

    submitting = true;

    try {
      const fileData = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('File read failed'));
        reader.readAsDataURL(file);
      });

      const tags = tagsRaw.split(',').map(t => t.trim().toLowerCase()).filter(Boolean);

      docs.add({
        id: Date.now().toString(),
        title: title.trim(),
        author: author.trim() || 'Unknown',
        category,
        description: description.trim(),
        size: formatSize(file.size),
        pages: null,
        date: new Date().toISOString().slice(0, 10),
        tags,
        fileName: file.name,
        fileData
      });

      goto('/');
    } catch (e) {
      error = 'Upload failed: ' + e.message;
    } finally {
      submitting = false;
    }
  }
</script>

<svelte:head>
  <title>DocShelf — Upload</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Upload Document</h1>
    <p class="sub">Add a PDF or book to the shelf.</p>
  </div>

  <form class="upload-form" onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>

    <div
      class="dropzone"
      class:has-file={file}
      class:drag-over={dragOver}
      role="button"
      tabindex="0"
      ondragover={(e) => { e.preventDefault(); dragOver = true; }}
      ondragleave={() => dragOver = false}
      ondrop={handleDrop}
      onclick={() => fileInput.click()}
      onkeydown={(e) => e.key === 'Enter' && fileInput.click()}
    >
      {#if file}
        <div class="file-preview">
          <span class="file-icon">⬛</span>
          <div>
            <p class="file-name">{file.name}</p>
            <p class="file-size">{formatSize(file.size)}</p>
          </div>
          <button type="button" class="remove-file"
            onclick={(e) => { e.stopPropagation(); file = null; }}>✕</button>
        </div>
      {:else}
        <span class="drop-icon">↑</span>
        <p class="drop-label">Drop PDF here or click to browse</p>
        <p class="drop-hint">PDF files only</p>
      {/if}
    </div>

    <input bind:this={fileInput} type="file" accept=".pdf,application/pdf"
           onchange={handleFileChange} style="display:none" />

    <div class="fields">
      <div class="field">
        <label for="title">Title <span class="req">*</span></label>
        <input id="title" type="text" bind:value={title} placeholder="Document title" required />
      </div>

      <div class="field">
        <label for="author">Author</label>
        <input id="author" type="text" bind:value={author} placeholder="Author name" />
      </div>

      <div class="field">
        <label for="category">Category</label>
        <select id="category" bind:value={category}>
          {#each CATEGORIES.slice(1) as cat}
            <option value={cat.id}>{cat.label}</option>
          {/each}
        </select>
      </div>

      <div class="field full">
        <label for="description">Description</label>
        <textarea id="description" rows="3" bind:value={description}
                  placeholder="Brief description of the content…"></textarea>
      </div>

      <div class="field full">
        <label for="tags">Tags</label>
        <input id="tags" type="text" bind:value={tagsRaw}
               placeholder="systems, engineering, theory  (comma-separated)" />
      </div>
    </div>

    {#if error}
      <p class="error-msg">⚠ {error}</p>
    {/if}

    <div class="form-actions">
      <a href="/" class="btn-ghost">Cancel</a>
      <button type="submit" class="btn-submit" disabled={submitting}>
        {submitting ? 'Uploading…' : '↑ Add to Shelf'}
      </button>
    </div>
  </form>
</div>

<style>
  .page {
    max-width: 680px;
    margin: 0 auto;
    padding: 2rem 1.5rem 4rem;
  }

  .page-header {
    padding: 2.5rem 0 2rem;
    border-bottom: 1px solid var(--border);
    margin-bottom: 2rem;
  }

  .page-header h1 {
    font-size: clamp(1.8rem, 5vw, 2.8rem);
  }

  .sub {
    color: var(--text-muted);
    font-size: 0.8rem;
    margin-top: 0.4rem;
    letter-spacing: 0.04em;
  }

  .upload-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .dropzone {
    border: 1px dashed var(--border-light);
    border-radius: var(--radius-lg);
    padding: 2.5rem 1.5rem;
    text-align: center;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    background: var(--bg-2);
    user-select: none;
  }

  .dropzone:hover, .dropzone.drag-over {
    border-color: var(--accent);
    background: var(--accent-dim);
  }

  .dropzone.has-file {
    border-style: solid;
    border-color: var(--accent);
  }

  .drop-icon {
    display: block;
    font-size: 2rem;
    color: var(--accent);
    margin-bottom: 0.75rem;
  }

  .drop-label {
    color: var(--text);
    font-size: 0.85rem;
    margin-bottom: 0.25rem;
  }

  .drop-hint {
    font-size: 0.7rem;
    color: var(--text-dim);
  }

  .file-preview {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-align: left;
  }

  .file-icon {
    font-size: 1.5rem;
    color: var(--accent);
    flex-shrink: 0;
  }

  .file-name {
    font-size: 0.85rem;
    color: var(--text);
    word-break: break-all;
  }

  .file-size {
    font-size: 0.7rem;
    color: var(--text-muted);
    margin-top: 0.2rem;
  }

  .remove-file {
    margin-left: auto;
    font-size: 0.75rem;
    color: var(--text-dim);
    transition: color 0.15s;
    padding: 0.25rem;
    flex-shrink: 0;
  }

  .remove-file:hover { color: var(--danger); }

  .fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .field.full {
    grid-column: 1 / -1;
  }

  label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
  }

  .req { color: var(--accent); }

  input[type="text"],
  textarea,
  select {
    background: var(--bg-2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    color: var(--text);
    padding: 0.6rem 0.75rem;
    outline: none;
    transition: border-color 0.2s;
    width: 100%;
  }

  input:focus, textarea:focus, select:focus {
    border-color: var(--accent);
  }

  input::placeholder, textarea::placeholder { color: var(--text-dim); }

  select option { background: var(--bg-2); }

  textarea {
    resize: vertical;
    line-height: 1.6;
  }

  .error-msg {
    font-size: 0.78rem;
    color: #e07070;
    background: rgba(192,57,43,0.1);
    border: 1px solid rgba(192,57,43,0.3);
    border-radius: var(--radius);
    padding: 0.6rem 0.9rem;
  }

  .form-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
    padding-top: 0.5rem;
  }

  .btn-ghost {
    font-family: Koulen;
    font-size: 0.75rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-muted);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.6rem 1.25rem;
    transition: all 0.15s;
  }

  .btn-ghost:hover {
    border-color: var(--border-light);
    color: var(--text);
  }

  .btn-submit {
    font-family: Koulen;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    background: var(--accent);
    color: #0a0a0a;
    border-radius: var(--radius);
    padding: 0.6rem 1.5rem;
    transition: background 0.15s;
    cursor: pointer;
    border: none;
  }

  .btn-submit:hover:not(:disabled) {
    background: var(--accent-hover);
  }

  .btn-submit:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 640px) {
    .page { padding: 1.5rem 1rem 3rem; }
    .fields { grid-template-columns: 1fr; }
    .field.full { grid-column: 1; }
    .form-actions { flex-direction: column-reverse; }
    .btn-ghost, .btn-submit { width: 100%; text-align: center; }
  }
</style>
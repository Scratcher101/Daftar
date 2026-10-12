// Daftar — speech-to-text worker (runs Whisper fully on-device)
import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.5.1';

env.allowLocalModels = false;
env.useBrowserCache = true; // model files are kept in the browser cache for offline use

const MODELS = {
  base: 'onnx-community/whisper-base',
  small: 'onnx-community/whisper-small',
};

let asr = null;
let loadedKey = null;

async function hasWebGPU() {
  try { return !!(self.navigator && navigator.gpu && (await navigator.gpu.requestAdapter())); }
  catch { return false; }
}

async function load(key, id) {
  if (asr && loadedKey === key) return;
  if (asr) { try { await asr.dispose(); } catch {} asr = null; loadedKey = null; }

  const files = {};
  const progress_callback = (p) => {
    if (p.status === 'progress' && p.total) {
      files[p.file] = { loaded: p.loaded, total: p.total };
      let l = 0, t = 0;
      for (const f of Object.values(files)) { l += f.loaded; t += f.total; }
      self.postMessage({ id, type: 'progress', data: { loaded: l, total: t } });
    }
  };

  const wasmOpts = { device: 'wasm', dtype: { encoder_model: 'fp32', decoder_model_merged: 'q8' }, progress_callback };
  if (await hasWebGPU()) {
    try {
      asr = await pipeline('automatic-speech-recognition', MODELS[key], {
        device: 'webgpu', dtype: { encoder_model: 'fp32', decoder_model_merged: 'q4' }, progress_callback,
      });
    } catch {
      asr = await pipeline('automatic-speech-recognition', MODELS[key], wasmOpts);
    }
  } else {
    asr = await pipeline('automatic-speech-recognition', MODELS[key], wasmOpts);
  }
  loadedKey = key;
}

self.onmessage = async (e) => {
  const { id, type } = e.data;
  try {
    if (type === 'load') {
      await load(e.data.model, id);
      self.postMessage({ id, type: 'done', data: true });
    } else if (type === 'transcribe') {
      await load(e.data.model, id);
      const opts = { task: 'transcribe', chunk_length_s: 30, stride_length_s: 5 };
      if (e.data.language) opts.language = e.data.language;
      const out = await asr(e.data.audio, opts);
      const text = Array.isArray(out) ? out.map(o => o.text).join(' ') : (out.text || '');
      self.postMessage({ id, type: 'done', data: text.trim() });
    } else if (type === 'unload') {
      if (asr) { try { await asr.dispose(); } catch {} asr = null; loadedKey = null; }
      self.postMessage({ id, type: 'done', data: true });
    }
  } catch (err) {
    self.postMessage({ id, type: 'error', error: String((err && err.message) || err) });
  }
};

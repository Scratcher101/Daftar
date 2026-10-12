# Daftar — دفتر

Speak your thoughts. Daftar writes them as a philosophical essay and collects them into a book. Everything runs on your iPhone, and after a one-time download it works with no internet.

## What runs where
- **Listening:** Whisper (speech-to-text) runs on the phone. English and Arabic.
- **Writing:** Qwen 2.5 (a small language model) runs on the phone's GPU through WebGPU.
- **Your essays:** stored only on the phone. Nothing is uploaded.

## Install on your iPhone (about 10 minutes, done once)

An iPhone app needs a web address to install from. GitHub Pages hosts this for free.

1. On a laptop, create a free account at github.com.
2. Create a new repository named `daftar` and set it to **Public**.
3. Click **Add file → Upload files**, drag in all the files from this folder (`index.html`, `asr-worker.js`, `sw.js`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png`), then click **Commit**.
4. Go to **Settings → Pages**. Under *Branch*, choose `main` and `/ (root)`, then **Save**. After about a minute your address appears, e.g. `https://yourname.github.io/daftar/`.
5. On your iPhone, open that address in **Safari**.
6. Tap **Share → Add to Home Screen**. Open Daftar from the new icon.
7. On Wi-Fi, go to the **Engine** tab and tap **Download for offline use**. Keep the app open until both models finish (about 1.2 GB with default settings).

After that, turn on Airplane Mode and try it. It should work with no connection.

## Requirements
- iOS 26 or later (Safari with WebGPU). On iOS 18, WebGPU can be turned on in Settings › Apps › Safari › Advanced › Feature Flags.
- About 1.5 GB free space (default), or about 3 GB with "Better Arabic" and the "Rich" writer.
- The "Rich" writer (3B) needs an iPhone with 8 GB memory (iPhone 15 Pro or newer).

## Using it
1. **Speak tab:** choose the language you'll speak, the essay style and the length. Tap the red button, think aloud, and tap again to stop.
2. Check the transcript and fix any misheard words. Then tap **Write the essay**.
3. Essays are saved in the **Library**. You can edit, rewrite in another style, copy or share each one.
4. The **Book** tab collects all essays as chapters. Name your book and export it as a styled HTML file or plain text.

**Styles:** Reflective essay · Stoic meditation · Socratic inquiry · Aphorisms
**Write in:** the same language you spoke, or always English, or always Arabic.

## Honest limits
- Small on-device models write well in English. In Arabic the "Light" writer is acceptable, and "Rich" is much better.
- Writing takes roughly 1–3 minutes per essay on an iPhone. Transcription takes about a third of the recording length.
- Recordings longer than about 10 minutes are condensed into notes first, then written.
- If you clear Safari website data, your essays and models are deleted. Export the book regularly.

## Updating
Edit the files on GitHub. To make phones pick up the change, also change `daftar-v1` to `daftar-v2` in `sw.js`.

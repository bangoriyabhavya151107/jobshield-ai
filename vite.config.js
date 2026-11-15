import { defineConfig } from 'vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(root, 'index.html'),
        scan: resolve(root, 'scan.html'),
        results: resolve(root, 'results.html'),
        verify: resolve(root, 'verify.html'),
        history: resolve(root, 'history.html'),
        safety: resolve(root, 'safety.html'),
        about: resolve(root, 'about.html'),
        account: resolve(root, 'account.html')
      }
    }
  }
});

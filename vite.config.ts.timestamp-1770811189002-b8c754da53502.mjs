// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.js";
import { copyFileSync, readdirSync, statSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
var copyPublicPlugin = () => ({
  name: "copy-public-safe",
  closeBundle() {
    const publicDir = "public";
    const outDir = "dist";
    const copyRecursive = (src, dest) => {
      try {
        const entries = readdirSync(src);
        if (!existsSync(dest)) {
          mkdirSync(dest, { recursive: true });
        }
        for (const entry of entries) {
          if (entry.includes(" copy")) continue;
          const srcPath = join(src, entry);
          const destPath = join(dest, entry);
          try {
            const stat = statSync(srcPath);
            if (stat.isDirectory()) {
              copyRecursive(srcPath, destPath);
            } else {
              copyFileSync(srcPath, destPath);
            }
          } catch (err) {
            console.warn(`Skipping ${entry}: ${err}`);
          }
        }
      } catch (err) {
        console.error("Error copying public files:", err);
      }
    };
    copyRecursive(publicDir, outDir);
  }
});
var vite_config_default = defineConfig({
  plugins: [react(), copyPublicPlugin()],
  optimizeDeps: {
    exclude: ["lucide-react"]
  },
  build: {
    copyPublicDir: false
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyBjb3B5RmlsZVN5bmMsIHJlYWRkaXJTeW5jLCBzdGF0U3luYywgbWtkaXJTeW5jLCBleGlzdHNTeW5jIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnO1xuXG5jb25zdCBjb3B5UHVibGljUGx1Z2luID0gKCkgPT4gKHtcbiAgbmFtZTogJ2NvcHktcHVibGljLXNhZmUnLFxuICBjbG9zZUJ1bmRsZSgpIHtcbiAgICBjb25zdCBwdWJsaWNEaXIgPSAncHVibGljJztcbiAgICBjb25zdCBvdXREaXIgPSAnZGlzdCc7XG5cbiAgICBjb25zdCBjb3B5UmVjdXJzaXZlID0gKHNyYzogc3RyaW5nLCBkZXN0OiBzdHJpbmcpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGVudHJpZXMgPSByZWFkZGlyU3luYyhzcmMpO1xuXG4gICAgICAgIGlmICghZXhpc3RzU3luYyhkZXN0KSkge1xuICAgICAgICAgIG1rZGlyU3luYyhkZXN0LCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykge1xuICAgICAgICAgIGlmIChlbnRyeS5pbmNsdWRlcygnIGNvcHknKSkgY29udGludWU7XG5cbiAgICAgICAgICBjb25zdCBzcmNQYXRoID0gam9pbihzcmMsIGVudHJ5KTtcbiAgICAgICAgICBjb25zdCBkZXN0UGF0aCA9IGpvaW4oZGVzdCwgZW50cnkpO1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXQgPSBzdGF0U3luYyhzcmNQYXRoKTtcbiAgICAgICAgICAgIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgICAgY29weVJlY3Vyc2l2ZShzcmNQYXRoLCBkZXN0UGF0aCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb3B5RmlsZVN5bmMoc3JjUGF0aCwgZGVzdFBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBTa2lwcGluZyAke2VudHJ5fTogJHtlcnJ9YCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgY29weWluZyBwdWJsaWMgZmlsZXM6JywgZXJyKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29weVJlY3Vyc2l2ZShwdWJsaWNEaXIsIG91dERpcik7XG4gIH1cbn0pO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCksIGNvcHlQdWJsaWNQbHVnaW4oKV0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGV4Y2x1ZGU6IFsnbHVjaWRlLXJlYWN0J10sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgY29weVB1YmxpY0RpcjogZmFsc2VcbiAgfVxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUNsQixTQUFTLGNBQWMsYUFBYSxVQUFVLFdBQVcsa0JBQWtCO0FBQzNFLFNBQVMsWUFBWTtBQUVyQixJQUFNLG1CQUFtQixPQUFPO0FBQUEsRUFDOUIsTUFBTTtBQUFBLEVBQ04sY0FBYztBQUNaLFVBQU0sWUFBWTtBQUNsQixVQUFNLFNBQVM7QUFFZixVQUFNLGdCQUFnQixDQUFDLEtBQWEsU0FBaUI7QUFDbkQsVUFBSTtBQUNGLGNBQU0sVUFBVSxZQUFZLEdBQUc7QUFFL0IsWUFBSSxDQUFDLFdBQVcsSUFBSSxHQUFHO0FBQ3JCLG9CQUFVLE1BQU0sRUFBRSxXQUFXLEtBQUssQ0FBQztBQUFBLFFBQ3JDO0FBRUEsbUJBQVcsU0FBUyxTQUFTO0FBQzNCLGNBQUksTUFBTSxTQUFTLE9BQU8sRUFBRztBQUU3QixnQkFBTSxVQUFVLEtBQUssS0FBSyxLQUFLO0FBQy9CLGdCQUFNLFdBQVcsS0FBSyxNQUFNLEtBQUs7QUFFakMsY0FBSTtBQUNGLGtCQUFNLE9BQU8sU0FBUyxPQUFPO0FBQzdCLGdCQUFJLEtBQUssWUFBWSxHQUFHO0FBQ3RCLDRCQUFjLFNBQVMsUUFBUTtBQUFBLFlBQ2pDLE9BQU87QUFDTCwyQkFBYSxTQUFTLFFBQVE7QUFBQSxZQUNoQztBQUFBLFVBQ0YsU0FBUyxLQUFLO0FBQ1osb0JBQVEsS0FBSyxZQUFZLEtBQUssS0FBSyxHQUFHLEVBQUU7QUFBQSxVQUMxQztBQUFBLFFBQ0Y7QUFBQSxNQUNGLFNBQVMsS0FBSztBQUNaLGdCQUFRLE1BQU0sK0JBQStCLEdBQUc7QUFBQSxNQUNsRDtBQUFBLElBQ0Y7QUFFQSxrQkFBYyxXQUFXLE1BQU07QUFBQSxFQUNqQztBQUNGO0FBR0EsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQztBQUFBLEVBQ3JDLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxjQUFjO0FBQUEsRUFDMUI7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxFQUNqQjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

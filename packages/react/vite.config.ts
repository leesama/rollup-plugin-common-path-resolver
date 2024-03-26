import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import rollupPluginCommonPathResolver from '../../src/index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), rollupPluginCommonPathResolver()]
})

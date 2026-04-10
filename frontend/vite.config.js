import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

export default defineConfig({
  base: process.env.NODE_ENV === 'production'
    ? '/ProjetoMETIS/'
    : '/',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
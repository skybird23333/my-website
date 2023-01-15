// I have severe regrets doing this
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default {
    plugins: [
      vueJsx(),
      vue(),
    ],
    resolve: {
      alias: {
        'vue': 'vue/dist/vue.esm-bundler.js'
      },
    },
    build: {
      // generate manifest.json in outDir
      manifest: true,
      rollupOptions: {
        // overwrite default .html entry
        input: './app/main.js',
      },
    },
  }
  
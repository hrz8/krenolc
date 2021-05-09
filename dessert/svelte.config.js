module.exports = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: require('svelte-windicss-preprocess').preprocess({
    compile: false,
    prefix: 'windi-',
    verbosity: 1,
    debug: false,
    devTools: {
      completions: false,
    },
  })
}

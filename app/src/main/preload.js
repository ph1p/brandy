process.once('loaded', () => {
  // window.env = process.env;
  window.nodeRequire = require;
  window.require = require;
  window.global = window;
  window.process = process;
});

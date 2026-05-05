(function (Prism) {
  if (typeof Prism !== 'undefined') {
    Prism.languages.console = {
      // 1. Define the bracketed prefix
      'console-prefix': {
        pattern: /^\[[^\]]+\]/m,
        inside: {
          'console_ran': /\bRender\b/,
          'variable': /\bthread\b/,
          'punctuation': /[\[\]\/]/,
          'string': /thread|INFO|CHAT/
        }
      },
      // 4. Also catch 'Render' if it appears outside brackets
      'keyword': /\b(?:Render|CHAT|kill|say)\b/i,
      
      'player-name': {
        pattern: /\[[a-zA-Z0-9_]{2,16}\]/,
        alias: 'function'
      }
    };
    console.log("Console grammar updated with nested 'Render' support.");
  }
}(typeof Prism !== 'undefined' ? Prism : (typeof global !== 'undefined' ? global.Prism : undefined)));
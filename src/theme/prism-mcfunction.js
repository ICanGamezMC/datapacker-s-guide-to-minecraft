// src/theme/prism-mcfunction.js
(function (Prism) {
  if (typeof Prism !== 'undefined') {
    Prism.languages.mcfunction = {
      'comment': /#.*/,
        // The "Yellow" commands (Main Actions)
        'command': {
            pattern: /(^[\t ]*)(?:say|execute|tp|teleport|summon|give|setblock|fill|data|tag|team|scoreboard|advancement|tellraw|kill)\b/m,
            lookbehind: true,
            alias: 'keyword'
        },
        // Target Selectors (usually blue or aqua)
        'selector': {
            pattern: /@[apre]\[[^\]]*\]|@[apre]/,
            alias: 'variable'
        },
        // NBT Data (treat it like JSON)
        'nbt': {
            pattern: /\{.*?\}/,
            inside: Prism.languages.json,
            alias: 'string'
        },
        // Coordinates
        'coordinate': {
            pattern: /\b[~^]?-?\d*(?:\.\d+)?\b|\b-?\d+(?:\.\d+)?\b/,
            alias: 'number'
        },
        // Namespaces (e.g., minecraft:stone)
        'namespace': {
            pattern: /\b[a-z0-9_.-]+:[a-z0-9_./-]+\b/,
            alias: 'class-name'
        }
    };
    console.log("Mcfunction grammar successfully attached to Prism.");
  }
}(typeof Prism !== 'undefined' ? Prism : (typeof global !== 'undefined' ? global.Prism : undefined)));
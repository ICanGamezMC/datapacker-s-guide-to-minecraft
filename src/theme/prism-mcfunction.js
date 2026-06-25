// src/theme/prism-mcfunction.js
(function (Prism) {
  if (typeof Prism !== 'undefined') {
    Prism.languages.mcfunction = {
      'comment': /#.*/,
        'keyword': {
            pattern: /\b(?:say|execute|tp|teleport|summon|give|setblock|fill|data|tag|team|scoreboard|advancement|tellraw|kill)\b/
        },
        'green': {
            pattern: /\b(?:if|unless)\b/
        },
        // NBT Data (treat it like JSON)
        'string': {
            pattern: /\{.*?\}/,
            inside: Prism.languages.json
        },
        'variable': {
            pattern: /\b(?:@s|@p)\b/
        },
        // Coordinates
        //'number': {
        //    pattern: /\b[~^]?-?\d*(?:\.\d+)?\b|\b-?\d+(?:\.\d+)?\b/
        //},
        // Namespaces (e.g., minecraft:stone)
        'class-name': {
            pattern: /\b[a-z0-9_.-]+:[a-z0-9_./-]+\b/
        }
    };
    console.log("Mcfunction grammar successfully attached to Prism.");
  }
}(typeof Prism !== 'undefined' ? Prism : (typeof global !== 'undefined' ? global.Prism : undefined)));
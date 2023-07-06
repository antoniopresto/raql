import * as vm from 'vm';

import moo from 'moo';
import { Grammar, Parser } from 'nearley';
import compile from 'nearley/lib/compile';
import generate from 'nearley/lib/generate';
import nearleyGrammar from 'nearley/lib/nearley-language-bootstrapped';

export type { Parser, Grammar };

export function compileGrammar(lexer: moo.Lexer, grammar: string) {
  grammar = `@lexer lexer\n${grammar}`;

  // Parse the grammar source into an AST
  const grammarParser = new Parser(nearleyGrammar, { lexer });
  grammarParser.feed(grammar);

  const grammarAst = grammarParser.results[0];

  // Compile the AST into a set of rules
  const grammarInfoObject = compile(grammarAst, {});
  // Generate JavaScript code from the rules
  const grammarJs = generate(grammarInfoObject, 'grammar');

  // Use Node.js VM to create a script
  const script = new vm.Script(grammarJs);

  // Create a context for the script and run it
  const context = vm.createContext({
    require: require,
    module: module,
    lexer,
  });

  script.runInContext(context);

  /*
   * Agora temos um analisador para a linguagem RAQL. Podemos usá-lo para analisar consultas RAQL da seguinte maneira:
   */

  return new Parser(Grammar.fromCompiled(context.module.exports));
}

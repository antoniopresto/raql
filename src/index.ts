import nearley from 'nearley';

const compiled = require('./grammar.js');
const grammar = nearley.Grammar.fromCompiled(compiled);

export class RAQLParser extends nearley.Parser {
  constructor() {
    super(grammar);
  }
}

export { RAQLParser as Parser };

export default RAQLParser;

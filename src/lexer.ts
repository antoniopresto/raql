import moo from 'moo';

export const lexer = moo.compile({
  LOGIC: /&&|\|\||!/,
  FN_BETWEEN: /\bbetween/,
  FN_IN: /\bin/,
  FN_EXISTS: /\bexists/,
  FN_SIZE: /\bsize/,
  FN_TYPE: /\btype/,
  FN_REGEX: /\bregex/,
  FN_STARTS_WITH: /\bstartsWith/,
  WHITESPACE: { match: /\s+/, lineBreaks: true },
  COMPARATOR: ['=', '<>', '<', '<=', '>', '>='],
  OPEN_PAREN: '(',
  CLOSE_PAREN: ')',
  STRING: /"[^\n"]*"/,
  BRACKET_NOTATION: /\[[0-9]+]|\["[^\]]+"]/,
  ARRAY_DOT_NOTATION: /\.\$\./,
  DOT_NOTATION: /\./,
  NUMBER: /0|[1-9]+[0-9]*/,
  ESCAPED_IDENTIFIER: /`[^`]+`/,
  IDENTIFIER: /[a-zA-Z_]+[a-zA-Z_0-9]*/,
  COMMA: ',',
  REGEX: {
    match:
      /\/(?:(?![*+?])(?:[^\r\n\[/\\]|\\.|\[(?:[^\r\n\]\\]|\\.)*])+)\/(?:(?:g(?:im?|mi?)?|i(?:gm?|mg?)?|m(?:gi?|ig?)?)?)/,
  },
});

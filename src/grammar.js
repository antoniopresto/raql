// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

    const { lexer } = require('./lexer');

    function P_LOGIC([left,,{value},,right]){
        return {type: `LOGIC`, operator: value, parameters: [left, right]}
    }

    function P_FN_EXISTS([,,,field]){
        return {type: 'FN_EXISTS', field }
    }

    function P_FN_IN([,,,field,,,{value: parameters}]){
        return {type: 'FN_IN', field, parameters }
    }

    function P_FN_BETWEEN([,,,field,,min,max]){
        return {type: 'FN_BETWEEN', field, parameters: [min, max] }
    }

    function P_TYPE([,,,field, operand]){
        return {type: 'FN_TYPE', field, parameters: [operand] }
    }

    function P_STARTS_WITH([,,,field, operand]){
        return {type: 'FN_STARTS_WITH', field, parameters: [operand] }
    }

    function P_REGEX([,,,field,,, value]){
        return {type: 'FN_REGEX', field, parameters: [value] }
    }

    function P_COMPARISON([left,,{value},,right]){
        return {type: `COMPARISON`, operator: value, parameters: [left, right]}
    }

    function P_SIZE([,,,field]){
        return {type: `FN_SIZE`, field}
    }

    function P_GROUPED_OPERATION([,,field]){
        return {type: `GROUPED_OPERATION`, parameters: [field] }
    }

    function P_PATH(parts) {
      const value = [];

      function handle(item){
        if(!item) return;
        if(Array.isArray(item)){
          return item.forEach(handle);
        }
        if(item?.type === 'PATH') {
            handle(item.value)
        } else {
            value.push({type: item.type, value: item.value})
        }
      }

      handle(parts);

      return  {type: 'PATH', value}
    }

    function P_PARAMETERS([operand, operands]) {
        const value = [operand];
        operands.forEach((parts) => value.push(parts[2]));
        return {type: `PARAMETERS`, value}
    }
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "PROGRAM$ebnf$1", "symbols": ["WHITESPACE"], "postprocess": id},
    {"name": "PROGRAM$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "PROGRAM$ebnf$2", "symbols": ["WHITESPACE"], "postprocess": id},
    {"name": "PROGRAM$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "PROGRAM", "symbols": ["PROGRAM$ebnf$1", "OPERATION", "PROGRAM$ebnf$2"], "postprocess": ([,value]) => value},
    {"name": "OPERATION", "symbols": ["LOGIC"], "postprocess": id},
    {"name": "OPERATION", "symbols": ["FN_IN"], "postprocess": id},
    {"name": "OPERATION", "symbols": ["FN_BETWEEN"], "postprocess": id},
    {"name": "OPERATION", "symbols": ["FN_TYPE"], "postprocess": id},
    {"name": "OPERATION", "symbols": ["FN_STARTS_WITH"], "postprocess": id},
    {"name": "OPERATION", "symbols": ["FN_REGEX"], "postprocess": id},
    {"name": "OPERATION", "symbols": ["FN_EXISTS"], "postprocess": id},
    {"name": "OPERATION", "symbols": ["FN_SIZE"], "postprocess": id},
    {"name": "OPERATION", "symbols": ["GROUPED_OPERATION"], "postprocess": id},
    {"name": "OPERATION", "symbols": ["COMPARISON"], "postprocess": id},
    {"name": "FN_EXISTS$ebnf$1", "symbols": ["WHITESPACE"], "postprocess": id},
    {"name": "FN_EXISTS$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "FN_EXISTS$ebnf$2", "symbols": ["WHITESPACE"], "postprocess": id},
    {"name": "FN_EXISTS$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "FN_EXISTS", "symbols": [(lexer.has("FN_EXISTS") ? {type: "FN_EXISTS"} : FN_EXISTS), (lexer.has("OPEN_PAREN") ? {type: "OPEN_PAREN"} : OPEN_PAREN), "FN_EXISTS$ebnf$1", "PATH", "FN_EXISTS$ebnf$2", (lexer.has("CLOSE_PAREN") ? {type: "CLOSE_PAREN"} : CLOSE_PAREN)], "postprocess": P_FN_EXISTS},
    {"name": "FN_IN$ebnf$1", "symbols": ["WHITESPACE"], "postprocess": id},
    {"name": "FN_IN$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "FN_IN$ebnf$2", "symbols": ["WHITESPACE"], "postprocess": id},
    {"name": "FN_IN$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "FN_IN$ebnf$3", "symbols": ["WHITESPACE"], "postprocess": id},
    {"name": "FN_IN$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "FN_IN", "symbols": [(lexer.has("FN_IN") ? {type: "FN_IN"} : FN_IN), (lexer.has("OPEN_PAREN") ? {type: "OPEN_PAREN"} : OPEN_PAREN), "FN_IN$ebnf$1", "PATH", "COMMA", "FN_IN$ebnf$2", "PARAMETERS", "FN_IN$ebnf$3", (lexer.has("CLOSE_PAREN") ? {type: "CLOSE_PAREN"} : CLOSE_PAREN)], "postprocess": P_FN_IN},
    {"name": "FN_BETWEEN$ebnf$1", "symbols": ["WHITESPACE"], "postprocess": id},
    {"name": "FN_BETWEEN$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "FN_BETWEEN$ebnf$2", "symbols": ["WHITESPACE"], "postprocess": id},
    {"name": "FN_BETWEEN$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "FN_BETWEEN", "symbols": [(lexer.has("FN_BETWEEN") ? {type: "FN_BETWEEN"} : FN_BETWEEN), (lexer.has("OPEN_PAREN") ? {type: "OPEN_PAREN"} : OPEN_PAREN), "FN_BETWEEN$ebnf$1", "PATH", "FN_BETWEEN$ebnf$2", "SPACES_OPERAND", "SPACES_OPERAND", (lexer.has("CLOSE_PAREN") ? {type: "CLOSE_PAREN"} : CLOSE_PAREN)], "postprocess": P_FN_BETWEEN},
    {"name": "FN_STARTS_WITH$ebnf$1", "symbols": ["WHITESPACE"], "postprocess": id},
    {"name": "FN_STARTS_WITH$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "FN_STARTS_WITH", "symbols": [(lexer.has("FN_STARTS_WITH") ? {type: "FN_STARTS_WITH"} : FN_STARTS_WITH), (lexer.has("OPEN_PAREN") ? {type: "OPEN_PAREN"} : OPEN_PAREN), "FN_STARTS_WITH$ebnf$1", "PATH", "SPACES_OPERAND", (lexer.has("CLOSE_PAREN") ? {type: "CLOSE_PAREN"} : CLOSE_PAREN)], "postprocess": P_STARTS_WITH},
    {"name": "FN_TYPE$ebnf$1", "symbols": ["WHITESPACE"], "postprocess": id},
    {"name": "FN_TYPE$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "FN_TYPE", "symbols": [(lexer.has("FN_TYPE") ? {type: "FN_TYPE"} : FN_TYPE), (lexer.has("OPEN_PAREN") ? {type: "OPEN_PAREN"} : OPEN_PAREN), "FN_TYPE$ebnf$1", "PATH", "SPACES_OPERAND", (lexer.has("CLOSE_PAREN") ? {type: "CLOSE_PAREN"} : CLOSE_PAREN)], "postprocess": P_TYPE},
    {"name": "FN_REGEX$ebnf$1", "symbols": ["WHITESPACE"], "postprocess": id},
    {"name": "FN_REGEX$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "FN_REGEX$ebnf$2", "symbols": ["WHITESPACE"], "postprocess": id},
    {"name": "FN_REGEX$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "FN_REGEX$ebnf$3", "symbols": ["WHITESPACE"], "postprocess": id},
    {"name": "FN_REGEX$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "FN_REGEX", "symbols": [(lexer.has("FN_REGEX") ? {type: "FN_REGEX"} : FN_REGEX), (lexer.has("OPEN_PAREN") ? {type: "OPEN_PAREN"} : OPEN_PAREN), "FN_REGEX$ebnf$1", "PATH", "COMMA", "FN_REGEX$ebnf$2", "REGEX", "FN_REGEX$ebnf$3", (lexer.has("CLOSE_PAREN") ? {type: "CLOSE_PAREN"} : CLOSE_PAREN)], "postprocess": P_REGEX},
    {"name": "FN_SIZE$ebnf$1", "symbols": ["WHITESPACE"], "postprocess": id},
    {"name": "FN_SIZE$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "FN_SIZE$ebnf$2", "symbols": ["WHITESPACE"], "postprocess": id},
    {"name": "FN_SIZE$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "FN_SIZE", "symbols": [(lexer.has("FN_SIZE") ? {type: "FN_SIZE"} : FN_SIZE), (lexer.has("OPEN_PAREN") ? {type: "OPEN_PAREN"} : OPEN_PAREN), "FN_SIZE$ebnf$1", "PATH", "FN_SIZE$ebnf$2", (lexer.has("CLOSE_PAREN") ? {type: "CLOSE_PAREN"} : CLOSE_PAREN)], "postprocess": P_SIZE},
    {"name": "COMPARISON$ebnf$1", "symbols": ["WHITESPACE"], "postprocess": id},
    {"name": "COMPARISON$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "COMPARISON$ebnf$2", "symbols": ["WHITESPACE"], "postprocess": id},
    {"name": "COMPARISON$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "COMPARISON", "symbols": ["OPERAND", "COMPARISON$ebnf$1", (lexer.has("COMPARATOR") ? {type: "COMPARATOR"} : COMPARATOR), "COMPARISON$ebnf$2", "OPERAND"], "postprocess": P_COMPARISON},
    {"name": "GROUPED_OPERATION$ebnf$1", "symbols": ["WHITESPACE"], "postprocess": id},
    {"name": "GROUPED_OPERATION$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "GROUPED_OPERATION$ebnf$2", "symbols": ["WHITESPACE"], "postprocess": id},
    {"name": "GROUPED_OPERATION$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "GROUPED_OPERATION", "symbols": [(lexer.has("OPEN_PAREN") ? {type: "OPEN_PAREN"} : OPEN_PAREN), "GROUPED_OPERATION$ebnf$1", "OPERATION", "GROUPED_OPERATION$ebnf$2", (lexer.has("CLOSE_PAREN") ? {type: "CLOSE_PAREN"} : CLOSE_PAREN)], "postprocess": P_GROUPED_OPERATION},
    {"name": "SPACES_OPERAND$ebnf$1", "symbols": ["WHITESPACE"], "postprocess": id},
    {"name": "SPACES_OPERAND$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "SPACES_OPERAND$ebnf$2", "symbols": ["WHITESPACE"], "postprocess": id},
    {"name": "SPACES_OPERAND$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "SPACES_OPERAND$ebnf$3", "symbols": ["COMMA"], "postprocess": id},
    {"name": "SPACES_OPERAND$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "SPACES_OPERAND$ebnf$4", "symbols": ["WHITESPACE"], "postprocess": id},
    {"name": "SPACES_OPERAND$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "SPACES_OPERAND", "symbols": ["COMMA", "SPACES_OPERAND$ebnf$1", "OPERAND", "SPACES_OPERAND$ebnf$2", "SPACES_OPERAND$ebnf$3", "SPACES_OPERAND$ebnf$4"], "postprocess": ([,,operand]) => operand},
    {"name": "LOGIC", "symbols": ["OPERATION", "WHITESPACE", (lexer.has("LOGIC") ? {type: "LOGIC"} : LOGIC), "WHITESPACE", "OPERATION"], "postprocess": P_LOGIC},
    {"name": "PARAMETERS$ebnf$1$subexpression$1$ebnf$1", "symbols": ["WHITESPACE"], "postprocess": id},
    {"name": "PARAMETERS$ebnf$1$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "PARAMETERS$ebnf$1$subexpression$1", "symbols": ["COMMA", "PARAMETERS$ebnf$1$subexpression$1$ebnf$1", "OPERAND"]},
    {"name": "PARAMETERS$ebnf$1", "symbols": ["PARAMETERS$ebnf$1$subexpression$1"]},
    {"name": "PARAMETERS$ebnf$1$subexpression$2$ebnf$1", "symbols": ["WHITESPACE"], "postprocess": id},
    {"name": "PARAMETERS$ebnf$1$subexpression$2$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "PARAMETERS$ebnf$1$subexpression$2", "symbols": ["COMMA", "PARAMETERS$ebnf$1$subexpression$2$ebnf$1", "OPERAND"]},
    {"name": "PARAMETERS$ebnf$1", "symbols": ["PARAMETERS$ebnf$1", "PARAMETERS$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "PARAMETERS", "symbols": ["OPERAND", "PARAMETERS$ebnf$1"], "postprocess": P_PARAMETERS},
    {"name": "OPERAND", "symbols": ["STRING"], "postprocess": id},
    {"name": "OPERAND", "symbols": ["NUMBER"], "postprocess": id},
    {"name": "OPERAND", "symbols": ["OPERATION"], "postprocess": id},
    {"name": "OPERAND", "symbols": ["PATH"], "postprocess": id},
    {"name": "WHITESPACE", "symbols": [(lexer.has("WHITESPACE") ? {type: "WHITESPACE"} : WHITESPACE)], "postprocess": () => null},
    {"name": "STRING", "symbols": [(lexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": ([{value}]) => ({type: 'STRING', value: value.slice(1,-1)})},
    {"name": "REGEX", "symbols": [(lexer.has("REGEX") ? {type: "REGEX"} : REGEX)], "postprocess": ([{value}]) => ({type: 'REGEX', value: value})},
    {"name": "NUMBER", "symbols": [(lexer.has("NUMBER") ? {type: "NUMBER"} : NUMBER)], "postprocess": ([{value}]) => ({type: 'NUMBER', value})},
    {"name": "PATH", "symbols": []},
    {"name": "PATH$subexpression$1", "symbols": [(lexer.has("IDENTIFIER") ? {type: "IDENTIFIER"} : IDENTIFIER)]},
    {"name": "PATH$subexpression$1", "symbols": [(lexer.has("ESCAPED_IDENTIFIER") ? {type: "ESCAPED_IDENTIFIER"} : ESCAPED_IDENTIFIER)]},
    {"name": "PATH$ebnf$1", "symbols": []},
    {"name": "PATH$ebnf$1$subexpression$1", "symbols": [(lexer.has("ARRAY_DOT_NOTATION") ? {type: "ARRAY_DOT_NOTATION"} : ARRAY_DOT_NOTATION)]},
    {"name": "PATH$ebnf$1$subexpression$1", "symbols": [(lexer.has("BRACKET_NOTATION") ? {type: "BRACKET_NOTATION"} : BRACKET_NOTATION)]},
    {"name": "PATH$ebnf$1", "symbols": ["PATH$ebnf$1", "PATH$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "PATH$ebnf$2", "symbols": []},
    {"name": "PATH$ebnf$2$subexpression$1", "symbols": [(lexer.has("DOT_NOTATION") ? {type: "DOT_NOTATION"} : DOT_NOTATION), "PATH"], "postprocess": P_PATH},
    {"name": "PATH$ebnf$2", "symbols": ["PATH$ebnf$2", "PATH$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "PATH", "symbols": ["PATH", "PATH$subexpression$1", "PATH$ebnf$1", "PATH$ebnf$2"], "postprocess": P_PATH},
    {"name": "PATH", "symbols": [(lexer.has("PATH") ? {type: "PATH"} : PATH)], "postprocess": ([{value}]) => ({type: 'PATH', value: value})},
    {"name": "COMMA", "symbols": [(lexer.has("COMMA") ? {type: "COMMA"} : COMMA)], "postprocess": () => null}
]
  , ParserStart: "PROGRAM"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();

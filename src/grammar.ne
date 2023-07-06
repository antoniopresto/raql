@{%
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
%}

@lexer lexer

PROGRAM -> WHITESPACE:? OPERATION WHITESPACE:? {% ([,value]) => value %}

OPERATION -> LOGIC {% id %}
     | FN_IN {% id %}
     | FN_BETWEEN {% id %}
     | FN_TYPE {% id %}
     | FN_STARTS_WITH {% id %}
     | FN_REGEX {% id %}
     | FN_EXISTS {% id %}
     | FN_SIZE {% id %}
     | GROUPED_OPERATION {% id %}
     | COMPARISON {% id %}

FN_EXISTS -> %FN_EXISTS %OPEN_PAREN WHITESPACE:? PATH WHITESPACE:? %CLOSE_PAREN {% P_FN_EXISTS %}
FN_IN ->  %FN_IN %OPEN_PAREN WHITESPACE:? PATH COMMA WHITESPACE:?  PARAMETERS WHITESPACE:?  %CLOSE_PAREN {% P_FN_IN %}
FN_BETWEEN -> %FN_BETWEEN %OPEN_PAREN WHITESPACE:? PATH WHITESPACE:? SPACES_OPERAND SPACES_OPERAND %CLOSE_PAREN {% P_FN_BETWEEN %}
FN_STARTS_WITH ->%FN_STARTS_WITH %OPEN_PAREN WHITESPACE:? PATH SPACES_OPERAND %CLOSE_PAREN {% P_STARTS_WITH %}
FN_TYPE -> %FN_TYPE %OPEN_PAREN WHITESPACE:? PATH SPACES_OPERAND %CLOSE_PAREN {% P_TYPE %}
FN_REGEX -> %FN_REGEX %OPEN_PAREN WHITESPACE:? PATH COMMA WHITESPACE:? REGEX WHITESPACE:?  %CLOSE_PAREN {% P_REGEX %}
FN_SIZE -> %FN_SIZE %OPEN_PAREN WHITESPACE:? PATH WHITESPACE:? %CLOSE_PAREN {% P_SIZE %}
COMPARISON -> OPERAND  WHITESPACE:? %COMPARATOR WHITESPACE:? OPERAND {% P_COMPARISON %}
GROUPED_OPERATION -> %OPEN_PAREN WHITESPACE:? OPERATION WHITESPACE:? %CLOSE_PAREN {% P_GROUPED_OPERATION %}

SPACES_OPERAND -> COMMA WHITESPACE:? OPERAND WHITESPACE:? COMMA:?  WHITESPACE:? {% ([,,operand]) => operand %}

LOGIC -> OPERATION WHITESPACE %LOGIC WHITESPACE OPERATION {% P_LOGIC %}

PARAMETERS -> OPERAND (COMMA WHITESPACE:? OPERAND):+ {% P_PARAMETERS %}

OPERAND -> STRING {% id %} | NUMBER {% id %} | OPERATION {% id %} | PATH {% id %}

WHITESPACE -> %WHITESPACE {% () => null %}
STRING -> %STRING {% ([{value}]) => ({type: 'STRING', value: value.slice(1,-1)}) %}
REGEX -> %REGEX {% ([{value}]) => ({type: 'REGEX', value: value}) %}
NUMBER -> %NUMBER {% ([{value}]) => ({type: 'NUMBER', value}) %}
PATH -> null | PATH (%IDENTIFIER | %ESCAPED_IDENTIFIER ) (%ARRAY_DOT_NOTATION | %BRACKET_NOTATION):* (%DOT_NOTATION PATH {% P_PATH %}):* {% P_PATH %}

PATH -> %PATH {% ([{value}]) => ({type: 'PATH', value: value}) %}
COMMA -> %COMMA {% () => null %}


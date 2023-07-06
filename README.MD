# 🦸🏻‍♀️ RAQL

RAQL is a *R*eally *A*wesome *Q*uery *L*anguage. 

This package contains the javascript parser  (NodeJS or Browser)
to transform RAQL queries into [Abstract Syntax Trees (ASTs)](https://en.wikipedia.org/wiki/Abstract_syntax_tree), 
providing a structured representation 
of the query which can be processed or analyzed further.

## Install
```sh 
npm install raql
```

## Features

- **Highly Compatible:** Understands a wide range of filtering syntaxes.
- **Robust:** Thoroughly tested, ensuring accurate parsing.
- **Useful Debugging Information:** In case of syntax errors, it provides meaningful error messages.
- [ ] (TODO) **Extensible:** Can be extended to support additional syntaxes in the future.~~~~

## Usage

To use the RAQLParser, you need to instantiate it and then feed in the RAQL string that you wish to parse:

```javascript
    import { Parser } = 'raql';
    
    let parser = new RAQLParser();
    
    parser.feed(
      'dogs.$.names[1][2][3].$.name = "maggie" || startsWith(user.name, username)'
    );

    expect(parser.results[0]).toEqual({
      "type": "LOGIC",
      "operator": "||",
      "parameters": [
        {
          "field": {
            "type": "PATH",
            "value": [
              {
                "type": "IDENTIFIER",
                "value": "path",
              },
            ],
          },
          "parameters": [
            {
              "type": "STRING",
              "value": "value1",
            },
            {
              "type": "STRING",
              "value": "value2",
            },
            {
              "type": "PATH",
              "value": [
                {
                  "type": "IDENTIFIER",
                  "value": "another",
                },
              ],
            },
          ],
          "type": "FN_IN",
        },
        {
          "operator": "<=",
          "parameters": [
            {
              "type": "NUMBER",
              "value": "2",
            },
            {
              "type": "PATH",
              "value": [
                {
                  "type": "IDENTIFIER",
                  "value": "people",
                },
              ],
            },
          ],
          "type": "COMPARISON",
        },
      ],
    });

// === Query to AST examples ===

examples[`RAQLParser 1 > 2 || (( size(PATH) )) 1`] = `
{
  "operator": "||",
  "parameters": [
    {
      "operator": ">",
      "parameters": [
        {
          "type": "NUMBER",
          "value": "1",
        },
        {
          "type": "NUMBER",
          "value": "2",
        },
      ],
      "type": "COMPARISON",
    },
    {
      "parameters": [
        {
          "parameters": [
            {
              "field": {
                "type": "PATH",
                "value": [
                  {
                    "type": "IDENTIFIER",
                    "value": "PATH",
                  },
                ],
              },
              "type": "FN_SIZE",
            },
          ],
          "type": "GROUPED_OPERATION",
        },
      ],
      "type": "GROUPED_OPERATION",
    },
  ],
  "type": "LOGIC",
}
`;

examples[`RAQLParser between(path, "value1", "value2") 1`] = `
{
  "field": {
    "type": "PATH",
    "value": [
      {
        "type": "IDENTIFIER",
        "value": "path",
      },
    ],
  },
  "parameters": [
    {
      "type": "STRING",
      "value": "value1",
    },
    {
      "type": "STRING",
      "value": "value2",
    },
  ],
  "type": "FN_BETWEEN",
}
`;

examples[`RAQLParser dogs.$.names[1][2][3].$.name = "maggie" || startsWith(user.name, username) 1`] = `
{
  "operator": "||",
  "parameters": [
    {
      "operator": "=",
      "parameters": [
        {
          "type": "PATH",
          "value": [
            {
              "type": "IDENTIFIER",
              "value": "dogs",
            },
            {
              "type": "ARRAY_DOT_NOTATION",
              "value": ".$.",
            },
            {
              "type": "IDENTIFIER",
              "value": "names",
            },
            {
              "type": "BRACKET_NOTATION",
              "value": "[1]",
            },
            {
              "type": "BRACKET_NOTATION",
              "value": "[2]",
            },
            {
              "type": "BRACKET_NOTATION",
              "value": "[3]",
            },
            {
              "type": "ARRAY_DOT_NOTATION",
              "value": ".$.",
            },
            {
              "type": "IDENTIFIER",
              "value": "name",
            },
          ],
        },
        {
          "type": "STRING",
          "value": "maggie",
        },
      ],
      "type": "COMPARISON",
    },
    {
      "field": {
        "type": "PATH",
        "value": [
          {
            "type": "IDENTIFIER",
            "value": "user",
          },
          {
            "type": "DOT_NOTATION",
            "value": ".",
          },
          {
            "type": "IDENTIFIER",
            "value": "name",
          },
        ],
      },
      "parameters": [
        {
          "type": "PATH",
          "value": [
            {
              "type": "IDENTIFIER",
              "value": "username",
            },
          ],
        },
      ],
      "type": "FN_STARTS_WITH",
    },
  ],
  "type": "LOGIC",
}
`;

examples[`RAQLParser exists(maggie) || 1 >= 18 1`] = `
{
  "operator": "||",
  "parameters": [
    {
      "field": {
        "type": "PATH",
        "value": [
          {
            "type": "IDENTIFIER",
            "value": "maggie",
          },
        ],
      },
      "type": "FN_EXISTS",
    },
    {
      "operator": ">=",
      "parameters": [
        {
          "type": "NUMBER",
          "value": "1",
        },
        {
          "type": "NUMBER",
          "value": "18",
        },
      ],
      "type": "COMPARISON",
    },
  ],
  "type": "LOGIC",
}
`;

examples[`RAQLParser regex(path, /^Antonio/mig) 1`] = `
{
  "field": {
    "type": "PATH",
    "value": [
      {
        "type": "IDENTIFIER",
        "value": "path",
      },
    ],
  },
  "parameters": [
    {
      "type": "REGEX",
      "value": "/^Antonio/mig",
    },
  ],
  "type": "FN_REGEX",
}
`;

examples[`RAQLParser size(PATH) 1`] = `
{
  "field": {
    "type": "PATH",
    "value": [
      {
        "type": "IDENTIFIER",
        "value": "PATH",
      },
    ],
  },
  "type": "FN_SIZE",
}
`;

examples[`RAQLParser startsWith(path, "value1") 1`] = `
{
  "field": {
    "type": "PATH",
    "value": [
      {
        "type": "IDENTIFIER",
        "value": "path",
      },
    ],
  },
  "parameters": [
    {
      "type": "STRING",
      "value": "value1",
    },
  ],
  "type": "FN_STARTS_WITH",
}
`;

examples[`RAQLParser type(path, "value1") 1`] = `
{
  "field": {
    "type": "PATH",
    "value": [
      {
        "type": "IDENTIFIER",
        "value": "path",
      },
    ],
  },
  "parameters": [
    {
      "type": "STRING",
      "value": "value1",
    },
  ],
  "type": "FN_TYPE",
}
```

## Contributions

Contributions to RAQL Parser are very welcome! Feel free to submit a pull request or create an issue if you find a bug or would like to suggest a feature.

## License

RAQL Parser is licensed under the MIT license.

---

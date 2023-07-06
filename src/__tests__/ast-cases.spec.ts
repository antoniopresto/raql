import fs from 'fs';
import path from 'path';
import { compileGrammar, Parser } from '../compileGrammar';
import { lexer } from '../lexer';

const grammar = fs.readFileSync(
  path.resolve(__dirname, '../grammar.ne'),
  'utf-8'
);

describe('ast', () => {
  let parser: Parser;

  beforeEach(() => {
    parser = compileGrammar(lexer, grammar);
  });

  test('dogs.$.names[1][2][3].$.name = "maggie" || startsWith(user.name, username)', () => {
    parser.feed(
      'dogs.$.names[1][2][3].$.name = "maggie" || startsWith(user.name, username)'
    );

    expect(parser.results[0]).toMatchSnapshot();
  });

  test('exists(maggie) || 1 >= 18', () => {
    parser.feed('exists(maggie) || 1 >= 18');

    expect(parser.results[0]).toMatchSnapshot();
  });

  test('  in(path, "value1", "value2", another) || 2 <= people   \n', () => {
    parser.feed('  in(path, "value1", "value2", another) || 2 <= people   \n');

    expect(parser.results[0]).toMatchSnapshot();
  });

  test('between(path, "value1", "value2")', () => {
    parser.feed('between(path, "value1", "value2")');

    expect(parser.results[0]).toMatchSnapshot();
  });

  test('type(path, "value1")', () => {
    parser.feed('type(path, "value1")');

    expect(parser.results[0]).toMatchSnapshot();
  });

  test('startsWith(path, "value1")', () => {
    parser.feed('startsWith(path, "value1")');

    expect(parser.results[0]).toMatchSnapshot();
  });

  test('regex(path, /^Antonio/mig)', () => {
    parser.feed('regex(path, /^Antonio/mig)');

    expect(parser.results[0]).toMatchSnapshot();
  });

  test('size(PATH)', () => {
    parser.feed('size(PATH)');

    expect(parser.results[0]).toMatchSnapshot();
  });

  test('1 > 2 || (( size(PATH) ))', () => {
    parser.feed('1 > 2 || (( size(PATH) ))');

    expect(parser.results[0]).toMatchSnapshot();
  });
});

import { Parser, AstBuilder } from '@cucumber/gherkin';
import { IdGenerator } from '@cucumber/messages';

export default (feature) => {
  const parser = new Parser(new AstBuilder(IdGenerator.incrementing()));
  return parser.parse(feature);
};

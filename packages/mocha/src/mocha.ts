import { addFramework, addStep, newChildBlock } from '@vest/core';
import framework from './framework';

addFramework(framework);

export function before(fn) {
  addStep({ type: 'hook', keyword: 'before', fn, framework: 'mocha' });
}

export function after(fn) {
  addStep({ type: 'hook', keyword: 'after', fn, framework: 'mocha' });
}

export function beforeEach(fn) {
  addStep({ type: 'hook', keyword: 'beforeEach', fn, framework: 'mocha' });
}

export function afterEach(fn) {
  addStep({ type: 'hook', keyword: 'afterEach', fn, framework: 'mocha' });
}

export function it(name, fn) {
  addStep({
    type: 'test',
    keyword: 'it',
    counter: 'specs',
    name,
    fn,
    runnable: true,
    framework: 'mocha',
  });
}

export function describe(name, fn) {
  const block = newChildBlock(
    { keyword: 'describe', name, runnable: true, framework: 'mocha' },
    fn
  );
  addStep(block);
}

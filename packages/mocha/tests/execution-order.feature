Feature: Execution order

  Scenario: A test involving all hook types and a nested block
    Given the following module named "exection-order.js":
      """
      let log;

      const executionOrder = [
        'O - before',
        'O - beforeEach',
        'O - it 1',
        'O - afterEach',
        'O - beforeEach',
        'O - it 2',
        'O - afterEach',
        'N - before',
        'O - beforeEach',
        'N - beforeEach',
        'N - it 1',
        'N - afterEach',
        'O - afterEach',
        'O - beforeEach',
        'N - beforeEach',
        'N - it 2',
        'N - afterEach',
        'O - afterEach',
        'N - after',
        'O - after',
      ];

      before(() => {
        log = ['O - before'];
      });

      after(() => {
        log.push('O - after');
        expect(log).to.eql(executionOrder);
      });

      beforeEach(() => {
        log.push('O - beforeEach');
      });

      afterEach(() => {
        log.push('O - afterEach');
      });

      it('O - it 1', async () => {
        log.push('O - it 1');
      });

      it('O - it 2', async () => {
        log.push('O - it 2');
      });

      describe('Scoped / Nested block', () => {
        before(() => {
          log.push('N - before');
        });

        after(() => {
          log.push('N - after');
        });

        beforeEach(() => {
          log.push('N - beforeEach');
        });

        afterEach(() => {
          log.push('N - afterEach');
        });

        it('N - it 1', () => {
          log.push('N - it 1');
        });

        it('N - it 2', () => {
          log.push('N - it 2');
        });
      });
      """
    When I run the suite
    Then it should pass

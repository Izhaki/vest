Feature: Hooks
  before, beforeEach, after and afterEach support.

  Scenario: A failing test with afterEach and after hooks
    after and afterEach hooks should still be executed when a test fails.

    Given the following module named "t.js":
      """
      describe('A failing test', () => {
        it('should fail', function () {
          expect(false).to.be.true;
        });

        afterEach(function () {
          this.afterEachRan = true;
        });

        after(function () {
          this.afterRan = true;
        });
      });

      it('should run after hooks', function () {
        expect(this.afterEachRan).to.be.true;
        expect(this.afterRan).to.be.true;
      });
      """
    When I run the suite
    Then the result for the following steps should be "passed":
      | should run after hooks |

  Scenario: A failing before hook
    Should fail its parent; all other steps in the block should be skipped.

    Given the following module named "t.js":
      """
      const noop = () => {};

      describe('describe', () => {
        before(() => { throw new Error(); });
        beforeEach(noop);
        it('it', noop);
        afterEach(noop);
        after(noop);
      });
      """
    When I run the suite
    Then the result for the following steps should be "failed":
      | t.js > describe          |
      | t.js > describe > before |
    And the result for the following steps should be "skipped":
      | t.js > describe > it > beforeEach |
      | t.js > describe > it              |
      | t.js > describe > it > afterEach  |
      | t.js > describe > after           |

  Scenario: A failing beforeEach hook
    Should fail its linked test and all parents; all other steps in the block should be skipped, other than after hooks.

    Given the following module named "t.js":
      """
      const noop = () => {};

      describe('describe', () => {
        beforeEach(() => { throw new Error(); });
        beforeEach(noop);
        it('it', noop);
        afterEach(noop);
        after(noop);
      });
      """
    When I run the suite
    Then the result for the following steps should be "failed":
      | t.js > describe                     |
      | t.js > describe > it                |
      | t.js > describe > it > beforeEach 1 |
    And the result for the following steps should be "skipped":
      | t.js > describe > it > beforeEach 2 |
      | t.js > describe > it > test         |
      | t.js > describe > it > afterEach    |
    And the result for the following steps should be "passed":
      | t.js > describe > after |

  Scenario: A failing afterEach hook
    Should fail the linked test and all parents. after hook should still run.

    Given the following module named "t.js":
      """
      const noop = () => {};

      describe('describe', () => {
        it('it', noop);
        afterEach(() => { throw new Error(); });
        after(noop);
      });
      """
    When I run the suite
    Then the result for the following steps should be "failed":
      | t.js > describe                  |
      | t.js > describe > it             |
      | t.js > describe > it > afterEach |
    And the result for the following steps should be "passed":
      | t.js > describe > after |

  Scenario: A failing after hook
    Should fail its parent.

    Given the following module named "t.js":
      """
      const noop = () => {};

      describe('describe', () => {
        it('it', () => {});
        after(() => { throw new Error(); });
      });
      """
    When I run the suite
    Then the result for the following steps should be "passed":
      | t.js > describe > it |
    And the result for the following steps should be "failed":
      | t.js > describe         |
      | t.js > describe > after |

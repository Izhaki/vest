Feature: Rethrow
  Rethrow means we catch the exception of a failing step, cleanly bail out of the suite, then throw the first error again.
  This is useful as many setups (React, NextJs) show the error accounting for sourcemaps when an uncaught exception is shown.

  Scenario: Rethrow option is set with a failing module
    Given a suite with the following options:
      """
      {
        "rethrow": true
      }
      """
    Given the following module named "a.js":
      """
      it('should fail', function () {
        throw new Error('error');
      });
      """
    And the following module named "b.js":
      """
      it('should pass', () => {});
      """
    When I run the suite
    Then it should throw
    And the result for the following steps should be "skipped":
      | b.js               |
      | b.js > should pass |


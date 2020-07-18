Feature: Bail
  We'd like to have an option that allows test execution to stop after first failure.

  Scenario: Bail option is set with a failing module
    Given a suite with the following options:
      """
      {
        "bail": true
      }
      """
    Given the following module named "a.js":
      """
      it('should fail', () => {
        throw new Error('error');
      });

      it('should pass', () => {});
      """
    And the following module named "b.js":
      """
      it('should pass', () => {});
      """
    When I run the suite
    Then the result for the following steps should be "skipped":
      | a.js > should pass |
      | b.js               |
      | b.js > should pass |

    # Here we check that previously skipped steps run in the next run
    Given the following module named "a.js":
      """
      it('should pass', () => {});
      """
    When I run the suite
    Then the result for the following steps should be "passed":
      | a.js > should pass |
      | b.js               |
      | b.js > should pass |


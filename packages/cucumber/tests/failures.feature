Feature: Failures

  Scenario: A failing step
    Given the following module named "failing-step.feature":
      """
      Feature: a feature
        Scenario: a scenario
          Given a failing step
          And a passing step
      """
    And the following module named "stepDefinitions.js":
      """
      Given('a failing step', function () {
        throw new Error('error');
      });

      Given('a passing step', function () {});
      """
    When I run the suite
    Then the result for the following steps should be "failed":
      | a failing step |
    And the result for the following steps should be "skipped":
      | a passing step |


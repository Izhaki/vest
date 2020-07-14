Feature: Hooks

  Scenario: Multiple after hooks
    Multiple After hooks are executed in the reverse order that they were defined.

    Given the following module named "hooks.feature":
      """
      Feature: a feature
        Scenario: a scenario
          Given a step
      """
    And the following module named "stepDefinitions.js":
      """
      Given('a step', function () {});

      After(function () {
        expect(this.all).to.equal('good');
      })

      After(function () {
        this.all = 'good';
      })
      """
    When I run the suite
    Then it should pass

  Scenario: BeforeAll and AfterAll
    We'd like to be able to run hooks before and after all tests are executed.

    Given the following module named "1.feature":
      """
      Feature: feature 1
        Scenario: a scenario
          Given I increase the global counter
      """
    And the following module named "2.feature":
      """
      Feature: feature 2
        Scenario: a scenario
          Given I increase the global counter
      """
    And the following module named "stepDefinitions.js":
      """
      let counter;

      BeforeAll(function () {
        counter = 0;
      });

      Given('I increase the global counter', function () {
        counter += 1;
      });

      AfterAll(function () {
        expect(counter).to.equal(2);
      });
      """
    When I run the suite
    Then it should pass



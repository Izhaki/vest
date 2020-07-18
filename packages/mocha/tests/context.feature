Feature: Context

  Scenario: All possible steps use context
    Given the following module named "t.js":
      """
      before(function () {
        this.steps = ['before'];
      });

      beforeEach(function () {
        this.steps.push('beforeEach');
      });

      afterEach(function () {
        this.steps.push('afterEach');
      });

      describe('block', () => {
        it('it', function () {
          this.steps.push('it');
        });
      });

      after(function () {
        expect(this.steps).to.eql(['before', 'beforeEach', 'it', 'afterEach']);
      });
      """
    When I run the suite
    Then it should pass

Feature: Create Account - Add Name

  Scenario: As an user I can input my name
    Given someone who wants to sign up for an account
    When provides a name that is 2 characters long
    Then I should be able to pass to the next step.

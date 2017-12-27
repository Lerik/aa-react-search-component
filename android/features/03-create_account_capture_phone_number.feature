Feature: Create Account - Capture Phone Number

  Scenario: As an user I can input my phone number
    Given someone who wants to sign up for an account
    When attempting to give my account information
    And provides all the required information
    Then I should be able to pass to the next step.

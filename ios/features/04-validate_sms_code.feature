Feature: Create Account - Validate SMS Code

  Scenario: As a user I will be able to validate a sms code
    Given user has given a correct us phone number
    And app sends an sms code to that phone number
    When attempting to give the sent sms code
    Then the app sends user to add name page.

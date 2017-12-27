Feature: Create account feature

  Scenario: As an user I can open the terms and conditions link
    Given a guy with a cell phone
    And who has opened the app
    When start trying to sign up
    Then the New user should be only able to add phone number and accept terms and conditions

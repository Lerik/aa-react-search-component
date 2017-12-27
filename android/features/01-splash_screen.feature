Feature: Splash Screen feature

  Scenario: As a valid user I can see the splash screen
    Given a guy with a cell phone
    And who has opened the app
    When the guy has waited for 2 seconds 
    And the home screen appears
    Then the guy can use the app

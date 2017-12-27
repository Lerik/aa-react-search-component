Feature: Wishes - Wish Created 

  Scenario: When I tap on the URL link, I should be directed to the webpage of the link.
    Given an authenticated app user
    And I have at least one wishlist
    And I have at least one wish
    And I want to see more information about the wish
    When I want to access the link
    Then I should be able to access it
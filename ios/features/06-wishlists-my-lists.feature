Feature: Wishlist - My lists

  Scenario: The wishlists are listed and organized by date of creation, presenting the new ones first. 
    Given an authenticated app user
    And I have 5 wishlists
    When try to get a list of my wishlists
    Then it should have all 5 wishlists

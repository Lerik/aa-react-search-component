Feature: Wishes - Share Wishlist

  Scenario: I should be able to create a deep link to share a wishlist
    Given an authenticated app user
    And I have at least one wishlist
    And I have at least one wish
    When the user decides to share the Wishlist
    Then the user should be able to share to everyone the access to the wishlist

Feature: Wishlist - Delete a Wish List

  Scenario: The wishlists are listed and organized by date of creation, presenting the new ones first.
    Given an authenticated app user
    And I have at least one wishlist
    When I want to delete it
    Then it should not longer apear on the wishlist list
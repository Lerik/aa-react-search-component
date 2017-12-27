Feature: Wishlist - Delete Wishlist

  Scenario: When I tap delete in the card of the list menu, I can delete the wishlist.
    Given an authenticated app user
    And I have at least one wishlist
    When I want to delete it
    Then it should not longer apear on the wishlist list
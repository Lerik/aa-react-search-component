Feature: Wishlist - Edit Wishlist

  Scenario: When I tap edit in the card of the list menu, I can edit the wishlist.
    Given an authenticated app user
    And I have at least one wishlist
    When I want edit the name of the wishlist
    Then I the user should be able to Edit the name of the WishList

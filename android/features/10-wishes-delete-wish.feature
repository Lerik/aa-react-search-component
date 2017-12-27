Feature: Wishes - Delete Wish

  Scenario: When I tap delete in the card of the wish menu, I can delete the wish.
    Given an authenticated app user
    And I have at least one wishlist
    And I have at least one wish
    When I delete it
    Then it should not longer appear on the wishes list

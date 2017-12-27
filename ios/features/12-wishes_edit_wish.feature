Feature: Wishes - edit a wish

  Scenario: When I tap edit in the card of a wish, I can edit the wish.
    Given an authenticated app user
    And I have at least one wishlist
    And I have at least one wish
    When the app user wants to edit the wish
    Then he can make changes to the wish

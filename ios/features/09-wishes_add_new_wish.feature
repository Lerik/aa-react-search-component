Feature: Wishes - add new wish

  Scenario: When I tap delete in the card of the list menu, I can delete the wishlist.
    Given an authenticated app user
    And who wants to create a new wish
    When the user added a name
    Then the user should able to add the wish successfully.

Feature: Wishlist - Add Wish List

  Scenario: The wishlists are listed and organized by date of creation, presenting the new ones first.
    Given someone who wants to add a new wishlist
    When attempting to give the name of the list
    And provides all the required information
    Then I should be able to pass to the next step.

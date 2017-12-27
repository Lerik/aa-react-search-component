And /^I have at least one wishlist$/ do ||
  wait_for_element_exists("* marked:'wishlist-view'", timeout: 10)
end

When /^I want to delete it$/ do ||
  wait_for_element_exists("* marked:'dotMenuWishList'", timeout: 10)
  tap_mark("dotMenuWishList")
  
  wait_for_element_exists("* marked:'dotMenuWishListDelete'", timeout: 10)
  tap_mark("dotMenuWishListDelete")

  wait_for_element_exists("* marked:'confirmModalButton1'", timeout: 10)
  tap_mark("confirmModalButton1")
end


Then /^it should not longer apear on the wishlist list$/ do ||
  wait_for_element_does_not_exist("* marked:'wishlist-view'", timeout: 10)
end

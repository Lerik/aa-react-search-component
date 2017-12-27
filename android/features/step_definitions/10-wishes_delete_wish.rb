include ::Calabash::Android::Gestures

When /^I delete it$/ do ||
  sleep(1)
  wait_for_element_exists("* marked:'dotMenuWishList'", timeout: 10)

  touch("* marked:'dotMenuWishList'", :offset => {:x => 10, :y => 205})

  wait_for_element_exists("* marked:'dotMenuWishListDelete'", timeout: 10)
  tap_mark("dotMenuWishListDelete")

  wait_for_element_exists("* marked:'confirmModalButton1'", timeout: 10)
  tap_mark("confirmModalButton1")
end

Then /^it should not longer appear on the wishes list$/ do ||
  wait_for_element_exists("* marked:'Add Gift'", timeout: 10)
end

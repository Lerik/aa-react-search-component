When /^I want edit the name of the wishlist$/ do ||
  wait_for_element_exists("* marked:'dotMenuWishList'", timeout: 10)
  tap_mark("dotMenuWishList")

  wait_for_element_exists("* marked:'dotMenuWishListEdit'", timeout: 10)
  tap_mark("dotMenuWishListEdit")
end

Then /^I the user should be able to Edit the name of the WishList$/ do ||
  sleep(1)

  wait_for_element_exists("* marked:'WishListName'", timeout: 10)
  enter_text("android.widget.EditText marked:'WishListName'", ' edited')
  hide_soft_keyboard

  wait_for_element_exists("* marked:'Create'", timeout: 10)
  tap_mark("Create")

  wait_for_element_exists("* marked:'Fake WishList #1 edited'", timeout: 10)
end

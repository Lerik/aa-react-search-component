include ::Calabash::Android::Gestures

When /^the app user wants to edit the wish$/ do ||
  sleep(1)
  wait_for_element_exists("* marked:'dotMenuWishList'", timeout: 10)

  touch("* marked:'dotMenuWishList'", :offset => {:x => 10, :y => 205})

  wait_for_element_exists("* marked:'dotMenuWishListEdit'", timeout: 10)
  tap_mark("dotMenuWishListEdit")
end

Then /^he can make changes to the wish$/ do ||
  sleep(1)
  wait_for_element_exists("* marked:'giftName'", timeout: 10)
  enter_text("android.widget.EditText marked:'giftName'", ' Edited')
  hide_soft_keyboard

  wait_for_element_exists("* marked:'Add Gift'", timeout: 10)
  tap_mark("Add Gift")

  wait_for_element_exists("* marked:'Add New Gift'", timeout: 10)
end

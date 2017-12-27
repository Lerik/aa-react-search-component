And /^who wants to create a new wish$/ do ||
  wait_for_element_exists("* marked:'wishlist-view'", timeout: 10)

  wait_for_element_exists("* marked:'Fake WishList #1'", timeout: 10)
  tap_mark("Fake WishList #1")

  wait_for_element_exists("* marked:'Add New Gift'", timeout: 10)
  tap_mark("Add New Gift")
end

When /^the user added a name$/ do ||
  wait_for_element_exists("* marked:'giftName'", timeout: 10)
  enter_text("android.widget.EditText marked:'giftName'", 'Gift Name')
  hide_soft_keyboard

  wait_for_element_exists("* marked:'Add Gift'", timeout: 10)
  tap_mark("Add Gift")
end


Then /^the user should able to add the wish successfully.$/ do ||
  wait_for_element_exists("* marked:'Add New Gift'", timeout: 10)
end

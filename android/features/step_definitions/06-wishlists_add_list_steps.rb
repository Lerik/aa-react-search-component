Given /^someone who wants to add a new wishlist$/ do ||
  wait_for_element_exists("* marked:'PhoneNumber'", timeout: 10)
  wait_for_text('15555215554', timeout: 10)
  tap_mark("Continue")

  wait_for_element_exists("* marked:'Hello, my name is'", timeout: 10)

  wait_for_element_exists("* marked:'UserName'", timeout: 10)
  enter_text("android.widget.EditText marked:'UserName'", 'User Name')
  hide_soft_keyboard

  wait_for_element_exists("* marked:'Continue to My Lists'", timeout: 10)
  tap_mark("Continue to My Lists")

  wait_for_element_exists("* marked:'Add List'", timeout: 10)
  tap_mark("Add List")
end

When /^attempting to give the name of the list$/ do ||
  wait_for_element_exists("* marked:'WishListName'", timeout: 10)
  enter_text("android.widget.EditText marked:'WishListName'", 'Wish List 1')
  hide_soft_keyboard

  wait_for_element_exists("* marked:'Create'", timeout: 10)
  tap_mark("Create")

  wait_for_element_exists("* marked:'Wish List 1'", timeout: 10)
end

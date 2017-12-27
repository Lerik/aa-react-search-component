require 'calabash-android/calabash_steps'

When /^provides a name that is 2 characters long$/ do ||
  wait_for_element_exists("* marked:'PhoneNumber'", timeout: 10)
  wait_for_text('15555215554', timeout: 10)
  tap_mark("Continue")

  wait_for_element_exists("* marked:'Hello, my name is'", timeout: 10)

  wait_for_element_exists("* marked:'UserName'", timeout: 10)
  enter_text("android.widget.EditText marked:'UserName'", 'User Name')
  hide_soft_keyboard

  wait_for_element_exists("* marked:'Continue to My Lists'", timeout: 10)
  tap_mark("Continue to My Lists")
  wait_for_element_exists("* marked:'wishlists-listview'", timeout: 10)
end

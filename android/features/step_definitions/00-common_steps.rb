require 'calabash-android/calabash_steps'

Given /^a guy with a cell phone$/ do ||
end

Given /^someone who wants to sign up for an account$/ do ||
end

And /^who has opened the app$/ do ||
end

Then /^I should be able to pass to the next step.$/ do ||
end

Given /^an authenticated app user$/ do ||
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

And /^provides all the required information$/ do ||
end

require 'calabash-android/calabash_steps'

When /^attempting to give my account information$/ do ||
  wait_for_element_exists("* marked:'PhoneNumber'", timeout: 10)

  wait_for_text('15555215554', timeout: 10)
  tap_mark("Continue")
  wait_for_element_exists("* marked:'UserName'", timeout: 10)
end


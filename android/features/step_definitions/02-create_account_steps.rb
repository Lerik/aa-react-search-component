require 'calabash-android/calabash_steps'

When /^start trying to sign up$/ do ||
  wait_for_element_exists("* marked:'TermsAndConditions'", timeout: 10)
  tap_mark("TermsAndConditions", timeout: 10)
end

Then /^the New user should be only able to add phone number and accept terms and conditions$/ do ||
  wait_for_text_to_disappear('Continue', timeout: 10)
end

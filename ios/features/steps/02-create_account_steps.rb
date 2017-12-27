When /^start trying to sign up$/ do ||
  query = "* marked:'TermsAndConditions'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }
  touch(query)
end

Then /^the New user should be only able to add phone number and accept terms and conditions$/ do ||
  until !element_exists("view text:'Continue'")
    screenshot_and_raise "Element found with mark or text: Continue and expected to navigate outside the app"
  end

  sleep(10)
end

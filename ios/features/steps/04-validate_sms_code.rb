Given /^user has given a correct us phone number$/ do ||
  wait_for do
    !query("*").empty?
  end

  sleep(STEP_PAUSE)

  query = "* marked:'PhoneNumber'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }      

  touch("* marked: 'PhoneNumber'")
  wait_for_keyboard({:timeout => 5})
  keyboard_enter_text '7803712572'
  sleep(STEP_PAUSE)

  query = "* marked: 'Continue'" 
  touch(query)

  sleep(STEP_PAUSE)
end

And /^app sends an sms code to that phone number$/ do ||
    query = "* marked:'Enter the Verification Code we have'"
    wait_for(WAIT_TIMEOUT) { element_exists(query) }  
end

When /^attempting to give the sent sms code$/ do ||
    wait_for do
        !query("*").empty?
    end

    sleep(STEP_PAUSE)

    query = "* marked:'VerificationCode'"
    wait_for(WAIT_TIMEOUT) { element_exists(query) }      

    touch("* marked: 'VerificationCode'")
    wait_for_keyboard({:timeout => 5})
    keyboard_enter_text '1234'
    sleep(STEP_PAUSE)

    query = "* marked: 'Verify'" 
    wait_for(WAIT_TIMEOUT) { element_exists(query) }  
    touch(query)
end

Then /^the app sends user to add name page\.$/ do ||
    query = "* marked:'Hello, my name is'"
    wait_for(WAIT_TIMEOUT) { element_exists(query) }  
end

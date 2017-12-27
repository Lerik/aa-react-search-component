When /^attempting to give my account information$/ do ||
  query = "* marked:'PhoneNumber'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }      

  touch("* marked: 'PhoneNumber'")
  wait_for_keyboard({:timeout => 5})
  keyboard_enter_text '7803712572'
  sleep(STEP_PAUSE)

  query = "* marked: 'Continue'" 
  touch(query)

  query = "* marked:'Enter the Verification Code we have'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }   
end

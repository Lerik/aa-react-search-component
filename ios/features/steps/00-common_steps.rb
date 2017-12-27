WAIT_TIMEOUT = (ENV['WAIT_TIMEOUT'] || 30).to_f
STEP_PAUSE = (ENV['STEP_PAUSE'] || 0.5).to_f

Given /^a guy with a cell phone$/ do ||
  wait_for do
    !query("*").empty?
  end
end

Given /^someone who wants to sign up for an account$/ do ||
  wait_for do
    !query("*").empty?
  end
end

And /^who has opened the app$/ do ||
end

Then /^I should be able to pass to the next step.$/ do ||
end

Given /^an authenticated app user$/ do ||
  wait_for do
    !query("*").empty?
  end

  query = "* marked:'PhoneNumber'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }  
    
  touch("* marked: 'PhoneNumber'")
  wait_for_keyboard({:timeout => 0.5})

  keyboard_enter_text '15555215554'
  sleep(STEP_PAUSE)

  query = "* marked: 'Continue'" 
  touch(query)       

  query = "* marked:'Hello, my name is'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }         

  query = "* marked:'UserName'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }   
  touch(query)

  wait_for_keyboard({:timeout => 0.5})
  keyboard_enter_text 'User Name'
  sleep(STEP_PAUSE)
  tap_keyboard_action_key

  query = "* marked: 'Continue to My Lists'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }  
  touch(query)

end

And /^provides all the required information$/ do ||
end

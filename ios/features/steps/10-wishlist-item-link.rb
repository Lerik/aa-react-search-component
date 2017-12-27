And /^I have at least one wish$/ do ||
  query = "* marked:'Fake WishList #1'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }    
  touch(query)  

  query = "* marked:'Add New Gift'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }    
  touch(query)  

  sleep(1)

  query = "* marked:'giftName'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }  
    
  touch(query)
  wait_for_keyboard({:timeout => 0.5})

  keyboard_enter_text 'Gift Name'
  sleep(STEP_PAUSE)
  tap_keyboard_action_key

  query = "* marked:'giftLink'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }  
    
  touch(query)
  wait_for_keyboard({:timeout => 0.5})

  keyboard_enter_text 'http://www.myawesomegift.com'
  sleep(STEP_PAUSE)
  tap_keyboard_action_key

  query = "* marked:'Add Gift'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }    
  touch(query)
end

And /^I want to see more information about the wish$/ do ||
end

When /^I want to access the link$/ do ||
  query = "* marked:'wishlink'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }   
  touch(query)   
end

Then /^I should be able to access it$/ do ||
  query = "* marked:'Add new gift'"
  wait_for(WAIT_TIMEOUT) { !element_exists(query) }  
end

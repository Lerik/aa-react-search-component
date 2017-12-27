Given /^someone who wants to add a new wishlist$/ do ||
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

  query = "* marked:'Add List'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }    
  touch(query)
end

When /^attempting to give the name of the list$/ do ||
  query = "* marked:'WishListName'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }    
  touch(query)

  wait_for_keyboard({:timeout => 0.5})
  keyboard_enter_text 'Wish List 1'  
  sleep(STEP_PAUSE)
  tap_keyboard_action_key

  query = "* marked:'Create'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }    
  touch(query)

  query = "* marked:'Wish List 1'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) } 
end

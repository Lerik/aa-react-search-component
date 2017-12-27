And /^who wants to create a new wish$/ do ||
  query = "* marked:'wishlist-view'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }    

  query = "* marked:'Fake WishList #1'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }    
  touch(query)    

  query = "* marked:'Add New Gift'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }    
  touch(query)
end

When /^the user added a name$/ do ||
  query = "* marked:'giftName'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }  
    
  touch(query)
  wait_for_keyboard({:timeout => 0.5})

  keyboard_enter_text 'Gift Name'
  sleep(STEP_PAUSE)

  query = "* marked:'Add Gift'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }    
  touch(query)  
end


Then /^the user should able to add the wish successfully.$/ do ||
  query = "* marked:'Add New Gift'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }   
end

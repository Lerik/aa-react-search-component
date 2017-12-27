When /^the app user wants to edit the wish$/ do ||
  sleep(1)
  query = "* marked:'dotMenuWishList'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }    
  touch(nil, :offset => {:x => 305, :y => 195})   
  sleep(1)
  touch(nil, :offset => {:x => 250, :y => 200})
end

Then /^he can make changes to the wish$/ do ||
  sleep(1)
  query = "* marked:'giftName'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }  
    
  touch(query)
  wait_for_keyboard({:timeout => 0.5})

  keyboard_enter_text ' Edited'
  sleep(STEP_PAUSE)

  query = "* marked:'Add Gift'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }    
  touch(query) 

  query = "* marked:'Add New Gift'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }   
end

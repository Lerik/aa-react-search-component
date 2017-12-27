When /^I delete it$/ do ||  
  # touch coordinates work with iphone 7 only
  # device simulator window scale at 50%

  sleep(1)
  query = "* marked:'dotMenuWishList'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }    
  touch(nil, :offset => {:x => 305, :y => 195})   
  sleep(1)
  touch(nil, :offset => {:x => 250, :y => 230})

  query = "* marked:'confirmModalButton1'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }    
  touch(query)
end

Then /^it should not longer appear on the wishes list$/ do ||
  query = "* marked:'Add Gift'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }     
end

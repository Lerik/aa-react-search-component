And /^I have at least one wishlist$/ do ||
  query = "* marked:'wishlist-view'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }       
end

When /^I want to delete it$/ do ||
  query = "* marked:'dotMenuWishList'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }    
  touch(query)    

  sleep(STEP_PAUSE)

  query = "* marked:'wishList-image'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }  
  touch(query, :offset => {:x => 80, :y => 0})   

  sleep(STEP_PAUSE)
  
  query = "* marked:'confirmModalButton1'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) } 
  touch(query)
end


Then /^it should not longer apear on the wishlist list$/ do ||
  query = "* marked:'wishlist-view'"
  wait_for(WAIT_TIMEOUT) { !element_exists(query) }
end

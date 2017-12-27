When /^I want edit the name of the wishlist$/ do ||
  query = "* marked:'dotMenuWishList'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }    
  touch(query)    

  sleep(STEP_PAUSE)

  query = "* marked:'wishList-image'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }  
  touch(query, :offset => {:x => 80, :y => -50})  
end

Then /^I the user should be able to Edit the name of the WishList$/ do ||
  sleep(1)

  query = "* marked:'WishListName'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }    
  touch(query)

  wait_for_keyboard({:timeout => 0.5})
  keyboard_enter_text ' edited'  
  sleep(STEP_PAUSE)
  tap_keyboard_action_key

  query = "* marked:'Create'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }    
  touch(query)

  query = "* marked:'Fake WishList #1 edited'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }   
end

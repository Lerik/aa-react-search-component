When /^the user decides to share the Wishlist$/ do ||
  sleep(1)
  query = "* marked:'shareList'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }    
  touch(query)

  query = "* marked:'copyToClipboard'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }    
  touch(query)
end

Then /^the user should be able to share to everyone the access to the wishlist$/ do ||
  sleep(1)
  query = "* marked:'Copied!'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }     
end

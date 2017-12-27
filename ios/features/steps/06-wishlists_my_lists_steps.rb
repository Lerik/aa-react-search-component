And /^I have 5 wishlists$/ do ||
end

When /^try to get a list of my wishlists$/ do ||
  query = "* marked:'wishlists-listview'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) } 
end

Then /^it should have all 5 wishlists$/ do ||
  query = "* marked:'wishlist-view'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) } 
end

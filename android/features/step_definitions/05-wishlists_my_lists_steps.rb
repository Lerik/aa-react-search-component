And /^I have 5 wishlists$/ do ||
end

When /^try to get a list of my wishlists$/ do ||
  check_element_exists("* marked:'wishlists-listview'")
end

Then /^it should have all 5 wishlists$/ do ||
  check_element_exists("* marked:'wishlist-view'")
end

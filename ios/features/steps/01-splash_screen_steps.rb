When /^the guy has waited for 2 seconds$/ do ||
  sleep(2)
end

And /^the home screen appears$/ do ||
end

Then /^the guy can use the app$/ do ||
  query = "* marked:'PhoneNumber'"
  wait_for(WAIT_TIMEOUT) { element_exists(query) }
end

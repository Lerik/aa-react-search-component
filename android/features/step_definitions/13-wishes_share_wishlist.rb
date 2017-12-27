include ::Calabash::Android::Gestures

When /^the user decides to share the Wishlist$/ do ||
  sleep(1)
  wait_for_element_exists("* marked:'shareList'", timeout: 10)
  tap_mark("shareList")

  wait_for_element_exists("* marked:'copyToClipboard'", timeout: 10)
  tap_mark("copyToClipboard")
end

Then /^the user should be able to share to everyone the access to the wishlist$/ do ||
  sleep(1)
  wait_for_text('Copied!', timeout: 10)
end

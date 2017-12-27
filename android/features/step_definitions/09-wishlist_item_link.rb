include ::Calabash::Android::Gestures

And /^I have at least one wish$/ do ||
  wait_for_element_exists("* marked:'Fake WishList #1'", timeout: 10)
  tap_mark("Fake WishList #1")

  wait_for_element_exists("* marked:'Add New Gift'", timeout: 10)
  tap_mark("Add New Gift")

  wait_for_element_exists("* marked:'giftName'", timeout: 10)
  enter_text("android.widget.EditText marked:'giftName'", 'Gift Name')
  hide_soft_keyboard

  wait_for_element_exists("* marked:'giftLink'", timeout: 10)
  enter_text("android.widget.EditText marked:'giftLink'", 'http://www.myawesomegift.com')
  hide_soft_keyboard

  wait_for_element_exists("* marked:'Add Gift'", timeout: 10)
  tap_mark("Add Gift")
end

And /^I want to see more information about the wish$/ do ||
end

When /^I want to access the link$/ do ||
  sleep(1)
  wait_for_element_exists("* marked:'wishlink'")
  touch("* marked:'wishlink'", :offset => {:x => 10, :y => 25})
end

Then /^I should be able to access it$/ do ||
  wait_for_text_to_disappear('Add new gift', timeout: 10)
end

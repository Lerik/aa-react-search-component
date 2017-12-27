require 'calabash-android/calabash_steps'

When /^the guy has waited for 2 seconds$/ do ||
  wait_for_element_exists("android.widget.ImageView marked:'splashScreenImage'", timeout: 10)
end

And /^the home screen appears$/ do ||
  wait_for_text('Continue', timeout: 10)
end

Then /^the guy can use the app$/ do ||
end

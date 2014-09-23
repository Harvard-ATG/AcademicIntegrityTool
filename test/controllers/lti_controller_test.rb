require 'test_helper'

class LtiControllerTest < ActionController::TestCase
  test "should get launch" do
    get :launch
    assert_response :success
  end

end

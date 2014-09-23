require 'test_helper'

class PolicyTemplatesControllerTest < ActionController::TestCase
  setup do
    @policy_template = policy_templates(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:policy_templates)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create policy_template" do
    assert_difference('PolicyTemplate.count') do
      post :create, policy_template: { body: @policy_template.body, is_active: @policy_template.is_active, name: @policy_template.name }
    end

    assert_redirected_to policy_template_path(assigns(:policy_template))
  end

  test "should show policy_template" do
    get :show, id: @policy_template
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @policy_template
    assert_response :success
  end

  test "should update policy_template" do
    patch :update, id: @policy_template, policy_template: { body: @policy_template.body, is_active: @policy_template.is_active, name: @policy_template.name }
    assert_redirected_to policy_template_path(assigns(:policy_template))
  end

  test "should destroy policy_template" do
    assert_difference('PolicyTemplate.count', -1) do
      delete :destroy, id: @policy_template
    end

    assert_redirected_to policy_templates_path
  end
end

require "test_helper"

class SubtaskingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @subtasking = subtaskings(:one)
  end

  test "should get index" do
    get subtaskings_url
    assert_response :success
  end

  test "should get new" do
    get new_subtasking_url
    assert_response :success
  end

  test "should create subtasking" do
    assert_difference('Subtasking.count') do
      post subtaskings_url, params: { subtasking: {  } }
    end

    assert_redirected_to subtasking_url(Subtasking.last)
  end

  test "should show subtasking" do
    get subtasking_url(@subtasking)
    assert_response :success
  end

  test "should get edit" do
    get edit_subtasking_url(@subtasking)
    assert_response :success
  end

  test "should update subtasking" do
    patch subtasking_url(@subtasking), params: { subtasking: {  } }
    assert_redirected_to subtasking_url(@subtasking)
  end

  test "should destroy subtasking" do
    assert_difference('Subtasking.count', -1) do
      delete subtasking_url(@subtasking)
    end

    assert_redirected_to subtaskings_url
  end
end

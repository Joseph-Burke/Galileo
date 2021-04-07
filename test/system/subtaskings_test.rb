require "application_system_test_case"

class SubtaskingsTest < ApplicationSystemTestCase
  setup do
    @subtasking = subtaskings(:one)
  end

  test "visiting the index" do
    visit subtaskings_url
    assert_selector "h1", text: "Subtaskings"
  end

  test "creating a Subtasking" do
    visit subtaskings_url
    click_on "New Subtasking"

    click_on "Create Subtasking"

    assert_text "Subtasking was successfully created"
    click_on "Back"
  end

  test "updating a Subtasking" do
    visit subtaskings_url
    click_on "Edit", match: :first

    click_on "Update Subtasking"

    assert_text "Subtasking was successfully updated"
    click_on "Back"
  end

  test "destroying a Subtasking" do
    visit subtaskings_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Subtasking was successfully destroyed"
  end
end

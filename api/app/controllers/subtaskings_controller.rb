class SubtaskingsController < ApplicationController
  before_action :set_subtasking, only: %i[show update destroy]

  # GET /subtaskings
  def index
    @subtaskings = Subtasking.all
    render json: @subtaskings
  end

  # GET /subtaskings/1
  def show
    render json: @subtasking
  end

  # POST /subtaskings
  def create
    @subtasking = Subtasking.new(subtasking_params)

    if @subtasking.save
      render json: @subtasking, status: :created, location: @subtasking
    else
      render json: @subtasking.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /subtaskings/1
  def update
    if @subtasking.update(subtasking_params)
      render json: @subtasking
    else
      render json: @subtasking.errors, status: :unprocessable_entity
    end
  end

  # DELETE /subtaskings/1
  def destroy
    @subtasking.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_subtasking
      @subtasking = Subtasking.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def subtasking_params
      params.require(:subtasking).permit(:subtask_id, :supertask_id)
    end

end

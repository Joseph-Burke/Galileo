class SubtaskingsController < ApplicationController
  before_action :set_subtasking, only: %i[ show edit update destroy ]

  # GET /subtaskings or /subtaskings.json
  def index
    @subtaskings = Subtasking.all
  end

  # GET /subtaskings/1 or /subtaskings/1.json
  def show
  end

  # GET /subtaskings/new
  def new
    @subtasking = Subtasking.new
  end

  # GET /subtaskings/1/edit
  def edit
  end

  # POST /subtaskings or /subtaskings.json
  def create
    @subtasking = Subtasking.new(subtasking_params)

    respond_to do |format|
      if @subtasking.save
        format.html { redirect_to @subtasking, notice: "Subtasking was successfully created." }
        format.json { render :show, status: :created, location: @subtasking }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @subtasking.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /subtaskings/1 or /subtaskings/1.json
  def update
    respond_to do |format|
      if @subtasking.update(subtasking_params)
        format.html { redirect_to @subtasking, notice: "Subtasking was successfully updated." }
        format.json { render :show, status: :ok, location: @subtasking }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @subtasking.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /subtaskings/1 or /subtaskings/1.json
  def destroy
    @subtasking.destroy
    respond_to do |format|
      format.html { redirect_to subtaskings_url, notice: "Subtasking was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_subtasking
      @subtasking = Subtasking.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def subtasking_params
      params.fetch(:subtasking, {})
    end
end

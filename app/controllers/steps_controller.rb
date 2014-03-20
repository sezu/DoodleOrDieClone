class StepsController < ApplicationController
  def index
    #show all the steps in a room for a particular user
    #possibly better to just get all of a users steps at once for every room
    @room = Room.find(params[:room_id])
    @steps = @room.steps.where(:user_id => current_user.id)

    render json: @steps
  end

  def create
    @step = Step.new(step_params)
    @step.user_id = current_user.id
    @step.chain_id = params[:chain_id]

    #add some kind of presence check for either desc/url

    if @step.save
      render json: @step
      #needs to go to next thing to play, gotta figure out how this will work
    else
      render json: { errors: @step.errors.full_messages }, status: 422
    end
  end

  def destroy
    @step = Step.find(params[:id])
    @step.destroy
    render json: nil
  end

  private

  def step_params
    params.require(:step).permit(:description, :url)
  end
end

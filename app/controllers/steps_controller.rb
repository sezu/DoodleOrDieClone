class StepsController < ApplicationController
  def fetch_next_step
    #grab a random valid step
    @room = Room.find(params[:room_id])
    @valid_chain = @room.chains.where(:is_completed => false, :is_assigned => false).sample

    if @valid_chain
      #@valid_chain.update_attributes(:is_assigned => true)
      render json: @valid_chain.steps.last
    else
      #create a new chain? or something?
      render json: { errors: "kwrgwojhfwfoh" }, status: 404
    end
  end

  def create
    @step = Step.new(step_params)
    @step.user_id = current_user.id

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
    params.require(:step).permit(:description, :image, :chain_id)
  end
end

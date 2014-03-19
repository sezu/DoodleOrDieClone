class StepsController < ApplicationController
  def index
    #possibly use to play
    #show all past user steps (pics only)
    #get next chain to play on, user might need a current chain id.
    #assign new chain id if chain doesn't exist/on skip
    #display last step from that chain
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

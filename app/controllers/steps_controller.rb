class StepsController < ApplicationController
  def fetch_next_step
    #grab a random valid step
    @room = Room.find(params[:room_id])
    @valid_chain = @room.find_valid_chain(current_user.id).sample

    if @valid_chain
      @valid_chain.update_attributes(:is_assigned => true)
      render json: @valid_chain.steps.last
    else
      render json: { errors: "No valid chain found, start new chain!" }, status: 404
    end
  end

  def skip
    @chain = Step.find(params[:id]).chain
    @chain.skip_counter += 1
    @chain.is_completed = true if @chain.skip_counter > 10
    @chain.is_assigned = false

    if @chain.save
      #create doNotPlay association between user/chain
      DoNotPlay.create!(:user_id => current_user.id, :chain_id => @chain.id)

      render json: @chain
    else
      render json: { errors: @chain.errors.full_messages }, status: 422
    end
  end

  def create
    debugger
    @step = Step.new(step_params)
    @step.user_id = current_user.id

    if @step.save
      #update chain
      if @step.rank > 17
        @step.chain.update_attributes(:is_completed => true)
      else
        @step.chain.update_attributes(:is_assigned => false, :skip_counter => 0)
      end

      #create doNotPlay association between user/chain
      DoNotPlay.create!(:user_id => current_user.id, :chain_id => @step.chain.id)

      render json: @step
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
    params.require(:step).permit(:description, :image, :chain_id, :rank)
  end
end

class TimelinesController < ApplicationController
  def show
    @room = Room.find(params[:room_id])
    @timeline = current_user.steps_for_room(@room).where("description IS NULL")
  end

  def create
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

  private

  def step_params
    params.require(:timeline).permit(:description, :image, :chain_id, :rank, :aws_image)
  end
end


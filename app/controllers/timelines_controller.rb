class TimelinesController < ApplicationController
  def show
    @room = Room.find(params[:room_id])
    @timeline = current_user.steps_for_room(@room)

    render json: @timeline
  end
end


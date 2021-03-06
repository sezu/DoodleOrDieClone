class RoomsController < ApplicationController
  def index
    #returns all rooms
    @rooms = Room.all
    render json: @rooms
  end

  def show
    index = params[:index] || 0
    
    @room = Room.find(params[:id])
    @chains = @room.chains.includes(:steps)
              .order(:updated_at)
              .reverse
              .reject{ |chain| chain.steps.count < 3 }
  end

  def create
    @room = Room.new(room_params)

    if @room.save
      render json: @room
    else
      render json: { errors: @room.errors.full_messages }, status: 422
    end
  end

  def update
    @room = Room.find(params[:id])

    if @room.update_attributes(room_params)
      render json: @room
    else
      render json: { errors: @room.errors.full_messages }, status: 422
    end
  end

  def destroy
    @room = Room.find(params[:id])
    @room.destroy
    render json: nil
  end

  private

  def room_params
    params.require(:room).permit(:name, :description, :is_public)
  end
end

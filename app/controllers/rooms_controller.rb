class RoomsController < ApplicationController
  def index
    #returns all rooms
    @rooms = Room.all
    render json: @rooms
  end

  def show
    #gets all chains for particular room
    #return last few steps for each particular chain and room
    @room = Room.find(params[:id])
    render json: @room
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

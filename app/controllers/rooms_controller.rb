class RoomsController < ApplicationController
  def index
    #returns all rooms
    @rooms = Room.all
    render json: @rooms
  end

  def show
    #returns room -> chains -> steps
    @room = Room.find(params[:id])
    @chains = @room.chains
    @steps = {}

    p "START!"
    timer = Time.now
    #using cache instead of doing this!!!!!
    # @chains.each do |chain|
    #   @steps[chain.id] = chain.steps
    # end

    @chains.each do |chain|
      @steps[chain.id] = chain.steps[-3..-1]
    end

    p "END"
    p Time.now - timer
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

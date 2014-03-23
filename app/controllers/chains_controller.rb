class ChainsController < ApplicationController

  def show
    #return chain and chain steps
    @chain = Chain.find(params[:id])
    @steps = @chain.steps
  end

  def create
    @chain = Chain.new(room_id: params[:room_id])
    @chain.steps.build(:image => params[:image], :description => params[:description],
                       :user_id => current_user.id)

    if @chain.save
      render json: @chain
    else
      render json: { errors: @chain.errors.full_messages }, status: 422
    end
  end

  def update
    @chain = Chain.find(params[:id])
    @chain.skip_counter += 1
    @chain.is_compelted = true if @chain.skip_counter > 5


    if @chain.update_attributes(room_params)
      render json: @chain
    else
      render json: { errors: @chain.errors.full_messages }, status: 422
    end
  end

  def destroy
    @chain = Chain.find(params[:id])
    @chain.destroy
    render json: nil
  end

end

class ChainsController < ApplicationController
  def index
    #find all chains / specially selected chains
    #return last few steps for each chain (helper?)
    @chains = Chain.all
    render json: @chains
  end

  def show
    #return all steps for specific chain
    @chain = Chain.find(params[:id])
    @steps = @chain.steps
    render json: @steps
  end

  def create
    @chain = Chain.new(params[:room_id])

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

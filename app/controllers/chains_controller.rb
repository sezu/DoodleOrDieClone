class ChainsController < ApplicationController

  def show
    #return chain and chain steps
    @chain = Chain.find(params[:id])
    @steps = @chain.steps
  end

  def create
    @chain = Chain.new(room_id: params[:room_id])
    @chain.steps.build(
      :image => params[:image],
      :description => params[:description],
      :user_id => current_user.id,
      :rank => params[:rank]
    )

    if @chain.save
      render json: @chain

      #create doNotPlay association between user/chain
      DoNotPlay.create!(:user_id => current_user.id, :chain_id => @chain.id)
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

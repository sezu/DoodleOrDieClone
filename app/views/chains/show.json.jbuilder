json.(@chain, :room_id, :is_completed)
  json.steps @steps do |step|
    json.(step, :id, :chain_id, :description, :image, :created_at, :user_id)
  end
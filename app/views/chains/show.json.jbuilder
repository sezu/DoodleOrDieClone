json.(@chain, :room_id, :is_completed)
  json.steps @steps do |step|
    json.(step, :id, :chain_id, :description, :url, :created_at, :user_id)
  end
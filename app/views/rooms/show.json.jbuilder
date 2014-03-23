json.(@room, :name, :description)
  json.chains @chains do |chain|
    json.(chain, :id, :steps)
  end
  json.user_steps @users_room_steps do |step|
    json.(step, :chain_id, :user_id, :description, :image)
  end
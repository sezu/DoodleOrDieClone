json.(@room, :name, :description)
  json.chains @chains do |chain|
    json.(chain, :id, :steps)
  end
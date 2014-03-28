json.(@room, :name, :description)
  json.chains @chains do |chain|
    json.(chain, :id)

    json.steps chain.steps do |step|
      json.(step, :id, :chain_id, :description, :created_at)
      json.image_url(step.aws_image.url(:preview))
    end
  end
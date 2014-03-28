json.(@step, :id, :chain_id, :created_at)
json.image_url(@step.aws_image.url(:timeline))

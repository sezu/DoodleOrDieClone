class DoNotPlay < ActiveRecord::Base
  belongs_to :user
  belongs_to :chain
end

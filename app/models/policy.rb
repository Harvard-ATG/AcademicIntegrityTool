class Policy < ActiveRecord::Base
	validates :body, :presence => true
end

class WelcomeController < ApplicationController
  def index

  	# Attempt to find a policy for this course (context). If a policy is found
  	# then show the policy.
  	@policy = Policy.find_by :context_id => session[:context_id]

  	if @policy
  		redirect_to @policy
  	end
  	
  end
end

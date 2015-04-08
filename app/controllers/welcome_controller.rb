class WelcomeController < ApplicationController
  
  # Old method that is probably defunt.
  def index

  	# Attempt to find a policy for this course (context). If a policy is found
  	# then show the policy.
  	#
  	# @@ Blow this puppy away, probably.
  	@policy = Policy.find_by :context_id => session[:context_id]

  	if @policy
  		redirect_to @policy
  	end
  	
  end
end

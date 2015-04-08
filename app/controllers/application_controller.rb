class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception


  # Require an LTI launch for most controllers and 
  # actions.
  before_action :require_lti_launch
  private

  # Checks to see if a session variable has been defined by the
  # LTI launch. If no session variable exists, then return an
  # error.
  def require_lti_launch
  	if !session[:lti_launch]
  		redirect_to lti_error_url, :alert => "This tool requires a valid LTI launch and session."
  	end
  end
end

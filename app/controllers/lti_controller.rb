
# Need to require this expicitly in order to create the request proxy object 
# required for the LTI library.

require 'oauth/request_proxy/rack_request'

class LtiController < ApplicationController
	
  # The following allows us to send a POST request to this controller
  # without Rails's verification key.
  skip_before_filter  :verify_authenticity_token
  
  # Skips the need for an LTI launch for several of this controller's
  # actions. The function 'require_lti_launch' is defined in 
  # ApplicationController.rb.
  skip_before_action :require_lti_launch

	# Informs the user that this is an LTI application, and requires LTI
	# authentication. This is also the root route of the application.
	def index
	end

  # Supplies the XML configuration file needed to add the tool
  # to Canvas.
  def configuration
    @host = request.host
    @port = request.port

    # Set the protocol to either 'http://' or what has been
    # defined in ':protocol' for the routes.rb file.
    @theProtocol = params[:theProtocol] ? params[:theProtocol] : "http://"

    # Hmmm. Have to explicitly declare this to render the .xml
    # file, which doesn't make too much sense to me. 
    render "lti/configuration.xml.erb"

  end

	# Attempts to launch the LTI request. If successful, then go to the
	# main page of the application
  	def launch
  		isLTILaunch = true;
  		errMsg      = "An LTI error occurred."

      # Grab our oauth consumer key and secret
      oauth_secret       = Global.oauth.oauth_secret
      oauth_consumer_key = params[:oauth_consumer_key]

      req  = OAuth::RequestProxy::RackRequest.new request
      provider = IMS::LTI::ToolProvider.new oauth_consumer_key, oauth_secret, params


      begin
        if !provider.valid_request? req, false
  		    
        end
      rescue Exception => e
        isLTILaunch = false
        errMsg = e.message
      end
      
      # Determine if the LTI launch is valid or not. 
  		# If not, then render the error page with a message.
  		if !isLTILaunch
  			flash.now[:alert] = "Invalid LTI launch: '#{errMsg}'"
  			render 'error'
 		  else

     		# We had a successful LTI launch. Wrap up some of the post
    		# parameters in a session variable	  
  		  # session[:context_id] = context_id = params[:context_id]
        # session[:course_id]  = course_id  = params[:custom_canvas_course_id]
        session[:context_id] = context_id = params[:custom_canvas_course_id]
        session[:uid]        = params[:custom_canvas_user_login_id]

        # Mike's lame attempt at security
        session[:lti_launch] = true

        # Determine if we are an instuctor
        if provider.instructor?
          session[:is_admin] = true
        else
          session[:is_admin] = false
        end

        # Uncomment the below line to test if we are a student.
        # session[:is_admin] = false;

  		  # Find the policy associated with this context_id
  		  @policy = Policy.find_by :context_id => context_id

  		  # If no policy, then go to the index page for policies. 
  		  # Otherwise, go to the show page for the policies.
  		  if @policy
          redirect_to @policy
        else
          redirect_to policies_url
        end
      end

  	end

  	# Renders a page with an error in it
  	def error
  	end

end
class PoliciesController < ApplicationController
 
  # TOODO: We should probably add a before_action that checks to 
  # determine if the user is an admin or not. Will add security.
  before_action :set_policy, only: [:show, :edit, :update, :destroy]

  
  # Shows the main page of the Academic Policy Wizard depending
  # on whether the user is an admin or a student.
  #
  # * If the user is an admin and no policy has been created,
  #   show the three templates to the admin.
  # * If the user is an admin and a policy has been created,
  #   show the edit screen to the admin.
  # * If the user is a student and a policy has not been 
  #   created/published, then show a message stating that 
  #   there is no policy. 
  # * If the user is a student and a policy has been
  #   created/published, display the policy.
  #
  # GET /policies
  # GET /policies.json
  def index

    # Attempt to find a policy for this context id. If one can
    # be found, show it. Otherwise, get the three policy
    # templates and display those along with instructions.
    @context_id = session[:context_id]
    @is_admin   = session[:is_admin]
    @policy = Policy.find_by :context_id => @context_id


    # If the user is an admin, then show the edit screen.
    if @policy && @is_admin
      render 'edit'

    else
      # Find the three policy templates, then render the form.
      @policy_01 = PolicyTemplate.find_by :id => 1
      @policy_02 = PolicyTemplate.find_by :id => 2
      @policy_03 = PolicyTemplate.find_by :id => 3
    end
  end

  # Shows an individual policy, but only if it is published.
  # GET /policies/1
  # GET /policies/1.json
  def show
    @is_admin = session[:is_admin]

    # Do not show policy if user is not an admin and the policy is not published.
    # In other words, students can't see unpublished policies.
    if !@is_admin && !@policy.is_published
      redirect_to policies_url
      return
    end
  end

  # Shows the 'new policy' screen to administrators, which may
  # include a chosen policy template.
  #
  # GET /policies/new
  def new

    # Create a new Policy object.
    @policy = Policy.new


    # If a template has been choosen, then grab the template and
    # set the body of the Policy object to the text of the template.
    if params[:custom]
      @policy_template = PolicyTemplate.find_by :id => params[:custom]
      @policy.body = @policy_template.body
    end
    # Render the form
  end

  # Default Rails procedure for displaying an 'edit policy' screen.
  # GET /policies/1/edit
  def edit
  end

  # Default Rails procedure for creating a new policy (unless)
  # a cancel button has been pressed. 
  #
  # POST /policies
  # POST /policies.json
  def create
    # If the cancel button is pressed, redirect back to the index page
    # of the policies controller. 
    #
    # @@Note: Should this be handled in the form link itself? 
    if params[:cancel] 
      redirect_to policies_url
      return
    end

    # Create a Policy object and set some standard data.
    @policy              = Policy.new
    @policy.body         = params[:policy][:body]
    @policy.published_by = session[:uid]
    @policy.context_id   = session[:context_id]

    # Determine if Policy is being published or not.
    if params[:publish]
      @policy.is_published = true
    else
      @policy.is_published = false;
    end

    # Determin if this is a custom policy, which really
    # doesn't make sense if we think about, because if no
    # custom parameter is passed, it becomes a template??
    #
    # @@NOTE: Horrible, horrible code logic. Redo.
    if params[:custom]
      @policy.policy_template_id = params[:custom]
    else 
      @policy.policy_template_id = 0
    end

    respond_to do |format|
      if @policy.save
        format.html { redirect_to @policy, notice: 'Policy was successfully created.' }
        format.json { render :show, status: :created, location: @policy }
      else
        format.html { render :new }
        format.json { render json: @policy.errors, status: :unprocessable_entity }
      end
    end
  end

  # Default Rails procedure for updating a policy (unless)
  # a cancel button has been pressed. 
  #
  # PATCH/PUT /policies/1
  # PATCH/PUT /policies/1.json
  def update
    # If the cancel button is pressed, redirect back to the index page
    # of the policies controller
    #
    # @@NOTE: Add to form, as opposed to in this log?
    if params[:cancel] 
      redirect_to @policy
      return
    end

    # Determine if we are publishing the policy.
    if params[:publish]
      @policy.is_published = true
    else
      @policy.is_published = false;
    end

    respond_to do |format|
      if @policy.update(policy_params)
        format.html { redirect_to @policy, notice: 'Policy was successfully updated.' }
        format.json { render :show, status: :ok, location: @policy }
      else
        format.html { render :edit }
        format.json { render json: @policy.errors, status: :unprocessable_entity }
      end
    end
  end
  
  # Default Rails procedure for removing a policy. 
  #
  # DELETE /policies/1
  # DELETE /policies/1.json
  def destroy
    @policy.destroy
    respond_to do |format|
      format.html { redirect_to policies_url, notice: 'Policy was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_policy
      @policy = Policy.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def policy_params
      params.require(:policy).permit(:context_id, :policy_template_id, :is_published, :published_by, :body)
    end
end

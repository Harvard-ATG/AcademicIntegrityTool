class PoliciesController < ApplicationController
  before_action :set_policy, only: [:show, :edit, :update, :destroy]

  # GET /policies
  # GET /policies.json
  def index

    # Attempt to find a policy for this context id. If one can
    # be found, show it. Otherwise, get the three policy
    # templates and display those along with instructions.
    @context_id = session[:context_id]
    @is_admin   = session[:is_admin]
    @policy = Policy.find_by :context_id => @context_id


    if @policy && @is_admin
      render 'edit'

    else
      # Find the three policy templates, then render the form.
      @policy_01 = PolicyTemplate.find_by :id => 1
      @policy_02 = PolicyTemplate.find_by :id => 2
      @policy_03 = PolicyTemplate.find_by :id => 3
    end
  end

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

  # GET /policies/1/edit
  def edit
  end

  # POST /policies
  # POST /policies.json
  def create

    # If the cancel button is pressed, redirect back to the index page
    # of the policies controller
    if params[:cancel] 
      redirect_to policies_url
      return
    end


    @policy              = Policy.new
    @policy.body         = params[:policy][:body]
    @policy.published_by = session[:uid]
    @policy.context_id   = session[:context_id]

    if params[:publish]
      @policy.is_published = true
    else
      @policy.is_published = false;
    end

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

  # PATCH/PUT /policies/1
  # PATCH/PUT /policies/1.json
  def update
    # If the cancel button is pressed, redirect back to the index page
    # of the policies controller
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

class PolicyTemplatesController < ApplicationController
  before_action :set_policy_template, only: [:show, :edit, :update, :destroy]

  # Uncomment to skip the need for an LTI launch for these
  # requests. The function 'require_lti_launch' is defined in 
  # ApplicationController.rb.
  # skip_before_action :require_lti_launch
  
  # Standard Rails page that lists all policy templates.
  #
  # GET /policy_templates
  # GET /policy_templates.json
  def index
    @policy_templates = PolicyTemplate.all
  end

  # Standard Rails page that shows an individual policy
  # template.
  #
  # GET /policy_templates/1
  # GET /policy_templates/1.json
  def show
  end

  # Standard Rails request that shows an edit page.
  # GET /policy_templates/new
  #
  def new
    @policy_template = PolicyTemplate.new
  end

  # Standard Rails request that shows an edit screen.
  # GET /policy_templates/1/edit
  #
  def edit
  end

  # Default Rails procedure that generates a new policy template.
  #
  # POST /policy_templates
  # POST /policy_templates.json
  def create
    @policy_template = PolicyTemplate.new(policy_template_params)

    respond_to do |format|
      if @policy_template.save
        format.html { redirect_to @policy_template, notice: 'Policy template was successfully created.' }
        format.json { render :show, status: :created, location: @policy_template }
      else
        format.html { render :new }
        format.json { render json: @policy_template.errors, status: :unprocessable_entity }
      end
    end
  end

  # Default Rails procedure for updating a policy template.
  #
  # PATCH/PUT /policy_templates/1
  # PATCH/PUT /policy_templates/1.json
  #
  def update
    respond_to do |format|
      if @policy_template.update(policy_template_params)
        format.html { redirect_to @policy_template, notice: 'Policy template was successfully updated.' }
        format.json { render :show, status: :ok, location: @policy_template }
      else
        format.html { render :edit }
        format.json { render json: @policy_template.errors, status: :unprocessable_entity }
      end
    end
  end

  
  # Default Rails procedure for deleting a policy template.
  #
  # DELETE /policy_templates/1
  # DELETE /policy_templates/1.json
  def destroy
    @policy_template.destroy
    respond_to do |format|
      format.html { redirect_to policy_templates_url, notice: 'Policy template was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_policy_template
      @policy_template = PolicyTemplate.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def policy_template_params
      params.require(:policy_template).permit(:name, :is_active, :body)
    end
end

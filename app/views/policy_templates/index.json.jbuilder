json.array!(@policy_templates) do |policy_template|
  json.extract! policy_template, :id, :name, :is_active, :body
  json.url policy_template_url(policy_template, format: :json)
end

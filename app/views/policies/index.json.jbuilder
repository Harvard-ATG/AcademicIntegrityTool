json.array!(@policies) do |policy|
  json.extract! policy, :id, :context_id, :policy_template_id, :is_published, :published_by, :body
  json.url policy_url(policy, format: :json)
end

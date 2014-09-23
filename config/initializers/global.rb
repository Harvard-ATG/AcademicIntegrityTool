# Activates the Global gem environment
# See http://railsware.com/blog/2013/07/26/globalize-your-configuration

Global.environment = Rails.env.to_s
Global.config_directory = Rails.root.join('config/global').to_s
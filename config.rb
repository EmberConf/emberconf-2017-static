###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (https://middlemanapp.com/advanced/dynamic_pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

activate :deploy do |deploy|
  deploy.method = :git
  # Optional Settings
  # deploy.remote   = 'custom-remote' # remote name or git url, default: origin
  # deploy.branch   = 'custom-branch' # default: gh-pages
  # deploy.strategy = :submodule      # commit strategy: can be :force_push or :submodule, default: :force_push
  # deploy.commit_message = 'custom-message'      # commit message (can be empty), default: Automated commit at `timestamp` by middleman-deploy `version`
end

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :css_dir, 'css'

set :js_dir, 'javascripts'

set :images_dir, 'images'

set :fonts_dir,  'fonts'

set :build_dir, 'tmp'

#### BEGIN CUSTOM FLAGS ####
set :allow_registration, true
set :show_sponsors, true
set :show_schedule, true
set :show_speakers, true
#### END CUSTOM FLAGS ####

## Next year, add a custom flag for replacing the scholarship section with something else when that window closes. ##

unless settings.allow_registration
  ignore "register.html.erb"
end

unless settings.show_sponsors
  ignore "sponsors.html.erb"
end

unless settings.show_schedule
  ignore "schedule.html.erb"
end

unless settings.show_speakers
  ignore "speakers.html.erb"
end

def build_redirect(source, target)
  dst = File.join(config[:build_dir], source)
  File.write(dst, <<-EOF)
---
redirect_to:
  - #{target}
---
EOF
end

configure :build do
  activate :minify_html
  activate :minify_css
  activate :minify_javascript
  activate :imageoptim

  after_build do
    build_redirect('women-helping-women.html', 'http://emberwomen.com')

    FileUtils.cp File.expand_path('../_gh-pages_config.yml', __FILE__),
                  File.expand_path('_config.yml', config[:build_dir])
  end
end

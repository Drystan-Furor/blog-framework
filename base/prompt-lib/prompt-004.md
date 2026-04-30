GIVEN
Intent = repo is https://github.com/Drystan-Furor/blog-framework

DO
create GitHub Actions to host it as Github Pages

ACT
IaC a pipeline to build and deploy the site

ASSERT
GitHub Pages: Build and deployment uses Source GitHub Actions
the site can be visited at https://drystan-furor.github.io/blog-framework/


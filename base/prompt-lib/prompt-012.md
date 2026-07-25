GIVEN
Intent = an article has table in it's markdown file, then it has conditional formatting to improve readability and users experience

DO
create specfic styling methods for md table so they are printed on a "card" -> card layout has a header banner with column titles and table content columns in it's body. rounded borders and shadows

ACT
on article examples: src/content/articles/glutenvrije-broodjes/index.md | src/content/articles/volkoren-pannekoeken/index.md

ASSERT
src/content/articles/glutenvrije-broodjes/index.md | src/content/articles/volkoren-pannekoeken/index.md once rendered trough pipeline shows formatted, styles tables in browser 
fix/update failing tests and CI pipeline based on current changes, edited astro files is source of truth, validation has to pass on current generated files

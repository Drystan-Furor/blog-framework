GIVEN
Intent = write articles by first example postief-denken

DO
example = src/content/articles/positief-denken-1/index.md
refine = src/content/articles/positief-denken-3/index.md

ACT
look at refered images in index and extract text from images, then copy said content into plain text with md formatting, just like postief-denken-1.md

ASSERT
src/content/articles/positief-denken-3/index.md is a text article, not just images


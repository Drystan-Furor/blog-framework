GIVEN
Intent = write articles by first example postief-denken

DO
example = src/content/articles/positief-denken-1/index.md
refine = src/content/articles/positief-denken-7/index.md

ACT
look at refered images in index and extract text from images, then copy said content into plain text with md formatting, just like postief-denken-1.md
Tesseract is available, so take an OCR pass over the referenced images. use that as a draft and correct it against the images before editing the article.

ASSERT
refined index.md is a text article, not just images


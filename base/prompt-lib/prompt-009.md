GIVEN
Intent = An article is read on a desktop viewport, then it is properly aligned.

DO
task = align <div class="article-body">  content </div> to the horizontal center of the viewport.
current state = <div class="article-body">  content </div> is too far to the right side offset, so leftover real estate seems waste, and creates a bad user experience.
issue =  using 2 columns to seperate header and content. headers get stretched way too far over longer articles.
fix =  <div class="article-body">  content </div> has an mx-auto class applied to it and the element is not inside a container with parents that move it to the right and only 1 column.

ACT
review and improve the generated output of the artifact build so each article content is centered when desktop viewport is used.
upgrade user experience on dekstop as the current layout is akward, and the content is not centered.
layout shift to a responsive vertically scrollable readable document

ASSERT
intent is fulfilled.
mobile view is not changed from current state.
only larger viewports are changed.
article page is responsive.


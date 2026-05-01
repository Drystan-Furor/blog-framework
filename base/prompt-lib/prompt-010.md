GIVEN
Intent = As a user, when reading an article  that has tags to youtube video's, I want to be able to see it embedded in the article, so I don't have to leave the site.

DO
task = make it possible to embed videos in the article.
current state = src/content/articles/yoga-voor-stofwisseling/index.md has several HUGO embedded links that link to video ID's, but in this Astro project it is plain text.
issue = tags like {{< youtube gyUHCCCOqX8 >}} should embed a video.
fix = either use Astro's youtube shortcode or use a different embed method.

ACT
review and improve the generated output of the artifact build so each video link embeds the video
upgrade user experience so they don't have to leave the site to watch a video.

ASSERT
intent is fulfilled.
article has embedded videos


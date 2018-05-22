<?php

return function ($site, $pages, $page) {
	$artists = $page->children()->visible();

	return array(
	'artists' => $artists
	);
}

?>

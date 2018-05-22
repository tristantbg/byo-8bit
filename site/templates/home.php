<?php snippet('header') ?>

<div id="pointer"></div>

<div id="ui" class="ui"></div>
<div id="ui2" class="ui"></div>
<div id="ui3" class="ui"><p>Start: 30:05:2018</p><p>End: 15:06:2018</p></div>
<div id="ui4" class="ui">Le Coeur, Paris</div>

<div id="background">
	<div class="x">
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
	</div>
	<div class="y">
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
	</div>
</div>

<div id="feed">
	<?php $idx = 1 ?>
	<?php for ($i=0; $i < 100; $i++): ?>
	
	<?php foreach ($artists->shuffle() as $key => $artist): ?>
	
		<section class="post <?php e($artist->subtitle()->isNotEmpty(), ' secondary') ?>" data-id="<?= $idx ?>">
			<div class="inner">
				<div class="title"><?= $artist->titleText()->kt() ?></div>
				<?php if ($artist->subtitle()->isNotEmpty()): ?>
					<div class="subtitle"><?= $artist->subtitle()->kt() ?></div>
				<?php endif ?>
			</div>
		</section>

		<?php $idx++ ?>
	
	<?php endforeach ?>
	
	<?php endfor ?>
</div>

<?php snippet('footer') ?>
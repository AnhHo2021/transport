	<!-- RIBBON -->
	<div id="ribbon">
		<span class="ribbon-button-alignment">
			<!-- <span id="refresh" class="btn btn-ribbon" data-action="resetWidgets" data-title="refresh"  rel="tooltip" data-placement="bottom" data-original-title="<i class='text-warning fa fa-warning'></i> Warning! This will reset all your widget settings." data-html="true" data-reset-msg="Would you like to RESET all your saved widgets and clear LocalStorage?"><i class="fa fa-refresh"></i></span> -->
			<span class="btn btn-ribbon btn-sm" onclick="window.history.back()"><i class="fa fa-arrow-left"></i></span>
		</span>
        <div class="ribbon-button-quote" style="display: none">
            <input type="text" class="quote-zip inpt_w150" placeholder="Zip code">
            <button class="btn btn-default" id="btn-add-quote">Add Quote</button>
        </div>
		<?php include('./ajax/ribbon-search.php') ?>

		<!-- breadcrumb -->
		<!-- <ol class="breadcrumb"> -->
			<!-- This is auto generated -->
		<!-- </ol> -->
		<!-- end breadcrumb -->

		<!-- You can also add more buttons to the
		ribbon for further usability

		Example below: -->

		<!-- <span class="ribbon-button-alignment pull-right">
		<span id="search" class="btn btn-ribbon hidden-xs" data-title="search"><i class="fa-grid"></i> Change Grid</span>
		<span id="add" class="btn btn-ribbon hidden-xs" data-title="add"><i class="fa-plus"></i> Add</span>
		<span id="search" class="btn btn-ribbon" data-title="search"><i class="fa-search"></i> <span class="hidden-mobile">Search</span></span>
		</span> -->

	</div>
	<!-- END RIBBON -->

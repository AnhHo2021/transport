<?php

require_once 'inc/init.php';

$_typesearch = "ratecontainer";
include('search_message.php');
?>
<section id="widget-grid" class="">
	<div class="row">
		<!-- NEW WIDGET START -->
		<article class="col-sm-12 col-md-12 col-lg-12">

			<!-- Widget ID (each widget will need unique ID)-->
			<div class="jarviswidget" data-widget-editbutton="true">
				<header>
					<h2><i class="fa fa-table"></i> Rate Container list </h2>
					<?php if (canAddForm('ContactForm')) { ?>
						<a href="./#ajax/ratecontainer-form.php" class="btn btn-primary pull-right"><i
								class="fa fa-plus"></i> Create New Rate Container</a>
					<?php } ?>
				</header>
				<div>
					<!-- widget edit box -->


					<div class="jarviswidget-editbox">
						<!-- This area used as dropdown edit box -->
					</div>
					<!-- end widget edit box -->

					<!-- widget content -->
					<div class="widget-body">
						<?php $event = 'search';
						include('search-table.php'); ?>
						<table id="table_ratecontainer"
							class="table table-responsive table-striped table-bordered table-hover" width="100%">
							<thead>
								<tr>
									<th style="width:10%;" class="hasinput"><input type="text" class="form-control"
											placeholder="Filter ID"></th>
									<!-- <th class="hasinput"><input type="text" class="form-control"
											placeholder="Filter Company Name"></th> -->
									<th class="hasinput"> <input type="text" class="form-control"
											placeholder="Filter Depot Name"> </th>
									<th class="hasinput"> <input type="text" class="form-control"
											placeholder="Filter City"> </th>
									<th class="hasinput"> <input type="text" class="form-control"
											placeholder="Filter Container Type"> </th>
									<th class="hasinput"> <input type="text" class="form-control"
											placeholder="Filter Container SKU"> </th>
									<th class="hasinput"> <input type="text" class="form-control"
											placeholder="Filter Container Margin"> </th>
											<th class="hasinput"> <input type="text" class="form-control"
											placeholder="Filter Quantity"> </th>
									<!-- <th class="hasinput"> <input type="text" class="form-control"
											placeholder="Filter Container Cost"> </th> -->
									<th class="hasinput"> <input type="text" class="form-control"
											placeholder="Filter total value"> </th>
								</tr>
								<tr>
									<th>ID</th>
									<!-- <th class="col-md-2">Company Name</th> -->
									<th class="col-md-2">Depot Name</th>
									<th class="col-md-2">City</th>
									<th class="col-md-2">Container Type</th>
									<th class="col-md-2">Container SKU</th>
									<!-- <th class="col-md-2">Margin</th> -->
									<th class="col-md-2">Cost</th>
									<th class="col-md-2">Quantity</th>
									<th class="col-md-2">Total Value</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
						<div class="text-right">
							<ul class="pagination"></ul>
						</div>
					</div>
					<div class="modal-footer">
						<button id="closeProductChildPopup2" type="button" class="btn btn-secondary"
							>Close</button>
					</div>
				</div>
			</div>
			<!-- end widget -->

		</article>
	</div>
</section>
<!-- PAGE RELATED PLUGIN(S) -->
<script src="<?php echo ASSETS_URL; ?>/js/script/ratecontainer/ratecontainer-list.js"></script>
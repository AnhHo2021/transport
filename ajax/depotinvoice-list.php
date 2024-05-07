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
					<h2><i class="fa fa-table"></i> Unpaid Depot Invoice List </h2>
					<?php if (canAddForm('ContactForm')) { ?>
						<a href="./#ajax/depotinvoice-form.php" class="btn btn-primary pull-right"><i
								class="fa fa-plus"></i> Create Unpaid Depot Invoice</a>
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
						<table id="table_depotinvoice"
							class="table table-responsive table-striped table-bordered table-hover" width="100%">
							<thead>
								<tr>
									<th class="hasinput"><input type="text" class="form-control"
											placeholder="Filter Invoice number"></th>
									<th class="hasinput"> <input type="text" class="form-control"
											placeholder="Filter Container Type"> </th>
									<th class="hasinput"> <input type="text" class="form-control"
											placeholder="Filter Depot Name"> </th>
									<th class="hasinput"> <input type="text" class="form-control"
											placeholder="Filter Depot"> </th>
									<th class="hasinput"> <input type="text" class="form-control"
											placeholder="Filter Depot location"> </th>
									<th class="hasinput"> <input type="text" class="form-control"
											placeholder="Filter Invoice Price"> </th>
									<th class="hasinput"> <input type="text" class="form-control"
											placeholder="Filter Quantity"> </th>
									<th class="hasinput"> <input type="text" class="form-control"
											placeholder="Filter Release number"> </th>
									<th class="hasinput"> <input type="text" class="form-control"
											placeholder="Filter Paid"> </th>
								</tr>
								<tr>
									<th class="col-md-2">Invoice number</th>
									<th class="col-md-2">Container Type</th>
									<th class="col-md-2">Depot Name</th>
									<th class="col-md-2">Depot City</th>
									<th class="col-md-2">Depot location</th>
									<th class="col-md-2">Price</th>
									<th class="col-md-2">Quantity</th>
									<th class="col-md-2">Release number</th>
									<th class="col-md-2">Paid</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
						<div class="text-right">
							<ul class="pagination"></ul>
						</div>
					</div>
				</div>
			</div>
			<!-- end widget -->

		</article>
	</div>
	<div class="modal animated fadeInDown" style="display:none; margin:auto; max-height:600px;" id="add_modal_company">
		<div class="modal-dialog" style="min-width:60%;">
			<div class="modal-content">
				<?php unset($contact_form);
				include 'invoicerelease-form.php'; ?>
			</div>
		</div>
	</div>
</section>
<!-- PAGE RELATED PLUGIN(S) -->
<script src="<?php echo ASSETS_URL; ?>/js/script/depotinvoice/depotinvoice-list.js"></script>
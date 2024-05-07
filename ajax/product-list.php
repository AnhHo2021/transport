<?php require_once 'inc/init.php';
$_typesearch = "product";
include('search_message.php');
?>
<section id="widget-grid" class="">
	<div class="row">
		<!-- NEW WIDGET START -->
		<article class="col-sm-12 col-md-12 col-lg-12">

			<!-- Widget ID (each widget will need unique ID)-->
			<div class="jarviswidget" data-widget-colorbutton="true" data-widget-editbutton="true">
				<header>
					<h2><i class="fa fa-table"></i> Product list </h2>
					<?php if (canAddForm('ProductForm')) { ?>
						<a href="./#ajax/product-form.php" class="btn btn-primary pull-right"><i class="fa fa-plus"></i>
							Create new product</a>
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
						<?php $event = 'loadTable';
						include('search-table.php'); ?>
						<table id="table_product"
							class="table table-responsive table-bordered table-striped table-hover" width="100%">
							<thead>
								<tr>
									<th></th>
									<!-- <th class=""> </th> -->
									<th class="hasinput"> <input type="text" class="form-control"
											placeholder="Filter Depot" name="City" /> </th>
									<th class="hasinput"> <input type="text" class="form-control"
											placeholder="Filter City" name="City" /> </th>
									<th class="hasinput"> <input type="text" class="form-control"
											placeholder="Filter container type name" name="type" /> </th>
									<th class="hasinput"> <input type="text" class="form-control"
											placeholder="Filter Quantity" name="prod_name" /> </th>
									<!-- <th class="hasinput"> <input type="number" class="form-control" placeholder="Filter Price" name="prod_price" /> </th> -->
									<!-- <th class="hasinput"> <input type="text" class="form-control" placeholder="Filter Quantity" name="product_qty" /> </th>
									<th class="hasinput"> <input type="text" class="form-control" placeholder="Filter Type" name="prod_type" /> </th>
									<th class="hasinput"> <input type="text" class="form-control" placeholder="Filter Class" name="prod_class" /></th>
									<th class="hasinput"> <input type="text" class="form-control" placeholder="Filter Description" name="prod_desc" /></th> -->
								</tr>
								<tr>
									<th>#</th>
									<th>Depot</th>
									<th>City</th>
									<th>Container type</th>
									<th>Quantity</th>
									<!-- <th>Price</th> -->
									<!-- <th>Quantity</th>
									<th>Type</th>
									<th>Class</th>
									<th>Description</th> -->
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<!-- end widget -->

		</article>
	</div>
	<div class="modal animated fadeInDown" style="display:none; margin:auto; max-height:1000px;" id="userPopup">
		<div class="modal-dialog" style="min-width:80%;">
			<div class="modal-content">
				<button type="button" class="close" aria-label="Close" id="closeProductChildPopup"
					style="font-size: 30px; margin-right:10px; color: black; opacity: 0.5;">
					<span aria-hidden="true">&times;</span>
				</button>
				<?php unset($contact_form);
				include 'productchild-list.php'; ?>
			</div>
		</div>
	</div>
	<div id="userPopup" style="display: none;">
		<!-- User list will be loaded here -->
	</div>
</section>

<script src="<?php echo ASSETS_URL; ?>/js/script/product-list.js"></script>
<script src="<?php echo ASSETS_URL; ?>/js/script/productchild-list.js"></script>
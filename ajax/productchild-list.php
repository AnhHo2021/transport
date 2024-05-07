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
					<h2><i class="fa fa-table"></i> Product Child list </h2>
					<!-- <?php if (canAddForm('ProductForm')) { ?>
						<a href="./#ajax/product-form.php" class="btn btn-primary pull-right"><i class="fa fa-plus"></i>
							Create new product</a>
					<?php } ?> -->
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
						<table id="table_child_product"
							class="table table-responsive table-bordered table-striped table-hover" width="100%">
							<thead>
								<tr>
									<th></th>
									<!-- <th class=""> </th> -->
									<th class="hasinput"> <input type="text" class="form-control"
											placeholder="Filter Name" name="City" /> </th>
									<th class="hasinput"> <input type="text" class="form-control"
											placeholder="Filter container type name" name="type" /> </th>
									<th class="hasinput"> <input type="text" class="form-control"
											placeholder="Filter depot city" name="prod_name" /> </th>
									<!-- <th class="hasinput"> <input type="number" class="form-control" placeholder="Filter Price" name="prod_price" /> </th> -->
									<th class="hasinput"> <input type="text" class="form-control"
											placeholder="Filter Depot" name="product_qty" /> </th>
									<th class="hasinput"> <input type="text" class="form-control"
											placeholder="Filter Release number" name="release_number" /> </th>
									<th class="hasinput"> <input type="text" class="form-control"
											placeholder="Filter Quantity" name="prod_type" /> </th>
									<th class="hasinput"> <input type="text" class="form-control"
											placeholder="Filter Price" name="container_rate" /> </th>
								</tr>
								<tr>
									<th>#</th>
									<th>Product Name</th>
									<th>Container type</th>
									<th>City</th>
									<!-- <th>Price</th> -->
									<th>Depot Name</th>
									<th>Release number</th>
									<th>Quantity</th>
									<th>Price</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
					<div class="modal-footer">
						<button id="closeProductChildPopup2" type="button" class="btn btn-secondary">Close</button>
					</div>
				</div>
			</div>
			<!-- end widget -->

		</article>

	</div>
</section>

<script src="<?php echo ASSETS_URL; ?>/js/script/productchild-list.js"></script>
<?php require_once 'inc/init.php'; 
$_typesearch = "inventory";
include('search_message.php');
?>
<section id="widget-grid" class="">
	<!-- row -->
	<div class="row" id="inventory-list-content">
		<!-- NEW WIDGET START -->
		<article class="col-xs-12 col-sm-12 col-md-12 col-lg-12">

			<!-- Widget ID (each widget will need unique ID)-->
			<div class="jarviswidget" data-widget-editbutton="false">
				<header>
               <h2><i class="fa fa-table"></i> Inventory list </h2>
				</header>
				<div class="">
					<div class="jarviswidget-editbox">
					</div>
					<div class="widget-body">
                        <div class="fs m-t10 m-b25 inventory-content smart-form">
                            <section>
                                <div class="row m-b5">
                                    <div class="col col-2">From date</div>
                                    <div class="col col-2">To date</div>
                                    <div class="col col-2">Text search</div>
                                    <div class="col col-2">Type</div>
                                    <div class="col col-1">Line show</div>
                                    <div class="col col-1">Records</div>
                                </div>
                                <div class="row m-b5 search">
                                    <div class="col col-2">
                                        <input type="date" class="datepicker form-control from-date">
                                    </div>
                                    <div class="col col-2">
                                        <input type="date" class="datepicker form-control to-date">
                                    </div>
                                    <div class="col col-2">
                                        <input type="text" class="form-control text-search">
                                    </div>
                                    <div class="col col-2">
                                        <select class="form-control select_type">
                                            <option value="">All</option>
                                            <option value="container_type">Container type</option>
                                            <option value="sku">SKU</option>
                                            <option value="city">City</option>
                                            <option value="depot">Depot</option>
                                        </select>
                                    </div>
                                    <div class="col col-1">
                                        <input type="number" class=" form-control line-nuber" value="20">
                                    </div>
                                    <div class="col col-1">
                                        <input type="number" class=" form-control total-record c_blue bold text-center" value="0" disabled="true">
                                    </div>
                                    <!--
                                    <div class="col col-1">
                                        <button class="btn btn-sm btn-default btn-excell">Excel export </button>
                                    </div>
                                    </div>-->
                                    <div class="col col-1">
                                        <button class="btn btn-sm btn-primary btn-search">Search </button>
                                    </div>

                                </div>
                                <div class="table-responsive-lg col-12">
                                    <table class="table table-bordered report m-0 t-normal" id="tbl-inventory">
                                        <thead>
                                        <tr>
                                            <th >Depot</th>
                                            <th >City</th>
                                            <th >Sku</th>
                                            <th >Container type</th>
                                            <th>IVN Price</th>
                                            <th>CTN Price</th>
                                            <th>Available</th>
                                            <th>Status</th>
                                            <th>Used</th>
                                            <th>Release#</th>
                                        </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                                <div class="col-12 m-t15">
                                    <ul id="pagination-tbl-inventory" class="pagination-sm"></ul>
                                </div>
                            </section>
                        </div>
					</div>
					<!-- end widget content -->
				</div>
				<!-- end widget div -->
			</div>
			<!-- end widget -->
		</article>
	</div>
</section>
<script src="<?= ASSETS_URL ?>/js/jquery.twbsPagination.js" type="text/javascript"></script>
<script src="<?php echo ASSETS_URL; ?>/js/script/invetory-list.js"></script>
<script src="<?php echo ASSETS_URL; ?>/js/script/common_f.js"></script>
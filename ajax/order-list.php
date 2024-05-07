<?php require_once 'inc/init.php'; 
$_typesearch = "order";
include('search_message.php');
?>
<section id="widget-grid" class="">
	<!-- row -->
	<div class="row" id="order-list-content">

		<!-- NEW WIDGET START -->
		<article class="col-xs-12 col-sm-12 col-md-12 col-lg-12">

			<!-- Widget ID (each widget will need unique ID)-->
			<div class="jarviswidget" data-widget-editbutton="false">
				<header>
               <h2><i class="fa fa-table"></i> Order list </h2>
					<?php if(canAddForm('OrderForm')){ ?>

               <a href="./#ajax/order-form.php" class="btn btn-primary pull-right"><i class="fa fa-plus"></i> Create new Order</a>
					<?php }?>
				</header>
				<div class="">
					<div class="jarviswidget-editbox">
					</div>
					<div class="widget-body">
                        <div class="modal fade" id="task-modal"  role="dialog"  aria-hidden="true">
                            <div class="modal-dialog" style="min-width:60%;">
                                <div class="modal-content">
                                    <?php
                                    include 'task.php'; ?>
                                </div>
                            </div>
                        </div>

                        <div class="modal fade animated fadeInDown" style="display:none; margin:auto;" id="modal-pay-to-salesperson">
                            <div class="modal-dialog modal-lg modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-body" style="margin:auto">
                                        <?php
                                        include 'payment_form.php';
                                        ?>
                                        <div class="row m-t20 m-b20 text-center m-rl">
                                            <div class="col col-12 border-groove p-t20">
                                                 <span class="m-r20">
                                                 <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                                            </span>
                                             <span>
                                                 <button type="button" class="btn btn-primary btn-sm btn-sale-payment">Submit</button>
                                             </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <?php include_once 'modal/modal_assign_driver.php'; ?>
                        <div class="fs m-t10 m-b25 order-content smart-form">
                            <div id="message_order_list" role="alert" style="display:none"></div>
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
                                            <option value="status">Status</option>
                                            <option value="customer">Customer</option>
                                            <option value="salesperson">Salesperson</option>
                                            <option value="driver">Driver</option>
                                            <option value="container">Container sku</option>
                                            <option value="order">Order title</option>
                                        </select>
                                    </div>
                                    <div class="col col-1">
                                        <input type="number" class=" form-control line-nuber">
                                    </div>
                                    <div class="col col-1">
                                        <input type="number" class=" form-control total-record c_blue bold text-center" value="0" disabled="true">
                                    </div>
                                    <div class="col col-1">
                                        <button class="btn btn-sm btn-default btn-excell">Excel export </button>
                                    </div>
                                    <!--<div class="col col-1">
                                        <button class="btn btn-sm btn-default btn-pdf">PDF export </button>
                                    </div>-->
                                    <div class="col col-1">
                                        <button class="btn btn-sm btn-primary btn-search">Search </button>
                                    </div>

                                </div>
                                <div class="table-responsive-lg col-12">
                                    <table class="table table-bordered report m-0 t-normal" id="tbl-order">
                                        <thead>
                                        <tr>
                                            <th  style="width: 90px">Order</th>
                                            <th style="min-width: 90px">Bill to</th>
                                            <th style="min-width: 90px">Salesperson</th>
                                            <th>Container</th>
                                            <th>Driver</th>
                                            <th style="width: 70px">Total</th>
                                            <th style="width: 70px">Payment</th>
                                            <th style="width: 70px">Balance</th>
                                            <th style="width: 70px">Date</th>
                                        </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                                <div class="col-12 m-t15">
                                    <ul id="pagination_tbl-order" class="pagination-sm"></ul>
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
<script src="<?php echo ASSETS_URL; ?>/js/script/order-list.js"></script>
<script src="<?php echo ASSETS_URL; ?>/js/script/orders_list.js"></script>
<script src="<?php echo ASSETS_URL; ?>/js/script/common_f.js"></script>
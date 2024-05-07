<?php
$order_form = 'OrderForm';

require_once 'inc/init.php';
require_once '../php/link.php';
$_authenticate->checkFormPermission($order_form);

$operation_order = (getID() ? 'edit' : 'add');
$order_current_permission = strrpos($_SERVER['REQUEST_URI'] , 'quote-form')>0;

$state_list = HTTPMethod::httpPost1($link['_getStateList'], array('token' => $_SESSION['token'], 'jwt' => $_SESSION['jwt'], 'private_key' => $_SESSION['userID']));
$option='<option value=""></option>';
foreach($state_list as $item){
    $option .='<option value="'.$item["code"].'">'.$item["state"].'</option>';
}
//print_r($state_list); die();
?>
    <link rel="stylesheet" href="<?= ASSETS_URL ?>/css/distance_matrix_style.css">
<section id="widget-grid" class="">
<div class="row">

	<!-- NEW WIDGET START -->
	<article class="col-sm-12 col-md-12 col-lg-12">

		<!-- Widget ID (each widget will need unique ID)-->
		<div class="jarviswidget" data-widget-colorbutton="false" data-widget-editbutton="false">
			<header id="quote-form-load">
				<h2 style="width:auto">Quote Form <?= hasIdParam() && $order_current_permission==true ? 'edit: <span id="heading_title_id"></span>' : '' ?></h2>
				<?php 
            //$help_form = 'order';
            //include 'btn-help.php';
           // unset($help_form);
				?>
				<?php 
				if(getID()){
					if($order_current_permission==true){ 
						echo '<div class="jarviswidget-ctrls" id="order-form-control" role="menu">
								<a href="./#ajax/quote-form.php" class="jarviswidget-toggle-btn btn-primary have-text"><i class="fa fa-plus"></i> Create new Quote</a>
							</div>';
					}
				} 
				?>
			</header>
			<!-- widget div-->
			<div class="jarviswidget-body" style="max-width:100%">
                <?php include_once 'modal/modal_add_container.php'; ?>
                <?php include_once 'modal/modal_success.php'; ?>
				<!-- end widget edit box -->
				<?php
				$canAddContact = canAddForm('ContactForm') && basename($_SERVER['PHP_SELF']) =='quote-form.php';
				if($canAddContact && basename($_SERVER['PHP_SELF'])=='quote-form.php'){?>

				<div class="modal animated fadeInDown" style="display:none; margin:auto; max-height:600px;" id="add_contact_modal">
					<div class="modal-dialog"  style="min-width:60%;">
						<div class="modal-content">
							<?php include('contact-form-order.php')?>
						</div>
					</div>
				</div>

				<?php } ?>

				<div class="row" id="pane_link_to_warranty"></div>
				<div class="row" id="pane_link_to_invoice"></div>
				<form class="smart-form" id="order_form" method="POST">
					<div id="message_form_quote" tabindex="0" role="alert" style="display:none"></div>
					<fieldset>
						<div class="row">
                            <input type="hidden" id="is-discount" value="">
							<input type="hidden" id="is-discount-type" value="">
							<section class="col col-6">
								<label class="input">Order Title:</label>
								<input type="text" class="form-control is_disabled" name="order_title"<?= hasPermission($order_form, 'order_title', $operation_order ) ? '' : ' readonly' ?>>
							</section>
                            <section class="col col-xs-<?= $canAddContact ? 5 : 6?>">
                                <label class="input">Zipcode<span class="c-orange">(*, first selected): </span></label>
                                <input name="order_zipcode" class="form-control select2 is_disabled" id="order_zipcode" style="width:100%" <?= hasPermission($order_form, 'order_zipcode', $operation_order ) ? '' : ' disabled' ?>></select>
                                <p></p>
                            </section>
                            <section class="col col-6">
                                <label class="input">Salesperson: <span class="link_to" data-view="link_to" data-form="#order_form" data-control="salesperson" data-name="contact-form" data-param="id"></span></label>
                                <select name="salesperson" id="salespersonId" class="form-control select2" style="width:100%" <?= hasPermission($order_form, 'salesperson', $operation_order ) ? '' : ' disabled' ?>><option value="">Select Salesperson</option></select><i></i>
                                <p></p>
                            </section>
                            <section class="col col-xs-5">
                                <label class="input">Customer name: </label>
                                <input type="text"  class="form-control q-temp" id="shipping_customer_name">
                            </section>
                            <?php
                            if(hasPermission($order_form, 'order_doors', $operation_order)){
                                ?>
                                <section class="col col-6">
                                    <label class="input">Doors:</label>
                                    <select class="form-control" name="order_doors" id="order_doors">
                                        <option value=""></option>
                                        <option value="forward to cab of truck">Forward to cab of truck</option>
                                        <option value="to rear of trailer">To rear of trailer</option>
                                    </select>
                                </section>
                            <?php }?>
                            <section class="col col-xs-5">
                                <label class="input">Customer phone: </label>
                                <input type="tel"  class="form-control q-temp" id="shipping_phone">
                            </section>
						</div>

                        <div class="row">
                            <div class="col col-6">
                                <div class="row">
                                    <section class="col col-12">
                                        <label class="input">Depots: </label>
                                        <select class="form-control" id="avalible-depots">
                                        </select>
                                    </section>
                                </div>
                                <div class="row show-container-type" style="display:none">
                                    <section class="col col-12">
                                        <label class="input">Container type: </label>
                                        <select class="form-control" id="container-rate-avg"></select>
                                    </section>
                                </div>
                                <div class="row show-container-type" style="display:none">
                                    <section class="col col-12">
                                        <label class="input">Discount code:<span style="display:none" class="error discount-code-error">(Invalid discount code)</span></label>
                                        <input type="text" class="form-control" id="discount_code">
                                    </section>
                                </div>
                                <?php
                                if(hasPermission($order_form, 'order_status', $operation_order) && $operation_order=='edit'){
                                    ?>
                                <div class="row">
                                    <section class="col col-12">
                                        <label class="input">Order status: </label>
                                        <select class="form-control" name="order_status" id="order_status">
                                            <option value="CANCELLED">Cancelled</option>
                                            <option value="CLOSED">Billing and close out</option>
                                            <option value="PROBLEMS">Problems</option>
                                        </select>
                                    </section>
                                </div>
                                <?php }?>
                            </div>
                            <div class="col col-6">
                                <section class="col-10">
                                    <label class="input">Email: </label>
                                    <input type="email"  class="form-control q-temp" id="email_phone">
                                </section>
                                <section class="col-10">
                                    <label class="input">Delivery address: </label>
                                    <input type="text"  class="form-control q-temp" id="customer-address">
                                </section>
                                <section class=" col-10">
                                    <label class="input">State: </label>
                                    <select class="form-control" id="customer-state">
                                        <?=$option?>
                                    </select>
                                </section>
                                <section class=" col-10">
                                    <label class="input">City: </label>
                                    <select class="form-control" id="customer-city">
                                        <option value=""></option>
                                    </select>
                                </section>
                            </div>
                        </div>
                        <div class="row">
                            <?php
                            if(hasPermission($order_form, 'order_releases', $operation_order) && $operation_order=='edit'){
                                ?>

                               <!-- <section class="col col-5">
                                    <label class="input">Releases #:</label>
                                    <input type="text" class="form-control" name="order_releases" id="order_releases">
                                </section>-->

                            <?php }?>

                        </div>
					</fieldset>

					<fieldset>
						<div class="row">
							<section class="padding-10">
								<?php include 'quote-form.productstable.php'; ?>
							</section>
						</div>
					</fieldset>


					<fieldset>
						<div class="row">
							<section class="col col-6">
								<label class="input">Note:</label>
								<textarea name="note" rows="4" class="form-control is_disabled"></textarea>
							</section>
						</div>
					</fieldset>
					<?php
						if(basename($_SERVER['PHP_SELF'])=='order-form.php'){$type_note = 'order'; $can_add_note = false; if($order_current_permission==true){ $can_add_note = true; }  ; include('notes.php');} ?>
				</form>
                <div class="smart-form">
                    <footer>
                        <button class="btn btn-primary" id="submit-quote">Submit</button>
                        <button class="btn btn-default" id="cancel-quote">Cancel</button>
                        <button class="btn btn-default" id="close-quote">Close</button>
                    </footer>
                </div>

			</div>
		</div>
	</article>
</div>
</section>

<script src="<?= ASSETS_URL ?>/js/script/select-template.js" type="text/javascript"></script>
<script src="<?= ASSETS_URL ?>/js/util/select-link.js" type="text/javascript"></script>
<script src="<?= ASSETS_URL ?>/js/util/control-select2.js"></script>
<script src="<?= ASSETS_URL ?>/js/script/note.js" type="text/javascript"></script>
<script src="<?= ASSETS_URL ?>/js/script/quote-form.js" type="text/javascript"></script>
<script src="<?= ASSETS_URL ?>/js/script/container_rate_avg.js" type="text/javascript"></script>
<script src="<?= ASSETS_URL ?>/js/script/common_f.js" type="text/javascript"></script>

<script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDqqFUPT6qHW2hvTEfwLw6IaXs253qrlmU&v=weekly"
    defer >
</script>
<script src="<?= ASSETS_URL ?>/js/script/distance_matrix/find_depot.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/3.3.4/jquery.inputmask.bundle.min.js"></script>
<script>
    $(document).ready(function(){
        $('#shipping_phone').inputmask('(999)-999-9999');
    });
</script>
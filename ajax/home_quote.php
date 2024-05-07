<?php
require_once 'inc/init.php';
?>
<link rel="stylesheet" href="<?= ASSETS_URL ?>/css/distance_matrix_style.css">
<style type="text/css">
    fieldset.fs {
        border-width: 1px;
        border-color: rgb(192, 192, 192);
    }
</style>
<section id="widget-grid" >
    <div class="jarviswidget">
        <div class="smart-form"  style="min-height: 700px">
            <div class="row">
                <div id="message-form-home-quote" role="alert" ></div>
                <div style="position:absolute; top: 13px;right:10px">
                    <i class="fa fa-times alert alert-success" id="close-btn-home-quote"></i>
                </div>
            </div>

            <div id="home-page">
                <div class="row text-center m-b10">
                    <label class="f_z_18"><b>ENTER YOUR ZIP CODE TO GET DELIVERED PRICES NOW</b></label>
                </div>
                <div class="row text-center m-b10">
                    <div class="col col-5"></div>
                    <div class="col col-2">
                        <input type="text" class="form-control is-focus" id="search-depot-zip">
                    </div>
                </div>
                <div class="row text-center m-b10">
                    <label class=" ">* Purchase only one product category at a time</label>
                </div>
                <div class="row text-center m-b20"></div>

                <div class="row" id="depot-nearest" style="margin-left:40px; margin-right: 40px"></div>
                <div class="row m-b20" style="margin-left:40px; margin-right: 40px" id="send-page-home">
                    <fieldset class="fs">
                        <legend>YOUR INFO</legend>
                        <section>
                            <div class="row">
                                <div class="col col-5">
                                    <label>Name(*)</label>
                                    <input type="text" placeholder="Your name" class="form-control is-focus" id="shipping_customer_name" value="">
                                </div>
                                <div class="col col-5">
                                    <label>Email(*)</label>
                                    <input type="email" class="form-control is-focus" id="email_phone">
                                </div>
                                <div class="col col-2">
                                    <label>&nbsp;</label>
                                    <button class="btn btn-default btn-sm form-control" id="email-to">Email to</button>
                                </div>
                            </div>
                            <div class="row m-t20">
                                <div class="col col-5">
                                    <label>Name(*)</label>
                                    <input type="text" placeholder="Your name" class="form-control is-focus" id="shipping_customer_name-phone" value="">
                                </div>
                                <div class="col col-5">
                                    <label>Phone(*)</label>
                                    <input type="text" class="form-control is-focus" id="shipping_phone">
                                </div>
                                <div class="col col-2">
                                    <label>&nbsp;</label>
                                    <button class="btn btn-default btn-sm form-control" id="text-to" disabled="disabled">Text to</button>
                                </div>
                            </div>
                        </section>
                    </fieldset>
                </div>
            </div>
            <div id="your-cart" style="margin-right: 30px;margin-left: 30px; display: none">
                <input type="hidden" id="is-discount" value="0">
                <input type="hidden" id="is-discount-type" value="$">
                <div class="row text-center m-b20 m-t20">
                    <label style="font-size: 30px"><b>Your cart</b></label>
                </div>
                <div class="row">
                    <div class=" col col-12">
                        <table id="depot-tbl" class="table your-cart no-footer">
                            <thead>
                            <tr>
                                <td colspan="2" style="text-align: left">Product name</td>
                                <td style="width: 100px; text-align: center">Quantity</td>
                                <td style="width: 100px; text-align: center">Min cost</td>
                                <td style="width: 100px; text-align: center">Delivery cost</td>
                                <td style="width: 100px; text-align: center"> Total</td>
                            </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>

                <div class="row m-t20">
                    <div class="col col-6">
                        <label>Choose container door direction for delivery</label>
                        <select class="form-control" name="order_doors" id="order_doors">
                            <option value="forward to cab of truck">Forward to cab of truck</option>
                            <option value="to rear of trailer">To rear of trailer</option>
                        </select>
                    </div>
                    <div class="col col-2"></div>
                    <div class="col col-4">
                        <label class="c-red invalid-code" style="display: none">Invalid</label>
                        <div class="row">
                            <div class="col col-8">
                                <input type="text" class="form-control" placeholder="Referral or Sale Code" id="discount_code">
                            </div>
                            <div class="col col-4">
                                <button class="btn btn-danger btn-sm" id="btn-discount-code">APPLY</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row m-t20">
                    <div class="col col-8">
                        *Our delivery team will contact you within 24 hours to confirm order and shipping details. Please make sure to add your email and phone number during checkout.
                    </div>
                    <div class="col col-4">
                        <div class="row">
                            <div class="col col-5 c-black text-center" style="font-size: 20px">Subtotal</div>
                            <div class="col col-7 c-black" id="sub-total" style="font-size: 20px"></div>
                        </div>
                    </div>
                </div>

                <div class="row m-t25">
                    <div class="col col-12 m-b20"style="font-size: 20px"> YOUR INFORMATION</div>
                    <div class="col col-6">
                        <label>Name(*)</label>
                        <input type="text" class="form-control is-focus" id="customer-name" value="Testing">
                    </div>
                    <div class="col col-6">
                        <label>Email(*)</label>
                        <input type="text" class="form-control is-focus" id="customer-email">
                    </div>
                </div>
                <div class="row m-t10">
                    <div class="col col-6">
                        <label>Phone(*)</label>
                        <input type="text" class="form-control is-focus" id="customer-phone" value="1234569870">
                    </div>
                    <div class="col col-6">
                        <label>Address(*)</label>
                        <input type="text" class="form-control was-changed is-focus" id="customer-address" value="3747 East Ave">
                    </div>
                </div>
                <div class="row m-t10">
                    <div class="col col-6">
                        <label>City(*)</label>
                        <input type="text" class="form-control was-changed is-focus" id="customer-city" value="Berwyn">
                    </div>
                    <div class="col col-6">
                        <label>State(*)</label>
                        <input type="text" class="form-control was-changed is-focus" id="customer-state" value="IL">
                    </div>
                </div>
                <div class="row m-t10">
                    <div class="col col-6">
                        <label>Zipcode(*)</label>
                        <input type="text" class="form-control" id="customer-zipcode" value="60402">
                    </div>
                </div>

                <div class="row m-t20 m-b25">
                    <div class="col col-1"></div>
                    <div class="col col-4">
                        <button class="btn btn-default form-control c-red" id="continue-shopping"><b>CONTINUE SHOPPING</b></button>
                    </div>
                    <div class="col col-4">
                        <button class="btn btn-default form-control c-red" id="btn-confirm"><b>CONFIRM ORDER</b></button>
                    </div>
                    <div class="col col-3" id="btn-last"></div>
                </div>
            </div>
        </div>
    </div>
</section>
<script src="<?php echo ASSETS_URL; ?>/js/script/distance_matrix/depots.js"></script>
<script src="<?= ASSETS_URL; ?>/js/script/depot/quote_temp.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/3.3.4/jquery.inputmask.bundle.min.js"></script>
<script>
    $(document).ready(function(){
        $('#your-cart #customer-phone').inputmask('(999)-999-9999');
        $('#home-page #shipping_phone').inputmask('(999)-999-9999');
    });
</script>
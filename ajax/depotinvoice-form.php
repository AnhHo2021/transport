<?php

$depotinvoice_form = 'RateContainerForm';

use \SmartUI\Components\SmartForm;

require_once 'inc/init.php';

$_authenticate->checkFormPermission($depotinvoice_form);


$depotinvoice_current_form = 'add';
if (hasIdParam() && basename($_SERVER['PHP_SELF']) == 'depotinvoice-form.php') {
    $depotinvoice_current_form = 'edit';
} else {
    $depotinvoice_current_form = 'add';
}

$isEdit = $depotinvoice_current_form == 'edit';

?>
<section id="widget-grid" class="">
    <div class="jarviswidget">
        <header>
            <h2>Unpaid Depot Invoice Form </h2>

            <?php
            if ($isEdit) {
                echo
                    '<div class="jarviswidget-ctrls" id="depotinvoice-form-control" role="menu">
                    <a href="./#ajax/depotinvoice-form.php" class="btn-primary have-text"><i class="fa fa-plus"></i> Create Unpaid Depot Invoice</a>
                </div>';
            }
            ?>

        </header>
        <div>
            <div class="widget-body no-padding">
                <div id="message_form" role="alert" style="display:none"></div>
                <form class="smart-form" id="depotinvoice_form" method="post">
                    <div class="row padding-10" id="div_contact_info"></div>

                    <fieldset style="border-top: none; padding-top: 10px">
                        <div class="row">
                            <?= SmartForm::print_field('invoice_number', SmartForm::FORM_FIELD_INPUT, array(
                                'label' => 'Invoice number',
                                'class' => '' . (!hasPermission($depotinvoice_form, 'invoice_number', $depotinvoice_current_form) ? '" readonly="true' : ''),
                            ), 6, true, hasPermission($depotinvoice_form, 'invoice_number', 'show')) ?>
                            <?php if (hasPermission($depotinvoice_form, 'container_type_id', 'show')) { ?>
                                <section class="col col-6">
                                    <label for="company_name" class="input">Supplier<span class="link_to" data-view="link_to"
                                            data-form="#depotinvoice_form" data-control="company_name"
                                            data-name="containertype-form" data-param="id"></span></label>
                                    <select name="company_name" id="company_name" class="form-control"
                                        style="width:100%"></select>
                                </section>

                            <?php } ?>
                        </div>
                    </fieldset>

                    <fieldset style="border-top: none; padding-top: 10px">
                        <div class="row">
                            <?= SmartForm::print_field('depot_location', SmartForm::FORM_FIELD_INPUT, array(
                                'label' => 'Depot location',
                                'class' => '' . (!hasPermission($depotinvoice_form, 'depot_location', $depotinvoice_current_form) ? '" readonly="true' : ''),
                            ), 6, true, hasPermission($depotinvoice_form, 'depot_location', 'show')) ?>
                            <?= SmartForm::print_field('invoice_quantity', SmartForm::FORM_FIELD_INPUT, array(
                                'label' => 'Container Quantity',
                                'type' => 'number',
                                'class' => '' . (!hasPermission($depotinvoice_form, 'invoice_quantity', $depotinvoice_current_form) ? '" readonly="true' : ''),
                            ), 6, true, hasPermission($depotinvoice_form, 'invoice_quantity', 'show')) ?>
                        </div>
                    </fieldset>

                    <fieldset style="border-top: none; padding-top: 10px">
                        <div class="row">


                            <?= SmartForm::print_field('invoice_price', SmartForm::FORM_FIELD_INPUT, array(
                                'label' => 'Invoice Price',
                                'type' => 'number',
                                'icon' => 'fa-dollar',
                                'icon_append' => false,
                                'min' => 0,
                                'placeholder' => "0.00",
                                'attr' => array(
                                    'step=0.01',
                                    'number-to-fixed="2"',
                                    'data-number-stepfactor="100"',
                                    hasPermission($depotinvoice_form, 'invoice_price', $depotinvoice_form) ? '' : 'readonly="true"',
                                ),
                                'class' => 'input-currency currency' . (!hasPermission($depotinvoice_form, 'invoice_price', $depotinvoice_current_form) ? '" readonly="true' : ''),
                            ), 6, true, hasPermission($depotinvoice_form, 'invoice_price', 'show')) ?>

                            <!-- <?php if (hasPermission($depotinvoice_form, 'container_type_id', 'show')) { ?>
                                <section class="col col-6">
                                    <label class="input">Container Type <span class="link_to" data-view="link_to"
                                            data-form="#depotinvoice_form" data-control="container_type_name"
                                            data-name="containertype-form" data-param="id"></span></label>
                                    <select name="container_type_name" id="container_type_name" class="form-control"
                                        style="width:100%" <?php (!hasPermission($depotinvoice_form, 'container_type_id', $depotinvoice_current_form) ? ' disabled="disabled' : '') ?>></select>
                                </section>

                            <?php } ?> -->

                            <?php
                            if (hasPermission($depotinvoice_form, 'container_type_id', 'show')) {
                                ?>
                                <section class="col col-6" style='padding-right: 25px;'>
                                    <label class="input">Container Type</label>
                                    <select class="form-control" name="container_type_name" id="container_type_name">
                                        <option></option>
                                        <option value="1">20' Standard used CW wind and water tight</option>
                                        <option value="2">20' Standard NEW one trip</option>
                                        <option value="3">40' Standard used CW wind and water tight</option>
                                        <option value="4">40 Standard NEW one trip</option>
                                        <option value="5">40 High Cube used CW wind and water tight</option>
                                        <option value="6">40' High Cube NEW one trip</option>
                                    </select>
                                </section>
                            <?php } ?>

                        </div>
                    </fieldset>

                    <fieldset style="border-top: none; padding-top: 10px">
                        <div class="row">

                            <?php if (hasPermission($depotinvoice_form, 'depot_city', 'show')) { ?>
                                <section class="col col-6">
                                    <label class="input">Depot City <span class="link_to" data-view="link_to"
                                            data-form="#depotinvoice_form" data-control="depot_city"
                                            data-name="depotcity-form" data-param="id"></span></label>
                                    <select name="depot_city" id="depot_city" class="form-control" style="width:100%" <?php (!hasPermission($depotinvoice_form, 'depot_city', $depotinvoice_current_form) ? ' disabled="disabled' : '') ?>></select>
                                </section>

                            <?php } ?>

                            <?php if (hasPermission($depotinvoice_form, 'depot_id', 'show')) { ?>
                                <section class="col col-6">
                                    <div class="form-group">
                                        <label for="depot_name" class="input">Depot name <span class="link_to" data-view="link_to"
                                                data-form="#depotinvoice_form" data-control="depot_name"
                                                data-name="depotname-form" data-param="id"></span></label>
                                        <select name="depot_name" id="depot_name" class="form-control" style="width:100%"
                                            <?php (!hasPermission($depotinvoice_form, 'depot_id', $depotinvoice_current_form) ? ' disabled="disabled' : '') ?>></select>
                                    </div>
                                </section>
                            <?php } ?>

                        </div>
                    </fieldset>

                    <?php if ($depotinvoice_current_form == 'edit') { ?>
                        <fieldset style="border-top: none; padding-top: 10px">
                            <div class="row">
                                <?= SmartForm::print_field('release_number', SmartForm::FORM_FIELD_INPUT, array(
                                    'label' => 'Release number',
                                    'class' => '' . (!hasPermission($depotinvoice_form, 'release_number', $depotinvoice_current_form) ? '" readonly="true' : ''),
                                ), 6, true, hasPermission($depotinvoice_form, 'release_number', 'show')) ?>
                            </div>
                        </fieldset>
                    <?php } ?>

                    <!-- <fieldset style="border-top: none; padding-top: 10px">
                        <div class="row">
                            <?php if (hasPermission($depotinvoice_form, 'depot_id', 'show')) { ?>
                                <section class="col col-6">
                                    <label class="input">Product <span class="link_to" data-view="link_to"
                                            data-form="#depotinvoice_form" data-control="prod_name"
                                            data-name="prodname-form" data-param="id"></span></label>
                                    <select name="prod_name" id="prod_name" class="form-control" style="width:100%" <?php (!hasPermission($depotinvoice_form, 'depot_id', $depotinvoice_current_form) ? ' disabled="disabled' : '') ?>></select>
                                </section>
                            <?php } ?>
                        </div>
                    </fieldset> -->

                    <!-- <div class="row" style="padding-top: 10px; padding-left: 30px">
                        <label class="checkbox">
                            <input type="checkbox" name="invoice_paid" value="0" id="invoice_paid">
                            <i></i> Invoice Paid</label>
                    </div> -->

                    <footer>
                        <?php
                        if (hasPermission($depotinvoice_form, 'btnSubmitRateContainer', 'show')) {
                            echo '<button type="submit" id="btnSubmitContact" class="btn btn-primary">Submit</button>';
                        }
                        // button Back
                        if (hasPermission($depotinvoice_form, 'btnBackRateContainer', 'show')) {
                            echo '<button type="button" id="btnBackContact" class="btn btn-default"">Back</button>';
                        }
                        ?>
                    </footer>
                </form>
            </div>
        </div>
    </div>
</section>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.googlemap/1.5/jquery.googlemap.js"></script>


<script src="<?= ASSETS_URL; ?>/js/script/state.js"></script>
<?php if (basename($_SERVER['PHP_SELF']) == 'depot-form.php') { ?>
    <script src="<?= ASSETS_URL; ?>/js/script/note.js"></script>
    <script src="<?= ASSETS_URL; ?>/js/script/contact/track-email.js"></script>
    <script src="<?= ASSETS_URL; ?>/js/util/select-link.js"></script>
    <script src="<?= ASSETS_URL; ?>/js/script/contact/contact-notes.js"></script>
<?php } ?>
<script src="<?= ASSETS_URL; ?>/js/script/contact/contact-phone.js"></script>
<script src="<?= ASSETS_URL; ?>/js/script/validator.plus.js"></script>
<script src="<?= ASSETS_URL; ?>/js/script/contact/contact-append.js"></script>
<script src="<?= ASSETS_URL; ?>/js/script/depotinvoice/depotinvoice-form.js"></script>
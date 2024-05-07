<?php

$depotinvoice_form = 'RateContainerForm';

use \SmartUI\Components\SmartForm;

require_once 'inc/init.php';

$_authenticate->checkFormPermission($depotinvoice_form);


$depotinvoice_current_form = 'add';
if (hasIdParam() && basename($_SERVER['PHP_SELF']) == 'invoicerelease-form.php') {
    $depotinvoice_current_form = 'edit';
} else {
    $depotinvoice_current_form = 'add';
}

$isEdit = $depotinvoice_current_form == 'edit';

?>
<section id="widget-grid" class="">
    <div class="jarviswidget">
        <header>
            <h2>Unpaid Depot Invoice Release</h2>
        </header>
        <div>
            <div class="widget-body no-padding">
                <div id="message_form" role="alert" style="display:none"></div>
                <form class="smart-form" id="invoicerelease_form" method="post">
                    <div class="row padding-10" id="div_contact_info"></div>

                    <fieldset style="border-top: none; padding-top: 10px">
                        <div class="row">
                            <?= SmartForm::print_field('release_number', SmartForm::FORM_FIELD_INPUT, array(
                                'label' => 'Release number',
                                'class' => '' . (!hasPermission($depotinvoice_form, 'release_number', $depotinvoice_current_form) ? '" readonly="true' : ''),
                            ), 6, true, hasPermission($depotinvoice_form, 'release_number', 'show')) ?>
                        </div>
                    </fieldset>

                    

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
                            echo '<button type="button" id="btnCloseModel" class="btn btn-default"">Close</button>';
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
<script src="<?= ASSETS_URL; ?>/js/script/depotinvoice/invoicerelease-form.js"></script>
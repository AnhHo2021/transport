<p id="table_error"></p>
<table class="table" id="tbt_product" style="width:100%">
    <thead>
    <tr>
        <th style="width:40px;" class="text-center">Quantity</th>
        <th class="text-center">SKU</th>
        <th style="width:80px;" class="text-center">Min cos</th>
        <th style="width:80px;" class="text-center"> Delivery cost</th>
        <th style="width: 100px" class="text-center">Invoice price</th>
    </tr>
    </thead>
    <tbody></tbody>
    <tfoot>
    <tr>
        <td colspan="2">
            <div class="row m-t55">
                <?php
                if(hasPermission($order_form, 'caller_name', $operation_order)){
                ?>
                <section class="col col-4">
                    <label class="input">Caller name: </label>
                    <input type="text"  class="form-control" id="caller_name" placeholder="Caller name">
                </section>
                <?php }?>
                <?php
                if(hasPermission($order_form, 'date_called', $operation_order)){
                ?>
                <section class="col col-4">
                    <label class="input">Date called: </label>
                    <input type="date"  class="form-control datepicker" id="date_called" placeholder="Date called">
                </section>
                <?php }?>
                <?php
                if(hasPermission($order_form, 'call_given', $operation_order)){
                ?>
                <section class="col col-4">
                    <label class="input">&nbsp;</label>
                    <div class="inline-group m-t3">
                        <label class="checkbox">
                            <input type="checkbox" id="call_given">
                            <i></i>Welcome call given
                        </label>
                    </div>
                </section>
                <?php }?>
            </div>
        </td>
        <td colspan="2" class="text-right bold">
            <div class="padding-5" id="discount-code-text">Discount:</div>
            <div class="padding-5">Total:</div>
            <div class="padding-5">Paid:</div>
            <div class="padding-5 c-red">Remaining:</div>
        </td>
        <td class="text-right bold">
            <div class="text-center padding-5 text-right" id="discount-total">$ 0.00</div>
            <div class="text-center padding-5 text-right"id="order-total">$ 0.00</div>
            <div class="text-center padding-5 text-right"id="order-paid">$ 0.00</div>
            <div class="text-center padding-5 text-right"id="order-remaining">$ 0.00</div>
        </td>
    </tr>
    </tfoot>
</table>
<hr>
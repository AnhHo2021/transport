<?php if (basename($_SERVER['PHP_SELF']) != 'invoice-form.php') { ?>
   <caption>The table display products that have product class 'Warranty' or 'A La Carte'</caption>
<?php } ?>
<table id="tb_product_show" class="table table-tripped table-bordered" style="margin-bottom:15px;">
   <thead>
      <tr>
         <th style="width:100px;" class="text-center"># Order</th>
         <th class="text-center">Quantity</th>
         <th class="text-center">SKU</th>
         <th class="text-center">Min cost</th>
         <th class="text-center">Delivery cost</th>
         <th class="text-center">Invoice price</th>
         
      </tr>
   </thead>
   <tbody></tbody>
   <?php if ($_page == 'invoice-form') { ?>
      <tfoot>
         <tr class="bold">
            <td colspan="5" class="text-right">
                <div class="padding-5">Discount: </div>
                <div class="padding-5">Total: </div>
                <div class="padding-5">Total Paid Amount: </div>
                <div class="padding-5">Balance: </div>
            </td>
            <td  class="text-right">
                <div style="padding-top:5px; padding-bottom:5px;" id="_total_discount">$ 0.00</div>
               <div style="padding-top:5px; padding-bottom:5px;" id="_total_order">$ 0.00</div>
               <div style="padding-top:5px; padding-bottom:5px;" id="_payment_order">$ 0.00</div>

                <div style="padding-top:5px; padding-bottom:5px;" id="_balance_order">$ 0.00</div>

            </td>
         </tr>
      </tfoot><?php } else if ($_page == 'warranty-form') { ?>
      <tfoot>
         <tr>
            <td colspan="5" class="text-right bold">
               <div class="padding-5">Warranty Total: </div>
               <div class="padding-5">Contract Overage: </div>
               <div class="padding-5">Grand Total: </div>
            </td>
            <td class="bold text-right">
               <div style="padding-top:5px; padding-bottom:5px;" id="warranty_total_price">$ 0.00</div>
               <div style="padding-top:5px; padding-bottom:5px;" id="warranty_contract_overage">$ 0.00</div>
               <div style="padding-top:5px; padding-bottom:5px;" id="warranty_grand_total">$ 0.00</div>
            </td>
            <td></td>
         </tr>
      </tfoot>
   <?php } ?>
</table>
<?php if($_page != 'warranty-form'){ ?>
<input type="hidden" name="total" value="0" readonly="true">
<input type="hidden" name="payment" value="0" readonly="true">
<input type="hidden" name="balance" value="0" readonly="true">
<?php } ?>
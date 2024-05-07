function container_rate_avg(){}
container_rate_avg.NAME         = "container_rate_avg";
container_rate_avg.VERSION      = "1.2";
container_rate_avg.DESCRIPTION  = "Class container_rate_avg";

container_rate_avg.prototype.constructor = container_rate_avg;
container_rate_avg.prototype = {
    init:function(){
        $('#tbt_quote').on('change','.avg_rate_text',function(){
        });
        $('#tbt_quote').on('change','.qty',function(){
            qty = $(this).val();
            qty = parseInt(qty)
            if(qty >=2){
                if(parseInt($(this).closest('tr').find('.container_feet_type').val()) !=20){
                    qty =1
                }else{
                    qty =2
                }
            }
            $(this).val(qty)

            var qty = $(this).val();
            var price =$(this).closest('tr').find('.avg_rate').val()
            var distance =$(this).closest('tr').find('.distance').val()
            var rate_mile =$(this).closest('tr').find('.rate_mile').val()
            var $el_line_total = $(this).closest('tr').find('.line-total')
            var el_total = '#tbt_quote #quote-total'
            c_rate_avg.calculated_total(qty,price,rate_mile,distance,$el_line_total,el_total)
        });

        $('#tbt_quote').on('change','.avg_rate_text',function(){
            var qty = $(this).closest('tr').find('.qty').val();
            var price =numeral($(this).closest('tr').find('.avg_rate_text').val()).value()
            var distance =$(this).closest('tr').find('.distance').val()
            var rate_mile =$(this).closest('tr').find('.rate_mile').val()
            var $el_line_total = $(this).closest('tr').find('.line-total')
            var el_total = '#tbt_quote #quote-total'
            c_rate_avg.calculated_total(qty,price,rate_mile,distance,$el_line_total,el_total)
        });
    },
    /************************************/
    create_container_avg:function(data,el){
        var delivery = parseFloat(data.rate_mile) * parseFloat(data.distance);
        if(parseFloat(data.distance) <=100){
            delivery = rate_mile_shorter
        }
        var total_line = parseFloat(data.avg_rate) * parseInt(data.qty) +delivery
        var tr='<tr class="container-avg">' +
            '<input type="hidden" class="container_feet_type" value="'+data.container_feet_type+'">' +
            '<input type="hidden" class="avg_rate" value="'+data.avg_rate+'">' +
            '<input type="hidden" class="avg_cost" value="'+data.avg_cost+'">' +
            '<input type="hidden" class="avg_margin" value="'+data.avg_margin+'">' +

            '<input type="hidden" class="distance" value="'+data.distance+'">' +
            '<input type="hidden" class="rate_mile" value="'+data.rate_mile+'">' +
            '<td class="text-center"><input class="text-center qty" type="number" value="'+data.qty+'"></td>' +
            '<td class="text-center container_type_name_text">'+data.container_type_name+'</td>' +
            '<td class="text-center"><input class="text-center input-currency avg_rate_text" type="text" value="'+numeral(data.avg_rate).format('$ 0,0.00')+'"></td>' +
            '<td class="text-center none-bg delivery_cost">'+numeral(delivery).format('$ 0,0.00')+'</td>' +
            '<td class="text-center none-bg line-total">'+numeral(total_line).format('$ 0,0.00')+'</td>' +
            '</tr>'
        $(el).html(tr)

        var discount =0;
        var sub_total =total_line
        if($('#order_form #is-discount').val() !=''){
            if($('#order_form #is-discount-type').val() =='$'){
                discount = parseFloat($('#order_form #is-discount').val())
                sub_total = sub_total - discount
            }else{
                discount = parseFloat($('#order_form #is-discount').val()) * sub_total /100
                sub_total = sub_total - discount
            }
        }

        sub_total = numeral(sub_total).format('$ 0,0.00')
        discount = numeral(discount).format('$ 0,0.00')

        $('#tbt_quote #quote-total').text(numeral(sub_total).format('$ 0,0.00'))
        $('#tbt_quote #discount-code').text(numeral(discount).format('$ 0,0.00'))
    },
    /************************************/
    create_container_avg_edit:function(data,el){
        /*var delivery = parseFloat(data.rate_mile) * parseFloat(data.distance);
        if(parseFloat(data.distance) <=100){
            delivery = rate_mile_shorter
        }*/
        var delivery = parseFloat(data.delivery_cost)
        var total_line = parseFloat(data.avg_rate) * parseInt(data.qty) +delivery
        var tr='<tr class="container-avg">' +
            '<input type="hidden" class="container_feet_type" value="'+data.container_feet_type+'">' +
            '<input type="hidden" class="avg_rate" value="'+data.avg_rate+'">' +
            '<input type="hidden" class="avg_cost" value="'+data.avg_cost+'">' +
            '<input type="hidden" class="avg_margin" value="'+data.avg_margin+'">' +

            '<input type="hidden" class="distance" value="'+data.distance+'">' +
            '<input type="hidden" class="rate_mile" value="'+data.rate_mile+'">' +
            '<td class="text-center"><input class="text-center qty" type="number" value="'+data.qty+'"></td>' +
            '<td class="text-center container_type_name_text">'+data.container_type_name+'</td>' +
            '<td class="text-center"><input class="text-center input-currency avg_rate_text" type="text" value="'+numeral(data.avg_rate).format('$ 0,0.00')+'"></td>' +
            '<td class="text-center none-bg delivery_cost">'+numeral(delivery).format('$ 0,0.00')+'</td>' +
            '<td class="text-center none-bg line-total">'+numeral(total_line).format('$ 0,0.00')+'</td>' +
            '</tr>'
        $(el).html(tr)

        var discount =0;
        var sub_total =total_line
        if($('#order_form #is-discount').val() !=''){
            if($('#order_form #is-discount-type').val() =='$'){
                discount = parseFloat($('#order_form #is-discount').val())
                sub_total = sub_total - discount
            }else{
                discount = parseFloat($('#order_form #is-discount').val()) * sub_total /100
                sub_total = sub_total - discount
            }
        }

        sub_total = numeral(sub_total).format('$ 0,0.00')
        discount = numeral(discount).format('$ 0,0.00')

        $('#tbt_quote #quote-total').text(numeral(sub_total).format('$ 0,0.00'))
        $('#tbt_quote #discount-code').text(numeral(discount).format('$ 0,0.00'))
    },
    /************************************/
    calculated_total:function(qty,price,rate_mile,distance,$el_line_total,el_total,discount,discount_type,el_discount){
        var rate_mile = parseFloat(rate_mile) * parseFloat(distance);
        if(parseFloat(distance) <=100){
            rate_mile = rate_mile_shorter
        }
        var best_price = parseFloat(qty) * parseFloat(price)+rate_mile
        var total =best_price;
        if($('#order_form #is-discount').val() !=''){
            if($('#order_form #is-discount-type').val() =='$'){
                discount = parseFloat($('#order_form #is-discount').val())
                total = total - discount
            }else{
                discount = parseFloat($('#order_form #is-discount').val()) * sub_total /100
                total = total - discount
            }
        }

        $el_line_total.text(numeral(best_price).format('$ 0,0.00'))
        $(el_total).text(numeral(total).format('$ 0,0.00'))
    }
    /************************************/
 }


var c_rate_avg = new container_rate_avg();
$(function(){
    c_rate_avg.init();
});
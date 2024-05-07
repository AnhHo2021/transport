function product_tbl(){}
product_tbl.NAME         = "product_tbl";
product_tbl.VERSION      = "1.2";
product_tbl.DESCRIPTION  = "Class product_tbl";

product_tbl.prototype.constructor = product_tbl;
product_tbl.prototype = {
    init:function(){
    },
    /************************************/
    create_product_line:function(data,delivery_cost){
        if(data.length > 0){
            var tr= ''
            var total =0
            data.forEach(function(item){
                //var total_line = parseFloat(item.container_rate) * parseInt(item.quantity)
                //total += total_line
                tr +='<tr class="container-avg">' +
                    '<td class="text-center qty">'+item.quantity+'</td>' +
                    '<td class="text-center container_type_name_text">'+item.sku+'</td>' +
                    '<td class="text-center avg_rate_text">'+numeral(item.container_rate).format('$ 0,0.00')+'</td>' +
                    '<td class="text-center none-bg delivery_cost">'+numeral(delivery_cost).format('$ 0,0.00')+'</td>' +
                    '<td class="text-center none-bg line-total">'+numeral(item.line_total).format('$ 0,0.00')+'</td>' +
                    '</tr>'
            })
        }

        $('#tbt_product tbody').html(tr)
    },
    /************************************/
    create_product_line_bk:function(data){
        if(data.length > 0){
            var tr= ''
            var total =0
            data.forEach(function(item){
                //var total_line = parseFloat(item.container_rate) * parseInt(item.quantity)
                //total += total_line
                tr +='<tr class="container-avg">' +
                    '<td class="text-center qty">'+item.quantity+'</td>' +
                    '<td class="text-center container_type_name_text">'+item.sku+'</td>' +
                    '<td class="text-center avg_rate_text">'+numeral(item.container_rate).format('$ 0,0.00')+'</td>' +
                    '<td class="text-center none-bg avg_cost_text">'+numeral(item.container_cost).format('$ 0,0.00')+'</td>' +
                    '<td class="text-center none-bg line-total">'+numeral(item.line_total).format('$ 0,0.00')+'</td>' +
                    '</tr>'
            })
        }

        $('#tbt_product tbody').html(tr)
    },
    /************************************/
    calculated_total:function(qty,price,$el_line_total,el_total,discount,discount_type,el_discount){
        var best_price = parseFloat(qty) * parseFloat(price)
        $el_line_total.text(numeral(best_price).format('$ 0,0.00'))
        $(el_total).text(numeral(best_price).format('$ 0,0.00'))
    }
    /************************************/
}


var prod_tbl = new product_tbl();
$(function(){
    prod_tbl.init();
});
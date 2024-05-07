function IntList() { }
IntList.NAME         = "IntList";
IntList.VERSION      = "1.2";
IntList.DESCRIPTION  = "Class IntList";
IntList.prototype.constructor = IntList;
IntList.prototype = {
    init:function(){
        IntList.prototype.get_ints('','','','','','#pagination-tbl-inventory','#tbl-inventory tbody');

        $('.inventory-content .btn-search').unbind('click').bind('click',function(){
            var closest = $(this).closest('.inventory-content')
            var from_date = closest.find('.from-date').val()
            var to_date = closest.find('.to-date').val()
            var text_search = closest.find('.text-search').val()
            var select_type = closest.find('.select_type').val()
            var status = ''
            var line_num = closest.find('.line-nuber').val()

            var paginator_el ='#pagination-tbl-inventory'
            var tbl_el = '#tbl-inventory tbody'
            IntList.prototype.get_ints(from_date,to_date,line_num,text_search,select_type,paginator_el,tbl_el);
        });

        $('.datepicker').datepicker({
            container:'#assign-driver-modal',
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true,
            showOtherMonths: true,
            prevText: '<i class="fa fa-chevron-left"></i>',
            nextText: '<i class="fa fa-chevron-right"></i>'
        });
    },
    /***********************************/
    get_ints:function(from_date,to_date,line_num,text_search,select_type,pagination_el,tbl_el){
        $('.inventory-content .total-record').val(0)
        $(tbl_el).html('')
        var _link =link._inventory_search;
        var _data ={token:_token,from_date:from_date,
            to_date:to_date,
            text_search:text_search,
            select_type:select_type,
            limit:1,cursor:0
        }
        if(line_num =='') line_num =20

        if($(pagination_el).data("twbs-pagination")) $(pagination_el).twbsPagination('destroy');
        var $pagination = $(pagination_el);
        var defaultOpts = {
            totalPages: 20
        };
        $pagination.twbsPagination(defaultOpts);

        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": _link,
            "method": "POST",
            data:_data,
            dataType: 'json',
            error : function (status,xhr,error) {
            },
            success: function (data) {
                var totalRecords = parseInt(data.row_cnt);
                if(totalRecords == 0) return;
                var total_records = totalRecords;
                var remaining = 0
                if(totalRecords%line_num >0) remaining=1;

                var totalPages = remaining + (totalRecords -totalRecords%line_num)/line_num;

                var currentPage = $pagination.twbsPagination('getCurrentPage');
                $pagination.twbsPagination('destroy');
                $pagination.twbsPagination($.extend({}, defaultOpts, {
                    startPage: currentPage,
                    totalPages: totalPages,
                    visiblePages: 10,
                    onPageClick:function (event, page) {
                        //fetch content and render here
                        var cursor = (page-1)*line_num
                        var _data ={token:_token,from_date:from_date,
                            to_date:to_date,
                            text_search:text_search,
                            select_type:select_type,
                            limit:line_num,cursor:cursor
                        }

                        $.ajax({
                            "async": true,
                            "crossDomain": true,
                            "url": _link,
                            data:_data,
                            "method": "POST",
                            dataType: 'json',

                            error : function (status,xhr,error) {
                            },
                            success: function (res) {
                                if(res.int==undefined) return
                                if(res.int.length > 0){
                                    var tr =  IntList.prototype.show_order(res.int,pagination_el)
                                    $(tbl_el).html(tr)
                                    $('.inventory-content .total-record').val(total_records)

                                    $('.inventory-content .go-order').unbind('click').bind('click',function(){
                                        var order_id = $(this).find('.order-id').val()
                                        window.open(
                                            host2 + '#ajax/order-form.php?id='+order_id,
                                            '_blank'
                                        );
                                    })
                                }
                            }
                        });//end ajax get appointment at current page
                    } //end onPageClick
                }));
                //
            }
        });

    },
    /***********************************/
    show_order:function(data,el){
        var tr ='';
        data.forEach(function(item){
            var depot =''
            var city =
            item.depot_city =(item.depot_city !=null)?item.depot_city:''
           if(item.depot_id !=null && item.depot_id !=''){
                depot ='<a target="_blank" href="#ajax/depot-form.php?id='+item.depot_id+'">'+item.depot_name+'</a>'
                city = '<a target="_blank" href="#ajax/depot-form.php?id='+item.depot_id+'">'+item.depot_city+'</a>'
           }

            var sku = '<a target="_blank" href="#ajax/ratecontainer-form.php?id='+item.rate_container_id+'"' +
                'class ="absolute-report" >' +item.SKU +
                    '<div class="tooltiptext_2">Invoice number: ' +
                item.invoice_number+
                    '</div>' +
                '</a>'


            item.release_number =(item.release_number ==null)?"":item.release_number;
            var product_qty = item.product_qty
            var edit_date = item.edit_date
            var price = numeral(item.prod_cost).format('$ 0,0.00')
            var container_price = '$0'
            if(item.invoice_price !=null && item.invoice_price !='' &&
                item.invoice_quantity !=null && item.invoice_quantity !=''){
                container_price = parseFloat(item.invoice_price)/parseInt(item.invoice_quantity)
            }

            var quantity_used = item.quantity_used
            var order ='';
            var order_qty ='';
            var div_used  = '<div class="text-align-center">'+quantity_used+'</div>'
            var status_inventory =''
            var status_inventory_flag = false
            if(item.order_name.length > 0){
                var div_used1  =''
                var j=0
                item.order_name.forEach(function(item1){
                    var flag =false
                    var cls_close = ''
                    var cls_color =''
                    var status =''
                    if(item1.order_status !=undefined){
                        status = item1.order_status
                        if(item1.order_status == CLOSED){
                            flag = status_inventory_flag =true
                            cls_close ='b-ligh-grey'
                            cls_color ='c_black'
                        }else if(item1.order_status == CANCELLED){
                            flag= status_inventory_flag =true
                            cls_close ='b-grey'
                            cls_color ='c_black'
                        }else if(item1.order_status == PICKED_UP){
                            cls_close ='b-yellow'
                            cls_color ='c_black'
                        }else if(item1.order_status == DELIVERED){
                            flag = status_inventory_flag =true
                            cls_close ='b-delivery'
                            cls_color ='c_black'
                        }
                    }
                    status_inventory_flag = flag && status_inventory_flag
                    if(!status_inventory_flag){
                        status_inventory ="Pending"
                    }

                    j++
                    var clss = ''
                    if(j < item.order_name.length) clss = "ligh-ligh-gray"
                    div_used1  +='<div class="go-order '+clss+' '+cls_close+' '+cls_color+'">' +
                        '<input type="hidden" class="order-id" value="'+item1.order_id+'">' +
                           '<div class="p-l10r10">Order: '+item1.order_title+'</div>' +
                           '<div class="p-l10r10">Quantity: '+item1.qty_used+'</div>' +
                           '<div class="p-l10r10">Status: '+status+'</div>'+
                       '</div>'
                }) ;

                 div_used  ='<div class="absolute-report">' +
                    '<div class="text-align-center">'+quantity_used+'</div>' +
                    '<div class="tooltiptext_l">' +
                    div_used1 +
                    '</div>' +
                    '</div>'
            }

            tr +='<tr >' +
                '<td>'+depot+'</td>' +
                '<td>'+city+'</td>' +
                '<td>'+sku+'</td>' +
                '<td>'+item.container_type_name+'</td>' +
                '<td>'+price+'</td>' +
                '<td>'+container_price+'</td>' +
                '<td class="text-align-center">'+product_qty+'</td>' +
                '<td class="text-align-center">'+status_inventory+'</td>'+
                '<td class="text-align-center">'+div_used+'</td>' +
                '<td>'+item.release_number+'</td>' +
                '</tr>';
        });
        return tr
    },
    /***********************************/
}

var int_l = new IntList();
$(function(){
    int_l.init();
});
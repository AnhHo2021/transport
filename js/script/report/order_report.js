function order_report(){
    this.at_row =''
}
order_report.NAME         = "order_report";
order_report.VERSION      = "1.2";
order_report.DESCRIPTION  = "Class order_report";

order_report.prototype.constructor = order_report;
order_report.prototype = {
    init: function(){
        $('.ribbon-button-quote').css({"display":""})
        order_report.prototype.get_order('','','','','','','#pagination_tbl-order','#tbl-order tbody');
        order_report.prototype.get_order('','',NEEDS_TO_BE_SCHEDULED,'','','','#pagination_tbl-order-open','#tbl-order-open tbody');
        order_report.prototype.get_order('','',SCHEDULED_FOR_DELIVERY,'','','','#pagination_tbl-order-progress','#tbl-order-progress tbody');
        order_report.prototype.get_order('','',PICKED_UP,'','','','#pagination_tbl-order-pickup','#tbl-order-pickup tbody');
        order_report.prototype.get_order('','',DELIVERED,'','','','#pagination_tbl-order-delivery','#tbl-order-delivery tbody');
        order_report.prototype.get_order('','',CLOSED,'','','','#pagination_tbl-order-close','#tbl-order-close tbody');
        order_report.prototype.get_order('','',CANCELLED,'','','','#pagination_tbl-order-cancelled','#tbl-order-cancelled tbody');
        order_report.prototype.get_order('','',PROBLEMS,'','','','#pagination_tbl-order-problems','#tbl-order-problems tbody');
        order_report.prototype.get_order('','','','','','','#pagination_tbl-order-paid-driver','#tbl-order-paid-driver tbody');
        order_report.prototype.get_order('','','','','','','#pagination_tbl-order-paid-sales','#tbl-order-paid-sales tbody');

        $('#order-report .btn-search').unbind('click').bind('click',function(){
            var closest = $(this).closest('.order-content')
            var from_date = closest.find('.from-date').val()
            var to_date = closest.find('.to-date').val()
            var text_search = closest.find('.text-search').val()
            var status = closest.find('.status-filter').val()
            var line_num = closest.find('.line-nuber').val()
            var select_type = closest.find('.select_type').val()

            var paginator_el =''
            var tbl_el =''
            if(status ==NEEDS_TO_BE_SCHEDULED){
                paginator_el ='#pagination_tbl-order-open'
                tbl_el = '#tbl-order-open tbody'
            }else if(status ==SCHEDULED_FOR_DELIVERY){
                paginator_el ='#pagination_tbl-order-progress'
                tbl_el = '#tbl-order-progress tbody'
            }else if(status ==PICKED_UP){
                paginator_el ='#pagination_tbl-order-pickup'
                tbl_el = '#tbl-order-pickup tbody'
            }else if(status ==DELIVERED){
                paginator_el ='#pagination_tbl-order-delivery'
                tbl_el = '#tbl-order-delivery tbody'
            }else if(status ==CLOSED){
                paginator_el ='#pagination_tbl-order-close'
                tbl_el = '#tbl-order-close tbody'
            }else if(status ==CANCELLED){
                paginator_el ='#pagination_tbl-order-cancelled'
                tbl_el = '#tbl-order-cancelled tbody'
            }else if(status ==PROBLEMS){
                paginator_el ='#pagination_tbl-order-problems'
                tbl_el = '#tbl-order-problems tbody'
            }
            else if(status =='paid_driver'){
                paginator_el ='#pagination_tbl-order-paid-driver'
                tbl_el = '#tbl-order-paid-driver tbody'
            }else if(status =='paid_sales'){
                paginator_el ='#pagination_tbl-order-paid-sales'
                tbl_el = '#tbl-order-paid-sales tbody'
            }
            else{
                paginator_el ='#pagination_tbl-order'
                tbl_el = '#tbl-order tbody'
            }
            order_report.prototype.get_order(from_date,to_date,status,line_num,text_search,select_type,paginator_el,tbl_el);
        });

        $('#order-contain').on('click','.no-status',function(){
            var $me = $(this)
            if($(this).is(":checked")){
                order_report.prototype.get_order('','','OPEN','','','','#pagination_tbl-order','#tbl-order tbody');
                $('#order-contain .no-task').css({"display":""})
            }else{
                $('#order-contain .no-task').css({"display":"none"})
            }
        });
        $('#order-contain').on('click','.open-status',function(){
            var $me = $(this)
            if($(this).is(":checked")){
                $('#order-contain .task-open').css({"display":""})
                order_report.prototype.get_order('','',NEEDS_TO_BE_SCHEDULED,'','','','#pagination_tbl-order-open','#tbl-order-open tbody');
             }else{
                $('#order-contain .task-open').css({"display":"none"})
            }
        });
        $('#order-contain').on('click','.progress-status',function(){
            var $me = $(this)
            if($(this).is(":checked")){
                $('#order-contain .task-progress').css({"display":""})
                order_report.prototype.get_order('','',SCHEDULED_FOR_DELIVERY,'','','','#pagination_tbl-order-progress','#tbl-order-progress tbody');
            }else{
                $('#order-contain .task-progress').css({"display":"none"})
            }
        });
        $('#order-contain').on('click','.pickup-status',function(){
            var $me = $(this)
            if($(this).is(":checked")){
                $('#order-contain .task-pickup').css({"display":""})
                order_report.prototype.get_order('','',PICKED_UP,'','','','#pagination_tbl-order-pickup','#tbl-order-pickup tbody');
            }else{
                $('#order-contain .task-pickup').css({"display":"none"})
            }
        });
        $('#order-contain').on('click','.delivery-status',function(){
            var $me = $(this)
            if($(this).is(":checked")){
                $('#order-contain .task-delivery').css({"display":""})
                order_report.prototype.get_order('','',DELIVERED,'','','','#pagination_tbl-order-delivery','#tbl-order-delivery tbody');
            }else{
                $('#order-contain .task-delivery').css({"display":"none"})
            }
        });
        $('#order-contain').on('click','.close-status',function(){
            var $me = $(this)
            if($(this).is(":checked")){
                $('#order-contain .task-close').css({"display":""})
                order_report.prototype.get_order('','',CLOSED,'','','','#pagination_tbl-order-close','#tbl-order-close tbody');
            }else{
                $('#order-contain .task-close').css({"display":"none"})
            }
        });
        $('#order-contain').on('click','.cancelled-status',function(){
            var $me = $(this)
            if($(this).is(":checked")){
                $('#order-contain .task-cancelled').css({"display":""})
                order_report.prototype.get_order('','',CANCELLED,'','','','#pagination_tbl-order-cancelled','#tbl-order-cancelled tbody');
            }else{
                $('#order-contain .task-cancelled').css({"display":"none"})
            }
        });
        $('#order-contain').on('click','.problems-status',function(){
            var $me = $(this)
            if($(this).is(":checked")){
                $('#order-contain .task-problems').css({"display":""})
                order_report.prototype.get_order('','',PROBLEMS,'','','','#pagination_tbl-order-problems','#tbl-order-problems tbody');
            }else{
                $('#order-contain .task-problems').css({"display":"none"})
            }
        });
        $('#order-contain').on('click','.pay-driver',function(){
            var $me = $(this)
            if($(this).is(":checked")){
                $('#order-contain .task-pay-driver').css({"display":""})
                order_report.prototype.get_order('','','','','','','#pagination_tbl-order-paid-driver','#tbl-order-paid-driver tbody');
            }else{
                $('#order-contain .task-pay-driver').css({"display":"none"})
            }
        });
        $('#order-contain').on('click','.pay-salesperson',function(){
            var $me = $(this)
            if($(this).is(":checked")){
                $('#order-contain .order-pay-sales').css({"display":""})
                order_report.prototype.get_order('','','','','','','#pagination_tbl-order-paid-sales','#tbl-order-paid-sales tbody');
            }else{
                $('#order-contain .order-pay-sales').css({"display":"none"})
            }
        });

        $('#order-contain').on('click','.btn-move',function(){
           var $me = $(this);
           var status = $(this).closest('tr').find('select.status').val()
           var task_ids =[]
           $me.closest('table').find('.clss-row').each(function(){
                if($(this).find('.input-checked').is(":checked")){
                   var task_id =  $(this).find('.task_id').val();
                   var order_id =  $(this).find('.order_id').val();
                    task_ids.push({id:task_id,status:status,order_id:order_id})
                    $(this).remove();
                }
            });

            if(task_ids.length >0){
                order_report.prototype.update_status_task(task_ids,status)
            }
        });

        $('#order-contain').on('click','.add-task',function(){
            //var $me = $(this);
            order_report.prototype.at_row = $(this);
            order_report.prototype.reset_task();
            var order_id = $(this).closest('tr').find('.order_id').val()
            var order_title = $(this).closest('tr').find('.order_title').val()
            //var order_sku = $(this).closest('tr').find('.order_sku').val()
            var driver_id = $(this).closest('tr').find('.driver_id').val()
            var driver_name = $(this).closest('tr').find('.driver_name').val()
            order_report.prototype.add_task(order_id,order_title,'',driver_id,driver_name,$(this))
        });
        $('#order-contain').on('click','.edit-task',function(){
            common_f.prototype.reset_driver_modal()
            var task_id = $(this).closest('tr').find("task_id")
            var driver_id = $(this).closest('tr').find("driver_id")
            var driver_name = $(this).closest('tr').find("driver_name")
            var delivery_date = $(this).closest('tr').find("delivery_date")

            common_f.prototype.add_driver_delivery_date(task_id,driver_id,driver_name,delivery_date,$(this))
        });

        $('#close-modal-task').unbind('click').bind('click',function(){
            $('.modal').modal('hide');
            $('#TaskForm').trigger('reset');
        });

        $('#order-report .btn-excell').unbind('click').bind('click',function(){
            var closest = $(this).closest('.order-content')
            var from_date = closest.find('.from-date').val()
            var to_date = closest.find('.to-date').val()
            var text_search = closest.find('.text-search').val()
            var status = closest.find('.status-filter').val()
            var select_type = closest.find('.select_type').val()
            //console.log(status);
            order_report.prototype.down_load_report(from_date,to_date,text_search,status,select_type);
            order_report.prototype.email_report(from_date,to_date,text_search,status,select_type);
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

        $('#btn-add-quote').unbind('click').bind('click',function(){
            $('.modal').modal('hide');
            $("#order_form input").val('')
            $("#order_form select").val('')
            $("#order_form #avalible-depots").val('').trigger('change');
            var zip = $('.quote-zip').val()
            $("#order_form #order_zipcode").val(zip)
            find_depot.prototype.find_nearest_depots('','',zip,'','find_depot','#order_form #avalible-depots',
                '#order_form #container-rate-avg');
            $('#quote-modal').modal('show')
        });

        $('.quote-zip').keydown(function(e){
            if(e.keyCode==13){
                depots.prototype.reset_modal_home();
                var zip = $('.quote-zip').val()
                if(zip !=''){
                    $('.modal').modal('hide');
                    $("#home-page #search-depot-zip").val(zip)
                     depots.prototype.find_nearest_depots(zip);
                    $('#home-page-modal').modal('show')
                }
            }
        });
    },
    /***********************************/
    get_order:function(from_date,to_date,status,line_num,text_search,select_type,pagination_el,tbl_el){
        var _link =link._order_report;
        $(tbl_el).html('');
        var total_records =0
        if(tbl_el =='#tbl-order-open tbody'){
            $('.task-open .total-record').val(total_records)
        }else if(tbl_el =='#tbl-order-progress tbody'){
            $('.task-progress .total-record').val(total_records)
        }else if(tbl_el =='#tbl-order-pickup tbody'){
            $('.task-pickup .total-record').val(total_records)
        }else if(tbl_el =='#tbl-order-delivery tbody'){
            $('.task-delivery .total-record').val(total_records)
        }else if(tbl_el =='#tbl-order-close tbody'){
            $('.task-close .total-record').val(total_records)
        }else if(tbl_el =='#tbl-order-cancelled tbody'){
            $('.task-cancelled .total-record').val(total_records)
        }else if(tbl_el =='#tbl-order-problems tbody'){
            $('.task-problems .total-record').val(total_records)
        }else if(tbl_el =='#tbl-order-paid-driver tbody'){
            $('.task-pay-driver .total-record').val(total_records)
            _link =link._order_report_driver_paid
        }else if(tbl_el =='#tbl-order-paid-sales tbody'){
            $('.order-pay-sales .total-record').val(total_records)
            _link =link._order_report_salesperson_paid
        }else{
            $('.no-task .total-record').val(total_records)
        }
        $(tbl_el).html('')

        var _data ={token:_token,from_date:from_date,
            to_date:to_date,
            status:status,
            text_search:text_search,
            select_type:select_type,
            limit:1,cursor:0
        }
        if(line_num =='') line_num =10

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
                total_records = totalRecords;
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
                            status:status,
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
                                if(res.list==undefined) return
                                if(res.list.length > 0){
                                  var tr =  order_report.prototype.show_order(res.list,pagination_el)
                                    $(tbl_el).html(tr)

                                    if(tbl_el =='#tbl-order-open tbody'){
                                        $(tbl_el+ ' select.status option[value="NEEDS TO BE SCHEDULED"]').prop("selected", "selected");
                                        $('.task-open .total-record').val(total_records)
                                    }else if(tbl_el =='#tbl-order-progress tbody'){
                                        $(tbl_el+ ' select.status option[value="SCHEDULED FOR DELIVERY"]').prop("selected", "selected");
                                        $('.task-progress .total-record').val(total_records)
                                    }else if(tbl_el =='#tbl-order-pickup tbody'){
                                        $(tbl_el+ ' select.status option[value="PICKED UP"]').prop("selected", "selected");
                                        $('.task-pickup .total-record').val(total_records)
                                    }else if(tbl_el =='#tbl-order-delivery tbody'){
                                        $(tbl_el+ ' select.status option[value="DELIVERED"]').prop("selected", "selected");
                                        $('.task-delivery .total-record').val(total_records)
                                    }else if(tbl_el =='#tbl-order-close tbody'){
                                        $(tbl_el+ ' select.status option[value="CLOSED"]').prop("selected", "selected");
                                        $('.task-close .total-record').val(total_records)
                                    }else if(tbl_el =='#tbl-order-cancelled tbody'){
                                        $('.task-cancelled .total-record').val(total_records)
                                    }else if(tbl_el =='#tbl-order-problems tbody'){
                                        $('.task-problems .total-record').val(total_records)
                                    }else if(tbl_el =='#tbl-order-paid-driver tbody'){
                                        $('.task-pay-driver .total-record').val(total_records)
                                    }else if(tbl_el =='#tbl-order-paid-sales tbody'){
                                        $('.order-pay-sales .total-record').val(total_records)
                                    }else if(tbl_el =='#tbl-order-problems tbody'){
                                        $('.order-pay-sales .total-record').val(total_records)
                                    }else{
                                        $('.no-task .total-record').val(total_records)
                                    }
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
            var close =''
            var color =''
            if(item.order_status == CLOSED){
                close ='b-ligh-grey'
                color ='c_black'
            }else if( item.order_status ==DELIVERED){
                close ='b-delivery'
                color ='c_black'
            }else if(item.order_status == PICKED_UP){
                close ='b-yellow'
                color ='c_black'
            }
            var color1 =''
            color1 = color

                if(item.assign_task_delivery_date !='' && item.assign_task_delivery_date !=null){
                    var is_current_date = new Date();
                    var is_delivery_date =new Date(item.assign_task_delivery_date);
                    if(is_delivery_date !='Invalid Date' && is_delivery_date !='Invalid Date'){
                        if(is_delivery_date < is_current_date && item.order_status != CLOSED &&
                            item.order_status != DELIVERED && item.order_status != CANCELLED){
                            close ='b-orange'
                            color ='c-herf'
                            color1 =color
                        }
                    }

                }else{
                    color1 ='c-red'
                }
            var task_name =''
            var  delivery_date =''
            var task =''; var task_id =''
            if(item.assign_task_id !='' && item.assign_task_id !=null){
                if(item.assign_task_delivery_date !=null && item.assign_task_delivery_date !=''){
                    task_name = item.assign_task_delivery_date
                    delivery_date =item.assign_task_delivery_date
                }else{
                    task_name = item.assign_task_taskName
                }
                task  ='<a class="'+color+'" target="_blank" href="#ajax/task.php?id='+item.assign_task_id+'">'+task_name+'</a>'

                task_id = item.assign_task_id
            }else{
                task  ='<div class="add-task c-red" style="cursor: pointer; min-height: 20px;min-width: 20px">Add task</div>'
            }

            var order_title_link ='<a class="'+color+'" target="_blank" href="#ajax/order-form.php?id='+item.order_id+'">'+item.order_title+'</a>'
            var createTime = item.createTime.split(" ")[0]
            item.shipping_customer_name =(item.shipping_customer_name !=null)?item.shipping_customer_name:''
            var b_name  ='<a class="'+color+'" target="_blank" href="#ajax/contact-form.php?id='+item.b_ID+'">'+item.shipping_customer_name+'</a>'

            var b_phone = formatPhoneNumber_us(item.b_primary_phone)
            var b_email = item.b_primary_email
            item.b_address1 =(item.b_address1==null)?"":item.b_address1
            item.b_primary_city =(item.b_primary_city==null)?"":item.b_primary_city
            item.b_primary_state =(item.b_primary_state==null)?"":item.b_primary_state

            var b_addr = item.b_address1;
            b_addr =(b_addr=='')?item.b_primary_city:b_addr+","+item.b_primary_city
            b_addr =(b_addr=='')?item.b_primary_state:b_addr+","+item.b_primary_state

            var shipping_address = (item.shipping_address !=null)?item.shipping_address:''
            if(item.shipping_city !=null && item.shipping_city !='') shipping_address =shipping_address+", "+item.shipping_city
            if(item.shipping_state !=null && item.shipping_state !='') shipping_address =shipping_address+", "+item.shipping_state

            b_name ='<a class="absolute-report" target="_blank" href="#ajax/contact-form.php?id='+item.b_ID+'">' +
                '<div>'+item.shipping_customer_name+'</div>' +
                '<div class="tooltiptext">' +
                '<div>'+b_phone+'</div>' +
                '<div>'+b_email+'</div>' +
                '<div>'+shipping_address+'</div>' +
                '</div>'+
                '</a>'

            var b_address  =//'<a class="absolute-report '+color+'" target="_blank" href="#ajax/contact-form.php?id='+item.b_ID+'">'+

                    '<div  class="absolute-report '+color+'">'+shipping_address+
                    '<div class="tooltiptext">' +
                        '<div>Zip code: '+item.order_zipcode+'</div>' +
                        '<div>Distances: '+item.quote_temp_distance+' miles</div>'+
                    '</div>'+
                '</div>'
                //'</a>'

            var depot_addr ='<a class="'+color+'" target="_blank" href="#ajax/depot-form.php?id='+item.quote_temp_depot_id+'">'+item.quote_temp_depot_address+'</a>'
            var depot_phone = (item.depot_phone !=null)?formatPhoneNumber_us(item.depot_phone):''

            var depot ='<a class="absolute-report" target="_blank" href="#ajax/depot-form.php?id='+item.quote_temp_depot_id+'">' +
                '<div>'+item.quote_temp_depot_name+'</div>' +
                '<div class="tooltiptext">' +
                '<div>'+depot_phone+'</div>' +
                '<div>'+item.quote_temp_depot_address+'</div>'+
                '</div>'+
                '</a>'
            var release_n1 =''; var product_sku=''
            item.release.forEach(function(item1){
                release_n1 += '<div>Release number: '+item1+'</div>'
            });
            if(item.products_ordered !=null &&item.products_ordered !='' && item.products_ordered.length >0){
                item.products_ordered.forEach(function(item1){

                    product_sku += '<div>'+item1.sku+'</div>'
                });
            }
            var release_n=''
            if(release_n1 !=''){
                release_n ='<div class="tooltiptext">'+release_n1+'</div>'
            }
            var prod = '<div class="absolute-report '+color+'">' + product_sku + release_n + '</div>'

            var sale_div =''; var assign_task_driver_total =''
            var who_total_payment ='$ 0,0.00';
            var who_phone=''
            var who_mail=''
            var who_addr=''
            if(item.s_ID !=null && item.s_ID !=''){
                assign_task_driver_total = numeral(item.salesperson_amount).format('$ 0,0.00')
                if(item.salesperson_total_payment !=undefined){
                    who_total_payment = numeral(item.salesperson_total_payment).format('$ 0,0.00')
                }
                if(item.s_primary_phone !=null){
                    who_phone = formatPhoneNumber_us(item.s_primary_phone)
                }
                if(item.s_primary_email !=null) who_mail = item.s_primary_email
                if(item.s_primary_address1 !=null) who_addr = item.s_primary_address1
                if(item.s_primary_city !=null) who_addr = who_addr+','+item.s_primary_city
                if(item.s_primary_state !=null) who_addr = who_addr+','+item.s_primary_state

                sale_div ='<a class="absolute-report '+color+'" target="_blank" href="#ajax/contact-form.php?id='+item.s_ID+'">' +
                    '<div>'+item.s_name+'</div>' +
                    '<div class="tooltiptext">' +
                    '<div>'+who_phone+'</div>' +
                    '<div>'+who_mail+'</div>' +
                    '<div>'+who_addr+'</div>' +
                    '<div>Pay salesperson: '+assign_task_driver_total+'</div>'+
                    '<div class="c-red">Paid: ('+who_total_payment+')</div>' +
                    '</div>'+
                    '</a>'
            }
            var driver_div ='';
            var assign_task_driver_total =''
            var who_total_payment ='$ 0,0.00';
            var who_phone=''
            var who_mail=''
            var who_addr=''
            var date_accept = (item.date_accept !=null)?item.date_accept:''
            if(item.assign_task_driver_id){
                assign_task_driver_total = numeral(item.assign_task_driver_total).format('$ 0,0.00')
                if(item.driver_total_payment !=undefined){
                    who_total_payment = numeral(item.driver_total_payment).format('$ 0,0.00')
                }
                if(item.driver_primary_phone !=null){
                    who_phone =  formatPhoneNumber_us(item.driver_primary_phone)
                }
                if(item.driver_primary_email !=null) who_mail = item.driver_primary_email
                if(item.driver_primary_address1 !=null) who_addr = item.driver_primary_address1

                var driver_box_color = 'b-ligh-red'
                if(item.date_accept !='' && item.date_accept !=null){
                    var is_date_accept =new Date(item.date_accept);
                    if(is_date_accept !='Invalid Date'){
                        driver_box_color ='b-light-green'
                    }
                }

                driver_div ='<a class="absolute-report '+color+'" target="_blank" href="#ajax/profile.php?id='+item.assign_task_driver_id+'">' +
                    '<div>'+item.assign_task_driver_name+'</div>' +
                    '<div class="tooltiptext">' +
                    '<div>'+who_phone+'</div>' +
                    '<div>'+who_mail+'</div>' +
                    '<div>'+who_addr+'</div>' +
                    '<div>Date accept: '+date_accept+'</div>'+
                    '<div>Delivery: '+assign_task_driver_total+'</div>'+
                    '<div class="c-red">Paid: ('+who_total_payment+')</div>' +
                    release_n1+
                    '</div>'+
                    '</a>'
            }

            if(el=='#pagination_tbl-order-paid-sales'){

            }else{

            }

           // var cost = parseFloat(item.container_cost) * parseFloat(item.rate_cost)
            var cost = parseFloat(item.container_cost)
            var total_cost = cost
            var driver_total = 0
            if(item.assign_task_driver_total !=undefined){
                if(item.assign_task_driver_total !=null && item.assign_task_driver_total !=''){
                    driver_total =parseFloat(item.assign_task_driver_total)
                    total_cost = total_cost + driver_total
                }
            }
            var salesperson_amount =0
            if(item.salesperson_amount !=undefined){
                if(item.salesperson_amount !=null && item.salesperson_amount !=''){
                    salesperson_amount = parseFloat(item.salesperson_amount)
                    total_cost = total_cost + salesperson_amount
                }
            }

            var processing = parseFloat(item.total) * parseFloat(processing_percentage)
            total_cost = total_cost + processing
            total_cost = numeral(total_cost).format('$ 0,0.00')
            var div_cost ='<div class="absolute-report '+color+'">' +
                '<div>'+total_cost+'</div>' +
                    '<div class="tooltiptext">' +
                        '<div>Quantity: '+item.qty+'</div>' +
                        '<div>Container cost: '+numeral(cost).format('$ 0,0.00')+'</div>' +
                        '<div>Processing: '+numeral(processing).format('$ 0,0.00')+'</div>' +
                        '<div>Salesperson pay:'+numeral(salesperson_amount).format('$ 0,0.00')+'</div>' +
                        '<div>Delivery: '+numeral(driver_total).format('$ 0,0.00')+'</div>'+
                    '</div>'+
                '</div>'

            /*var c_type_name ='<a target="_blank" href="#ajax/ratecontainer-form.php?id='+item.rate_container_id+'">' +
                item.quote_temp_container_type_name +
                '</a>'*/

            var total = numeral(item.total).format('$ 0,0.00')
             total ='<a class="'+color+'" target="_blank" href="#ajax/invoice-form.php?id='+item.inv_id+'">'+total+'</a>'
            var payment = numeral(item.payment).format('$ 0,0.00')
             payment ='<a class="'+color+'" target="_blank" href="#ajax/invoice-form.php?id='+item.inv_id+'">'+payment+'</a>'

            tr +='<tr class="clss-row '+close+' '+color+'">' +
                        '<input type="hidden" class="task_id" value="'+task_id+'">' +
                        '<input type="hidden" class="order_id" value="'+item.order_id+'">' +
                        '<input type="hidden" class="order_title" value="'+item.order_title+'">' +
                        '<input type="hidden" class="order_sku" value="'+item.quote_temp_prod_SKU+'">' +
                        '<input type="hidden" class="driver_id" value="'+item.assign_task_driver_id+'">' +
                        '<input type="hidden" class="driver_name" value="'+item.assign_task_driver_name+'">' +
                        '<input type="hidden" class="delivery_date" value="'+delivery_date+'">' +
                    '<td>'+order_title_link+'</td>' +
                    '<td>'+createTime+'</td>' +
                    '<td>'+task+'</td>' +
                    '<td>'+b_name+'</td>' +
                    '<td>'+depot+'</td>' +
                    '<td>'+b_address+'</td>' +
                    '<td>'+item.quote_temp_container_type_name+'</td>' +
                    '<td>'+prod+'</td>' +
                    '<td class="is_driver '+driver_box_color+'">'+driver_div+'</td>' +
                    '<td>'+sale_div+'</td>' +
                    '<td>'+div_cost+'</td>' +
                    '<td>'+total+'</td>' +
                    '<td>'+payment+'</td>' +
                    '<td>' +
                        '<div class="inline-group">'+
                            '<label class="checkbox">' +
                                '<input type="checkbox" class="input-checked">' +
                                '<i></i>' +
                            '</label>' +
                        '</div>' +
                    '</td>' +
                '</tr>';
        });

        var is_disabled =''
        var option = '<option value="'+NEEDS_TO_BE_SCHEDULED+'">Scheduling</option> ' +
            '<option value="'+SCHEDULED_FOR_DELIVERY+'">Scheduled</option> ' +
            '<option value="'+PICKED_UP+'">Out for delivery</option> ' +
            '<option value="'+DELIVERED+'">Delivered</option> ' +
            '<option value="'+CLOSED+'">Billing and close out</option>'+
            '<option value="'+PROBLEMS+'">Problems</option>'
        //console.log(el)
        if(el !='#pagination_tbl-order-cancelled' &&
            el !='#pagination_tbl-order-paid-driver' &&
            el !='#pagination_tbl-order-paid-sales'){

            if(el =='#pagination_tbl-order-close'){
                is_disabled ='disabled ="disabled"'
            }else if(el =='#pagination_tbl-order-delivery'){
                option = '<option value="'+DELIVERED+'">Delivered</option> ' +
                    '<option value="'+CLOSED+'">Billing and close out</option> '
            }else if(el =='#pagination_tbl-order'){
                option = '<option value="'+NEEDS_TO_BE_SCHEDULED+'">Scheduling</option> ' +
                    '<option value="'+CANCELLED+'">Cancelled</option> ' +
                    '<option value="'+CLOSED+'">Billing and close out</option>'+
                    '<option value="'+PROBLEMS+'">Problems</option> '
            }

            tr += '<tr>' +
                '<td colspan ="13">' +
                    '<div style="float: right!important;">' +
                        '<button class="btn btn-sm btn-primary btn-move">Move</button>' +
                    '</div>' +
                    '<div class="m-r20" style="float: right!important;">' +
                        '<select class="form-control status" '+is_disabled+'>' +
                        option +
                        '</select>' +
                    '</div>' +
                '</td>' +
                '</tr>'
        }

        return tr
    },
    /***********************************/
    update_status_task:function(tasks,$status){
        var _formData = {
            token: localStorage.getItemValue('token'),
            jwt: localStorage.getItemValue('jwt'),
            private_key: localStorage.getItemValue('userID'),
            data_post:tasks
        }
        var _link =link._task_update_report;
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": _link,
            "method": "POST",
            dataType: 'json',
            data:_formData,
            error : function (status,xhr,error) {
            },
            success: function (data){
                if($status ==NEEDS_TO_BE_SCHEDULED){
                   order_report.prototype.get_order('','',NEEDS_TO_BE_SCHEDULED,'','','','#pagination_tbl-order-open','#tbl-order-open tbody');
                   $('#order-contain .task-open').find('.select_type').val("")
                   $('#order-contain .task-open').find('.from-date').val("")
                   $('#order-contain .task-open').find('.to-date').val("")
                   $('#order-contain .task-open').find('.to-date').val("10")
                }else if($status ==SCHEDULED_FOR_DELIVERY){
                    order_report.prototype.get_order('','',SCHEDULED_FOR_DELIVERY,'','','','#pagination_tbl-order-progress','#tbl-order-progress tbody');
                    $('#order-contain .task-progress').find('.select_type').val("")
                    $('#order-contain .task-progress').find('.from-date').val("")
                    $('#order-contain .task-progress').find('.to-date').val("")
                    $('#order-contain .task-progress').find('.line-nuber').val("10")
                }else if($status ==PICKED_UP){
                    order_report.prototype.get_order('','',PICKED_UP,'','','','#pagination_tbl-order-pickup','#tbl-order-pickup tbody');
                    $('#order-contain .task-pickup').find('.select_type').val("")
                    $('#order-contain .task-pickup').find('.from-date').val("")
                    $('#order-contain .task-pickup').find('.to-date').val("")
                    $('#order-contain .task-pickup').find('.line-nuber').val("10")
                }else if($status ==DELIVERED){
                    order_report.prototype.get_order('','',DELIVERED,'','','','#pagination_tbl-order-delivery','#tbl-order-delivery tbody');
                    $('#order-contain .task-delivery').find('.select_type').val("")
                    $('#order-contain .task-delivery').find('.from-date').val("")
                    $('#order-contain .task-delivery').find('.to-date').val("")
                    $('#order-contain .task-delivery').find('.line-nuber').val("10")
                }else if($status ==CLOSED){
                    order_report.prototype.get_order('','',CLOSED,'','','','#pagination_tbl-order-close','#tbl-order-close tbody');
                    $('#order-contain .task-close').find('.select_type').val("")
                    $('#order-contain .task-close').find('.from-date').val("")
                    $('#order-contain .task-close').find('.to-date').val("")
                    $('#order-contain .task-close').find('.line-nuber').val("10")
                }else if($status ==PROBLEMS){
                    order_report.prototype.get_order('','',PROBLEMS,'','','','#pagination_tbl-order-problems','#tbl-order-problems tbody');
                    $('#order-contain .task-close').find('.select_type').val("")
                    $('#order-contain .task-close').find('.from-date').val("")
                    $('#order-contain .task-close').find('.to-date').val("")
                    $('#order-contain .task-close').find('.line-nuber').val("10")
                }
            }
        });
    },
    /**********************************/
    down_load_report:function(from_date,to_date,text_search,status,select_type){
        $.ajax({
            async: true,
            url: link.order_report,
            type: 'post',
            data: {token:_token,from_date:from_date,to_date:to_date,
                text_search:text_search,status:status,
                select_type:select_type},
            dataType: 'json',
            success: function (res) {
                var url_link = document.createElement('a');
                url_link.href = res.url_download_file;
                url_link.download = res.filename;
                //a.dispatchEvent(new MouseEvent('click'));
                document.body.appendChild(url_link);
                url_link.click();
                url_link.parentNode.removeChild(url_link);

                //remove
                 $.ajax({
                    url: link.delete_file,
                    type: 'post',
                    data: {filename:res.filename},
                    success: function (res1) {

                    }
                });
                /////
            }
        });

    },
    /**********************************/
    email_report:function(from_date,to_date,text_search,status,select_type){
        $.ajax({
            async: true,
            url: link._order_report_email,
            type: 'post',
            data: {token:_token,from_date:from_date,to_date:to_date,
                text_search:text_search,status:status,
                select_type:select_type},
            dataType: 'json',
            success: function (res) {
            }
        });

    },
    /***********************************/
    delete_row:function(){
        if(order_report.prototype.at_row !=''){
            order_report.prototype.at_row.closest('tr').remove();
            order_report.prototype.at_row='';

            order_report.prototype.get_order('','',NEEDS_TO_BE_SCHEDULED,'','','#pagination_tbl-order-open','#tbl-order-open tbody');
            $('#task-modal').modal("hide")
            $('#task_form').trigger('reset');
            $('#order-contain .task-open').find('.from-date').val("")
            $('#order-contain .task-open').find('.to-date').val("")
            $('#order-contain .task-open').find('.to-date').val("10")
        }
    },
    /***********************************/
    add_task:function(order_id,order_title,order_sku,driver_id,driver_name,$me){
        $('#task-modal').modal("show")
        var _formData = {
            token: localStorage.getItemValue('token'),
            jwt: localStorage.getItemValue('jwt'),
            private_key: localStorage.getItemValue('userID'),
            order_id:order_id
        }
        var _link =link._order_for_task;
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": _link,
            "method": "POST",
            dataType: 'json',
            data:_formData,
            error : function (status,xhr,error) {
            },
            success: function (data){
                if(data.order.order_id !=undefined){
                    var item= data.order
                    var option = '<option value="'+item.order_id+'" depot_id="'+item.depot_id+'" container_type_id="'+item.container_type_id+'" distance="'+item.mile+'" qty="'+item.qty+'">'+item.order_title+'</option>'
                    $('#task_form #assign_order').html(option).trigger('change')
                }
            }
        });

        if(driver_id !=null && driver_id !='' && driver_id !=undefined){
            $('#task-modal #assign_driver_id').html('<option value="'+driver_id+'">'+driver_name+'</option>').trigger('change');
            //$('#task-modal .driver-rate .hide-content').removeClass('hide-content')
        }

       /* $('#assign-driver-modal .datepicker').datepicker({
            container:'#assign-driver-modal',
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true,
            showOtherMonths: true,
            prevText: '<i class="fa fa-chevron-left"></i>',
            nextText: '<i class="fa fa-chevron-right"></i>'
        });*/
    },
    /***********************************/
    reset_task:function(){
        $("input[name=taskName]").val('')
        $("input[name=deliverydate]").val('')
        $("input[name=deliverytime]").val('')
        $("input[name=actionset]").val('order')
        $("input[name=status]").val(NEEDS_TO_BE_SCHEDULED)
        $('#assign_order').html('')
        $('#assign_order').val('').trigger("change");
        $('#assign_driver_id').val('').trigger("change");
    }
    /***********************************/
}
var o_report = new order_report();
$(function(){
    o_report.init();
});

function common_f(){
}
common_f.NAME         = "common_f";
common_f.VERSION      = "1.2";
common_f.DESCRIPTION  = "Class common_f";

common_f.prototype.constructor = common_f;
common_f.prototype = {
    roles:function(el1,el2){
        var link3 = link._roles;
        //console.log(link3)
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": link3,
            "method": "POST",
            dataType: 'json',
            data:{
                token:_token,
                jwt:localStorage.getItemValue('jwt'),
                private_key:localStorage.getItemValue('userID')
            },
            //contentType: 'application/json',//use when post a form
            error : function (status,xhr,error) {
            },
            success: function (res) {
                //console.log(res);
                var option='';
                if(res.roles.length>0){
                    res.roles.forEach(function(item){
                        option +='<option value="'+item+'">'+item+'</option> ';
                    })
                }
                $(el2).append(option)
                var option ='';
                if(res.units.length>0){
                    res.units.forEach(function(item){
                        option +='<option value="'+item+'">'+item+'</option> ';
                    })
                }

                $(el1).append(option)
            }
        });
    },
    /*****************************/
    acl_lists:function(el1,unit,role){
        var link3 = link._group_role_unit;
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": link3,
            "method": "POST",
            dataType: 'json',
            data:{
                token:_token,
                jwt:localStorage.getItemValue('jwt'),
                private_key:localStorage.getItemValue('userID'),
                role:role ,
                department:unit
            },
            //contentType: 'application/json',//use when post a form
            error : function (status,xhr,error) {
            },
            success: function (res) {
                //console.log(res);
                var option='<option value=""></option>';
                if(res.list.length>0){
                    res.list.forEach(function(item){
                        option +='<option value="'+item.ID+'">'+item.group_name+'</option> ';
                    })
                }
                $(el1).html(option)
            }
        });
    },
    /**********************************************/
    validate_email:function(email){
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(email);
    },
    /**************************/
    validate_phone:function(cus_phone){
        var phone ='';
        var pattern = /^\(\d{3}\)\s\d{3}-\d{4}$/; //(xxx) xxx-xxxx
        if(!pattern.test(cus_phone)){
            phone = cus_phone.replace(/\D/g,'');
            var regex = /^\d{10}$/;
            var is_valid = regex.test(phone);
            if(!is_valid){
                phone ='';
            }else{
                phone = phone.slice(0,3) + phone.slice(3,6)+phone.slice(6,10);
            }
        }
        return phone
    },
    /***********************************/
   /* add_driver_delivery_date:function(task_id,driver_id,driver_name,delivery_date,$me){
        $('#assign-driver-modal').modal('show');
         $('#assign-driver-modal .datepicker').datepicker({
             container:'#assign-driver-modal',
         dateFormat: 'yy-mm-dd',
         changeMonth: true,
         changeYear: true,
         showOtherMonths: true,
         prevText: '<i class="fa fa-chevron-left"></i>',
         nextText: '<i class="fa fa-chevron-right"></i>'
         });
    },*/
    /**********************************/
    reset_driver_modal:function(){
        $('#assign-driver-modal #task-id').val('')
        $('#assign-driver-modal #driver-id').val('').trigger("change")
        $('#assign-driver-modal #delivery-date').val('')
        $('#assign-driver-modal #delivery-time').val('')
    },
    /***************************************/
    verifyDiscountCode:function(discount_code){
        var _formData = {
            token: localStorage.getItemValue('token'),
            discount_code:discount_code
        }
        var _link =link._discount_code_check;
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": _link,
            "method": "POST",
            dataType: 'json',
            data:_formData,
            error : function (status,xhr,error) {
            },
            success: function (res){
                if(res.ERROR==''){
                    var discount = parseFloat(res.item.discount)
                    if(discount >0){
                        $('#order_form #is-discount').val(discount)
                        $('#order_form #is-discount-type').val(res.item.discount_type)
                        common_f.prototype.sub_total_discount()
                    }else{
                        $('#order_form #discount_code').val('')
                        $('#order_form .discount-code-error').css({"display":""});
                        $('#order_form #is-discount').val("")
                        $('#order_form #is-discount-type').val('')
                        common_f.prototype.sub_total_discount()
                    }
                }
            }
        })
    },
    /**************************************/
    sub_total_discount:function(){
        var sub_total =0;
        /*var qty = $('#order_form .qty').val()
        var price = $('#order_form .avg_rate').val()
        var distance = $('#order_form .distance').val()
        var rate_mile = $('#order_form .rate_mile').val()
        rate_mile = parseFloat(rate_mile) * parseFloat(distance);
        if(parseFloat(distance) <=100){
            rate_mile = rate_mile_shorter
        }
        var totoline = parseFloat(qty) * parseFloat(price)+ rate_mile
        var discount =0;
        sub_total = totoline; */
        var discount =0;
        sub_total = numeral($('#order_form .line-total').text()).value()
        if($('#order_form #is-discount').val() !=''){
            if($('#order_form #is-discount-type').val() =='$'){
                discount = parseFloat($('#order_form #is-discount').val())
                sub_total = sub_total - discount
            }else{
                discount = parseFloat($('#order_form #is-discount').val()) * sub_total /100
                sub_total = sub_total - discount
            }
        }
        //totoline = numeral(totoline).format('$ 0,0.00')
        sub_total = numeral(sub_total).format('$ 0,0.00')
        discount = numeral(discount).format('$ 0,0.00')

        $('#tbt_quote #quote-total').text(numeral(sub_total).format('$ 0,0.00'))
        $('#tbt_quote #discount-code').text(numeral(discount).format('$ 0,0.00'))
       // $('#tbt_quote .line-total').text(numeral(totoline).format('$ 0,0.00'))
    },

    /****************************/
    get_inventory_depot_type:function(container_type_id,depot_id,maximun,element){
        $('#order_form .show-container-type').css({"display":""})
        var link1 = link._inventorys_depot_type
        $(element).select2({
            multiple: true,
            maximumSelectionLength: maximun,
            ajax: {
                "async": true,
                "crossDomain": true,
                url: link1,
                type: 'post',
                dataType: 'json',
                delay: 300,
                data: function (params) {
                    var _data = {token:_token,text_search:params.term,depot_id:depot_id,container_type_id:container_type_id}
                    return _data;
                },
                processResults: function (data, params) {
                    data1 = $.map(data, function (obj) {
                        var container_rate = parseFloat(obj.container_cost) + parseFloat(obj.rate_container_margin)
                        return {
                            text:obj.prod_SKU,
                            id:obj.prod_id,
                            product_qty:obj.product_qty,
                            container_type_name:obj.container_type_name,
                            container_type_id:obj.container_type_id,
                            container_feet_type:obj.container_feet_type,
                            rate_container_margin:obj.rate_container_margin,
                            prod_name:obj.prod_name,
                            container_rate:container_rate,
                            container_cost:obj.container_cost,
                            release_number:obj.release_number
                        };
                    });
                    //console.log(data1);
                    return { results: data1 }

                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; },
            templateResult: function (data) {
                return '<div class="padding-5">' +
                    '<div class="select2-result-repository__title">' +data.text +'</div>' +
                    '<div class="select2-result-repository__title"> Cost: ' +numeral(data.container_cost).format('$ 0,0.00') +'</div>' +
                    '<div class="select2-result-repository__title">Qty: '+ data.product_qty +'</div>' +
                    '</div>';

            },
            templateSelection: function (data) {
                $(element).find('option').attr('container_rate', data.container_rate);
                $(element).find('option').attr('container_cost', data.container_cost);
                $(element).find('option').attr('container_feet_type', data.container_feet_type);
                $(element).find('option').attr('product_qty', data.product_qty);
                $(element).find('option').attr('prod_name', data.prod_name);
                $(element).find('option').attr('prod_SKU', data.prod_SKU);
                $(element).find('option').attr('release_number', data.release_number);
                $(element).find('option').attr('rate_container_margin', data.rate_container_margin);
                if (!data.text) return data.id;
                else return data.text;
            }
        })
    },
    /****************************/
    reload_dashboard_admin:function(status){
        var paginator_el =''
        var tbl_el =''
        if(status ==NEEDS_TO_BE_SCHEDULED){
            var closest = $('#tbl-order-open').closest('.order-content')
            var from_date = closest.find('.from-date').val()
            var to_date = closest.find('.to-date').val()
            var text_search = closest.find('.text-search').val()
            var status = closest.find('.status-filter').val()
            var line_num = closest.find('.line-nuber').val()
            var select_type = closest.find('.select_type').val()

            paginator_el ='#pagination_tbl-order-open'
            tbl_el = '#tbl-order-open tbody'
        }else if(status ==SCHEDULED_FOR_DELIVERY){
            var closest = $('#tbl-order-progress').closest('.order-content')
            var from_date = closest.find('.from-date').val()
            var to_date = closest.find('.to-date').val()
            var text_search = closest.find('.text-search').val()
            var status = closest.find('.status-filter').val()
            var line_num = closest.find('.line-nuber').val()
            var select_type = closest.find('.select_type').val()

            paginator_el ='#pagination_tbl-order-progress'
            tbl_el = '#tbl-order-progress tbody'
        }else if(status ==PICKED_UP){
            var closest = $('#tbl-order-pickup').closest('.order-content')
            var from_date = closest.find('.from-date').val()
            var to_date = closest.find('.to-date').val()
            var text_search = closest.find('.text-search').val()
            var status = closest.find('.status-filter').val()
            var line_num = closest.find('.line-nuber').val()
            var select_type = closest.find('.select_type').val()

            paginator_el ='#pagination_tbl-order-pickup'
            tbl_el = '#tbl-order-pickup tbody'
        }else if(status ==DELIVERED){
            var closest = $('#tbl-order-delivery').closest('.order-content')
            var from_date = closest.find('.from-date').val()
            var to_date = closest.find('.to-date').val()
            var text_search = closest.find('.text-search').val()
            var status = closest.find('.status-filter').val()
            var line_num = closest.find('.line-nuber').val()
            var select_type = closest.find('.select_type').val()

            paginator_el ='#pagination_tbl-order-delivery'
            tbl_el = '#tbl-order-delivery tbody'
        }else if(status ==CLOSED){
            var closest = $('#tbl-order-close').closest('.order-content')
            var from_date = closest.find('.from-date').val()
            var to_date = closest.find('.to-date').val()
            var text_search = closest.find('.text-search').val()
            var status = closest.find('.status-filter').val()
            var line_num = closest.find('.line-nuber').val()
            var select_type = closest.find('.select_type').val()

            paginator_el ='#pagination_tbl-order-close'
            tbl_el = '#tbl-order-close tbody'
        }else if(status ==CANCELLED){
            var closest = $('#tbl-order-cancelled').closest('.order-content')
            var from_date = closest.find('.from-date').val()
            var to_date = closest.find('.to-date').val()
            var text_search = closest.find('.text-search').val()
            var status = closest.find('.status-filter').val()
            var line_num = closest.find('.line-nuber').val()
            var select_type = closest.find('.select_type').val()

            paginator_el ='#pagination_tbl-order-cancelled'
            tbl_el = '#tbl-order-cancelled tbody'
        }else if(status ==PROBLEMS){
            var closest = $('#tbl-order-problems').closest('.order-content')
            var from_date = closest.find('.from-date').val()
            var to_date = closest.find('.to-date').val()
            var text_search = closest.find('.text-search').val()
            var status = closest.find('.status-filter').val()
            var line_num = closest.find('.line-nuber').val()
            var select_type = closest.find('.select_type').val()

            paginator_el ='#pagination_tbl-order-problems'
            tbl_el = '#tbl-order-problems tbody'
        }else{
            var closest = $('#tbl-order').closest('.order-content')
            var from_date = closest.find('.from-date').val()
            var to_date = closest.find('.to-date').val()
            var text_search = closest.find('.text-search').val()
            var status = closest.find('.status-filter').val()
            var line_num = closest.find('.line-nuber').val()
            var select_type = closest.find('.select_type').val()

            paginator_el ='#pagination_tbl-order'
            tbl_el = '#tbl-order tbody'
        }
        order_report.prototype.get_order(from_date,to_date,status,line_num,text_search,select_type,paginator_el,tbl_el);
    }
    /*********************************/
}


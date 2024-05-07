function Order() { }
Order.prototype.constructor = Order;
Order.prototype = {
    init: function (callback) {
        this.forwardFromContact();
        billto_select2_el("#order_form #bill_to_ID",link._contact_search)
        salesman_select2_el("#order_form #salespersonId",link._salesmanListSearch)
        var order_id= parseInt(getUrlParaOnlyID('id'))
        if(!isNaN(order_id)){
            _order_form.get_quote_id(order_id)
        }


        $('#order_form #customer-state').change(function(){
            var state =$(this).val()
            _order_form.get_city(state,'#order_form #customer-city')
        });

        $('#order_form #discount_code').change(function(){
            $('#order_form .discount-code-error').css({"display":"none"});
            common_f.prototype.verifyDiscountCode($(this).val())
        });

        _order_form.bindEvent()
    },
    bindEvent: function () {
        $('#order_form .datepicker').datepicker({
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true,
            showOtherMonths: true,
            prevText: '<i class="fa fa-chevron-left"></i>',
            nextText: '<i class="fa fa-chevron-right"></i>'
        });

        if (document.location.href.indexOf('quote-form') >= 0) {
            $('#btnBackOrder').on('click', function () {
                window.history.back();
            });
        }

        $('#btnBackContact').off('click');
        $('#btnBackContact').text('Cancel');
        $('#btnBackContact').bind('click', function () {
            $('.modal').modal('hide');
            $('#contact_form').trigger('reset');
        });


        $('#order_form #order_zipcode').keydown(function(e){
            if(e.keyCode==13){
                $('#order_form #avalible-depots').html('')
                $('#tbt_quote tbody').html('')
                $('#tbt_quote #discount-code').text(numeral(0).format('$ 0,0.00'));
                $('#tbt_quote #quote-total').text(numeral(0).format('$ 0,0.00'));
                /*find_depot.prototype.find_nearest_depots('','',$(this).val(),'','find_depot','#order_form #avalible-depots',
                    '#order_form #container-rate-avg');
                */
            }
        });

        $('#order_form #order_zipcode').change(function(){
            if($('#first-load-page').val() !=''){
                $('#order_form #avalible-depots').html('')
                $('#tbt_quote tbody').html('')
                $('#tbt_quote #discount-code').text(numeral(0).format('$ 0,0.00'));
                $('#tbt_quote #quote-total').text(numeral(0).format('$ 0,0.00'));
               /* find_depot.prototype.find_nearest_depots('','',$(this).val(),'','find_depot','#order_form #avalible-depots',
                    '#order_form #container-rate-avg');
                */
            }
            $('#first-load-page').val('1')
        });

        $('#submit-order').unbind('click').bind('click',function(){
            _order_form.update_order('')
        });
        $('#order_form .btnPaymentOrder').click(function () {
           var inv_id= $('#order_form #invoice-id').val()
            if (inv_id !='') {
               window.open('./#ajax/invoice-form.php?id=' + inv_id, '_blank');
            }
        });
    },

    /********************************/
    forwardFromContact: function () {
        if (getUrlParameter('contactid')) {
            var bill_to = getUrlParameter('contactid');
            var buyer_name = getUrlParameter('contactname');
            $('select[name="bill_to"]').append('<option value="' + bill_to + '">' + buyer_name + '</option>').trigger('change');

        }
    },
    /******************************/
    get_city:function(state,el,city_name){
        $(el).html('')
        var _formData = {
            token: localStorage.getItemValue('token'),
            jwt: localStorage.getItemValue('jwt'),
            private_key: localStorage.getItemValue('userID'),
            state:state
        }
        var _link =link._getCityListByState;
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
                if(data.city !=undefined){
                    if(data.city.length>0){
                        var option =''
                        data.city.forEach(function(item){
                            var selected =''
                            if(item.city==city_name){
                                selected ='selected="selected"'
                            }
                            option +='<option value="'+item.city+'" '+selected+'>'+item.city+'</option>'
                        });
                        $(el).html(option)
                        $.fn.select2.amd.require(['select2/compat/matcher'], function (oldMatcher) {
                            $(el).select2({
                                matcher: oldMatcher(matchStart)
                            })
                        });

                    }
                }
            }
        })
    },
    /******************************/
    update_order:function(quote_id){
        var salesperson = $('#order_form #salespersonId').val()
        var order_doors = $('#order_form #order_doors').val()
        var order_title = $("input[name=order_title]").val();
        var note = $("input[name=note]").val();
        var note = $("input[name=note]").val();
        var caller_name = $('#order_form #caller_name').val()
        var date_called = $('#order_form #date_called').val()
        var call_given = 0
        if($('#order_form #call_given').is(":checked")) call_given =1;
        var data_quote ={
            order_title:order_title,
            salesperson:salesperson,
            order_doors:order_doors,
            note:note,
            caller_name:caller_name,
            date_called:date_called,
            call_given:call_given
        }

        var customer_addr =''
        var shipping_customer_name = $('#order_form #shipping_customer_name').val()
        if(shipping_customer_name==''){
            throw_message('Requires Customer name', false,'#message_form_order');
            return ;
        }
        var shipping_phone = $('#order_form #shipping_phone').val()
        if(shipping_phone==''){
            throw_message('Requires Phone number', false,'#message_form_order');
            return ;
        }
        var email_phone = $('#order_form #email_phone').val()
        if(email_phone==''){
            throw_message('Requires Email', false,'#message_form_order');
            return ;
        }else{
            if(!validate_email(email_phone)){
                throw_message('Requires Email', false,'#message_form_order');
                return ;
            }
        }
        if($('#order_form #customer-address').val()==''){
            throw_message('Requires delivery address', false,'#message_form_order');
            return ;
        }
        /*if($('#order_form #customer-state').val()==''){
            throw_message('Requires state', false,'#message_form_order');
            return ;
        }
        if($('#order_form #customer-city').val()==''){
            throw_message('Requires City', false,'#message_form_order');
            return ;
        }*/

        var customer_addr={
            shipping_address:$('#order_form #customer-address').val(),
            shipping_state:$('#order_form #customer-state').val(),
            shipping_city:$('#order_form #customer-city').val(),
            shipping_customer_name:shipping_customer_name,
            shipping_phone:shipping_phone,
            email_phone:email_phone
        }
        var order_id= parseInt(getUrlParaOnlyID('id'))
        if(isNaN(order_id)){
            order_id=''
        }else{
            data_quote.order_status = $('#order_form #order_status').val()
        }
        var _formData = {
            token: localStorage.getItemValue('token'),
            jwt: localStorage.getItemValue('jwt'),
            private_key: localStorage.getItemValue('userID'),
            order_id:order_id,
            data_quote:data_quote,
            customer_addr:customer_addr
        }
        var _link =link._order_update;
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
                if(res.ERROR ==''){
                    throw_message('Save success', true,'#message_form_order');
                    if(order_id==''){
                        $("input[name=order_title]").val(res.order_title)
                        var go_to_edit ='<div class="jarviswidget-ctrls" id="order-form-control" role="menu">'+
                            '<a href="./#ajax/quote-form.php?id='+res.order_id+'" class="jarviswidget-toggle-btn btn-primary have-text"><i class="fa fa-plus"></i> Go to edit Quote?</a>'+
                            '</div>'

                        $('#quote-form-load').append(go_to_edit);
                    }
                }else{
                    throw_message(res.ERROR, false,'#message_form_quote');
                }
            }
        })
    },
    /********************************/
    get_quote_id:function(order_id){
        var _formData = {
            token: localStorage.getItemValue('token'),
            order_id:order_id
        }
        var _link =link._quote_id;
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
                //console.log(res)
                if(res.error ==''){
                    product_tbl.prototype.create_product_line(res.products_ordered,res.delivery_cost)

                    if ($('#order_form #container-rate-avg').find("option[value='" + res.container_type_id + "']").length) {
                        $('#order_form #container-rate-avg').val(res.container_type_id).trigger('change');
                    } else {
                        var newOption = new Option(res.container_type_name, res.container_type_id, true, true);
                        $('#order_form #container-rate-avg').append(newOption).trigger('change');
                    }

                    $('#order_form #is-discount').val(res.discount_code_total)
                    $('#order_form #is-discount-type').val(res.discount_type)

                    $("input[name=order_title]").val(res.order_title)
                    $('#order_form #order_zipcode').val(res.order_zipcode)
                    var addr = res.b_address1+" "+res.b_primary_city+" "+res.b_primary_state
                    $('#order_form #bill_to_ID').append('<option value="'+res.bill_to +'" address="'+addr+'" selected >' + res.b_name + ' - ' + res.b_primary_state + '</option>').trigger('change');
                    $('#order_form #salespersonId').append('<option value="'+ res.s_ID + '" selected>' + res.s_name + '</option>').trigger('change');
                    var status_label = object_status[res.order_status]
                    $('#order_form #order_status').append('<option value="'+res.order_status+'">'+status_label+'</option>')
                    $('#order_form #order_status').val(res.order_status)
                    $('#order_form #order_doors').val(res.order_doors)
                    $('#order_form #discount_code').val(res.discount_code)
                    $('#order_form #email_phone').val(res.email_phone)
                    $('#order_form #shipping_customer_name').val(res.shipping_customer_name)
                    $('#order_form #shipping_phone').val(res.shipping_phone)
                    $('#order_form #customer-address').val(res.shipping_address)
                    $('#order_form #customer-state').val(res.shipping_state)
                    $('#order_form #customer-city').append('<option value="'+res.shipping_city +'" selected >' + res.shipping_city + '</option>').trigger('change');
                    $('#order_form #customer-city').val(res.shipping_city).trigger('change');
                    $('#order_form #invoice-id').val(res.inv_id)
                    $('#order_form #order-paid').text(numeral(res.payment).format('$ 0,0.00'))

                    var remainining = parseFloat(res.total) - parseFloat(res.payment)
                    $('#order_form #order-remaining').text(numeral(remainining).format('$ 0,0.00'))
                    if(parseFloat(res.balance) <=0 && parseFloat(res.total) >0){
                        $('#order_form .btnPaymentOrder').remove();
                    }

                    $('#tbt_product #order-total').text(numeral(res.total).format('$ 0,0.00'))
                    $('#tbt_product #discount-total').text(numeral(res.discount_code_total).format('$ 0,0.00'))

                    if ($('#order_form #avalible-depots').find("option[value='" + res.depot_id + "']").length) {
                        $('#order_form #avalible-depots').val(res.depot_id).trigger('change');
                    } else {
                        var newOption = new Option(res.depot.depot_name, res.depot_id, true, true);
                        $('#order_form #avalible-depots').append(newOption).trigger('change');
                    }

                    $('#order_form #caller_name').val(res.caller_name)
                    $('#order_form #date_called').val(res.date_called)
                    var call_given = false
                    if(res.call_given !="0"){
                        call_given = true
                    }

                    $('#order_form #call_given').prop("checked",call_given)

                    $('#order_form .is_disabled').prop("disabled",true)
                    if(res.order_status == CANCELLED || res.order_status ==CLOSED){
                        $('#order_form .require-disable').prop("disabled",true)
                    }
                }
            }
        })
    },

    /******************************/
    reset_quote:function(){
        $("input[name=order_title]").val('');
        $('#order_form #order_zipcode').val('')
        $('#order_form #bill_to_ID').val('').trigger('change');
        $('#order_form #salespersonId').val('').trigger('change');
        $('#order_form #order_doors').val('')
        $('#order_form #avalible-depots').val('').trigger('change');
        $('#order_form #discount_code').val('')
        $('#order_form #container-rate-avg').val('').trigger('change');
        $('#order_form #customer-address').val('')
        $('#order_form #customer-state').val('')
        $('#order_form #customer-city').val('').trigger('change');
        $('#order_form #email_phone').val('')
        $('#order_form #shipping_customer_name').val('')
        $('#order_form #shipping_phone').val('')
        $('#tbt_quote tbody').html('')
    }
    /******************************/
}

var _order_form = new Order();
$(function(){
    _order_form.init();
});

function cancelEdit() {
    $('#edit_product_form').css('display', 'none');
}

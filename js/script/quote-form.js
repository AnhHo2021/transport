function Quote() { }
Quote.prototype.constructor = Quote;
Quote.prototype = {
  init: function (callback) {
    this.forwardFromContact();
    billto_select2_el("#order_form #bill_to_ID",link._contact_search)
    salesman_select2_el("#order_form #salespersonId",link._salesmanListSearch)
    var order_id= parseInt(getUrlParaOnlyID('id'))
     if(!isNaN(order_id)){
         _quote.get_quote_id(order_id)
      }else{
         var salesperson_default = localStorage.getItemValue('userID');
         var s_name_default = localStorage.getItemValue('user_name');
         $('#order_form #salespersonId').append('<option value="'+ salesperson_default + '" selected>' + s_name_default + '</option>').trigger('change');
     }


  $('#order_form #customer-state').change(function(){
      var state =$(this).val()
      _quote.get_city(state,'#order_form #customer-city')
  });

  $('#order_form #discount_code').change(function(){
      $('#order_form .discount-code-error').css({"display":"none"});
      common_f.prototype.verifyDiscountCode($(this).val())
  });

  _quote.bindEvent()
  },
  bindEvent: function () {
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
              find_depot.prototype.find_nearest_depots('','',$(this).val(),'','find_depot','#order_form #avalible-depots',
                  '#order_form #container-rate-avg');
          }
      });

      /*$('#order_form #order_zipcode').change(function(){
          if($('#first-load-page').val() !=''){
              $('#order_form #avalible-depots').html('')
              $('#tbt_quote tbody').html('')
              $('#tbt_quote #discount-code').text(numeral(0).format('$ 0,0.00'));
              $('#tbt_quote #quote-total').text(numeral(0).format('$ 0,0.00'));
              find_depot.prototype.find_nearest_depots('','',$(this).val(),'','find_depot','#order_form #avalible-depots',
                  '#order_form #container-rate-avg');
          }
          $('#first-load-page').val('1')
      });*/

      $('#submit-quote').unbind('click').bind('click',function(){
         // var id= getUrlParaOnlyID('id')
         // console.log(id)
          _quote.new_order('')
      });

      $('#close-quote').unbind('click').bind('click',function(){
          $('.modal').modal('hide')
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
    new_order:function(quote_id){
        var order_zipcode = $('#order_form #order_zipcode').val()
        if(order_zipcode==null || order_zipcode==''){
            throw_message('Requires Zip code', false,'#message_form_quote');
            return ;
        }

        var depot_id = $('#order_form #avalible-depots').val()
        var distance = $('#order_form #avalible-depots').find('option:selected').attr('distance')
        if(depot_id==null){
            throw_message('Requires Depot', false,'#message_form_quote');
            return ;
        }
        var container_type_id = $('#order_form #container-rate-avg').val()
        if(container_type_id==null){
            throw_message('Requires Container type', false,'#message_form_quote');
            return ;
        }

        var total = numeral($('#tbt_quote #quote-total').text()).value()
        if(total <=0){
            throw_message('Requires average container rate larger than 0', false,'#message_form_quote');
            return ;
        }
        var salesperson = $('#order_form #salespersonId').val()
        var order_doors = $('#order_form #order_doors').val()
        var discount_code = $('#order_form #discount_code').val()
        var order_title = $("input[name=order_title]").val();
        var avg_rate = numeral($('#order_form .avg_rate_text').val()).value()
        var avg_cost = $('#order_form .avg_cost').val()
        var delivery_cost = numeral($('#order_form .delivery_cost').text()).value()
        var avg_margin = $('#order_form .avg_margin').val()
        var qty = $('#order_form .qty').val()
        var note = $("input[name=note]").val();

        if(avg_rate <=0){
            throw_message('Requires average container rate larger than 0', false,'#message_form_quote');
            return ;
        }

        if(parseFloat(avg_cost) <=0){
            throw_message('Requires average container rate larger than 0', false,'#message_form_quote');
            return ;
        }

        var data_quote ={
            order_title:order_title,
            order_zipcode:order_zipcode,
            salesperson:salesperson,
            order_doors:order_doors,
            depot_id:depot_id,
            container_type_id:container_type_id,
            discount_code:discount_code,
            total:total,
            balance:total,
            payment:0,
            avg_rate:avg_rate,
            avg_cost:avg_cost,
            avg_margin:avg_margin,
            delivery_cost:delivery_cost,
            qty:qty,
            note:note,
            mile:distance
        }

        var shipping_customer_name = $('#order_form #shipping_customer_name').val()
        /*if(shipping_customer_name==''){
            throw_message('Requires Customer name', false,'#message_form_quote');
            return ;
        } */
        var shipping_phone = $('#order_form #shipping_phone').val()
        /*if(shipping_phone==''){
            throw_message('Requires Phone number', false,'#message_form_quote');
            return ;
        } */
        var email_phone = $('#order_form #email_phone').val()
        /*if(email_phone==''){
            throw_message('Requires Email', false,'#message_form_quote');
            return ;
        }else{
            if(!validate_email(email_phone)){
                throw_message('Requires Email', false,'#message_form_quote');
                return ;
            }
        }*/
        /*var customer_addr =''
        if($('#order_form #customer-address').val()==''){
            throw_message('Requires delivery address', false,'#message_form_quote');
            return ;
        }
        if($('#order_form #customer-state').val()==''){
            throw_message('Requires state', false,'#message_form_quote');
            return ;
        }
        if($('#order_form #customer-city').val()==''){
            throw_message('Requires City', false,'#message_form_quote');
            return ;
        }*/
        shipping_phone = common_f.prototype.validate_phone(shipping_phone)
        var shipping_address =($('#order_form #customer-address').val()==null || $('#order_form #customer-address').val()==undefined)?'':$('#order_form #customer-address').val()
        var shipping_state =($('#order_form #customer-state').val()==null || $('#order_form #customer-state').val()==undefined)?'':$('#order_form #customer-state').val()
        var shipping_city =($('#order_form #customer-city').val()==null || $('#order_form #customer-city').val()==undefined)?'':$('#order_form #customer-city').val()
        var customer_addr={
            shipping_address:shipping_address,
            shipping_state:shipping_state,
            shipping_city:shipping_city,
            shipping_customer_name:shipping_customer_name,
            shipping_phone:shipping_phone,
            email_phone:email_phone,
            shipping_zip:order_zipcode
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
        var _link =link._quote_new_update;
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
                    throw_message('Save success', true,'#message_form_quote');
                    if (document.location.href.indexOf('dashboard_admin.php') > 0){
                        var closest = $('#tbl-order').closest('.order-content')
                        var from_date = closest.find('.from-date').val()
                        var to_date = closest.find('.to-date').val()
                        var text_search = closest.find('.text-search').val()
                        var status = closest.find('.status-filter').val()
                        var line_num = closest.find('.line-nuber').val()
                        var select_type = closest.find('.select_type').val()

                        paginator_el ='#pagination_tbl-order'
                        tbl_el = '#tbl-order tbody'

                        order_report.prototype.get_order(from_date,to_date,status,line_num,text_search,select_type,paginator_el,tbl_el);
                        $('#quote-modal').modal('hide')
                        return;
                    }else{
                        if(order_id==''){
                            $("input[name=order_title]").val(res.order_title)
                            var go_to_edit ='<div class="jarviswidget-ctrls" id="order-form-control" role="menu">'+
                                '<a href="./#ajax/quote-form.php?id='+res.order_id+'" class="jarviswidget-toggle-btn btn-primary have-text"><i class="fa fa-plus"></i> Go to edit Quote?</a>'+
                                '</div>'

                            $('#quote-form-load').append(go_to_edit);
                        }
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
                    find_depot.prototype.find_nearest_depots('','',res.order_zipcode,'','find_depot','#order_form #avalible-depots',
                        '#order_form #container-rate-avg','edit');

                    rate_avg_data('#order_form #container-rate-avg',res.list_container_type)

                    if ($('#order_form #container-rate-avg').find("option[value='" + res.container_type_id + "']").length) {
                        $('#order_form #container-rate-avg').val(res.container_type_id).trigger('change');
                    } else {
                        var newOption = new Option(res.container_type_name, res.container_type_id, true, true);
                        $('#order_form #container-rate-avg').append(newOption).trigger('change');
                    }

                    $('#order_form #is-discount').val(res.discount_code_total)
                    $('#order_form #is-discount-type').val(res.discount_type)

                    var container_data ={
                        container_type_id:res.container_type_id,
                        container_type_name:res.container_type_name,
                        avg_margin:res.avg_margin,
                        avg_rate:res.avg_rate,
                        avg_cost:res.avg_cost,
                        container_feet_type:res.container_feet_type,
                        qty:res.qty,
                        rate_mile:res.rate_mile,
                        distance:res.mile,
                        delivery_cost:res.delivery_cost
                    }
                    container_rate_avg.prototype.create_container_avg_edit(container_data,'#tbt_quote tbody')

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

                    if ($('#order_form #avalible-depots').find("option[value='" + res.depot_id + "']").length) {
                        $('#order_form #avalible-depots').val(res.depot_id).trigger('change');
                    } else {
                        var newOption = new Option(res.depot.depot_name, res.depot_id, true, true);
                        $('#order_form #avalible-depots').append(newOption).trigger('change');
                    }

                    $('#tbt_quote #quote-total').text(numeral(res.total).format('$ 0,0.00'))
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
        $('#tbt_quote tbody').html('')
    }
    /******************************/
}

var _quote = new Quote();
$(function(){
    _quote.init();
});

function cancelEdit() {
  $('#edit_product_form').css('display', 'none');
}

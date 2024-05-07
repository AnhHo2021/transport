function depots(){}
depots.NAME         = "depots";
depots.VERSION      = "1.2";
depots.DESCRIPTION  = "Class depots";

depots.prototype.constructor = depots;
depots.prototype = {
    init:function(){
        var is_change = 1
        var zip_init = getUrlParameter('id')
        if(zip_init != undefined && zip_init !=''){
            $("#search-depot-zip").val(zip_init)
            depots.prototype.find_nearest_depots(zip_init);
        }
        $('#search-depot-zip').keydown(function(e){
            if(e.keyCode==13){
                is_change = 2
                var zipcode = $("#search-depot-zip").val();
                if(zipcode !=''){
                    depots.prototype.find_nearest_depots(zipcode);
                }
            }
        });

        $('#search-depot-zip').change(function(e){
            if(is_change == 1){
                var zipcode = $("#search-depot-zip").val();
                if(zipcode !=''){
                    depots.prototype.find_nearest_depots(zipcode);
                }
            }
            is_change = 1;
        });
        /***********************event*********/
         $("#btn-quote").unbind('click').bind('click',function(){
             depots.prototype.quote_new();
         })

        $('#your-cart #continue-shopping').unbind('click').bind('click',function(){
            $('#home-page').css({"display":""})
            $('#your-cart').css({"display":"none"})
        })

        var ignore_change =false
        $('#your-cart').on('keydown','.qty',function(e){
            if(e.keyCode==13){
                ignore_change = true
                var qty = $(this).val()
                qty = parseInt(qty)
                if(qty >=2){
                    if(parseInt($(this).closest('tr').find('.container_feet_type').val()) !=20){
                        qty =1
                    }else{
                        qty =2
                    }
                }
                $(this).val(qty)
                var qty = parseInt($(this).val());

                var rate_mile = $(this).closest('tr').find('.rate_mile').val()
                var container_rate = $(this).closest('tr').find('.container_rate').val()
                var distance = $(this).closest('tr').find('.distance').val()
                var delivery_cost = $(this).closest('tr').find('.delivery_cost').val()

               // var price_mile = (parseFloat(rate_mile) * parseFloat(distance))
               // if(parseFloat(distance) <=100) price_mile =rate_mile_shorter
                var best_price = parseFloat(delivery_cost) + parseFloat(container_rate)*qty
                $(this).closest('tr').find('.calculate-total').text(numeral(best_price).format('$ 0,0.00'))

                depots.prototype.sub_total()
            }

        })

        $('#your-cart').on('change','.qty',function(e){
            if(ignore_change) return
            var qty = $(this).val()
            qty = parseInt(qty)
            if(qty >=2){
                if(parseInt($(this).closest('tr').find('.container_feet_type').val()) !=20){
                    qty =1
                }else{
                    qty =2
                }
            }
            $(this).val(qty)
            var qty = parseInt($(this).val());

            var rate_mile = $(this).closest('tr').find('.rate_mile').val()
            var container_rate = $(this).closest('tr').find('.container_rate').val()
            var distance = $(this).closest('tr').find('.distance').val()

            var price_mile = (parseFloat(rate_mile) * parseFloat(distance))
            if(parseFloat(distance) <=100) price_mile =rate_mile_shorter
            var best_price = price_mile + parseFloat(container_rate)*qty
            $(this).closest('tr').find('.calculate-total').text(numeral(best_price).format('$ 0,0.00'))

            depots.prototype.sub_total()
        })
        //event
        $('#your-cart').on('click','.btn-remove',function(e){
            $(this).closest('tr').remove();
            depots.prototype.sub_total()
        });

        $('#your-cart .was-changed').change(function(){
           $('#your-cart #attach-payment').remove()
        });

        $('#home-page #email-to').unbind('click').bind('click',function(){
            var zip_code = $('#home-page #search-depot-zip').val()
            if(zip_code ==''){
                $('#home-page #search-depot-zip').focus();
                return;
            }
            var email = $('#home-page #email_phone').val()
            if(email !=''){
                if(!validate_email(email)){
                    $('#home-page #email_phone').focus();
                    return;
                }
            }else{
                $('#home-page #email_phone').focus();
                return;
            }
            var customer_name = $('#home-page #shipping_customer_name').val()
            depots.prototype.send_email_to(zip_code,email,customer_name)
        });

        $('#close-btn-home-quote').unbind('click').bind('click',function(){
            $('#home-page-modal').modal('hide')
        });
    },
    /***********************************/
    find_nearest_depots:function(zipcode){
        //console.log("zipcode="+zipcode)
        var _link =link._depots_nearest;
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": _link,
            "method": "POST",
            dataType: 'json',
            data:{token:_token},
            error : function (status,xhr,error) {
            },
            success: function (data){
                //console.log(data.depots.length);
                if(data.depots.length >0){
                    var origin = [];
                        data.depots.forEach(function(item){
                            origin.push(item["depot_address"])
                    })
                    //console.log(origin);
                    ////////////////
                    var latitude ='';
                    var longitude='';
                    var geocoder = new google.maps.Geocoder();
                    var address = zipcode;
                    geocoder.geocode({ 'address': 'zipcode '+address }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            latitude = results[0].geometry.location.lat();
                            longitude = results[0].geometry.location.lng();
                            //console.log("Latitude: " + latitude + "\nLongitude: " + longitude);
                            //
                            const bounds = new google.maps.LatLngBounds();
                            const markersArray = [];
                            /*const map = new google.maps.Map(document.getElementById("map"), {
                                center: { lat: latitude, lng: longitude },
                                zoom: 10
                            });*/
                            // initialize services
                            const service = new google.maps.DistanceMatrixService();
                            // build request
                            const destination = { lat: latitude, lng: longitude };
                            const request = {
                                // origins: [origin1, origin2],
                                origins: origin,
                                destinations:[destination] ,
                                //destinations: [destinationB,destinationA],
                                travelMode: google.maps.TravelMode.DRIVING,
                                unitSystem: google.maps.UnitSystem.IMPERIAL,
                                avoidHighways: false,
                                avoidTolls: false,
                            };

                            // get distance matrix response
                            service.getDistanceMatrix(request).then((response) => {
                                //console.log(response);
                                // put response
                            depots.prototype.deleteMarkers(markersArray);
                            //////////////////
                            var nearest_distance =[];
                            var smallest =0;
                            var smaller =0;
                            var i=0;
                            //find nearest depots
                            response.rows.forEach(function(item1){
                                var item = item1.elements[0]
                               // console.log(item)
                                //console.log("addr ="+response.destinationAddresses[i]);
                                if(item.status =="OK"){
                                    //console.log(item.distance.text.split(" ")[0])
                                    //console.log(origin[i]);
                                    if(nearest_distance.length <1){
                                        smallest =item.distance.text.split(" ")[0];
                                        smallest = smallest.replace( /,/g, "" );
                                        var add_el = {address : origin[i],distance:smallest}
                                        if(parseFloat(smallest) <less_than_300ml) nearest_distance.push(add_el);

                                    }else if(nearest_distance.length >0 && nearest_distance.length <2 ){
                                       var a = parseFloat(smallest);
                                       var b = item.distance.text.split(" ")[0];
                                        b = b.replace( /,/g, "" );
                                        b = parseFloat(b)
                                        if(b < less_than_300ml) {
                                            if(b >=a){
                                                var add_el = {address : origin[i],distance:b}
                                                nearest_distance.push(add_el);
                                                smaller = b;
                                            }else{
                                                smallest = b;
                                                smaller = a;
                                                var add_el = {address : origin[i],distance:b}
                                                nearest_distance.unshift(add_el);
                                            }
                                        }
                                    }else if(nearest_distance.length ==2){
                                        var a = parseFloat(smallest);
                                        var b = parseFloat(smaller);
                                        var c = item.distance.text.split(" ")[0];
                                        c = c.replace( /,/g, "" );
                                        c = parseFloat(c)
                                        if(c <less_than_300ml){
                                            if(a >= c){
                                                smallest = a;
                                                smaller = c;
                                                var add_el = {address : origin[i],distance:c}
                                                nearest_distance.pop();
                                                nearest_distance.push(add_el);
                                            }else if(a < c && c < b){
                                                smaller = c;
                                                var add_el = {address : origin[i],distance:c}
                                                nearest_distance.pop();
                                                nearest_distance.push(add_el);
                                            }
                                        }

                                    }
                                }

                                i++;

                             });

                            var depots_temp =[]
                            var tr=''; var row=''
                            nearest_distance.forEach(function(item1){
                                data.depots_short.forEach(function(item2){
                                   // if(item1.address.localeCompare(item2.depot_address) ==0){
                                    if(item1.address == item2.depot_address){
                                        var min_cost_info = item2.min_cost_info
                                        min_cost_info.forEach(function(item3){
                                            var delivery_cost = (parseFloat(item3.rate_mile) * parseFloat(item1.distance))
                                            if(parseFloat(item1.distance) <=100) delivery_cost =rate_mile_shorter
                                            var price = delivery_cost + parseFloat(item3.avg_rate)
                                            var temp = {
                                                distance: item1.distance,
                                                depot_id:item2.depot_id,
                                                depot_name:item2.depot_name,
                                                depot_address:item2.depot_address,
                                                //vendor_id:item2.vendor_id,
                                                rate_mile:item3.rate_mile,
                                                container_type_id:item3.container_type_id,
                                                container_feet_type:item3.container_feet_type,
                                                container_type_name:item3.container_type_name,
                                                container_rate:item3.avg_rate,
                                                avg_cost:item3.avg_cost,
                                                avg_margin:item3.avg_margin,
                                                price:price,
                                                product_qty:1,
                                                delivery_cost:delivery_cost
                                            }
                                            depots_temp.push(temp);
                                        });
                                    }
                                })
                            })
                            //console.log(depots_temp); //return;
                            //find container item that are the best price in depots
                            var found = [];
                            var nearest_data =[];
                            if(depots_temp.length> 0){
                                depots_temp.forEach(function(item){
                                    var price = parseFloat(item.price)
                                    var container_type_id = item.container_type_id;
                                    if(found.indexOf(container_type_id) == -1){
                                        found.push(container_type_id);
                                        var best_price =price;
                                        var itemtemp = item;
                                        depots_temp.forEach(function(item1){
                                            var container_type_id1 = item1.container_type_id;
                                            if(container_type_id1 == container_type_id){
                                                var price1 = parseFloat(item1.price)

                                                if(price >= price1){
                                                    best_price =  price1;
                                                    itemtemp= item1;
                                                }
                                            }
                                        });
                                        Object.assign(itemtemp,{best_price:best_price});
                                        nearest_data.push(itemtemp);
                                    }
                                })
                            }

                            //console.log(nearest_data); return
                            ///////////display nearest depots////////////
                            var i=0; var next_row=4;
                            nearest_data.forEach(function(item){
                                if(i%4 ==0){
                                    if(i ==next_row){
                                        row +='</div>'
                                    }
                                    if(i !=0){
                                        next_row = i * 2
                                    }
                                    row +='<div class="row m-b20">'
                                }
                                row += depots.prototype.show_depots(item)
                                i++

                            });
                            if(i%4 !=0){
                                row +='</div>'
                            }

                          $("#depot-nearest").html(row);

                          //event
                            $("#depot-nearest .add-to-cart").unbind('click').bind('click',function(){
                                var $me =$(this)
                                var tr =  depots.prototype.add_to_cart($me)
                                $('#your-cart #depot-tbl tbody').html('')
                                $('#your-cart #depot-tbl tbody').append(tr)

                                $('#home-page').css({"display":"none"})
                                $('#your-cart').css({"display":""})

                                depots.prototype.sub_total()

                                $('#your-cart #attach-payment').remove()
                            });
                            //////////////////
                        });
                        //
                    } else {
                        alert("Request failed.")
                    }
                });
                    ////////////////
                }
            }//end success
        });//end ajax
    },
    /***************************************/
    deleteMarkers: function(markersArray) {
        for (var i = 0; i < markersArray.length; i++) {
            markersArray[i].setMap(null);
        }

        markersArray = [];
    },
/***************************************/
    show_depots:function(depot_item){
        var img= ''
        if(depot_item.prod_photo !=null && depot_item.prod_photo !=''){
          img=  '<div class="col col-12 box"><img style="max-height: 190px" sizes="230px" src="'+depot_item.prod_photo+'"></div>'
        }
        var  div1 ='<div class="depot_item col col-3 l10r10 box-parent" >' +
                '<input type="hidden" class="depot_id" value="'+depot_item.depot_id+'">' +
                '<input type="hidden" class="depot_name" value="'+depot_item.depot_name+'">' +
                '<input type="hidden" class="best_price" value="'+depot_item.best_price+'">' +
                '<input type="hidden" class="container_type_id" value="'+depot_item.container_type_id+'">' +
                '<input type="hidden" class="container_rate" value="'+depot_item.container_rate+'">' +
                '<input type="hidden" class="container_type_name" value="'+depot_item.container_type_name+'">' +
                '<input type="hidden" class="container_feet_type" value="'+depot_item.container_feet_type+'">' +
                '<input type="hidden" class="depot_address" value="'+depot_item.depot_address+'">' +
                '<input type="hidden" class="distance" value="'+depot_item.distance+'">' +
                '<input type="hidden" class="rate_mile" value="'+depot_item.rate_mile+'">' +
                '<input type="hidden" class="product_qty" value="'+depot_item.product_qty+'">' +
                '<input type="hidden" class="prod_photo m-b20" value="'+depot_item.prod_photo+'">' +
                '<input type="hidden" class="avg_cost" value="'+depot_item.avg_cost+'">' +
                '<input type="hidden" class="avg_margin" value="'+depot_item.avg_margin+'">' +
                 '<input type="hidden" class="delivery_cost" value="'+depot_item.delivery_cost+'">' +
                //'<input type="hidden" class="vendor_id" value="'+depot_item.vendor_id+'">' +
                //'<input type="hidden" class="prod_name" value="'+depot_item.prod_name+'">' +
                //'<input type="hidden" class="prod_SKU" value="'+depot_item.prod_SKU+'">' +
                //'<input type="hidden" class="prod_id" value="'+depot_item.prod_id+'">' +

                    img+
                '<div class="col col-12 c-black bold box">'+depot_item.container_type_name+'</div>' +
                //'<div class="col col-12 bold box">'+depot_item.depot_address+'</div>' +
                '<div class="col col-12 bold box">'+numeral(depot_item.best_price).format('$ 0,0.00') +'</div>' +
                '<div class="col col-12 m-t10"><button class="btn btn-sm btn-default add-to-cart"><b class="c-red">ADD TO CART</b></button></div>' +
            '</div>';

        return div1;
    },

 /***************************************/
 add_to_cart:function($me,item){
     var depot_item ={}
     if($me !=''){
         depot_item = {
             depot_id : $me.closest('.depot_item').find('.depot_id').val(),
             depot_name : $me.closest('.depot_item').find('.depot_name').val(),
             best_price : $me.closest('.depot_item').find('.best_price').val(),
             container_type_id: $me.closest('.depot_item').find('.container_type_id').val(),
             container_rate : $me.closest('.depot_item').find('.container_rate').val(),
             container_type_name : $me.closest('.depot_item').find('.container_type_name').val(),
             container_feet_type:$me.closest('.depot_item').find('.container_feet_type').val(),
             depot_address : $me.closest('.depot_item').find('.depot_address').val(),
             rate_mile : $me.closest('.depot_item').find('.rate_mile').val(),
             avg_cost : $me.closest('.depot_item').find('.avg_cost').val(),
             avg_margin: $me.closest('.depot_item').find('.avg_margin').val(),
             delivery_cost: $me.closest('.depot_item').find('.delivery_cost').val(),
             //vendor_id : $me.closest('.depot_item').find('.vendor_id').val(),
             //prod_id : $me.closest('.depot_item').find('.prod_id').val(),
             //prod_name : $me.closest('.depot_item').find('.prod_name').val(),
            // prod_SKU : $me.closest('.depot_item').find('.prod_SKU').val(),
             product_qty : $me.closest('.depot_item').find('.product_qty').val(),
             distance : $me.closest('.depot_item').find('.distance').val(),
             prod_photo : $me.closest('.depot_item').find('.prod_photo').val(),
             qty:1
         }
     }else{
         depot_item = item
     }

     var img= ''
     if(depot_item.prod_photo !=null && depot_item.prod_photo !='' &&
         depot_item.prod_photo !='undefined' &&  depot_item.prod_photo != undefined){
         img=  '<img style="max-height: 95px" src="'+depot_item.prod_photo+'">'
     }

     var price_mile = (parseFloat(depot_item.rate_mile) * parseFloat(depot_item.distance))
     if(parseFloat(depot_item.distance) <=100) price_mile =rate_mile_shorter
     var total_line = parseFloat(depot_item.delivery_cost) + parseFloat(depot_item.container_rate)

     var tr='<tr class="depot_item">' +
         '<input type="hidden" class="depot_id" value="'+depot_item.depot_id+'">' +
         '<input type="hidden" class="depot_name" value="'+depot_item.depot_name+'">' +
         '<input type="hidden" class="best_price" value="'+depot_item.best_price+'">' +
         '<input type="hidden" class="container_type_id" value="'+depot_item.container_type_id+'">' +
         '<input type="hidden" class="container_rate" value="'+depot_item.container_rate+'">' +
         '<input type="hidden" class="avg_cost" value="'+depot_item.avg_cost+'">' +
         '<input type="hidden" class="avg_margin" value="'+depot_item.avg_margin+'">' +
             '<input type="hidden" class="delivery_cost" value="'+depot_item.delivery_cost+'">' +
         '<input type="hidden" class="container_type_name" value="'+depot_item.container_type_name+'">' +
         '<input type="hidden" class="container_feet_type" value="'+depot_item.container_feet_type+'">' +
         '<input type="hidden" class="depot_address" value="'+depot_item.depot_address+'">' +
         '<input type="hidden" class="rate_mile" value="'+depot_item.rate_mile+'">' +
         '<input type="hidden" class="product_qty" value="'+depot_item.product_qty+'">' +
         '<input type="hidden" class="distance" value="'+depot_item.distance+'">' +
         '<input type="hidden" class="prod_photo m-b20" value="'+depot_item.prod_photo+'">' +
         //'<input type="hidden" class="vendor_id" value="'+depot_item.vendor_id+'">' +
         //'<input type="hidden" class="prod_name" value="'+depot_item.prod_name+'">' +
         //'<input type="hidden" class="prod_SKU" value="'+depot_item.prod_SKU+'">' +
         //'<input type="hidden" class="prod_id" value="'+depot_item.prod_id+'">' +

         '<td class="m-l0">'+img+'</td>' +
         '<td class=""><div class="col col-12 c-black">'+depot_item.container_type_name+'</div>' +
            //'<div class="col col-12"><i>product location'+depot_item.depot_address+'</i></div>' +
             '<div class="text-center">' +
                '<button class="btn btn-default btn-sm btn-remove"><b>REMOVE</b></button>' +
             '</div>' +
         '</td>' +
         '<td><input class="qty form-control" type="number" value="'+depot_item.qty+'"></td>' +
         '<td class="calculate-price">'+numeral(depot_item.container_rate).format('$ 0,0.00') +'</td>' +
         '<td class="delivery_cost_Text">'+numeral(depot_item.delivery_cost).format('$ 0,0.00') +'</td>' +
         '<td class="calculate-total">'+numeral(total_line).format('$ 0,0.00') +'</td>' +
         '</tr>'

     return tr;
 },
/***************************************/
    quote_new:function(){
        var email = $('#customer-email').val();
        if(email !=''){
            if(!validate_email(email)){
                $('#customer-email').focus();
                return;
            }
        }

        var data_post = []
        $('#depot-tbl .depot_item').each(function(){
            if($(this).find('.item-selected').is(":checked")){
                var object = {
                    depot_id : $(this).find('.depot_id').val(),
                    depot_name : $(this).find('.depot_name').val(),
                    best_price : $(this).find('.best_price').val(),
                    container_type_id: $(this).find('.container_type_id').val(),
                    container_rate : $(this).find('.container_rate').val(),
                    avg_cost : $(this).find('.avg_cost').val(),
                    avg_margin : $(this).find('.avg_margin').val(),
                    delivery_cost : $(this).find('.delivery_cost').val(),
                    container_type_name : $(this).find('.container_type_name').val(),
                    depot_address : $(this).find('.depot_address').val(),
                    rate_mile : $(this).find('.rate_mile').val(),
                    qty : $(this).find('.qty').val(),
                    vendor_id : $(this).find('.vendor_id').val(),
                    prod_id : $(this).find('.prod_id').val(),
                    prod_name : $(this).find('.prod_name').val(),
                    prod_SKU : $(this).find('.prod_SKU').val(),
                    distance : $(this).find('.distance').val()
                }

                data_post.push(object);
            }
        });

        var data ={
            token: _token,
            email: email,
            phone:'',
            data_post:data_post
        }

        var _link =link._quote_temp_new;
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": _link,
            "method": "POST",
            dataType: 'json',
            data:data,
            error : function (status,xhr,error) {
            },
            success: function (data){
                if(data.email_sent !=undefined){
                   if(data.email_sent == 1) {
                       alert("Check your email to complete your Quote")
                   }
                }
            }
        });
    },
/**************************************/
   sub_total:function(){
       var sub_total =0;
       $('#depot-tbl .depot_item').each(function(){
           var that =$(this)
           var qty = parseInt(that.find('.qty').val());
           var rate_mile = that.find('.rate_mile').val()
           var container_rate = that.find('.container_rate').val()
           var distance = that.find('.distance').val()
           var delivery_cost = that.find('.delivery_cost').val()
           //var price_mile = (parseFloat(rate_mile) * parseFloat(distance))
          // if(parseFloat(distance) <=100) price_mile =rate_mile_shorter
           var best_price = parseFloat(delivery_cost) + parseFloat(container_rate)*qty
           sub_total = (sub_total==0)?best_price:best_price+sub_total
       });

       if($('#your-cart #is-discount').val() !='0'){
           if($('#your-cart #is-discount-type').val() =='$'){
               sub_total = sub_total - parseFloat($('#your-cart #is-discount').val());
           }else{
               sub_total = sub_total - (parseFloat($('#your-cart #is-discount').val()) * sub_total) /100
           }
       }
       sub_total = numeral(sub_total).format('$ 0,0.00')
       $('#your-cart #sub-total').text(sub_total);
   },
    /***************************************/
   send_email_to:function(zip_code,email,customer_name){
       var _formData = {
           token: localStorage.getItemValue('token'),
           jwt: localStorage.getItemValue('jwt'),
           private_key: localStorage.getItemValue('userID'),
           zip_code:zip_code,
           email:email,
           customer_name:customer_name
       }
       var _link =link._mail_to_customer;
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
              if(res.send=='1'){
                  throw_message('Email sent successfully', true,'#message-form-home-quote');
              }
           }
       });
   },
  /****************************************/
    reset_modal_home:function(){
        $('#message-form-home-quote').text('')
        $('#message-form-home-quote').removeClass('alert')
        $('#message-form-home-quote').removeClass('alert-success')
        $('#home-page #search-depot-zip').val('')
        $('#home-page #email_phone').val('')
        $('#home-page #shipping_customer_name').val('')
        $('#home-page #shipping_customer_name-phone').val('')
        $('#home-page #shipping_phone').val('')
    },
 }
var depts = new depots();
$(function(){
    depts.init();
});
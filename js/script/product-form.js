function Product() { }
Product.SKU = ''
Product.ID = 0
Product.prod_name = ''
Product.prod_desc = ''
Product.prod_desc_shor = ''
Product.prod_type = ''
Product.prod_class = ''
Product.prod_cost = 0
Product.prod_price = 0
Product.product_taxable = 0
Product.prod_weight = 0
Product.prod_length = 0
Product.prod_width = 0
Product.product_tags = ''
Product.product_notes = ''
Product.prod_visible = 1
Product.prod_inactive = 0
Product.product_added = new Date()
Product.product_updated = new Date()
Product.product_updated_by = '';
Product.product_photo;
Product._product = null;

Product.prototype.constructor = Product;
Product.prototype = {
    _listProdClass: [],
    _listProdType: [],
    _listClass: [],
    _listType: [],
    loadType: function () {
        return new Promise(function (resolve, reject) {
            return $.ajax({
                url: link._getProductType,
                type: "POST",
                data: { token: localStorage.getItemValue('token'), jwt: localStorage.getItemValue('jwt'), private_key: localStorage.getItemValue('userID') },
                success: function (res) {
                    Product.prototype._listProdType = JSON.parse(res);
                    html2 = '<option value="">Select Product type</option>';
                    Product.prototype._listProdType.forEach(function (_ptype) {
                        Product.prototype._listType.push(_ptype.prodType_name);
                        html2 += '<option value="' + _ptype.prodType_name + '">' + _ptype.prodType_name + '</option>';
                    });
                    $('select[name="prod_type"]').html(html2);
                    resolve(true);
                }, error: function () {
                    reject(false);
                }
            });
        })
    },
    loadClass: function () {
        return new Promise(function (resolve, reject) {
            return $.ajax({
                url: link._getProductClass,
                type: "POST",
                data: { token: localStorage.getItemValue('token'), jwt: localStorage.getItemValue('jwt'), private_key: localStorage.getItemValue('userID') },
                success: function (res) {
                    Product.prototype._listProdClass = JSON.parse(res);
                    var html = '<option value="">Select Product class</option>';
                    Product.prototype._listProdClass.forEach(function (_pclass) {
                        Product.prototype._listClass.push(_pclass.prodClass_name)
                        html += '<option value="' + _pclass.prodClass_name + '">' + _pclass.prodClass_name + '</option>';
                    });
                    $('select[name="prod_class"]').html(html);
                    resolve(true);
                }, error: function (e) {
                    reject(e);
                }
            });
        })
    },
    init: function () {
        return new Promise(function (resolve, reject) {
            Product.prototype.bindEvent();
            Product.prototype.setView();
            Product.prototype.loadType().then(function () {
                Product.prototype.loadClass().then(function () {
                    return resolve(true);;
                });;
            }).catch(function (e) {
                return reject(false);
            });
        });
    },
    setView: function () {
    },
    bindEvent: function () {
        var _vali = $('#product_form').validate(Product.prototype.formProductValidatorOption);
        $('input').mousedown(function () {
            $('#message_form').hide(200);
        });
        // product_tags
        var tagsListProduct;
        $.ajax({
            url: link._getTag,
            data: { token: localStorage.getItemValue('token'), tag_type: 'product' },
            type: 'post',
            dataType: 'json',
            success: function (data) {
                tagsListProduct = data;
            }
        })

        var filterTags = function (tags) {
            var result = [];
            tagsListProduct.forEach(function (item) {
                if (item.toLowerCase().indexOf(tags.toLowerCase()) >= 0) {
                    result.push(item);
                };
            })
            return result;
        }

        $('#product_tags').tagsInput({
            interactive: true,
            placeholder: 'Add a tag',
            width: 'auto',
            height: 'auto',
            hide: true,
            delimiter: [',', ';'],
            removeWithBackspace: true,
            autocomplete_url: link._getTag,
            autocomplete: {
                source: function (req, res) {
                    res(filterTags(req.term));
                }
            },
        });

        $('#product_tags_tag').change(function () {
            var val = $(this).val();
            if ($('#product_tags').val().split(',').includes(val)) {
                $(this).val('');
            } else {
                $('#product_tags').addTag(val);
            }
        });

        $('#product_tags_tag').keyup(function (e) {
            var key = e.keyCode;
            /** 9 = tab, 13= enter, 37= ←, 38= ↑, 39= →, 40= ↓, 190= ., 106= *, 111= /, */
            var listList = [9, 13, 37, 38, 39, 40, 190, 106, 111]
            if (listList.includes(key)) {
                var val = $(this).val();
                if ($('#product_tags').val().split(',').includes(val)) {
                    $(this).val('');
                } else {
                    $('#product_tags').addTag(val);
                    $(this).val('');
                    $(this).focus();
                }
            }
        });

        $('input[name="SKU"]').mousedown(function () {
            $('input[name="SKU"]').parent().children('p').remove();
        });

        $('input[name="product_qty"]').mousedown(function () {
            $('input[name="product_qty"]').parent().children('p').remove();
        });

        $('select[name="prod_class"]').change(function () {
            _vali.element('input[name="prod_price"]');
        });

        $('#product_form .sku-product').unbind('click').bind('click',function(){
           Product.prototype.get_valid_sku();
        });
    },
    formProductValidatorOption: {
        ignore: [],
        rules: {
            /*SKU: {
                required: true, maxlength: 351, remote: {
                    url: link._isSKUExisting,
                    type: 'post',
                    data: {
                        token: localStorage.getItemValue('token'),
                        SKU: function () { return $('[name=SKU]').val() },
                        jwt: localStorage.getItemValue('jwt'),
                        private_key: localStorage.getItemValue('userID'),
                        product_id: function () { return $('[name=ID]').val() },
                    },
                    dataFilter: function (data) {
                        if (data == 'true') {
                            $('input[name="SKU"]').parent().children('p').remove();
                            $('input[name="SKU"]').parent().addClass('state-error');
                            $('input[name="SKU"]').parent().append('<p class="error error">This SKU is already exist</p>');
                        } else {
                            $('input[name="SKU"]').removeClass('error');
                            $('input[name="SKU"]').parent().children('p').remove();
                            $('input[name="SKU"]').parent().addClass('state-success');
                            $('input[name="SKU"]').parent().append('<p><i class="fa fa-check text-success icon-append"></i></p>');
                        }
                        return data !== 'true'
                    }
                }
            },*/
            prod_name: { required: true, maxlength: 300 },
            prod_desc_short: { maxlength: 400 },
            //prod_type: { required: true },
           // prod_class: { required: true },
            product_qty: { required: true, digits: false, number: true },

            // prod_cost: { min: function () { if ($('select[name="prod_class"]').val() == 'Discount') { return Number.MIN_SAFE_INTEGER; } else { return 0; } }},
            // prod_price: { min: function () { if ($('select[name="prod_class"]').val() == 'Discount') { return Number.MIN_SAFE_INTEGER; } else { return 0; } }},
            prod_weight: { min: 0, number: true },
            prod_length: { min: 0, number: true },
            prod_width: { min: 0, number: true },
            prod_height: { min: 0, number: true }
        },
        submitHandler: function (e) {
            id = $('input[name="ID"]').val();
            _f_data = { jwt: localStorage.getItemValue('jwt'), private_key: localStorage.getItemValue('userID') };
            var _data = $("#product_form").serializeArray()
            _data.forEach(function (elem) {
                if (elem.name != '' && elem.value != '') {
                    _f_data[elem.name] = elem.value;
                }
            });
            _f_data['token'] = localStorage.getItemValue('token');
            if (getUrlParameter('id')) {
                var _date = new Date(Date.now());
                _f_data.product_update = _date.getFullYear() + '-' + _date.getMonth() + '-' + _date.getDay();
            }
            /*if (!(Product.prototype.checkProductType(_f_data.prod_type) && Product.prototype.checkProductClass(_f_data.prod_class))) {
                return;
            }*/
            _f_data.prod_file_name = $('input:file[name="prod_photo"]').val().substring($('input:file[name="prod_photo"]').val().lastIndexOf('\\') + 1);
            _f_data.prod_photo = readURLValue;
            _f_data.prod_price = numeral(_f_data.prod_price).value();
            _f_data.prod_cost = numeral(_f_data.prod_cost).value();
            if (Product.prototype._product != null && Product.prototype._product.SKU != null | '') {
                _f_data.SKU = Product.prototype._product.SKU;
            }
            var _link = getUrlParameter('id') ? link._productEdit : link._productsAddNew;
            $.ajax({
                url: _link,
                type: "POST",
                dataType: 'json',
                data: _f_data,
                success: function (res_data2) {
                   // if (res_data2 && typeof res_data2 == 'string' && res_data2.startsWith('{')) {
                       // var tmp = JSON.parse(res_data2);
                        if (res_data2.ERROR !='') {
                            messageForm('Error! An error occurred. ' + res_data2.ERROR, false)
                            return
                        } else {
                            console.log(res_data2.ERROR)
                            readURLValue = null;
                            if (_link == link._productsAddNew) {
                                messageForm('You have successfully added the product', true);
                                if (document.location.href.indexOf('product-form') > 0) {
                                    _href =  "./#ajax/product-form?id=" + res_data2.ID;
                                    $('#product_form [name=ID]').val(res_data2.ID);
                                    responseSuccessForward('You have successfully added the product', true, null, _href, 'Go to edit product');
                                }
                                return
                            } else {
                                messageForm('You have successfully edited the product', true)
                                return
                            }
                        }
                   // }
                }
            });
        }
    },
    initUpdate: function (id) {
        $('input[name="SKU"]').unbind();
        $('input[name="product_qty"]').unbind();
        $.ajax({
            url: link._productGetById,
            type: 'POST',
            data: { token: localStorage.getItemValue('token'), ID: parseInt(id), jwt: localStorage.getItemValue('jwt'), private_key: localStorage.getItemValue('userID') },
            success: function (res) {
                if (res.toString() != '[]') {
                    Product.prototype._product = JSON.parse(res)[0];
                    for (var key in Product.prototype._product) {
                        if (key == 'product_taxable' || key == 'prod_visible' || key == 'prod_inactive' || key == 'prod_internal_visible') {
                            $("input:checkbox[name='" + key + "']").prop('checked', Product.prototype._product[key] == '1' ? true : false);
                        } else if (key != 'prod_photo' && key != 'prod_type' && key != 'prod_class')
                            $("input[name='" + key + "']").val(Product.prototype._product[key]);
                    }
                    $('input[name="SKU"]').prop('readonly', true);
                    $('input[name="product_qty"]').prop('readonly', true);

                    $('textarea[name="prod_desc"]').val(Product.prototype._product['prod_desc'])
                    $('textarea[name="product_notes"]').val(Product.prototype._product['product_notes'])

                    $("select[name='prod_type']").val(Product.prototype._product['prod_type']);
                    $("select[name='prod_class']").val(Product.prototype._product['prod_class']);
                    $('textarea[name="prod_desc_short"]').val(Product.prototype._product['prod_desc_short'])


                    $("input.tagsinput").tagsinput('add', Product.prototype._product['product_tags']);

                    // $('#image-preview').attr('src', (Product.prototype._product.prod_photo != '' ? host + Product.prototype._product.prod_photo : urlPhoto.itemProduct))
                } else {
                    messageForm('No data found with id=' + id + ', please choose another id', false);
                    return;
                }
            }
        })
    },
    checkProductClass: function (prod_class) {

        if (Product.prototype._listClass.indexOf(prod_class) == -1) {
            $('select[name="prod_class"]').addClass('state-error');
            $('select[name="prod_class"]').parent().children('p').remove();
            $('select[name="prod_class"]').parent().append('<p class="error">You must choose correct product class</p>')
            return false;
        } else {
            $('select[name="prod_class"]').removeClass('state-error');
            $('select[name="prod_class"]').parent().children('p').remove();
            return true;
        }
    },
    /****************************************/
    checkProductType: function (prod_type) {
        if (Product.prototype._listType.indexOf(prod_type) == -1) {
            $('select[name="prod_type"]').addClass('state-error');
            $('select[name="prod_type"]').parent().children('p').remove();
            $('select[name="prod_type"]').parent().append('<p class="error">You must choose correct product type</p>')
            return false;
        } else {
            $('select[name="prod_type"]').removeClass('state-error');
            $('select[name="prod_type"]').parent().children('p').remove();
            return true;
        }
    },
    /**************************************/
    get_valid_sku:function(){
        var _formData = {
            token: localStorage.getItemValue('token')
        }
        var _link =link._product_sku;
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": _link,
            "method": "POST",
            dataType: 'json',
            data:_formData,
            error : function (status,xhr,error) {
            },
            success: function (res){ //valid-sku
                if(res.length >0){
                    var li ='';
                    res.forEach(function(item){
                        li +='<li class="sku-select">'+item.container_sku+'</li>'
                    })
                    var ul = '<ul class="dropdown-content-ch" id="valid-sku">' + li+'</ul>'
                    $('#product_form .dropdown-p').html(ul)
                    $('#product_form .dropdown-content-ch').addClass('show-dropdown');

                    $('#product_form .sku-select').unbind('click').bind('click',function(){
                        var op_slected = $(this).text();
                        $('#product_form .sku-product').val(op_slected)
                        $('#product_form .dropdown-content-ch').removeClass('show-dropdown');

                        Product.prototype.get_container_name_sku(op_slected,'#product_form .product_name');

                    });
                    $(document).click(function () {
                        $('#product_form .dropdown-content-ch').removeClass('show-dropdown');
                    });
                    /*$("#product_form .dropdown-p").focusout(function () {
                    });*/
                }
            }
        });
    },
    /*****************************/
    get_container_name_sku:function(container_sku,el){
        var _formData = {
            token: localStorage.getItemValue('token'),
            jwt: localStorage.getItemValue('jwt'),
            private_key: localStorage.getItemValue('userID'),
            container_sku:container_sku
        }
        var _link =link._container_name_sku;
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
                if(data !=null){
                    $(el).val(data)
                }
            }
        })
    }
}

var _Product = new Product();
_Product.init().then(function () {
    if (getUrlParameter('id') && document.location.href.indexOf('product-form') >= 0) {
        Product.prototype.initUpdate(getUrlParameter('id'));
    };
}).catch(function (e) { });


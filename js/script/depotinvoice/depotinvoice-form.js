function DepotInvoice() {}

DepotInvoice._rateContainer = null;
DepotInvoice.prototype.constructor = DepotInvoice;
DepotInvoice.prototype = {
  init: function (callback) {
    // setCompany = this.setCompanyID;
    this.setView();
    _RateContainer.bindEvent();

    if (callback) callback();
  },
  setView: function () {
    $('#depotinvoice_form [name=company_name]').select2({
      placeholder: 'Search Company',
      minimumInputLength: 1,
      language: {
        inputTooShort: function () {
          return 'Enter info';
        },
      },
      ajax: {
        url: link._companiesByName,
        type: 'post',
        dataType: 'json',
        delay: 300,
        data: function (params) {
          var _data = {
            token: localStorage.getItemValue('token'),
            jwt: localStorage.getItemValue('jwt'),
            private_key: localStorage.getItemValue('userID'),
            name: params.term,
          };
          return _data;
        },
        processResults: function (data, params) {
          if (data && data.list) {
            data = data.list;
          }
          data = $.map(data, function (obj) {
            obj.id = obj.ID;
            return obj;
          });
          return { results: data };
        },
        cache: true,
      },
      escapeMarkup: function (markup) {
        return markup;
      },
      templateResult: function (item) {
        var city_state = [];
        if (item.city && item.city.trim() != '') city_state.push(item.city);
        if (item.state && item.state.trim() != '') city_state.push(item.state);
        return (
          '<div class="padding-5">' +
          '<div class="">' +
          item.name +
          '<div class="pull-right">' +
          city_state.join(' - ') +
          '</div>' +
          '</div>' +
          (item.address1 && item.address1 != ''
            ? '<div>' + item.address1 + '</div>'
            : '') +
          '</div>'
        );
      },
      templateSelection: function (item) {
        if (!item.name)
          if (item.text) return item.text;
          else return item.id;
        return item.name;
      },
    });

    // company name

    // container type name

    // $('#depotinvoice_form [name=container_type_name]').select2({
    //   placeholder: 'Search Container Type',
    //   minimumInputLength: 1,
    //   language: {
    //     inputTooShort: function () {
    //       return 'Enter info';
    //     },
    //   },
    //   ajax: {
    //     async: true,
    //     crossDomain: true,
    //     url: link._container_type_search,
    //     type: 'post',
    //     dataType: 'json',
    //     delay: 300,
    //     data: function (params) {
    //       var _data = {
    //         token: localStorage.getItemValue('token'),
    //         text_search: params.term,
    //         login_id: localStorage.getItemValue('userID'),
    //         level: localStorage.getItemValue('level'),
    //       };
    //       return _data;
    //     },
    //     processResults: function (data, params) {
    //       if (data && data.container_types) {
    //         data = data.container_types;
    //       }
    //       data = $.map(data, function (obj) {
    //         obj.id = obj.container_type_id;
    //         return obj;
    //       });
    //       return { results: data };
    //     },
    //     cache: true,
    //   },
    //   escapeMarkup: function (markup) {
    //     return markup;
    //   },
    //   templateResult: function (item) {
    //     return (
    //       '<div class="padding-5">' +
    //       '<div class="">' +
    //       item.container_type_name +
    //       '<div class="pull-right">' +
    //       '</div>' +
    //       '</div>'
    //     );
    //   },
    //   templateSelection: function (item) {
    //     if (!item.container_type_name)
    //       if (item.text) return item.text;
    //       else return item.container_type_id;
    //     return item.container_type_name;
    //   },
    // });

    //

    $('#depotinvoice_form [name=depot_city]').select2({
      placeholder: 'Search depot city',
      minimumInputLength: 1,
      language: {
        inputTooShort: function () {
          return 'Enter info';
        },
      },
      ajax: {
        async: true,
        crossDomain: true,
        url: link._depot_search_city,
        type: 'post',
        dataType: 'json',
        delay: 300,
        data: function (params) {
          var _data = {
            token: localStorage.getItemValue('token'),
            depot_city: params.term,
            login_id: localStorage.getItemValue('userID'),
            group_city: '1',
            level: localStorage.getItemValue('level'),
          };
          return _data;
        },
        processResults: function (data, params) {
          // if (data && data.container_types) {
          //   data = data.container_types;
          // }
          data = $.map(data, function (obj) {
            obj.id = obj.depot_city;
            return obj;
          });
          return { results: data };
        },
        cache: true,
      },
      escapeMarkup: function (markup) {
        return markup;
      },
      templateResult: function (item) {
        return (
          '<div class="padding-5">' +
          '<div class="">' +
          item.depot_city +
          '<div class="pull-right">' +
          '</div>' +
          '</div>'
        );
      },
      templateSelection: function (item) {
        $('#depotinvoice_form [name=depot_name]').select2({
          placeholder: 'Search Depot',
          minimumInputLength: 0,
          language: {
            inputTooShort: function () {
              return 'Enter info';
            },
          },
          ajax: {
            async: true,
            crossDomain: true,
            url: link._depot_search_city,
            type: 'post',
            dataType: 'json',
            delay: 300,
            data: function (params) {
              var _data = {
                token: localStorage.getItemValue('token'),
                // depot_city: params.term,
                depot_city: item.depot_city,
                //  jwt: localStorage.getItemValue('jwt'),
                login_id: localStorage.getItemValue('userID'),
                level: localStorage.getItemValue('level'),
              };
              return _data;
            },
            processResults: function (data, params) {
              if (data && data.depots) {
                data = data.depots;
              }
              data = $.map(data, function (obj) {
                obj.id = obj.depot_id;
                return obj;
              });
              return { results: data };
            },
            cache: true,
          },
          escapeMarkup: function (markup) {
            return markup;
          },
          templateResult: function (item) {
            var city_state = [];
            if (item.depot_city && item.depot_city.trim() != '')
              city_state.push(item.depot_city);
            if (item.depot_state && item.depot_state.trim() != '')
              city_state.push(item.depot_state);
            return (
              '<div class="padding-5">' +
              '<div class="">' +
              item.depot_name +
              '<div class="pull-right">' +
              city_state.join(' - ') +
              '</div>' +
              '</div>' +
              (item.depot_address && item.depot_address != ''
                ? '<div>' + item.depot_address + '</div>'
                : '') +
              '</div>'
            );
          },
          templateSelection: function (item) {
            if (!item.depot_name)
              if (item.text) return item.text;
              else return item.depot_id;
            return item.depot_name;
          },
        });

        if (!item.depot_city)
          if (item.text) return item.text;
          else return item.depot_city;
        return item.depot_city;
      },
    });
    //

    $('#depotinvoice_form [name=prod_name]').select2({
      placeholder: 'Search product',
      minimumInputLength: 1,
      language: {
        inputTooShort: function () {
          return 'Enter info';
        },
      },
      ajax: {
        async: true,
        crossDomain: true,
        url: link._container_type_search,
        type: 'post',
        dataType: 'json',
        delay: 300,
        data: function (params) {
          var _data = {
            token: localStorage.getItemValue('token'),
            text_search: params.term,
            login_id: localStorage.getItemValue('userID'),
            level: localStorage.getItemValue('level'),
          };
          return _data;
        },
        processResults: function (data, params) {
          if (data && data.container_types) {
            data = data.container_types;
          }
          data = $.map(data, function (obj) {
            obj.id = obj.container_type_id;
            return obj;
          });
          return { results: data };
        },
        cache: true,
      },
      escapeMarkup: function (markup) {
        return markup;
      },
      templateResult: function (item) {
        return (
          '<div class="padding-5">' +
          '<div class="">' +
          item.container_type_name +
          '<div class="pull-right">' +
          '</div>' +
          '</div>'
        );
      },
      templateSelection: function (item) {
        if (!item.container_type_name)
          if (item.text) return item.text;
          else return item.container_type_id;
        return item.container_type_name;
      },
    });
  },
  bindEvent: function () {
    var _self = this;

    // $(document).unbind("change", "#contact_form #contact_tags_tag");
    // $(document).unbind("keyup", "#contact_form #contact_tags_tag");

    $('#depotinvoice_form').validate(_self.formValidateOption);

    var fw = getUrlParameter('fw');
    if (
      window.location.href.indexOf('depotinvoice') >= 0 &&
      !(window.opener && fw)
    ) {
      $('#btnBackContact').on('click', function () {
        window.history.back();
      });
    }

    $('input[name="invoice_number"]').mousedown(function () {
      $('input[name="invoice_number"]').parent().children('p').remove();
    });
  },
  initUpdate: function (id) {
    console.log('da vao init update: ', id);
    $('input[name="invoice_number"]').unbind();

    contact_state = new State({ element: '#depotinvoice_form' });
    var _self = this;
    $.ajax({
      url: link._unpaid_inv_search,
      type: 'POST',
      data: {
        token: localStorage.getItemValue('token'),
        invoice_id: parseInt(id),
        private_key: localStorage.getItemValue('userID'),
      },
      dataType: 'json',
      error: function (res) {},
      success: function (res) {
        console.log('res', res);
        var _depotinvoice = res.invoices[0];

        if (_depotinvoice.invoice_paid == 1) {
          $('input[name="company_name"]').unbind();
          $('input[name="depot_location"]').unbind();
          $('input[name="invoice_quantity"]').unbind();
          $('input[name="invoice_price"]').unbind();
          $('input[name="container_type_name"]').unbind();
          $('input[name="depot_city"]').unbind();
          $('input[name="depot_name"]').unbind();
          $('input[name="invoice_paid"]').unbind();
        }
        if (_depotinvoice.invoice_paid == '0') {
          $('input[name="release_number"]').unbind();
        }
        if (_depotinvoice == undefined || !_depotinvoice.invoice_id) {
          messageForm(
            'No data found with depot invoice id = ' +
              id +
              ', please choose another id',
            false,
            '#depotinvoice_form #message_form'
          );
          return;
        } else {
          $('input[name="invoice_number"]').prop('readonly', true);

          if (_depotinvoice.invoice_paid == 1) {
            $('#company_name').prop('disabled', true);
            $('input[name="depot_location"]').prop('readonly', true);
            $('input[name="invoice_quantity"]').prop('readonly', true);
            $('input[name="invoice_price"]').prop('readonly', true);
            $('input[name="container_type_name"]').prop('readonly', true);
            $('input[name="depot_name"]').prop('readonly', true);
            // $('input[name="company_name"]').prop('readonly', true);
            $('input[name="depot_city"]').prop('readonly', true);
            $('input[name="invoice_paid"]').prop('readonly', true);

            $('select[name="container_type_name"]').prop('disabled', true);
            $('select[name="depot_name"]').prop('disabled', true);
            $('select[name="depot_city"]').prop('disabled', true);
            $('#invoice_paid').prop('disabled', true);
          }

          if (_depotinvoice.invoice_paid == '0') {
            $('input[name="release_number"]').prop('readonly', true);
          }

          for (var key in _depotinvoice) {
            $("#depotinvoice_form input:text[name='" + key + "']").val(
              _depotinvoice[key]
            );
            $("#depotinvoice_form input:hidden[name='" + key + "']").val(
              _depotinvoice[key]
            );
          }

          $('input[name="invoice_price"]').val(
            numeral(_depotinvoice.invoice_price).value()
          );
          $('input[name="invoice_quantity"]').val(
            numeral(_depotinvoice.invoice_quantity).value()
          );

          if (
            _depotinvoice.container_type_id &&
            _depotinvoice.container_type_name &&
            _depotinvoice.depot_city &&
            _depotinvoice.depot_name &&
            _depotinvoice.depot_id &&
            _depotinvoice.supplier &&
            _depotinvoice.supplier_name
          ) {
            $('#depotinvoice_form [name="company_name"]')
              .append(
                '<option value="' +
                  _depotinvoice.supplier +
                  '" selected>' +
                  _depotinvoice.supplier_name +
                  '</option>'
              )
              .trigger('change');
            // $.cookie('companyID', _depotinvoice.supplier, {
            //   path: '/',
            //   maxAge: 15,
            // });

            $('#depotinvoice_form [name="depot_name"]')
              .append(
                '<option value="' +
                  _depotinvoice.depot_id +
                  '" selected>' +
                  _depotinvoice.depot_name +
                  '</option>'
              )
              .trigger('change');
            // $.cookie("depotID", _rateContainer.depot_id, {
            //   path: "/",
            //   maxAge: 15,
            // });

            $('#depotinvoice_form [name="container_type_name"]')
              .append(
                '<option value="' +
                  _depotinvoice.container_type_id +
                  '" selected>' +
                  _depotinvoice.container_type_name +
                  '</option>'
              )
              .trigger('change');
            // $.cookie("containertypeID", _rateContainer.container_type_id, {
            //   path: "/",
            //   maxAge: 15,
            // });
            $('#depotinvoice_form [name="depot_city"]')
              .append(
                '<option value="' +
                  _depotinvoice.depot_city +
                  '" selected>' +
                  _depotinvoice.depot_city +
                  '</option>'
              )
              .trigger('change');

            var checked = _depotinvoice.invoice_paid == '1';
            $("#depotinvoice_form input:checkbox[name='invoice_paid']").prop(
              'checked',
              checked
            );
          }
        }
      },
    });
  },
  formValidateOption: {
    ignore: [],
    errorElement: 'label',
    errorPlacement: function (error, element) {
      error.appendTo(element.parent()); // Hiển thị thông báo lỗi dưới trường nhập liệu
    },
    rules: {
      // invoice_number: { required: true },
      container_type_name: { required: true },
      depot_city: { required: true },
      depot_name: { required: true },
      company_name: {
        required: true,
      },
      // company_name: { required: true },
      invoice_quantity: { required: true, digits: false, number: true },
      invoice_price: { required: true },
      invoice_number: {
        required: getUrlParameter('id') ? false : true,
        maxlength: 300,
        remote: {
          url: link._check_unpaid_inv_number,
          type: 'post',
          data: {
            token: localStorage.getItemValue('token'),
            invoice_number: function () {
              return $('[name=invoice_number]').val();
            },
          },
          dataFilter: function (data) {
            if (getUrlParameter('id')) {
              return true;
            }
            if (data == '1') {
              $('input[name="invoice_number"]').parent().children('p').remove();
              $('input[name="invoice_number"]')
                .parent()
                .addClass('state-error');
              $('input[name="invoice_number"]')
                .parent()
                .append(
                  '<p class="error error">This invoice number is already exist</p>'
                );
            } else {
              $('input[name="invoice_number"]').removeClass('error');
              $('input[name="invoice_number"]').parent().children('p').remove();
              $('input[name="invoice_number"]')
                .parent()
                .addClass('state-success');
              $('input[name="invoice_number"]')
                .parent()
                .append(
                  '<p><i class="fa fa-check text-success icon-append"></i></p>'
                );
            }

            return data !== 'true';
          },
        },
      },
    },
    messages: {
      depot_city: {
        required: 'Please enter city name',
      },
      depot_name: {
        required: 'Please enter depot name',
      },
      company_name: {
        required: 'Please select a company', // Thông báo lỗi khi không chọn company
      },
      container_type_name: {
        required: 'Please enter container type name',
      },
      invoice_quantity: {
        required: 'Please enter invoice quantity',
      },
      invoice_price: {
        required: 'Please enter invoice price',
      },
      invoice_number: {
        required: 'Please enter invoice number',
      },
    },
    success: function (e) {
      $(e).remove();
    },
    submitHandler: function (form) {
      var _f_data = {};
      var _data = $(form).serializeArray();
      _data.forEach(function (elem) {
        if (elem.name != '' && elem.value != '') {
          _f_data[elem.name] = elem.value;
        }
      });

      if (
        getUrlParameter('id') &&
        window.location.href.indexOf('depotinvoice') >= 0
      ) {
        _data.forEach(function (elem) {
          if (elem.value == '') {
            _f_data[elem.name] = elem.value;
          }
        });
      }

      var _formData = {
        token: localStorage.getItemValue('token'),
        jwt: localStorage.getItemValue('jwt'),
        data_post: _f_data,
      };

      _f_data.invoice_price = numeral(_f_data.invoice_price).value();

      _f_data.depot_city = $('#depotinvoice_form [name=depot_city]').val();
      _f_data.depot_id = $('#depotinvoice_form [name=depot_name]').val();
      _f_data.supplier = $('#depotinvoice_form [name=company_name]').val();
      _f_data.container_type_id = $(
        '#depotinvoice_form [name=container_type_name]'
      ).val();

      if (
        getUrlParameter('id') &&
        window.location.href.indexOf('depotinvoice') >= 0
      ) {
        $.ajax({
          url: link._unpaid_inv_search,
          type: 'POST',
          data: {
            token: localStorage.getItemValue('token'),
            invoice_id: parseInt(getUrlParameter('id')),
            private_key: localStorage.getItemValue('userID'),
          },
          dataType: 'json',
          error: function (res) {},
          success: function (res) {
            console.log('res', res);
            var _depotinvoice = res.invoices[0];
            // _f_data.product_id = _depotinvoice.product_id;
            if (_depotinvoice.invoice_paid == 1) {
              delete _f_data.invoice_number;
              delete _f_data.vendor_id;
              delete _f_data.depot_location;
              delete _f_data.invoice_quantity;
              delete _f_data.invoice_price;
              delete _f_data.container_type_id;
              delete _f_data.depot_city;
              delete _f_data.depot_id;
              delete _f_data.supplier;
              delete _formData.data_post;
              // delete _f_data.invoice_paid;
            }
          },
        });
      }

      delete _f_data.release_number;

      // delete _f_data.company_name;
      delete _f_data.depot_name;
      delete _f_data.company_name;
      delete _f_data.container_type_name;

      // var checkbox = document.querySelector('input[name="invoice_paid"]');
      // _f_data['invoice_paid'] = checkbox.checked == true ? '1' : '0';

      // if (_f_data['invoice_paid'] == null) {
      //   _f_data['invoice_paid'] = '0';
      // }

      if (
        getUrlParameter('id') &&
        window.location.href.indexOf('depotinvoice') >= 0
      ) {
        _formData.invoice_id = parseInt(getUrlParameter('id'));
      }
      _formData.release_number = $(
        '#depotinvoice_form [name=release_number]'
      ).val();

      if ($('#depotinvoice_form [name=release_number]').val()) {
        _f_data.invoice_paid = '1';
      }
      // _formData.release_number = $("#depotinvoice_form [name=release_number]").val();
      console.log('_formData', _formData);
      $.ajax({
        async: true,
        crossDomain: true,
        url: link._unpaid_inv_new_update,
        method: 'POST',
        dataType: 'json',
        data: _formData,
        success: function (res) {
          console.log('se', res);
          if (res.Save_Update === false) {
            messageForm(
              'Error! An error occurred. ' + res.ERROR,
              false,
              '#depotinvoice_form #message_form'
            );
            return;
          } else if (res.Save_Update === true) {
            if (
              getUrlParameter('id') &&
              window.location.href.indexOf('depotinvoice') >= 0
            ) {
              messageForm(
                'You have successfully edited the depot invoice',
                true,
                '#depotinvoice_form #message_form'
              );
            } else {
              messageForm(
                'You have successfully added the depot invoice',
                true,
                '#depotinvoice_form #message_form'
              );
              $('#depotinvoice_form').trigger('reset');
              $('#depotinvoice_form .error').empty();
              $(
                '#depotinvoice_form .postal_code, #depotinvoice_form .state, #depotinvoice_form .city'
              )
                .val(null)
                .trigger('change');
              $('.modal').modal('hide');
            }
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }
        },
      });
    },
    invalidHandler: function (event, validator) {
      // 'this' refers to the form
      messageForm(
        'Error! An error occurred. ',
        false,
        '#depotinvoice_form #message_form'
      );
    },
  },

  /**
   *
   * @param {Function} callback
   * @purpose : Load state for sale option in Contact type Sales checked
   */
};
var _RateContainer = new DepotInvoice();
_RateContainer.init(function () {
  if (
    getUrlParameter('id') &&
    window.location.href.indexOf('depotinvoice') >= 0
  ) {
    DepotInvoice.prototype.initUpdate(getUrlParameter('id'));
  } else {
    contact_state = new State({ element: '#depotinvoice_form' });
  }
});

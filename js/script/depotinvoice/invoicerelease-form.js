function RateContainer() {}

RateContainer._rateContainer = null;
RateContainer.prototype.constructor = RateContainer;
RateContainer.prototype.id = null;
RateContainer.prototype = {
  init: function (callback) {
    $(document).ready(function () {
      $(document).on('click', '.unpaid-button', function () {
        var invoiceId = $(this).attr('invoice_id');
        RateContainer.prototype.id = invoiceId;
        // Hiển thị modal
        $('#unpaidModal').modal('show');
      });
      $(document).on('click', '#btnCloseModel', function () {
        $('.add_modal_company').modal('hide');
            $('.modal').modal('hide');
      });
    });
    // setCompany = this.setCompanyID;
    this.setView();
    _RateContainer.bindEvent();

    if (callback) callback();
  },
  setView: function () {},
  bindEvent: function () {
    var _self = this;

    // $(document).unbind("change", "#contact_form #contact_tags_tag");
    // $(document).unbind("keyup", "#contact_form #contact_tags_tag");

    $('#invoicerelease_form').validate(_self.formValidateOption);

    var fw = getUrlParameter('fw');
    if (
      window.location.href.indexOf('depotinvoice') >= 0 &&
      !(window.opener && fw)
    ) {
      $('#btnBackContact').on('click', function () {
        window.history.back();
      });
    }
  },
  initUpdate: function (id) {
    console.log('da vao init update: ', id);
  },
  formValidateOption: {
    rules: {
      // invoice_number: { required: true },
      release_number: { required: true },
    },
    messages: {
      release_number: {
        required: 'Please enter release number name',
      },
    },
    success: function (e) {
      $(e).remove();
    },
    submitHandler: function (form) {

      _f_data = {
        invoice_paid: '1',
      };

      var _formData = {
        token: localStorage.getItemValue('token'),
        jwt: localStorage.getItemValue('jwt'),
        data_post: _f_data,
      };

      if (RateContainer.prototype.id) {
        _formData.invoice_id = RateContainer.prototype.id;
        _formData.release_number = $('[name=release_number]').val();
      }
      // _formData.release_number = $("#invoicerelease_form [name=release_number]").val();
      console.log('_formData', _formData);
      $.ajax({
        async: true,
        crossDomain: true,
        url: link._unpaid_inv_paid,
        method: 'POST',
        dataType: 'json',
        data: _formData,
        success: function (res) {
          console.log('res', res);
          if (res.Save_Update === false) {
            messageForm(
              'Error! An error occurred. ' + res.ERROR,
              false,
              '#invoicerelease_form #message_form'
            );
            return;
          } else if (res.Save_Update === true) {
            console.log('cac', res.update);
            messageForm(
              'You have successfully paid depot invoice',
              true,
              '#invoicerelease_form #message_form'
            );
            $('#invoicerelease_form').trigger('reset');
            $('#invoicerelease_form .error').empty();
            $(
              '#invoicerelease_form .postal_code, #invoicerelease_form .state, #invoicerelease_form .city'
            )
              .val(null)
              .trigger('change');

            var _mydata = $.extend({}, template_data);
            var _data = $('#form_search').serializeArray();
            _data.forEach(function (elem) {
              _mydata[elem.name] = elem.value;
            });
            var swapData = _mydata['search_all'];

            if (_mydata['search_all'] && _mydata['search_all'].length > 1) {
              delete _mydata['search_all'];
              _mydata['text_search'] = swapData;
            }
            $.ajax({
              url: link._unpaid_inv_search,
              type: 'POST',
              data: _mydata,
              dataType: 'json',
              success: function (res) {
                console.log('res', res);
                DepotInvoiceList.prototype.displayList(res.invoices);
              },
            });

            $('.add_modal_company').modal('hide');
            $('.modal').modal('hide');
          }
        },
        error: function (e) {
          console.log('e', e);
        },
      });
    },
    invalidHandler: function (event, validator) {
      // 'this' refers to the form
      messageForm(
        'Error! An error occurred. ',
        false,
        '#invoicerelease_form #message_form'
      );
    },
  },

  /**
   *
   * @param {Function} callback
   * @purpose : Load state for sale option in Contact type Sales checked
   */
};
var _RateContainer = new RateContainer();
_RateContainer.init(function () {
  if (
    getUrlParameter('id') &&
    window.location.href.indexOf('depotinvoice') >= 0
  ) {
    RateContainer.prototype.initUpdate(getUrlParameter('id'));
  } else {
    contact_state = new State({ element: '#invoicerelease_form' });
  }
});

function Depot() {}

Depot.pageno = 1;
Depot.pagelength = 10;

Depot._depot = null;
Depot.prototype.constructor = Depot;
Depot.prototype = {
  init: function (callback) {
    loadTable = this.loadTable;
    search = function () {
      Depot.prototype.loadTable();
    };
    $(function () {
      searchType("ratecontainer");
      if ($.cookie("search_all_depot")) {
        $('input[name="search_all"]').val($.cookie("search_all_depot"));
        $('input[name="search_all"]').change();
        search();
        $("#panel_search_all").show();
      } else if (window["search_all_depot"]) {
        $('input[name="search_all"]').val(window["search_all_depot"]);
        $('input[name="search_all"]').change();
        // search();
        delete window["search_all_depot"];
        $("#panel_search_all").show();
      } else {
        $("#table_ratecontainer").ready(function () {
          Depot.prototype.loadTable();
        });
      }
    });

    // setCompany = this.setCompanyID;
    this.setView();
    _Contact.bindEvent();

    if (callback) callback();
  },
  displayList: function (list) {
    var tb_data = $("#table_ratecontainer").DataTable({
      sDom:
        "<'dt-toolbar'<'col-sm-12 col-xs-12'B>r>" +
        "t" +
        "<'dt-toolbar-footer'<'col-sm-6 col-xs-12'i><'col-xs-12 col-sm-6'p>>",
      buttons: [
        {
          extend: "copy",
          text: '<i class="fa fa-files-o text-danger"></i> Copy',
          title: "Rate Container List - " + getDateTime(),
          className: "btn btn-default",
        },
        {
          extend: "csv",
          text: '<i class="fa  fa-file-zip-o text-primary"></i> CSV',
          title: "Rate Container List - " + getDateTime(),
          className: "btn btn-default",
        },
        {
          extend: "excel",
          text: '<i class="fa fa-file-excel-o text-success"></i> Excel',
          title: "Rate Container List - " + getDateTime(),
          className: "btn btn-default",
        },
        {
          extend: "pdf",
          text: '<i class="fa fa-file-pdf-o" style="color:red"></i> PDF',
          title: "Rate Container List - " + getDateTime(),
          className: "btn btn-default",
          action: function (e, dt, node, config) {
            if (!isAdmin()) {
              event.preventDefault();
              messageForm(
                "You haven't permission to download Rate Container List",
                "warning",
                ".message_table:first"
              );
              return false;
            } else {
              $.fn.dataTable.ext.buttons.pdfHtml5.action.call(
                this,
                e,
                dt,
                node,
                config
              );
            }
          },
        },
        {
          extend: "print",
          text: '<i class="fa fa-print"></i> Print',
          title: "Rate Container List - " + getDateTime(),
          className: "btn btn-default",
        },
      ],
      data: list,
      destroy: true,
      // pageLength: 10,
      searching: true,
      // paging: true,
      columns: [
        // { data: 0, title: "#&nbsp;ID" },
        {
          data: function (data, type, row) {
            return data.rate_container_id ? data.rate_container_id : "";
          },
        },
        {
          data: function (data, type, row) {
            return data.prod_name ? data.prod_name : "";
          },
        },
        {
          data: function (data) {
            return data.depot_name ? data.depot_name : "";
          },
          searchable: true,
        },
        {
          data: function (data) {
            return data.container_type_name ? data.container_type_name : "";
          },
          searchable: true,
        },
        {
          data: function (data) {
            return data.container_sku ? data.container_sku : "";
          },
          searchable: true,
        },
        {
          data: function (data) {
            return data.container_rate ? data.container_rate + " $" : "";
          },
          searchable: true,
        },
        {
          data: function (data) {
            return data.container_cost ? data.container_cost + " $" : "";
          },
          searchable: true,
        },
        {
          data: function (data) {
            return data.product_qty ? data.product_qty : "";
          },
          searchable: true,
        },
      ],
      createdRow: function (row, data, dataIndex) {
        // if(!['Affiliate'].includes(department)){
        $(row).attr(
          "title",
          "Click to go to rate container with id is " + data.rate_container_id
        );
        $(row).click(function () {
          window.open(
            host2 + "#ajax/ratecontainer-form.php?id=" + data.rate_container_id,
            "_self"
          );
        });
        // }
      },
      order: [[1, "asc"]],
    });
    // if((['Affiliate']).includes(department)){
    //     $("#table_contact").prepend('<caption class="alert alert-warning">You cannot edit or view contact detail</caption>')
    // }
    $("#table_ratecontainer thead th input").on("keyup change", function () {
      tb_data
        .column($(this).parent().index() + ":visible")
        .search(this.value)
        .draw();
    });
  },
  loadTable: function (_page, _pagelength) {
    var _mydata = $.extend({}, template_data);
    var _data = $("#form_search").serializeArray();
    _data.forEach(function (elem) {
      _mydata[elem.name] = elem.value;
    });

    if (getUrlParameter("id") && window.location.href.indexOf("depot") >= 0) {
      _mydata['depot_id'] = getUrlParameter("id");
    } 

    $.ajax({
      url: link._rate_container_search,
      type: "POST",
      data: _mydata,
      dataType: "json",
      success: function (res) {
        Depot.prototype.displayList(res.rate_containers);
      },
    });
  },
  setView: function () {
    $("#depot_form input:checkbox[name='depot_active']").prop('checked', true);
  },
  bindEvent: function () {
    var _self = this;

    $("#depot_form").validate(_self.formValidateOption);

    var fw = getUrlParameter("fw");
    if (window.location.href.indexOf("depot") >= 0 && !(window.opener && fw)) {
      $("#btnBackContact").on("click", function () {
        window.history.back();
      });
    }
  },
  initUpdate: function (id) {
    contact_state = new State({ element: "#depot_form" });
    var _self = this;
    $.ajax({
      url: link._depot_id,
      type: "POST",
      data: {
        token: localStorage.getItemValue("token"),
        depot_id: parseInt(id),
        private_key: localStorage.getItemValue("userID"),
      },
      dataType: "json",
      error: function (res) {
        console.log("da failed: ", res);
      },
      success: function (res) {
        var _depot = res;
        if (_depot == undefined || !_depot.depot_id) {
          _depotPhone.createPhoneRow();
          messageForm(
            "No data found with depot id = " +
              id +
              ", please choose another id",
            false,
            "#depot_form #message_form"
          );
          return;
        } else {
          for (var key in _depot) {
            $("#depot_form input:text[name='" + key + "']").val(
              _depot[key]
            );
            $("#depot_form input:hidden[name='" + key + "']").val(
              _depot[key]
            );
          }

          contact_state.setValue2(
            "#depot_form",
            _depot.depot_city,
            _depot.depot_state,
            _depot.depot_zip,
            function () {}
          );
          var checked = _depot['depot_active'] == '1';
          $("#depot_form input:checkbox[name='depot_active']").prop('checked', checked);

        }
      },
    });
  },
  formValidateOption: {
    rules: {
      depot_name: { required: true, maxlength: 100 },
      depot_address: { required: true, maxlength: 254 },
      // depot_phone: { maxlength: 25, digits: true, number: true },
      depot_latitude: { maxlength: 100, digits: false, number: true },
      depot_longitude: { maxlength: 100, digits: false, number: true },
    },
    messages: {
      depot_name: {
        required: "Please enter depot name",
      },
      depot_address: {
        required: "Please enter depot address",
      },
    },
    success: function (e) {
      $(e).remove();
    },
    submitHandler: function (form) {
      var _f_data = {};
      var _data = $(form).serializeArray();
      _data.forEach(function (elem) {
        if (elem.name != "" && elem.value != "") {
          _f_data[elem.name] = elem.value;
        }
        if (elem.name == "depot_phone" && elem.value != "") {
          
          var _phone;
          _phone = _f_data[elem.name].replaceAll('-', '');
          _f_data[elem.name] = _phone;
        }
        if (elem.name == "depot_phone" && elem.value != "") {
          
          var _phone;
          _phone = _f_data[elem.name].replaceAll('(', '');
          _f_data[elem.name] = _phone;
        }
        if (elem.name == "depot_phone" && elem.value != "") {
          
          var _phone;
          _phone = _f_data[elem.name].replaceAll(')', '');
          _f_data[elem.name] = _phone;
        }
      });

      if (getUrlParameter("id") && window.location.href.indexOf("depot") >= 0) {
        _data.forEach(function (elem) {
          if (elem.value == "") {
            _f_data[elem.name] = elem.value;
          }
        });
      }

      if(_f_data["depot_active"] == null) {
        _f_data["depot_active"] = '0'
      }

      var _formData = {
        token: localStorage.getItemValue("token"),
        jwt: localStorage.getItemValue("jwt"),
        data_post: _f_data,
      };

      if (getUrlParameter("id") && window.location.href.indexOf("depot") >= 0) {
        _formData.depot_id = parseInt(getUrlParameter("id"));
      }

      $.ajax({
        async: true,
        crossDomain: true,
        url: link._depot_new_update,
        method: "POST",
        dataType: "json",
        data: _formData,
        success: function (res) {
          if (res.Save_Update === false) {
            messageForm(
              "Error! An error occurred. " + res.ERROR,
              false,
              "#depot_form #message_form"
            );
            return;
          } else if (res.Save_Update === true) {
            if (
              getUrlParameter("id") &&
              window.location.href.indexOf("depot") >= 0
            ) {
              messageForm(
                "You have successfully edited the depot",
                true,
                "#depot_form #message_form"
              );
            } else {
              messageForm(
                "You have successfully added the depot",
                true,
                "#depot_form #message_form"
              );
              $("#depot_form").trigger("reset");
              $("#depot_form .error").empty();
              $(
                "#depot_form .postal_code, #depot_form .state, #depot_form .city"
              )
                .val(null)
                .trigger("change");
              $(".modal").modal("hide");
            }
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }
        },
      });
    },
    invalidHandler: function (event, validator) {
      // 'this' refers to the form
      messageForm(
        "Error! An error occurred. ",
        false,
        "#depot_form #message_form"
      );
    },
  },

  /**
   *
   * @param {Function} callback
   * @purpose : Load state for sale option in Contact type Sales checked
   */
};
var _Contact = new Depot();
_Contact.init(function () {
  if (getUrlParameter("id") && window.location.href.indexOf("depot") >= 0) {
    Depot.prototype.initUpdate(getUrlParameter("id"));
  } else {
    contact_state = new State({ element: "#depot_form" });
  }
});

function RateContainerList() {}
RateContainerList.pageno = 1;
RateContainerList.pagelength = 10;
RateContainerList.prototype.constructor = RateContainerList;

RateContainerList.prototype = {
  init: function () {
    loadTable = this.loadTable;
    search = this.loadTable;

    $(function () {
      searchType('ratecontainer');
      $('#table_ratecontainer').ready(function () {
          if ($.cookie('search_all_ratecontainer')) {
            console.log('a1');
              $('input[name="search_all"]').val($.cookie('search_all_ratecontainer'));
              search();
              $('#panel_search_all').show();
          }else if(window['search_all_ratecontainer']){
            console.log('a2');
              $('input[name="search_all"]').val(window['search_all_ratecontainer']);
              $('input[name="search_all"]').change();
              delete window['search_all_ratecontainer'];
              search();
              $('#panel_search_all').show();
          } else {
              search();
          }
      });
  })
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
        // {
        //   data: function (data, type, row) {
        //     return data.company_name ? data.company_name : "";
        //   },
        // },
        {
          data: function (data) {
            return data.depot_name ? data.depot_name : "";
          },
          searchable: true,
        },
        {
          data: function (data) {
            return data.depot_city ? data.depot_city : "";
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
        // {
        //   data: function (data) {
        //     return data.rate_container_margin ? data.rate_container_margin + " $" : "";
        //   },
        //   searchable: true,
        // },
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
        {
          data: function (data) {
            return data.container_cost ? data.container_cost * data.product_qty + " $" : "";
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
            "_blank"
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
  loadTable: function (productId, containerTypeId) {
    $('#closeProductChildPopup').on('click', function () {
      $('#rateContainerPopup').hide();
      $('.modal').modal('hide');
    });

    $('#closeProductChildPopup2').on('click', function () {
      $('#rateContainerPopup').hide();
      $('.modal').modal('hide');
    });

    $('.link').click(function (e) {
      e.preventDefault();
      $('#rateContainerPopup').fadeIn(300, function () {
        $(this).focus();
      });
    });

    $('.close').click(function () {
      $('#rateContainerPopup').fadeOut(300);
    });
    $('#rateContainerPopup').on('blur', function () {
      $(this).fadeOut(300);
    });

    var _mydata = $.extend({}, template_data);
    var _data = $("#form_search").serializeArray();
    _data.forEach(function (elem) {
      _mydata[elem.name] = elem.value;
    });
    var swapData = _mydata['search_all'];

    if (_mydata['search_all'] && _mydata['search_all'].length > 1) {
      delete _mydata['search_all'];
      _mydata['text_search'] = swapData;
    }
    
    _mydata.depot_id = productId;
    _mydata.container_type_id = containerTypeId;

    $.ajax({
      url: link._rate_container_list_container_type,
      type: "POST",
      data: _mydata,
      dataType: "json",
      success: function (res) {
        console.log('child', res);
        RateContainerList.prototype.displayList(res.list);
      },
      error: function (e) {
        console.log('error', e);
      }
    });
  },
};

var _ratecontainerList = new RateContainerList();
_ratecontainerList.init();

function DepotInvoiceList() {}
DepotInvoiceList.pageno = 1;
DepotInvoiceList.pagelength = 10;
DepotInvoiceList.prototype.constructor = DepotInvoiceList;

DepotInvoiceList.prototype = {
  init: function () {
    loadTable = this.loadTable;
    search = this.loadTable;

    $(function () {
      searchType('ratecontainer');
      $('#table_depotinvoice').ready(function () {
        if ($.cookie('search_all_ratecontainer')) {
          console.log('a1');
          $('input[name="search_all"]').val(
            $.cookie('search_all_ratecontainer')
          );
          search();
          $('#panel_search_all').show();
        } else if (window['search_all_ratecontainer']) {
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
    });
  },
  displayList: function (list) {
    var tb_data = $('#table_depotinvoice').DataTable({
      sDom:
        "<'dt-toolbar'<'col-sm-12 col-xs-12'B>r>" +
        't' +
        "<'dt-toolbar-footer'<'col-sm-6 col-xs-12'i><'col-xs-12 col-sm-6'p>>",
      buttons: [
        {
          extend: 'copy',
          text: '<i class="fa fa-files-o text-danger"></i> Copy',
          title: 'Depot Invoice List - ' + getDateTime(),
          className: 'btn btn-default',
        },
        {
          extend: 'csv',
          text: '<i class="fa  fa-file-zip-o text-primary"></i> CSV',
          title: 'Depot Invoice List - ' + getDateTime(),
          className: 'btn btn-default',
        },
        {
          extend: 'excel',
          text: '<i class="fa fa-file-excel-o text-success"></i> Excel',
          title: 'Depot Invoice List - ' + getDateTime(),
          className: 'btn btn-default',
        },
        {
          extend: 'pdf',
          text: '<i class="fa fa-file-pdf-o" style="color:red"></i> PDF',
          title: 'Depot Invoice List - ' + getDateTime(),
          className: 'btn btn-default',
          action: function (e, dt, node, config) {
            if (!isAdmin()) {
              event.preventDefault();
              messageForm(
                "You haven't permission to download Depot Invoice List",
                'warning',
                '.message_table:first'
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
          extend: 'print',
          text: '<i class="fa fa-print"></i> Print',
          title: 'Depot Invoice List - ' + getDateTime(),
          className: 'btn btn-default',
        },
      ],
      data: list,
      destroy: true,
      // pageLength: 10,
      searching: true,
      // paging: true,
      columns: [
        // { data: 0, title: "#&nbsp;ID" },
        // {
        //   data: function (data, type, row) {
        //     return data.invoice_id ? data.invoice_id : '';
        //   },
        // },
        // {
        //   data: function (data, type, row) {
        //     var invoice_link ='<a target="_blank" title="Go to depot invoice id '+ data.invoice_id +'" href="#ajax/depotinvoice-form.php?id='+data.invoice_id+'">'+data.invoice_id+'</a>'+
        //         '<input type="hidden" class="order-id" value="'+ data.invoice_id +'">'
        //     return invoice_link;
        //   },
        // },
        {
          data: function (data, type, row) {
            var invoice_link ='<a target="_blank" title="Go to depot invoice id '+ data.invoice_id +'" href="#ajax/depotinvoice-form.php?id='+data.invoice_id+'">'+data.invoice_number+'</a>'+
                '<input type="hidden" class="order-id" value="'+ data.invoice_number +'">'
            return invoice_link;
          },
        },
        {
          data: function (data) {
            return data.container_type_name ? data.container_type_name : '';
          },
          searchable: true,
        },
        {
          data: function (data) {
            return data.depot_name ? data.depot_name : '';
          },
          searchable: true,
        },
        {
          data: function (data) {
            return data.org_depot_city ? data.org_depot_city : '';
          },
          searchable: true,
        },
        {
          data: function (data) {
            return data.depot_location ? data.depot_location : '';
          },
          searchable: true,
        },
        {
          data: function (data) {
            return data.invoice_price ? data.invoice_price + ' $' : '';
          },
          searchable: true,
        },
        {
          data: function (data) {
            return data.invoice_quantity ? data.invoice_quantity : '';
          },
          searchable: true,
        },
        {
          data: function (data) {
            return data.release_number ? data.release_number : '';
          },
          searchable: true,
        },
        // {
        //   data: function (data) {
        //     return "câc";
        //   },
        //   searchable: true,
        // },
        {
          data: function (data, type, row) {
            
            var pain_link = '<button style="width: 62px;" class="btn btn-success btn-sm edit-task">Paid</button>';
            var pay_link = '<button class="btn btn-danger btn-sm edit-task unpaid-button" id="btnAddCompanyContact2" data-toggle="modal" data-target="#add_modal_company" invoice_id ="'+ data.invoice_id +'">Unpaid</button>';
            //var pay_link = '<button type="button" id="btnAddCompanyContact2" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#add_modal_company">Add Company</button>';

            var isChecked = data.invoice_paid === '1' ? pain_link : pay_link;
            return (
              // '<input type="checkbox" name="invoice_paid" value="1" ' +
              // isChecked +
              // ' />'
              isChecked
            );
          },
        },
      ],
      createdRow: function (row, data, dataIndex) {
        // if(!['Affiliate'].includes(department)){
        // $(row).attr(
        //   'title',
        //   'Click to go to depot invoice with id is ' + data.invoice_id
        // );
        // $(row).click(function () {
        //   window.open(
        //     host2 + '#ajax/depotinvoice-form.php?id=' + data.invoice_id,
        //     '_self'
        //   );
        // });
        // }
      },
      order: [[1, 'asc']],
    });
    // if((['Affiliate']).includes(department)){
    //     $("#table_contact").prepend('<caption class="alert alert-warning">You cannot edit or view contact detail</caption>')
    // }
    $('#table_depotinvoice thead th input').on('keyup change', function () {
      tb_data
        .column($(this).parent().index() + ':visible')
        .search(this.value)
        .draw();
    });
  },
  loadTable: function (_page, _pagelength) {
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
  },
};

var _ratecontainerList = new DepotInvoiceList();
_ratecontainerList.init();

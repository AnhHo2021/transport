function ProductList() {}
ProductList.pageno = 1;
ProductList.pagelength = 10;
ProductList.prototype.constructor = ProductList;
ProductList.prototype = {
  init: function () {
    loadTable = this.loadTable;
    search = this.loadTable;
    $(function () {
      searchType('product');
      $('#table_product').ready(function () {
        if ($.cookie('search_all_product')) {
          $('input[name="search_all"]').val($.cookie('search_all_product'));
          search();
          $('#panel_search_all').show();
        } else if (window['search_all_product']) {
          $('input[name="search_all"]').val(window['search_all_product']);
          $('input[name="search_all"]').change();
          delete window['search_all_product'];
          search();
          $('#panel_search_all').show();
        } else {
          search();
        }
      });
    });
  },

  loadTable: function () {
    var _mydata = $.extend({}, template_data);
    var _data = $('#form_search').serializeArray();
    _data.forEach(function (elem) {
      if (elem.name != '' && elem.value != '') {
        _mydata[elem.name] = elem.value;
      }
    });

    var swapData = _mydata['search_all'];

    if (_mydata['search_all'] && _mydata['search_all'].length > 1) {
      delete _mydata['search_all'];
      _mydata['text_search'] = swapData;
    }
    
    $.ajax({
      url: link._product_grp_list,
      type: 'POST',
      data: _mydata,
      dataType: 'json',
      success: function (res) {
        console.log('res1', res);
        var table = $('#table_product').DataTable({
          sDom:
            "<'dt-toolbar'<'col-sm-12 col-xs-12'B>r>" +
            't' +
            "<'dt-toolbar-footer'<'col-sm-6 col-xs-12'i><'col-xs-12 col-sm-6'p>>",
          buttons: [
            {
              extend: 'copy',
              text: '<i class="fa fa-files-o text-danger"></i> Copy',
              title: 'Product List - ' + getDateTime(),
              className: 'btn btn-default',
            },
            {
              extend: 'csv',
              text: '<i class="fa  fa-file-zip-o text-primary"></i> CSV',
              title: 'Product List - ' + getDateTime(),
              className: 'btn btn-default',
            },
            {
              extend: 'excel',
              text: '<i class="fa fa-file-excel-o text-success"></i> Excel',
              title: 'Product List - ' + getDateTime(),
              className: 'btn btn-default',
            },
            {
              extend: 'pdf',
              text: '<i class="fa fa-file-pdf-o" style="color:red"></i> PDF',
              title: 'Product List - ' + getDateTime(),
              className: 'btn btn-default',
              action: function (e, dt, node, config) {
                if (isAdmin()) {
                  event.preventDefault();
                  messageForm(
                    "You haven't permission to download product list",
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
              title: 'Product List - ' + getDateTime(),
              className: 'btn btn-default',
            },
          ],
          data: res.list,
          destroy: true,
          columns: [
            { data: null },
            { data: 'depot_name', searchable: true },
            { data: 'depot_city', searchable: true },
            // { data: function (data, type, row) {
            //     return (data.prod_photo && data.prod_photo != '' ? '<img src="' + data.prod_photo + '"' : '<img src="' + urlPhoto.itemProduct + '"') + ' class="product-img">'; }, "searchable": true },
            { data: 'container_type_name', searchable: true },
            { data: 'qty', searchable: true },
            // {
            //     data: function (data, type, row) {
            //         var _price = data.prod_price
            //         return (_price >= 0 ? numeral(_price).format('$ 0,0.00') : '(' + numeral(-_price).format('$ 0,0.00') + ')');

            //     },
            //     "searchable": true,
            //     className: 'text-right'
            // },
            // { data: 'product_qty', "searchable": true },
            // { data: 'prod_type', "searchable": true },
            // { data: 'prod_class', "searchable": true },
            // {
            //     data: function (data, type, row) {
            //         return (data.prod_desc) ? (data.prod_desc && data.prod_desc.length < 50 ? data.prod_desc : data.prod_desc.substring(0, 48) + '...') : '';
            //     }
            // },
          ],
          createdRow: function (row, data, dataIndex) {
            // $(row).attr('title', 'Click to go to product');
            // $(row).click(function () {
            //   console.log('1');

            //   // window.open(host2 + '#ajax/product-form.php?id=' + data.ID, '_self');
            //   // $('#table_child_product').data('rowData', data);

            //   $('#table_ratecontainer').modal('show');

            //   var _ratecontainerList = new RateContainerList();
            //   _ratecontainerList.init();
            // });

            $(row).attr('data-depot-id', data.depot_id);
            $(row).attr('data-container-type-id', data.container_type_id);
            $(row).addClass('product-row');
          },
          order: [[2, 'asc']],
        });
        table
          .on('order.dt search.dt', function () {
            table
              .column(0, { search: 'applied', order: 'applied' })
              .nodes()
              .each(function (cell, i) {
                cell.innerHTML = i + 1;
              });
          })
          .draw();
        $('#table_product thead th input').on('keyup change', function () {
          table
            .column($(this).parent().index() + ':visible')
            .search(this.value)
            .draw();
        });
        $('#table_product tbody').on('click', 'tr.product-row', function () {
          var productId = $(this).data('depot-id');
          var containerTypeId = $(this).data('container-type-id');
          // Call a function to display user pop-up based on productId
          showUserPopup(productId, containerTypeId);
        });  

        function showUserPopup(productId, containerTypeId) {
          $('#userPopup').show();
          var _productChildList = new ProductChildList();
          _productChildList.loadTable(productId, containerTypeId);
        }
      },
    });
  },
};

var _productList = new ProductList();
_productList.init();

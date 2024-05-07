function ProductChildList() {}
ProductChildList.pageno = 1;
ProductChildList.pagelength = 10;
ProductChildList.prototype.constructor = ProductChildList;

ProductChildList.prototype = {
  init: function () {
    loadTable = this.loadTable;
    search = this.loadTable;

    $('#closePopup').on('click', function () {
      $('#userPopup').hide();
    });

    $(function () {
      searchType('ratecontainer');
      $('#table_child_product').ready(function () {
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
    var tb_data = $('#table_child_product').DataTable({
      sDom:
        "<'dt-toolbar'<'col-sm-12 col-xs-12'B>r>" +
        't' +
        "<'dt-toolbar-footer'<'col-sm-6 col-xs-12'i><'col-xs-12 col-sm-6'p>>",
      buttons: [
        {
          extend: 'copy',
          text: '<i class="fa fa-files-o text-danger"></i> Copy',
          title: 'Rate Container List - ' + getDateTime(),
          className: 'btn btn-default',
        },
        {
          extend: 'csv',
          text: '<i class="fa  fa-file-zip-o text-primary"></i> CSV',
          title: 'Rate Container List - ' + getDateTime(),
          className: 'btn btn-default',
        },
        {
          extend: 'excel',
          text: '<i class="fa fa-file-excel-o text-success"></i> Excel',
          title: 'Rate Container List - ' + getDateTime(),
          className: 'btn btn-default',
        },
        {
          extend: 'pdf',
          text: '<i class="fa fa-file-pdf-o" style="color:red"></i> PDF',
          title: 'Rate Container List - ' + getDateTime(),
          className: 'btn btn-default',
          action: function (e, dt, node, config) {
            if (!isAdmin()) {
              event.preventDefault();
              messageForm(
                "You haven't permission to download Rate Container List",
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
          title: 'Rate Container List - ' + getDateTime(),
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
        {
          data: function (data, type, row) {
            return data.ID ? data.ID : '';
          },
        },
        {
          data: function (data, type, row) {
            return data.prod_name ? data.prod_name : '';
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
            return data.depot_city ? data.depot_city : '';
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
            return data.release_number ? data.release_number : '';
          },
          searchable: true,
        },
        {
          data: function (data) {
            return data.product_qty ? data.product_qty : '';
          },
          searchable: true,
        },
        {
          data: function (data) {
            return data.container_rate ? data.container_rate : '';
          },
          searchable: true,
        },
      ],
      createdRow: function (row, data, dataIndex) {
        // if(!['Affiliate'].includes(department)){
        $(row).attr('title', 'Click to go to product with id is ' + data.ID);
        $(row).click(function () {
          window.open(host2 + '#ajax/product-form.php?id=' + data.ID, '_blank');
        });
        // }
      },
      order: [[1, 'asc']],
    });
    // if((['Affiliate']).includes(department)){
    //     $("#table_contact").prepend('<caption class="alert alert-warning">You cannot edit or view contact detail</caption>')
    // }
    $('#table_child_product thead th input').on('keyup change', function () {
      tb_data
        .column($(this).parent().index() + ':visible')
        .search(this.value)
        .draw();
    });
  },
  loadTable: function (productId, containerTypeId) {
    $('#closeProductChildPopup').on('click', function () {
      $('#userPopup').hide();
      $('.modal').modal('hide');
    });

    $('#closeProductChildPopup2').on('click', function () {
      $('#userPopup').hide();
      $('.modal').modal('hide');
    });

    // $(document).on('click', function (event) {
    //   var userPopup = $('#userPopup');
    //   if (
    //     !$(event.target).closest(userPopup).length &&
    //     !$(event.target).is(userPopup) &&
    //     !userPopup.is(':visible')
    //   ) {
    //     console.log('shoiw');
    //     userPopup.hide();

    //   } else {
    //     console.log('hide');
    //     userPopup.show();
    //     // $('.modal').modal('hide');
    //   }
    // });

    $('.link').click(function (e) {
      e.preventDefault();
      $('#userPopup').fadeIn(300, function () {
        $(this).focus();
      });
    });

    $('.close').click(function () {
      $('#userPopup').fadeOut(300);
    });
    $('#userPopup').on('blur', function () {
      $(this).fadeOut(300);
    });

    var _mydata = $.extend({}, template_data);
    var _data = $('#form_search').serializeArray();
    _data.forEach(function (elem) {
      _mydata[elem.name] = elem.value;
    });
    
    _mydata.depot_id = productId;
    _mydata.container_type_id = containerTypeId;
    $.ajax({
      url: link._prods_list_container_type,
      type: 'POST',
      data: _mydata,
      dataType: 'json',
      success: function (res) {
        console.log('nguyen', res);
        ProductChildList.prototype.displayList(res.list);
      },
    });
  },
};

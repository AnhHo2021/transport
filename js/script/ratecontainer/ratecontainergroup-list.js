function RateContainerGroupList() {}
RateContainerGroupList.pageno = 1;
RateContainerGroupList.pagelength = 10;
RateContainerGroupList.prototype.constructor = RateContainerGroupList;
RateContainerGroupList.prototype = {
  init: function () {
    loadTable = this.loadTable;
    search = this.loadTable;

    $(function () {
      searchType('ratecontainer');
      $('#table_ratecontainergroup').ready(function () {
        if ($.cookie('search_all_ratecontainer')) {
          $('input[name="search_all"]').val(
            $.cookie('search_all_ratecontainer')
          );
          search();
          $('#panel_search_all').show();
        } else if (window['search_all_ratecontainer']) {
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
    var tb_data = $('#table_ratecontainergroup').DataTable({
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
        { data: null },
        {
          data: function (data) {
            var depotInfor =
              '<div ' +
              'class ="absolute-report" >' +
              data.depot_name +
              '<div class="tooltiptext_2">Total quantity: ' +
              data.total_container +
              '</br>' +
              'Total cost: ' +
              data.total_cost +
              '</div>' +
              '</div>';
            // $(row).append(depotInfor);
            return data.depot_name ? depotInfor : '';
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
            return data.container_type_name ? data.container_type_name : '';
          },
          searchable: true,
        },
        // {
        //   data: function (data) {
        //     return data.container_sku ? data.container_sku : "";
        //   },
        //   searchable: true,
        // },
        {
          data: function (data) {
            return (
              '<input class="input-list" type="number" name="rate_container_margin_update_' + data.depot_id + '_' + data.container_type_id + '"' +  'value=' +
              data.avg_margin +
              '>'
            );
          },
          searchable: true,
        },
        {
          data: function (data) {
            return data.avg_container_cost
              ? data.avg_container_cost + ' $'
              : '';
          },
          searchable: true,
        },
        {
          data: function (data) {
            return data.min_cost ? data.min_cost + ' $' : '';
          },
          searchable: true,
        },
      ],
      createdRow: function (row, data, dataIndex) {
        // $(row).attr(
        //   "title",
        //   "Click to go to rate container with id is " + data.rate_container_id
        // );
        // $(row).click(function () {
        //   window.open(
        //     host2 + "#ajax/ratecontainer-form.php?id=" + data.rate_container_id,
        //     "_self"
        //   );
        // });

        $(row).attr('data-depot-id', data.depot_id);
        $(row).attr('data-avg-margin', data.avg_margin);
        $(row).attr('data-container-type-id', data.container_type_id);
        $(row).addClass('product-row-list');
      },
      order: [[1, 'asc']],
    });
    // if((['Affiliate']).includes(department)){
    //     $("#table_contact").prepend('<caption class="alert alert-warning">You cannot edit or view contact detail</caption>')
    // }
    tb_data
      .on('order.dt search.dt', function () {
        tb_data
          .column(0, { search: 'applied', order: 'applied' })
          .nodes()
          .each(function (cell, i) {
            cell.innerHTML = i + 1;
          });
      })
      .draw();
    // document.querySelector('td:nth-child(4)').style.padding = '0';
    tb_data
      .on('order.dt search.dt', function () {
        tb_data
          .column(4, { search: 'applied', order: 'applied' })
          .nodes()
          .each(function (cell, i) {
            var tdElements =
              cell.parentNode.querySelectorAll('td:nth-child(5)');
            if (tdElements) {
              tdElements.forEach(function (tdElement) {
                tdElement.style.padding = '0';
                tdElement.style.height = '10px';
              });
            }
          });
      })
      .draw();

    $('#table_ratecontainergroup thead th input').on(
      'keyup change',
      function () {
        tb_data
          .column($(this).parent().index() + ':visible')
          .search(this.value)
          .draw();
      }
    );

    // hay

    $('#table_ratecontainergroup tbody').on(
      'keydown',
      'tr.product-row-list input',
      function (e) {
        if (e.key === 'Enter') {
          
          
          // var margin2 = numeral(margin).value();
          // _f_data.container_cost = numeral($('[name=rate_container_margin_update]').val()).value();
          var productId = $(this).closest('tr').attr('data-depot-id');
          // var margin = $(this).closest('tr').attr('data-avg-margin');
          var containerTypeId = $(this)
            .closest('tr')
            .attr('data-container-type-id');
          // var margin = $(this).closest('tr').attr('data-avg-margin');

          var string1 = 'rate_container_margin_update_' + productId + '_' + containerTypeId;
          var margin = $('[name=' + string1 + ']').val();

          var _formData = {
            token: localStorage.getItemValue('token'),
            jwt: localStorage.getItemValue('jwt'),
            depot_id: productId,
            rate_container_margin: margin,
            container_type_id: containerTypeId,
          };

          $.ajax({
            async: true,
            crossDomain: true,
            url: link._rate_container_margin_update,
            method: 'POST',
            dataType: 'json',
            data: _formData,
            success: function (res) {
              if (res === 1) {

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
                  url: link._rate_container_grp_list,
                  type: 'POST',
                  data: _mydata,
                  dataType: 'json',
                  success: function (res) {
                    // RateContainerGroupList.prototype.displayList(res.list);
                    tb_data.clear().rows.add(res.list).draw();
                  },
                });

                messageForm(
                  'You have successfully edited the margin for depot Id = ' + productId,
                  true,
                  '#table_ratecontainergroup1 #message_form'
                );
                // return;
              } else {
                messageForm(
                  'Error! An error occurred. ' + res.ERROR,
                  false,
                  '#table_ratecontainergroup1 #message_form'
                );
                return;
              }
            },
            error(e) {
              console.log('e', e);
            },
          });
        }
      }
    );

    $('#table_ratecontainergroup tbody').on(
      'click',
      'tr.product-row-list input',
      function (e) {
        e.stopPropagation();
      }
    );

    $('#table_ratecontainergroup tbody').on(
      'click',
      'tr.product-row-list',
      function (e) {
        var columnIndex = $(e.target).index();
        if (columnIndex === 4) {
          return;
        }
        var productId = $(this).data('depot-id');
        var containerTypeId = $(this).data('container-type-id');
        showUserPopup(productId, containerTypeId);
      }
    );

    function showUserPopup(productId, containerTypeId) {
      $('#rateContainerPopup').show();
      var _ratecontainerChildList = new RateContainerList();
      _ratecontainerChildList.loadTable(productId, containerTypeId);
    }
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
      url: link._rate_container_grp_list,
      type: 'POST',
      data: _mydata,
      dataType: 'json',
      success: function (res) {
        RateContainerGroupList.prototype.displayList(res.list);
      },
    });
  },
};

var _rateContainerGroupList = new RateContainerGroupList();
_rateContainerGroupList.init();

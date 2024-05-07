<!-- Modal center Large -->
<div class="modal fade smart-form" id="modal-prd-detail"  tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog modal-lg1 modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header diaglog-modal-title ">
                <h5 class="modal-title"><strong>Product list</strong></h5>
                <button type="button" class="close diaglog-close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true"><i class="fa fa-times"></i></span>
                </button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="date-click" value="">
                <!---->
                <div class="p30-lr m-t10">
                    <div class="row m-t10 m-b10">
                        <div class="col col-6 p-l">
                            <input type="text" class="form-control text-search" placeholder="text-search">
                        </div>
                        <div class="col col-1">
                            <button class="btn btn-sm btn-primary btn-search-detail">Search </button>
                        </div>
                        <div class="col col-3">
                            <button class="btn btn-sm btn-default btn-excell-detail">Excel export </button>
                        </div>
                    </div>
                    <div class="row m-t10 m-b25">
                        <div class="table-responsive-lg col-12">
                            <table class="table table-bordered m-0 t-normal" id="tbl-prd-detail">
                                <thead>
                                <tr>
                                    <th>Product name</th>
                                    <th>Container</th>
                                    <th>Depot</th>
                                    <th>City</th>
                                    <th>Quantity</th>
                                    <th>Date</th>
                                </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                        <div class="col-12 m-t15">
                            <ul id="pagination-tbl-prd-detail" class="pagination-sm"></ul>
                        </div>
                    </div>
                </div>
                <!---->
            </div>

        </div>
    </div>
</div>



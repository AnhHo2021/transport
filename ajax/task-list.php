<?php
require_once 'inc/init.php';
?>
<section id="widget-grid" class="">
   <?php $_typesearch = "task";
   include('search_message.php'); ?>
   <div class="row">
      <article class="col-sm-12 col-md-12 col-lg-12">
         <div class="jarviswidget" data-widget-colorbutton="true" data-widget-editbutton="true">
            <header>
               <h2><i class="fa fa-table"></i> Task list </h2>
               <a href="./#ajax/task.php" class="btn btn-primary pull-right"><i class="fa fa-plus"></i> Create new task</a>
            </header>
            <div role="content">
               <div class="jarviswidget-editbox"></div>
               <div class="widget-body">
                  <?php $event = 'loadTable';
                  include('search-table.php'); ?>
                  <div>
                     <span class="pull-right">
                        Status:
                        <select style="min-width: 400px;" id="task_select_status" multiple="true">
                           <option value="&nbsp;">&nbsp;</option>
                           <option value="NEEDS TO BE SCHEDULED" selected>Scheduling</option>
                           <option value="SCHEDULED FOR DELIVERY" selected>Scheduled</option>
                           <option value="PICKED UP" selected>Out for delivery</option>
                           <option value="DELIVERED" selected>Delivered</option>
                           <option value="CLOSED">Billing and close out</option>
                            <option value="CANCELLED">Cancelled</option>
                            <option value="Problems">PROBLEMS</option>
                        </select>
                     </span>
                  </div>
                  <div class="clearfix"></div>
                  <table id="table_task" class="table table-responsive table-bordered table-striped table-hover" width="100%">
                     <thead>
                        <tr>
                           <th></th>
                           <th class="hasinput"><input type="text" id="filter_name" class="form-control" placeholder="Filter Task Name"></th>
                           <th class="hasinput"><input type="text" class="form-control" placeholder="Filter Driver"></th>
                            <th class="hasinput"><input type="text" class="form-control" placeholder="Filter Quantity"></th>
                           <th class="hasinput"><input type="text" class="form-control" placeholder="Action Set"></th>
                           <th class="hasinput"><input type="text" class="form-control" placeholder="Filter Status"></th>
                           <th class="hasinput"><input type="text" class="form-control" placeholder="Filter Order"></th>
                           <th class="hasinput"><input type="text" class="form-control" placeholder="Filter Container"></th>
                           <th class="hasinput"><input type="text" class="form-control" placeholder="Filter Time"></th>
                        </tr>
                        <tr>
                           <th>#</th>
                           <th>Task Name</th>
                           <th>Driver</th>
                            <th>Quantity</th>
                           <th>Action Set</th>
                           <th>Status</th>
                           <th>Order</th>
                           <th>Container name</th>
                            <th>Delivery date</th>
                        </tr>
                     </thead>
                     <tbody></tbody>
                     <tfoot></tfoot>
                  </table>
               </div>
            </div>
         </div>
      </article>
   </div>
</section>
<script src="<?php echo ASSETS_URL; ?>/js/script/task/task-list.js"></script>
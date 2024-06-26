<?php
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : $_SERVER['HTTP_HOST'];
header('Access-Control-Allow-Origin: ' . $origin);
header('Access-Control-Allow-Methods: POST, OPTIONS, GET, PUT');
header('Access-Control-Allow-Credentials: true');

require '../vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Color;

include_once 'api_path.php';
$from_date  = '';
if(isset($_POST["from_date"])) $from_date  =$_POST["from_date"];
$to_date  = '';
if(isset($_POST["to_date"])) $to_date  =$_POST["to_date"];
$status = '';
if(isset($_POST["status"])) $status  =$_POST["status"];
$text_search  = '';
if(isset($_POST["text_search"])) $text_search  =$_POST["text_search"];
$token =$_POST["token"];
$select_type ='';
if(isset($_POST["select_type"])) $select_type =$_POST["select_type"];
$is_report='';
if(isset($_POST["is_report"])) $is_report =$_POST["is_report"];

 $link1 ='_quote_list.php';
        if($status =='paid_sales'){
            $link1 = '_order_report_salesperson_paid.php';
        }else if($status =='paid_driver'){
            $link1 = '_order_report_driver_paid.php';
        }

$ob_api_path = new Api_Path();
$api_path_dev = $ob_api_path->api_path_dev.$link1;
$domain_path = $ob_api_path->domain_path;

$processing_percentage = $ob_api_path->processing_percentage;

$post = array('token' => $token,'from_date'=>$from_date,
'to_date'=>$to_date,'status'=>$status,
'text_search'=>$text_search,
'select_type'=>$select_type,
'is_report'=>$is_report);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,$api_path_dev);
curl_setopt($ch, CURLOPT_POST,1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$rsl=curl_exec ($ch);
curl_close ($ch);


$data_arr = json_decode($rsl,true);
//print_r($data_arr); die();
$data_temp = $data_arr['list'];

$headers =array("Order #","Customer",
    "Phone","Email","Street",
    "State& Zip","Product","Revenue",
    "Container","Processing","Paid",
    "COD","Scheduled","Del Date",
    "Delivered","Release","Depot",
    "Miles",
    "Driver","Driver Pay","Driver paid",
    "Salesperson","Salesperson Pay","Salesperson paid",
    "PROFIT");

$key =array("order_id","shipping_customer_name",
    "shipping_phone","shipping_email_phone","shipping_address",
    "shipping_state","container_type_name","revenue",
    "avg_cost","processing","payment",
    "COD","Scheduled","assign_task_delivery_date",
    "delivered","release","depot_address",
    "mile",
    "assign_task_driver_name","assign_task_driver_total","driver_total_payment",
    "s_name","salesperson_amount","salesperson_total_payment",
    "PROFIT");
if($data_arr["row_cnt"] > 0 ){
    $i=1;
}

$spreadsheet = new Spreadsheet();
$sheet = $spreadsheet->getActiveSheet();

$sheet->getStyle('A1:M1')->getFill()
    ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
    ->getStartColor()->setARGB('ff9900');
$sheet->getStyle('O1')->getFill()
    ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
    ->getStartColor()->setARGB('ff9900');
$sheet->getStyle('U1:Z1')->getFill()
    ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
    ->getStartColor()->setARGB('ff9900');
$sheet->getStyle('P1:Q1')->getFill()
    ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
    ->getStartColor()->setARGB('00ffff');
$sheet->getStyle('S1:T1')->getFill()
    ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
    ->getStartColor()->setARGB('00ffff');
$sheet->getStyle('U1:V1')->getFill()
    ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
    ->getStartColor()->setARGB('00ffff');


$sheet->getStyle('N1')->getFill()
    ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
    ->getStartColor()->setARGB('00ff00');
$sheet->getStyle('R1')->getFill()
    ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
    ->getStartColor()->setARGB('00ff00');

$sheet->getStyle('A:Z')->getAlignment()->setHorizontal('center');

for ($i = 0, $l = sizeof($headers); $i < $l; $i++) {
    $sheet->setCellValueByColumnAndRow($i + 1, 1, $headers[$i]);
}

for ($i = 'A'; $i !=  $sheet->getHighestColumn(); $i++) {
    $sheet->getColumnDimension($i)->setAutoSize(TRUE);

}

$styleArray = array(
    'borders' => array(
        'outline' => array(
            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
            'color' => array('argb' => '000000'),
        ),
    ),
);

for ($i = 0, $l = sizeof($data_temp); $i < $l; $i++) { // row $i
    $data = $data_temp[$i];

    $k1 = $i + 2;
    $sheet ->getStyle('A'.$k1.':U'.$k1)->applyFromArray($styleArray);

    $sheet->getStyle('C'.$k1)->getFill()
        ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
        ->getStartColor()->setARGB('fddce8');

    if($k1%2 !=0){
        $sheet->getStyle('A'.$k1.':'.'C'.$k1)->getFill()
            ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
            ->getStartColor()->setARGB('fddce8');
    }
    $sheet->getStyle('E'.$k1.':'.'J'.$k1)->getFill()
        ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
        ->getStartColor()->setARGB('fddce8');


    $schude_payment ='';
    $is_COD ='';
    if(isset($data['pay_acct'])){
        foreach($data['pay_acct'] as $k11){
            // echo "<pre>";print_r($k11);echo "</pre>";
            if($k11['pay_type']=='CC'){
                $is_COD =1;
                $schude_payment =($schude_payment=='')?$k11['pay_date']:$schude_payment.', '.$k11['pay_date'];
            }
        }
    }
    //die();
    $j = 0;
    foreach ($key as $k) {
       // echo "<pre>";print_r($k .'= '.$data[$k]);echo "</pre>";
        if($k =='revenue'){
            $revenue ='';
            if(is_numeric($data['total'])){
               /* if(is_numeric($data['avg_cost'])){
                    $revenue = $data['total']- $data['avg_cost'];
                    $revenue = $revenue/100;
                    $revenue = '$'.number_format($revenue,2,".",",");
                }else{
                    $revenue = $revenue/100;
                    $revenue = '$'.number_format($data['total'],2,".",",");
                }*/
                $revenue = '$'.number_format($data['total'],2,".",",");
                $sheet->setCellValueByColumnAndRow($j + 1, ($i + 1 + 1), $revenue);
            }else{
                $sheet->setCellValueByColumnAndRow($j + 1, ($i + 1 + 1), '');
            }
        }elseif($k =='processing'){
            $processing = $data['total'] * $processing_percentage;
            $processing = '$'.number_format($processing,2,".",",");
            $sheet->setCellValueByColumnAndRow($j + 1, ($i + 1 + 1), $processing);
        }elseif($k =='payment'){
            $payment='';
            if(is_numeric($data['payment'])){
                if($data['payment'] >= $data['total']){
                    $payment ='✓';
                }else{
                    $payment = '$'.number_format($data['payment'],2,".",",");
                    $payment =$payment;
                }
            }
            $sheet->setCellValueByColumnAndRow($j + 1, ($i + 1 + 1), $payment);
        }elseif($k =='avg_cost'){
            $payment='';
            if(is_numeric($data['avg_cost'])){
                $payment = '-$'.number_format($data[$k],2,".",",");
            }
            $sheet->setCellValueByColumnAndRow($j + 1, ($i + 1 + 1), $payment);
        }elseif($k =='COD'){
            if($is_COD==1){
                $sheet->setCellValueByColumnAndRow($j + 1, ($i + 1 + 1), '✓');
            }else{
                $sheet->setCellValueByColumnAndRow($j + 1, ($i + 1 + 1), '');
            }

        }elseif($k =='Scheduled'){
            $sheet->setCellValueByColumnAndRow($j + 1, ($i + 1 + 1), $schude_payment);
        }elseif($k =='delivered'){
            $delivered ='';
            if($data['assign_task_status'] =='DELIVERED'){
                $delivered ='✓';
            }
            $sheet->setCellValueByColumnAndRow($j + 1, ($i + 1 + 1), $delivered);
        }elseif($k =='release'){
            $sheet->setCellValueByColumnAndRow($j + 1, ($i + 1 + 1), "Don't know");
            $color = '000000';
            /*if($data[$k] !=null){
                $color = '00ffff';
            }*/
            $sheet->getStyle('P'.$k1)->getFill()
                ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
                ->getStartColor()->setARGB($color);
        }elseif($k =='PROFIT'){
            if(is_numeric($data['total'])){
                $profit ='';  $profit_amount=$data['total'];
                if(is_numeric($data['avg_cost'])){
                    $profit_amount =   $profit = $data['total']- $data['avg_cost'];
                    $profit = '$'.number_format($profit,2,".",",");
                }else{
                    $profit = '$'.number_format($data['total'],2,".",",");
                }
                $sheet->setCellValueByColumnAndRow($j + 1, ($i + 1 + 1), $profit);
            }else{
                $sheet->setCellValueByColumnAndRow($j + 1, ($i + 1 + 1), '');
            }
            $color = '00ff00';
            if($profit_amount < 1000){
                $color ='ffff00';
            }
            $sheet->getStyle('V'.$k1)->getFill()
                ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
                ->getStartColor()->setARGB($color);

        }elseif($k =='shipping_phone'){
            $phone = preg_replace('~.*(\d{3})[^\d]{0,7}(\d{3})[^\d]{0,7}(\d{4}).*~', '($1) $2-$3', $data['shipping_phone']). "\n";
            $sheet->setCellValueByColumnAndRow($j + 1, ($i + 1 + 1), $phone);
        }elseif($k =='shipping_state'){
            $data[$k] = $data[$k].', '.$data['shipping_zip'];
            $sheet->setCellValueByColumnAndRow($j + 1, ($i + 1 + 1), $data[$k]);
        }else{
            $color = '000000';
            if($k =='depot_address'){
                if($data[$k] !=null){
                    $color = '00ffff';
                }
                $sheet->getStyle('Q'.$k1)->getFill()
                    ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
                    ->getStartColor()->setARGB($color);
            }elseif($k =='mile'){
                if($data[$k] !=null){
                    $color = '00ff00';
                }
                $sheet->getStyle('R'.$k1)->getFill()
                    ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
                    ->getStartColor()->setARGB($color);
            }elseif($k =='assign_task_driver_name'){
                if($data[$k] !=null){
                    $color = '00ffff';
                }
                $sheet->getStyle('S'.$k1)->getFill()
                    ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
                    ->getStartColor()->setARGB($color);
            }elseif($k =='assign_task_driver_total'){
                $color = '00000';
                if($data[$k] !=null){
                    $color = '00ffff';
                    $data[$k] = '-$'.number_format($data[$k],2,".",",");
                }
                $sheet->getStyle('T'.$k1)->getFill()
                    ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
                    ->getStartColor()->setARGB($color);
            }elseif($k =='driver_total_payment'){
                $color = '00000';
                if($data[$k] !=null){
                    $color = '00ffff';
                    if( $data[$k] >=$data['assign_task_driver_total'] && $data['assign_task_driver_total'] !=0){
                        $data[$k] ='✓';
                    }else{
                        if($data[$k] !='' && $data[$k] !=0) $data[$k] = '-$'.number_format($data[$k],2,".",",");
                        else $data[$k] = '';
                    }
                }

                $sheet->getStyle('T'.$k1)->getFill()
                    ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
                    ->getStartColor()->setARGB($color);
            }elseif($k =='s_name'){
                $color = '#ffff';
                if($data[$k] !=null){
                    $color = '00ffff';
                }
                $sheet->getStyle('V'.$k1)->getFill()
                    ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
                    ->getStartColor()->setARGB($color);
            }elseif($k =='salesperson_amount'){
                $color = '00000';
                if($data[$k] !=null){
                    $color = '00ffff';
                    $data[$k] = '-$'.number_format($data[$k],2,".",",");
                }
                $sheet->getStyle('W'.$k1)->getFill()
                    ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
                    ->getStartColor()->setARGB($color);
            }elseif($k =='salesperson_total_payment'){
                $color = '00000';
                if(is_numeric($data['salesperson_total_payment'])){
                    $color = '00ffff';
                    if($data['salesperson_amount']==null || $data['salesperson_amount']=='') $data['salesperson_amount']=0;
                    if($data['salesperson_total_payment'] >= $data['salesperson_amount'] && $data['salesperson_amount']!=0){
                        $data[$k] ='✓';
                    }else{
                        if($data[$k] !=0 ) $data[$k] =  '-$'.number_format($data['salesperson_total_payment'],2,".",",");
                        else $data[$k] ='';
                    }
                }
                $sheet->setCellValueByColumnAndRow($j + 1, ($i + 1 + 1), $payment);
            }

            $sheet->setCellValueByColumnAndRow($j + 1, ($i + 1 + 1), $data[$k]);
        }

        $j++;
    }
   // die();
}

$writer = new Xlsx($spreadsheet);

$pathname ="download/";
$pdfPathTemp = $_SERVER["DOCUMENT_ROOT"].$pathname.'order_report.xlsx';
//$pdfPathTemp ='C:/xampp/htdocs/crm/download/order_report.xlsx';
$writer->save($pdfPathTemp);
//print_r($pdfPathTemp); die();
$url =$domain_path.$pathname.'order_report.xlsx';
//$url ='http://localhost/crm/download/order_report.xlsx';
//$writer->save('php://output');
echo json_encode(array("filename"=>'order_report.xlsx',"url_download_file"=>$url));

<?php
/**
 * Created by PhpStorm.
 * User: Cindy
 * Date: 2018/4/10
 * Time: 19:57
 */
defined('BASEPATH') OR exit('No direct script access allowed');

use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class getDraft extends CI_Controller
{
    public function index(){
        $session = $_POST['session'];
        $res = DB::select('article',[
            'title','content','ID'
        ],[
            'author_id'=> $session,
            'status' => 0
        ]);
        if(!empty($res)){
            $this->json([
                'code' => 1,
                'data' => $res[0]
            ]);
        }else{
            $this->json([
                'code' => 0,
                'data' => '没有未完成草稿'
            ]);
        }

    }

}
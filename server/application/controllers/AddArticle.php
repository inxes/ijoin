<?php
/**
 * Created by PhpStorm.
 * User: Cindy
 * Date: 2018/4/8
 * Time: 16:40
 */
defined('BASEPATH') OR exit('No direct script access allowed');

use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class AddArticle extends CI_Controller
{
    public function index(){
        $title = $_POST['title'];
        $content = $_POST['content'];
        $session = $_POST['session'];
        $status = $_POST['status'];
        $nickname = $_POST['nickname'];
        $res = DB::insert('article', [
            'title' => $title,
            'content' => $content,
            'author_id' =>$session,
            'nick_name'=>$nickname,
            'insertTime' => time(),
            'updateTime' => time(),
            'status' => $status
        ]);
        $this->json([
            'code' => 1,
            'data' => $res
        ]);
    }

    public function coverDraft(){
        $title = $_POST['title'];
        $content = $_POST['content'];
        $id = $_POST['ID'];
        $status = $_POST['status'];
        $res = DB::update('article', [
            'title' => $title,
            'content' => $content,
            'updateTime' => time(),
            'status' => $status
        ],[
            'ID' =>$id
        ]);
        $this->json([
            'code' => 1,
            'data' => $res
        ]);
    }

    public function AddComment()
    {
        $author_id = $_POST['author'];
        $comment = $_POST['comment'];
        $article_id = $_POST['id'];
        $res = DB::insert('comment',[
            'article_id' => $article_id,
            'content' => $comment,
            'author_id' => $author_id,
            'insertTime' => date('Y-m-d H:i:s',time()),
            'UpdateTime' => date('Y-m-d H:i:s',time())
        ]);
        $this->json([
            'code' => 1,
            'data' => $res
        ]);
    }

}
<?php
/**
 * Created by PhpStorm.
 * User: Cindy
 * Date: 2018/4/24
 * Time: 16:56
 */

class Comment extends CI_Controller
{

    public function showComment()
    {
        $id = $_POST['id'];
        $comments = medoo()->select('comment',['content','author_id','insertTime'],['article_id'=>$id]);
        foreach ($comments as $v=>$c){
            $nick_name = medoo()->get('cSessionInfo',['nick_name'],['open_id'=>$c['author_id']]);
            $comments[$v]['nick_name'] = $nick_name['nick_name'];
        }
        $this->json([
            'code' => 1,
            'data' => $comments
        ]);
    }
}
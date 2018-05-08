<?php
/**
 * Created by PhpStorm.
 * User: Cindy
 * Date: 2018/4/11
 * Time: 10:10
 */
//require 'Medoo.php';
defined('BASEPATH') OR exit('No direct script access allowed');

use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class GetArticle extends CI_Controller
{

    public function index(){
        $openid = $_POST['openid'];
//        $article = DB::raw("SELECT a.title,a.content,b.nick_name,a.insertTime FROM article a,cSessionInfo b WHERE a.author_id=b.open_id");
        $article = DB::select('article',['ID','title','content','nick_name','author_id','insertTime'],['status'=>'1'],'and','order by insertTime DESC');
//        $query = $this->db->query('SELECT a.title,a.content,b.nick_name,a.insertTime FROM article a,cSessionInfo b WHERE a.author_id=b.open_id');
//        $article = DB::raw('SELECT a.title,a.content,b.nick_name,a.insertTime FROM article a,cSessionInfo b WHERE a.author_id=b.open_id');
        $fires = DB::select('article',['ID','title','content','nick_name','author_id','insertTime'],['status'=>'1'],'and','order by likes');
        foreach ($article as $a){
            $comment = DB::select('comment',['ID'],['article_id'=>$a->ID]);
            $likes = DB::select('cSessionInfo',['likes'],['open_id'=>$openid]);
            if($likes && strstr($likes[0]->likes,'/'.$a->ID.'/')!== false){
                $a->like = 1;
            }else{
                $a->like = 0;
            }
//            var_dump($comment);
            $a->time = date('Y-m-d H:i:s',$a->insertTime);
            $a->comment = count($comment);
        }
        foreach ($fires as $f){
            $comment = DB::select('comment',['ID'],['article_id'=>$f->ID]);
            $likes = DB::select('cSessionInfo',['likes'],['open_id'=>$openid]);
            if($likes && strstr($likes[0]->likes,'/'.$f->ID.'/')!== false){
                $f->like = 1;
            }else{
                $f->like = 0;
            }
//            var_dump($comment);
            $f->time = date('Y-m-d H:i:s',$f->insertTime);
            $f->comment = count($comment);
        }
        $this->json([
            'code' => 1,
            'data' => [
                'infos'=>$article,
                'fires' => $fires
            ]
        ]);
    }

    public function searchArticle(){
        $openid = $_POST['openid'];
        $search = $_POST['search'];
        $condition = ['OR'=>['title[~]'=>$search,'content[~]'=>$search,'nick_name[~]'=>$search]];

        $article = medoo()->select('article',['ID','title','content','nick_name','author_id','insertTime','status'],$search?$condition:null);
        foreach ($article as $key=>$a){
            $comment = DB::select('comment',['ID'],['article_id'=>$a['ID']]);
            $likes = DB::select('cSessionInfo',['likes'],['open_id'=>$openid]);
            if($likes && strstr($likes[0]->likes,'/'.$a['ID'].'/')!== false){
                $article[$key]['like'] = 1;
            }else{
                $article[$key]['like'] = 0;
            }
//            var_dump($comment);
            $article[$key]['time'] = date('Y-m-d H:i:s',$a['insertTime']);
            $article[$key]['comment'] = count($comment);
        }
        $this->json([
            'code' => 1,
            'data' => $article
        ]);
    }

    public function oneArticle()
    {
        $id = $_POST['id'];
        $article = medoo()->get('article',[
            'ID','title','content','nick_name','author_id','insertTime'
        ],[
            'AND'=>[
                'status'=>1,
                'ID'=>$id
            ]
        ]);
        $this->json([
            'code' => 1,
            'data' => $article
        ]);
    }

    public function myArticle(){
        $openid = $_POST['openid'];
        $article = medoo()->select('article',['ID','title','content','nick_name','author_id','insertTime','status'],['author_id'=>$openid]);
        foreach ($article as $key=>$a){
            $comment = medoo()->select('comment',['ID'],['article_id'=>$a['ID']]);
            $article[$key]['time'] = date('Y-m-d H:i:s',$a['insertTime']);
            $article[$key]['comment'] = count($comment);
        }
        $this->json([
            'code' => 1,
            'data' => $article
        ]);
    }

    public function deleteArticle(){
        $id = $_POST['id'];
        $res = DB::delete('article',['ID'=>$id]);
        $this->json([
            'code' => 1,
            'data' => $res
        ]);
    }

    public function likeArticle(){
        $openid = $_POST['openid'];
        $status = $_POST['status'];
        $id = $_POST['id'];
        $like = DB::select('cSessionInfo',['likes'],['open_id'=>$openid]);
        $num = DB::select('article',['likes'],['id'=>$id]);
        $like = $like?$like[0]->likes:'';
        $num = $num?$num[0]->likes:0;
        if($status == 'add'){
            $res = DB::update('cSessionInfo',['likes'=>$like.'/'.$id.'/'],['open_id'=>$openid]);
            $res += DB::update('article',['likes'=>$num+1],['ID'=>$id]);
            $this->json([
                'code' => 1,
                'data' => [
                    'id' => $res
                ]
            ]);
        }else{
            $res = DB::update('cSessionInfo',['likes'=>str_replace('/'.$id.'/',null,$like)],['open_id'=>$openid]);
            $res += DB::update('article',['likes'=>$num-1],['ID'=>$id]);
            $this->json([
                'code' => 1,
                'data' => [
                    'id' => $res
                ]
            ]);
        }

    }

}
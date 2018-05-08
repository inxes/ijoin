<?php
/**
 * Created by PhpStorm.
 * User: Cindy
 * Date: 2018/4/22
 * Time: 13:24
 */

class Signature extends CI_Controller
{
    const TOKEN = 'enjoyyourlloveandlife';

    private function checkSignature()
    {
        $signature = $_GET["signature"];
        $timestamp = $_GET["timestamp"];
        $nonce = $_GET["nonce"];

        $token = SELF::TOKEN;
        $tmpArr = array($token, $timestamp, $nonce);
        sort($tmpArr, SORT_STRING);
        $tmpStr = implode( $tmpArr );
        $tmpStr = sha1( $tmpStr );

        if( $tmpStr == $signature ){
            return true;
        }else{
            return false;
        }
    }

}
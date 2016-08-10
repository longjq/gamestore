<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/8/10
 * Time: 23:52
 */

namespace App\Core;


use Illuminate\Http\Request as HttpRequest;
class ApiRequest
{
    private $mustExists = ['a','b','c','hash'];
    private $req;

    public function __construct(HttpRequest $request)
    {
        $this->req = $request;
    }

    public function check()
    {
        // check params exists
        $keys = $this->mustExists;
        foreach($keys as $key){
            if( ! $this->req->exists($key) ){
                return ['status'=>false,'msg'=>$key.' is not exists!'];
            }
        }

        // check token is true
        $params = $this->req->all();
        $fields = array_map(function($key) use($params){
            return $params[$key];
        }, $keys);

        $checked = md5(implode('', $fields).Keys::getAppKey());
        if($checked != $this->req->input('token')){
            return ['status'=>false,'msg'=>'token is not right!'];
        }
        //check decode
        $des3 = new DES3(Keys::getAppKey(),Keys::getIV());
        $rs = $des3->decrypt($this->req->getContent());
        if($rs === false){
            return ['status'=>false,'msg'=>'decode is error!'];
        }
        A::setDecodedContent($rs);
        return ['status'=>true];

    }

    public function __get($prop)
    {
        return $this->req->$prop;
    }

    public function __call($fun, $args)
    {
        return $this->req->$fun($args);
    }
}
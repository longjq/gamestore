<?php

namespace App\Http\Middleware;

use App\Core\ApiRequest;
use Closure;

class ApiGuard
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $apiReq = new \App\Core\ApiRequest($request);
        $rs = $apiReq->check();
        if($rs['status'] === false){
            return response()->json($rs);
        }

        return $next($request);

    }
}

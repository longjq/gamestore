<?php

namespace App\Http\Middleware;

use App\Models\GoogleToken;
use Closure;

class SyncGoogleToken
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
            
        $uid = $request->input('uid');
        $token = $request->input('google_token');

        GoogleToken::where('uid',$uid)->update(['google_token'=>$token]);

        return $next($request);
    }
}

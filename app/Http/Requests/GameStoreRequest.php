<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class GameStoreRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'lang' => 'required|size:10',
            'title' => 'required|size:50',
            'hot_base' => 'required',
            'hot' => 'required',
            'icon_url' => 'required|URL',
            'stars' => 'required|between:1,5',
            'screen_display' => 'required|boolean',
            'open' => 'required|boolean',
            'recommend' => 'required|boolean',
            'path'=>'required|URL',
        ];
    }
}

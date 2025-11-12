<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Facade\Aeth;
use Http\Models\Review;
class ReviewsController extends Controller
{

    public function GetReviews() {


    }


    public function StoreReview(Request $request) {
        $user=Auth::user;
        $username=$user->name;
        $useremail=$user->email;
        $data=[
            'product_id'=>$request->product_id,
            'user_name'=>$username,
            'user_email'=>$useremail,
            'comment'=> $request->comment,
            'rating'=>$request->rating,
            'date'=>$request->date,
        ];

        Review::create($data);

    }
}

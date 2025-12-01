<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Review;
class ReviewsController extends Controller
{

    public function GetReviews() {


    }


    public function StoreReview(Request $request) {
        $user=Auth::user();
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
        return back()->with("success","Review Submitted Successfully");
    }

    public function ReviewLogin(Request $request) {
            {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
 
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
 
            return back()->with("success","Login success");
        }
 
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }
    }
}

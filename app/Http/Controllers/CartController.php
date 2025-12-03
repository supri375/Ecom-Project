<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function AddToCart(Request $request){
        $items = $request->all();
        $user_id = Auth::user()->id;
        foreach($items as $item){
            $data = [
                "user_id"=>$user_id,
                "product_id"=>$item['id'],
                "quantity"=>$item['quantity'],
                "subtotal"=>$item['price'] * $item['quantity'],
            ];
            Cart::create($data);
        }
        return back();
    }
}

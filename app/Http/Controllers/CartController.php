<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{

    public function AddToCart(Request $request){
        // $items = $request->all();
        // dd($request->id);
        $user_id = Auth::user()->id;
        $validate = $request->validate([
            'id' => 'required|exists:products,id',
        ]);
        // $userCart = [
        //      "user_id"=>$user_id,
        // ];
        // dd($user_id);
        $cart = Cart::firstOrCreate(['user_id'=>$user_id]);

        $item = $cart->items()->where('product_id' , $request->id)->first();
        if($item){
            $item->increment('quantity');
            $item->update([
                'total' => $request->price * $item->quantity,
            ]);
        }
        else{
            $cart->items()->create([
                'product_id'=>$request->id,
                'quantity'=>1,
                'price'=>$request->price,
                'total'=>$request->price,
            ]);
        }
        // foreach($items as $item){
        //     if($cartItem->product_id == $item['id']){
        //         $cartItem->quantity = $cartItem->quantity + 1;
        //     }
        //     else{
        //         $data = [
        //             "cart_id"=>$cart->id,
        //             "product_id"=>$item['id'],
        //             "quantity"=>$item['quantity'],
        //             "total"=>$item['price'] * $item['quantity'],
        //     ];
        //         CartItem::create($data);
        //     }
        // }
        return back();
    }

    public function updateCart(Request $request, $id) {
        
        $user_id = Auth::user()->id;
        // $validate = $request->validate([
        //     'quantity' => 'required|integer|min:1',
        // ]);
        $cart = Cart::where(['user_id'=>$user_id])->first();
        $item = $cart->items()->where('product_id' , $id)->first();
        if($request->quantity == 0 )
        {
            $item->delete();
        }
        else {
            $item->update([
                'quantity' => $request->quantity,
                'total' => $request->price * $request->quantity,
            ]);
        }
        return back();
    }

    public function deleteCart($id , Cart $cart) {

        $user_id = Auth::user()->id;
        $cart = Cart::where(['user_id'=>$user_id])->first();
        $item = $cart->items()->where('product_id' , $id)->first();
        $item->delete();
    }
}

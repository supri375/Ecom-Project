<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\Product;
use App\Models\OrderProduct;
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

    public function checkOut(Request $request ) {
        $user = Auth::user();
        $cart = Cart::where(['user_id'=>$user->id])->first();
        $item = CartItem::where('cart_id',$cart->id)->count();
        if($item == 0){
            return back()->with('msg',"Your Cart is Empty");
        }
        if($request->paymentMethod == "") {
            return back()->with('msg','Please select Payment Method');
        }
        $order = Order::create([
            'user_id'=>$user->id,
            'name'=>$user->name,
            'address'=>$user->address,
            'city'=>$user->city,
            'state'=>$user->state,
            'contact'=>$user->contact,
            'email'=>$user->email,
            'postal_code'=>$user->postal_code,
            'order_status'=> "new",
            'shipping_charge'=>$request->shipping_charge,
            'payment_method'=>$request->paymentMethod,
            'payment_status'=>$request->payment_status,
            'grandtotal'=>$request->total,
        ]);

        $cartItems = CartItem::where('cart_id',$cart->id)->get();   
        foreach($cartItems as $item ) 
        {
            $data = [
                'user_id'=> $user->id,
                'product_id'=>$item['product_id'],
                'order_id'=>$order->id,
                'product_name'=>$item['name'],
                'product_code'=>$item['code'],
                'product_size'=>$item['size'],
                'product_color'=>$item['color'],
                'product_price'=>$item['price'],
                'product_quantity'=>$item['quantity'],
                'total'=>$item['total'],
            ];
            $product = Product::where('id',$item['product_id'])->first();
            if($product->stock < $item['quantity']){
                return back()->with('msg','Required Stocks are not available');
            }
            else
            {
                $stock = $product->stock - $item['quantity'];
                $product->update([
                    'stock' => $stock ,
                ]);
            }
            OrderProduct::create($data);
            Cart::where('user_id', $user->id)->delete();
            return reDirect()->route('thanks');
        }
    }
}

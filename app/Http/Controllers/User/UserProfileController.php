<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Order;
use App\Models\OrderProduct;
use Inertia\Inertia;

class UserProfileController extends Controller
{

    public function index($id) { 
        $user = auth()->user()->where('id',$id)->first();
         return Inertia::render('user/DashBoard', [
             'user' => $user, ]);
     }
    // public function index($id){
    //     $user=User::where('id',$id)->first();
    //     $orders=Order::where('user_id',$id)->with('orderproducts')->get();
    //     return Inertia::render('user/DashBoard',[
    //         "user" => $user,
    //         "orders" => $orders,
    //     ]);
    // }
    public function order($id) {
        $orders = Order::where('user_id',$id)->with('orderproducts')->get();
        return Inertia::render('user/Orders',[
            'order'=>$orders,
        ]);
    }
    
    public function cancel($id) {
        $order=Order::where('id',$id)->first();
        if(!$order){
            return back()->with('msg','Order Not found');
        }
        OrderProduct::where('order_id',$id)->delete();
        $order->delete();
    }
}

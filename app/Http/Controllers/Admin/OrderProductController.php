<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderProduct;
use Inertia\Inertia;
use Illuminate\Http\Request;

class OrderProductController extends Controller
{
    public function index() {
        $orders=Order::all();
        $orderProducts=OrderProduct::all();
        return Inertia::render('admin/order/ListOrder',[
            'orders'=>$orders,
            'orderProducts'=>$orderProducts,
    ]);
    }

    public function view($id) {
        $order=Order::where('id',$id)->first();
        $orderProducts= OrderProduct::where('order_id',$id)->get();
        return Inertia::render('admin/order/ViewOrder',[
            'order'=>$order,
            'orderProducts'=>$orderProducts,
        ]);
    }
}

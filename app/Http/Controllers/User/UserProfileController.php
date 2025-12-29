<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Order;
use App\Models\OrderProduct;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;


class UserProfileController extends Controller
{

    public function index() { 
        $user = auth()->user();
        $orders = Order::where('user_id',$user->id)->with('orderproducts')->get();
         return Inertia::render('user/DashBoard', [
             'user' => $user,
             'orders'=>$orders,
            ]);
    }

    public function profile($id) { 
        $user = auth()->user()->where('id',$id)->first();
        $orders = Order::where('user_id',$id)->with('orderproducts')->get();
         return Inertia::render('user/UserProfile', [
             'user' => $user,
             'orders'=>$orders,
            ]);
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
        $user = auth()->user()->where('id',$id)->first();
        return Inertia::render('user/Orders',[
            'orders'=>$orders,
            'user'=>$user,
        ]);
    }
    public function orderView($id)
    {
        $order = Order::with('orderproducts.product')->findOrFail($id);
    
        return Inertia::render('user/OrderView', [
            'orderProducts' => $order->orderproducts,
            'orderId' => $order->id,
            'user' => auth()->user(),
        ]);
    }


    public function update(Request $request , $id) {
        $user =  User::findOrFail($id);
        $data = $request->validate([
            'name'        => 'sometimes|string|max:255',
            'email'       => 'sometimes|string|max:255',
            'address'     => 'sometimes|nullable|string|max:255',
            'city'        => 'sometimes|nullable|string|max:255',
            'state'       => 'sometimes|nullable|string|max:255',
            'postal_code' => 'sometimes|nullable|string|max:255',
            'password'    => 'sometimes|nullable|string|min:8',
            'image'       => 'sometimes|image|max:2048',
        ]);
        

        if(!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }
        else{
            unset($data['password']);
        }
        if ($request->hasFile('image')) {
            if ($user->image && file_exists(public_path('storage/' . $user->image))) {
                unlink(public_path('storage/' . $user->image));
            }

            $file = $request->file('image');
            $path = $file->store('users', 'public'); 
            $data['image'] = $path;
        }
    $user->update($data);
    return redirect()->back()->with('success','Profile Updated Successfully');
    }

    public function logout(Request $request) {
        Auth::logout();
        $request->session()->invalidate(); 
        $request->session()->regenerateToken(); 
        return redirect('/');
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

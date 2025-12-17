<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'address',
        'city',
        'state',
        'contact',
        'email',
        'postal_code',
        'order_status',
        'shipping_charge',
        'payment_method',
        'payment_status',
        'grandtotal',
    ];

    
    public function orderproducts() {
        return $this->hasMany(OrderProduct::class);
    }
}

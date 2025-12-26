<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderProduct extends Model
{
    protected $fillable = [
        'user_id',
        'product_id',
        'order_id',
        'product_name',
        'product_code',
        'product_size',
        'product_color',
        'product_price',
        'product_quantity',
        'total',
    ];

    
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}

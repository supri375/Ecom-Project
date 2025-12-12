<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
      protected $fillable = [
        'name',
        'image',
        'price',
        'category_id',
        'rating',
        'description',
        'stock',
        'isPopular',
        'isFeatured',
        'isDiscount',
     ];

     public function category(){
      return $this->belongsTo(Category::class);
     }

     public function reviews(){
        return $this->hasMany(Review::class);
      
     }
}

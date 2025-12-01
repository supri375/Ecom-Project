<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(){
        $products=Product::with('Category')->get();
        $categories=Category::all();
        return Inertia::render('products',[
            'products'=>$products,
            'categories'=>$categories,
        ]);
    }
    
    public function viewProduct($id){
        $product=Product::with(['Category','reviews'=> function ($query) {
        $query->orderBy('created_at', 'desc');
    }])->find($id);
        $products=Product::with('Category')->get();
        return Inertia::render('product',[
            'product'=>$product,
            'products'=>$products
        ]);
    }
}

<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryPageController extends Controller
{
    public function index($id){
        $category=Category::with('products')->where('slug',$id)->first();
        $products=$category->products;
        $categories=Category::all();
        return Inertia::render('CategoryPage',[
            'category'=>$category,
            'categories'=>$categories,
            'products'=>$products,
        ]);
    }

}

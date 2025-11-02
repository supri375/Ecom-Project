<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\Hero;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomePageController extends Controller
{
    public function home(){
        $products=Product::with('Category')->get();
        $featuredProducts=Product::with('Category')->where('isFeatured',1)->get();
        $discountProducts=Product::with('Category')->where('isDiscount',1)->get();
        $popularProducts=Product::with('Category')->where('isPopular',1)->get();
        $categories=Category::all();
        $heroes=Hero::all();
        return Inertia::render('welcome',[
            'products'=>$products,
            'categories'=>$categories,
            'featuredProducts'=>$featuredProducts,
            'discountProducts'=>$discountProducts,
            'popularProducts'=>$popularProducts,
            'heroes'=>$heroes,
        ]);
    }
}

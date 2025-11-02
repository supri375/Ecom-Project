<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;

class ProductController extends Controller
{
    public function products(){
        $products=Product::with('Category')->get();
        return Inertia::render('admin/products/listproducts',[
            'products'=>$products,
    ]);
    }

    public function addprod(){
        $categories=Category::all();
        return Inertia::render('admin/products/CreateProduct',[
            'categories'=>$categories,
        ]);
    }



    public function storeprod(Request $request){
    
    $data = [
        'name'=>$request->name,
        'category_id'=>$request->category,
        'price'=>$request->price,
        'rating'=>$request->rating,
        'description'=>$request->description,
        'isDiscount'=>$request->isDiscount==true?1:0,
        'isFeatured'=>$request->isFeatured==true?1:0,
        'isPopular'=>$request->isPopular==true?1:0,
    ];
    if ($request->hasFile('image')) {
        $file=$request->file('image');   
        $path = $request->file('image')->store('products', 'public');
        $data['image'] = $path; 
    }

    Product::create($data);
    return redirect()->route('products.list');
    }

    public function editprod($id){
        $categories=Category::all();
        $products=Product::find($id);
        return Inertia::render('admin/products/EditProduct',[
            'products'=>$products,
            'categories'=>$categories,
        ]);
    }

     public function updateprod(Request $request,$id){
        $product=Product::find($id);
        $data = [
            'name'=>$request->name,
            'category_id'=>$request->category,
            'price'=>$request->price,
            'rating'=>$request->rating,
            'description'=>$request->description,
            'isDiscount'=>$request->isDiscount==true?1:0,
            'isFeatured'=>$request->isFeatured==true?1:0,
            'isPopular'=>$request->isPopular==true?1:0,
         ];
    if ($request->hasFile('image')) {
        $old_img=$product->image;
        if ($product->image && file_exists(public_path('storage/' . $product->image))) {
        unlink(public_path('storage/' . $product->image));
        }
        $file=$request->file('image');   
        $path = $request->file('image')->store('products', 'public');
        $data['image'] = $path; 
    }

    $product->update($data);
    return redirect()->route('products.list');
    }

    public function deleteprod($id){
        $products=Product::find($id);
        $old_img=$products->image;
        if ($products->image && file_exists(public_path('storage/' . $products->image))) {
        unlink(public_path('storage/' . $products->image));
        }
        $products->delete();
        return redirect()->back();
    }
}

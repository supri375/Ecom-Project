<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index(){
        $categories=Category::all();
        return Inertia::render('admin/categories/listcategories',[
            'categories'=>$categories,
    ]);
    }

    public function create(){
        return Inertia::render('admin/categories/CreateCategory');
        
    }



    public function store(Request $request){
    $data = [
        'name'=>$request->name,
        'slug'=>$request->slug,
    ];

    if ($request->hasFile('image')) {
        $file=$request->file('image');   
        $path = $request->file('image')->store('categories', 'public');
        $data['image'] = $path; 
    }

    Category::create($data);
    return redirect()->route('categories.list');
    }

    public function edit($id){
        $category=Category::find($id);
        return Inertia::render('admin/categories/EditCategory',[
            'category'=>$category,
        ]);
        
    }

     public function update(Request $request,$id){
        $category=Category::find($id);
        $data = [
        'name'=>$request->name,
        'slug'=>$request->slug,
         ];
    if ($request->hasFile('image')) {
        $old_img=$category->image;
        if ($category->image && file_exists(public_path('storage/' . $category->image))) {
        unlink(public_path('storage/' . $category->image));
        }
        $file=$request->file('image');   
        $path = $request->file('image')->store('categories', 'public');
        // $filename = time() . '_' . $file->getClientOriginalName();
        $data['image'] = $path; 
    }

    $category->update($data);
    return redirect()->route('categories.list');
    }

    public function deleteCat($id){
        $category=Category::find($id);
        $old_img=$category->image;
        if ($category->image && file_exists(public_path('storage/' . $category->image))) {
        unlink(public_path('storage/' . $category->image));
        }
        $category->delete();
        return redirect()->back();
    }
}

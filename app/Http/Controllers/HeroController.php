<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Hero;

class HeroController extends Controller
{
    public function index(){
        $hero=Hero::all();
        return Inertia::render('admin/hero/ListHero',[
            'hero'=>$hero,
    ]);
    }

    public function create(){
        return Inertia::render('admin/hero/CreateHero');
        
    }



    public function store(Request $request){
    $data = [
        'name'=>$request->name,
    ];

    if ($request->hasFile('image')) {
        $file=$request->file('image');   
        $path = $request->file('image')->store('heroes', 'public');
        $data['image'] = $path; 
    }

    Hero::create($data);
    return redirect()->route('hero.list');
    }

    // public function edit($id){
    //     $hero=Hero::find($id);
    //     return Inertia::render('admin/hero/EditHero',[
    //         'hero'=>$hero,
    //     ]);
        
    // }

//      public function update(Request $request,$id){
//         $hero=Hero::find($id);
//         $data = [
//         'name'=>$request->name,
//          ];
//     if ($request->hasFile('image')) {
//         $old_img=$hero->image;
//         if ($hero->image && file_exists(public_path('storage/' . $hero->image))) {
//         unlink(public_path('storage/' . $hero->image));
//         }
//         $file=$request->file('image');   
//         $path = $request->file('image')->store('heroes', 'public');
//         $data['image'] = $path; 
//     }

//     $hero->update($data);
//     return redirect()->route('hero.list');
//     }

//     public function deletehero($id){
//         $hero=Hero::find($id);
//         $old_img=$hero->image;
//         if ($hero->image && file_exists(public_path('storage/' . $hero->image))) {
//         unlink(public_path('storage/' . $hero->image));
//         }
//         $hero->delete();
//         return redirect()->back();
//     }
}

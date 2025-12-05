<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\HeroController;
use App\Http\Controllers\ReviewsController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\Frontend\ProductController as FrontendProdContoller;
use App\Http\Controllers\Frontend\HomePageController;
use App\Http\Controllers\Frontend\CategoryPageController;
use Inertia\Inertia;

Route::get('/', [HomePageController::class, 'home'])->name('home');

Route::get('/products', [FrontendProdContoller::class, 'index'])->name('products');

Route::get('/category/{slug}', [CategoryPageController::class, 'index'])->name('category.page');


Route::get('/reviews',[ReviewsController::class,'GetReviews'])->name('user.review');

Route::post('/reviewLogin',[ReviewsController::class,'ReviewLogin'])->name('review.login');
   
Route::get('/cartpage', function () {
    return Inertia::render('CartPage');
})->name('CartPage');

Route::get('/orderpage', function () {
    return Inertia::render('order');
})->name('order');

Route::get('/products/{id}', [FrontendProdContoller::class, 'viewProduct'])->name('product.view');



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

   Route::post('/reviews',[ReviewsController::class,'StoreReview'])->name('user.review.store');

   Route::post('/addToCart',[CartController::class,'AddToCart'])->name('add.to.cart');
   

    // For Categories //
    Route::get('admin/categories', [CategoryController::class, 'index'])->name('categories.list');
    Route::get('admin/categories/create', [CategoryController::class, 'create'] )->name('categories.create');
    Route::post('admin/categories/store', [CategoryController::class, 'store'] )->name('categories.store');
    Route::get('admin/categories/{id}/edit ', [CategoryController::class, 'edit'])->name('categories.edit');
    Route::post('admin/categories/{id}/edit ', [CategoryController::class, 'update'])->name('categories.update');
    Route::get('admin/categories/{id}/delete ', [CategoryController::class, 'deleteCat'])->name('categories.delete');

    // For Products //
    Route::get('admin/products', [ProductController::class, 'products'])->name('products.list');
    Route::get('admin/products/create', [ProductController::class, 'addprod'])->name('products.create');
    Route::post('admin/products/store', [ProductController::class, 'storeprod'] )->name('products.store');
    Route::get('admin/products/{id}/edit', [ProductController::class, 'editprod'])->name('products.edit');
    Route::post('admin/products/{id}/edit', [ProductController::class, 'updateprod'] )->name('products.update');
    Route::get('admin/products/{id}/delete ', [ProductController::class, 'deleteprod'])->name('products.delete');

    // For Hero //
    Route::get('admin/hero',[HeroController::class,'index' ])->name('hero.list');
    Route::get('admin/hero/create', [HeroController::class, 'create'])->name('hero.create');
    Route::post('admin/hero/store', [HeroController::class, 'store'])->name('hero.store');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

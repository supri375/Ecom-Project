<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\HeroController;
use App\Http\Controllers\ReviewsController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\Admin\OrderProductController;
use App\Http\Controllers\Frontend\ProductController as FrontendProdContoller;
use App\Http\Controllers\Frontend\HomePageController;
use App\Http\Controllers\User\UserProfileController;
use App\Http\Controllers\Frontend\CategoryPageController;
use Inertia\Inertia;

// Welcome // 
Route::get('/', [HomePageController::class, 'home'])->name('home');

// Products List // 
Route::get('/products', [FrontendProdContoller::class, 'index'])->name('products');

// Category Page //
Route::get('/category/{slug}', [CategoryPageController::class, 'index'])->name('category.page');

// Review // 
Route::get('/reviews',[ReviewsController::class,'GetReviews'])->name('user.review');

// Review Login // 
Route::post('/reviewLogin',[ReviewsController::class,'ReviewLogin'])->name('review.login');

// CartPage //
Route::get('/cartpage', function () {
    return Inertia::render('CartPage');
})->name('CartPage');



Route::get('/thanks', function () {
    return Inertia::render('Thanks');
})->name('thanks');

Route::get('/orderpage', function () {
    return Inertia::render('order');
})->name('order');

Route::get('/products/{id}', [FrontendProdContoller::class, 'viewProduct'])->name('product.view');




// Review post // 
    Route::post('/reviews',[ReviewsController::class,'StoreReview'])->name('user.review.store');

// Cart //
    Route::post('/addToCart',[CartController::class,'AddToCart'])->name('add.to.cart');
    Route::post('/updateCart/{id}',[CartController::class,'updateCart'])->name('update.cart');
    Route::get('/deleteCart/{id}',[CartController::class , 'deleteCart'])->name('delete.cart');

// Order Checkout //
    Route::post('/checkOut',[CartController::class , 'checkOut'])->name('check.out');


Route::prefix('user')->middleware(['auth', 'customer'])->group(function () {
    // User Profile //
    Route::get('dashboard',[UserProfileController::class,'index'])->name('user.dashboard');
    Route::get('profile/{id}',[UserProfileController::class,'profile'])->name('user.profile');
    Route::get('orders/{id}',[UserProfileController::class,'order'])->name('user.order');
    Route::get('orders/{id}/view',[UserProfileController::class,'orderView'])->name('user.order.view');
    Route::post('order/{id}/cancel',[UserProfileController::class,'cancel'])->name('user.order.cancel');
    Route::post('profile/update/{id}',[UserProfileController::class,'update'])->name('user.profile.update');
    Route::get('/logout',[UserProfileController::class,'logout'])->name('user.logout');
});


Route::prefix('admin')->middleware(['auth', 'admin', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    // Order Admin //
    Route::get('/order',[OrderProductController::class,'index'])->name('Order.list');
    Route::get('/order/{id}/view',[OrderProductController::class,'view'])->name('order.view');
    Route::post('/order/{id}/update',[OrderProductController::class,'update'])->name('order.update');

    // For Categories //
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.list');
    Route::get('/categories/create', [CategoryController::class, 'create'] )->name('categories.create');
    Route::post('/categories/store', [CategoryController::class, 'store'] )->name('categories.store');
    Route::get('/categories/{id}/edit ', [CategoryController::class, 'edit'])->name('categories.edit');
    Route::post('/categories/{id}/edit ', [CategoryController::class, 'update'])->name('categories.update');
    Route::get('/categories/{id}/delete ', [CategoryController::class, 'deleteCat'])->name('categories.delete');

    // For Products //
    Route::get('/products', [ProductController::class, 'products'])->name('products.list');
    Route::get('/products/create', [ProductController::class, 'addprod'])->name('products.create');
    Route::post('/products/store', [ProductController::class, 'storeprod'] )->name('products.store');
    Route::get('/products/{id}/edit', [ProductController::class, 'editprod'])->name('products.edit');
    Route::post('/products/{id}/edit', [ProductController::class, 'updateprod'] )->name('products.update');
    Route::get('/products/{id}/delete ', [ProductController::class, 'deleteprod'])->name('products.delete');

    // For Hero //
    Route::get('/hero',[HeroController::class,'index' ])->name('hero.list');
    Route::get('/hero/create', [HeroController::class, 'create'])->name('hero.create');
    Route::post('/hero/store', [HeroController::class, 'store'])->name('hero.store');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

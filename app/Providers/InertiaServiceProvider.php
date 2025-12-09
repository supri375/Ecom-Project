<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use App\Models\Cart;

class InertiaServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /** 
     * Bootstrap services.
     */
    public function boot(): void
    {
       Inertia::share([
        'cartCount' => function () {
            if (!auth()->check()) {
                return 0;
            }

            return Cart::where('user_id', auth()->id())
            ->with('items.product')
            ->first()
            ->items ?? [];
        },
        ]);
    }
}

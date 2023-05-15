<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Contracts\Pagination\LengthAwarePaginator as LengthAwarePaginatorContract;
use Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->alias(CustomPaginator::class, LengthAwarePaginator::class); // Eloquent uses the class instead of the contract 🤔
        $this->app->alias(CustomPaginator::class, LengthAwarePaginatorContract::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        /*
            https://stackoverflow.com/a/56353557
        */
        Validator::extend('several_date_format', function ($attribute, $value, $parameters,$validator) {
            foreach ($parameters as $parameter){
                if (!$validator->validateDateFormat($attribute,$value,[$parameter]))
                   return false;
            }
            return true;
        });
    }
}

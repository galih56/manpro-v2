<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MaintenanceRequestController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([ 
        "prefix" => "auth", 
        "as" => "authentication" 
    ], 
    function(){
        Route::post('/register', [\App\Http\Controllers\api\AuthController::class, 'register']);
        Route::post('/login', [\App\Http\Controllers\api\AuthController::class, 'login']);

        Route::middleware('auth:sanctum')->group(function () {
            Route::get('/me', [\App\Http\Controllers\api\AuthController::class, 'me']);
            Route::post('/logout', [\App\Http\Controllers\api\AuthController::class, 'logout']);
        });
    }
);

Route::group([
    "prefix" => "users", 
    'middleware' => 'auth:sanctum'
],function () {
    Route::get('/', [\App\Http\Controllers\api\UserController::class, 'index']);
    Route::get('/{id}', [\App\Http\Controllers\api\UserController::class, 'show']);
    Route::post('/', [\App\Http\Controllers\api\UserController::class, 'store']);
    Route::put('/{id}', [\App\Http\Controllers\api\UserController::class, 'update']);
    Route::delete('/{id}', [\App\Http\Controllers\api\UserController::class, 'destroy']);
});

Route::group([
    "prefix" => "tasks", 
    'middleware' => 'auth:sanctum'
],function () {
    Route::get('/', [\App\Http\Controllers\api\TaskController::class, 'index']);
    Route::get('/{id}', [\App\Http\Controllers\api\TaskController::class, 'show']);
    Route::post('/', [\App\Http\Controllers\api\TaskController::class, 'store']);
    Route::put('/{id}', [\App\Http\Controllers\api\TaskController::class, 'update']);
    Route::delete('/{id}', [\App\Http\Controllers\api\TaskController::class, 'destroy']);
});

Route::group([
    "prefix" => "roles", 
    'middleware' => 'auth:sanctum'
],function () {
    Route::get('/', [\App\Http\Controllers\api\RoleController::class, 'index']);
    Route::get('/{id}', [\App\Http\Controllers\api\RoleController::class, 'show']);
    Route::post('/', [\App\Http\Controllers\api\RoleController::class, 'store']);
    Route::put('/{id}', [\App\Http\Controllers\api\RoleController::class, 'update']);
    Route::delete('/{id}', [\App\Http\Controllers\api\RoleController::class, 'destroy']);
});



Route::get('/sync', [MaintenanceRequestController::class, 'synchronize']);



Route::post('/tokens/create', function (Request $request) {
    $token = $request->user()->createToken($request->token_name);
    return ['token' => $token->plainTextToken];
});


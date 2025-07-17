<?php

use App\Http\Controllers\Authentication\AuthenticationController;
use App\Http\Controllers\Paket\PaketController;
use App\Http\Controllers\Pelanggan\PelangganController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::prefix('/v1')->group( function() {

    Route::post('/confirm-email', [AuthenticationController::class, 'confirmEmail']);
    Route::post('/change-password', [AuthenticationController::class, 'changePassword']);

    Route::post('/login', [AuthenticationController::class, 'login']);
    Route::resource('/pelanggan', PelangganController::class)->only(['index', 'store']);
    Route::resource('/pelanggan', PelangganController::class)->except(['index', 'store'])->middleware('validId:pelanggan');
    Route::get('/new-kode-pelanggan', [PelangganController::class, 'generateKodePelanggan']);

    Route::resource('/paket', PaketController::class)->only(['index', 'store']);
    Route::resource('/paket', PaketController::class)->except(['index', 'store'])->middleware('validId:paket');
});

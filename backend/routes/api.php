<?php

use App\Http\Controllers\Authentication\AuthenticationController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Kolektor\KolektorController;
use App\Http\Controllers\Paket\PaketController;
use App\Http\Controllers\Pelanggan\PelangganController;
use App\Http\Controllers\Transaksi\TagihanController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/v1/user', function (Request $request) {
    return $request->user()->load('role');
})->middleware('auth:sanctum');


Route::prefix('/v1')->group( function() {

    Route::post('/confirm-email', [AuthenticationController::class, 'confirmEmail']);
    Route::post('/change-password', [AuthenticationController::class, 'changePassword']);

    Route::post('/login', [AuthenticationController::class, 'login']);
    Route::post('/logout', [AuthenticationController::class, 'logout']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::resource('/pelanggan', PelangganController::class)->only(['index', 'store']);
        Route::resource('/pelanggan', PelangganController::class)->except(['index', 'store'])->middleware('validId:pelanggan');
        Route::resource('/kolektor', KolektorController::class);
        Route::get('/new-kode-pelanggan', [PelangganController::class, 'generateKodePelanggan']);
    
        Route::get('/dashboard', [DashboardController::class, 'index']);
        Route::get('/dashboard/client', [DashboardController::class, 'dashboardClient']);
    
        Route::get('/tagihan', [TagihanController::class, 'getInvoice']);
        Route::get('/transaksi', [TagihanController::class, 'getTransaksi']);
        Route::middleware('validId:tagihan')->group(function () {
            Route::get('/tagihan/{tagihan}', [TagihanController::class, 'show']);
            Route::put('/tagihan/{tagihan}', [TagihanController::class, 'confirmTagihan']);
        });
    
        Route::resource('/paket', PaketController::class)->only(['index', 'store']);
        Route::resource('/paket', PaketController::class)->except(['index', 'store'])->middleware('validId:paket');
    });
});

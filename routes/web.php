<?php

use App\Http\Controllers;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('about', Controllers\AboutController::class)->name('about');

Route::get('dashboard', Controllers\DashboardController::class)->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/', Controllers\HomeController::class)->name('home');
    Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::get('products', [ProductController::class, 'index'])->name('products.index');
    Route::post('products/approve-request-deletion', [ProductController::class, 'approveRequestDeletion'])
        ->name('products.approve-request-deletion');

    Route::post('products/{product}', [ProductController::class, 'requestForDelete'])->name('products.request-for-delete');

    Route::delete('products/reject-request-deletion/{requestDeleteProduct}', [ProductController::class, 'rejectRequestDeletion'])
        ->name('products.reject-request-deletion');
});

require __DIR__ . '/auth.php';
require __DIR__ . '/dev.php';

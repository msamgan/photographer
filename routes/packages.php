<?php

use App\Http\Controllers\PackageController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/packages', [PackageController::class, 'index'])->name('package.index');
    Route::get('/packages/create', [PackageController::class, 'create'])->name('package.create');
    Route::post('/packages/store', [PackageController::class, 'store'])->name('package.store');
    Route::get('/packages/services/{package}', [PackageController::class, 'packageServices'])->name('package.services');
    Route::post('/packages/services/{package}', [PackageController::class, 'packageServicesStore'])->name('package.services.store');
    Route::get('/packages/edit/{package}', [PackageController::class, 'edit'])->name('package.edit');
    Route::post('/packages/update/{package}', [PackageController::class, 'update'])->name('package.update');
    Route::get('/packages/destroy/{package}', [PackageController::class, 'destroy'])->name('package.destroy');
    Route::get('/packages/replicate/{package}', [PackageController::class, 'replicate'])->name('package.replicate');
});

<?php

use App\Http\Controllers\PackageController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/packages', [PackageController::class, 'index'])->name('package.index');
    Route::get('/packages/create', [PackageController::class, 'create'])->name('package.create');
    Route::post('/packages/store', [PackageController::class, 'store'])->name('package.store');
    Route::get('/packages/{package}/services', [PackageController::class, 'packageServices'])->name('package.services');
    Route::post('/packages/{package}/services', [PackageController::class, 'packageServicesStore'])->name('package.services.store');
    Route::get('/packages/{package}/edit', [PackageController::class, 'edit'])->name('package.edit');
    Route::post('/packages/{package}/update', [PackageController::class, 'update'])->name('package.update');
    Route::get('/packages/{package}/destroy', [PackageController::class, 'destroy'])->name('package.destroy');
    Route::get('/packages/{package}/replicate', [PackageController::class, 'replicate'])->name('package.replicate');
    Route::get('/packages/{package}', [PackageController::class, 'show'])->name('package.show');
});

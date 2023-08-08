<?php

use App\Http\Controllers\JobController;
use App\Http\Controllers\JobTypeController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/jobs', [JobController::class, 'index'])->name('job.index');
    Route::get('/jobs/create', [JobController::class, 'create'])->name('job.create');
    Route::post('/jobs/store', [JobController::class, 'store'])->name('job.store');
    Route::get('/jobs/{job}/edit', [JobController::class, 'edit'])->name('job.edit');
    Route::post('/jobs/{job}/update', [JobController::class, 'update'])->name('job.update');
    Route::get('/jobs/{job}/destroy', [JobController::class, 'destroy'])->name('job.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/job-types', [JobTypeController::class, 'index'])->name('job-type.index');
    Route::post('/job-types', [JobTypeController::class, 'store'])->name('job-type.store');
    Route::get('/job-types/{jobType}/destroy', [JobTypeController::class, 'destroy'])->name('job-type.destroy');
});

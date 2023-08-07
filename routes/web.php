<?php


use App\Http\Controllers\DashboardController;
use App\Http\Controllers\JobController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }

    return Inertia::render('Auth/Login',
        ['canResetPassword' => Route::has('password.request'), 'status' => session('status'),]
    );
});

Route::get('/dashboard', [DashboardController::class, '__invoke'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/jobs', [JobController::class, 'index'])->name('job.index');
    Route::get('/jobs/create', [JobController::class, 'create'])->name('job.create');
    Route::post('/jobs/store', [JobController::class, 'store'])->name('job.store');
    Route::get('/jobs/{job}/edit', [JobController::class, 'edit'])->name('job.edit');
    Route::post('/jobs/{job}/update', [JobController::class, 'update'])->name('job.update');
    Route::get('/jobs/{job}/destroy', [JobController::class, 'destroy'])->name('job.destroy');
});

require __DIR__ . '/clients.php';
require __DIR__ . '/packages.php';
require __DIR__ . '/profile.php';
require __DIR__ . '/auth.php';

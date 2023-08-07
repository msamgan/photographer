<?php


use App\Http\Controllers\DashboardController;
use App\Http\Controllers\JobTypeController;
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


require __DIR__ . '/clients.php';
require __DIR__ . '/packages.php';
require __DIR__ . '/profile.php';
require __DIR__ . '/auth.php';

Route::middleware('auth')->group(function () {
    Route::get('/job-types', [JobTypeController::class, 'index'])->name('job-type.index');
    Route::post('/job-types', [JobTypeController::class, 'store'])->name('job-type.store');
    Route::get('/job-types/{jobType}/destroy', [JobTypeController::class, 'update'])->name('job-type.destroy');
});

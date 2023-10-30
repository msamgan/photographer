<?php

use App\Http\Controllers\ContractController;
use App\Http\Controllers\ContractTemplateController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }

    return Inertia::render('Auth/Login',
        ['canResetPassword' => Route::has('password.request'), 'status' => session('status')]
    );
});

Route::get('/dashboard', [DashboardController::class, '__invoke'])->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/contract-template', [ContractTemplateController::class, 'index'])->name('contract-template.index');

require __DIR__ . '/jobs.php';
require __DIR__ . '/clients.php';
require __DIR__ . '/packages.php';
require __DIR__ . '/profile.php';
require __DIR__ . '/auth.php';

<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Inertia\ResponseFactory;

class JobController extends Controller
{
    public function index(): Response|ResponseFactory
    {
        return inertia('Job/Index')->with([
            'jobs' => collect([])
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Inertia\ResponseFactory;

class JobTypeController extends Controller
{
    public function index(): Response|ResponseFactory
    {
        return inertia('JobType/Index');
    }
}

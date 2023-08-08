<?php

namespace App\Http\Controllers;

use App\Models\JobType;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Response;
use Inertia\ResponseFactory;

class JobTypeController extends Controller
{
    public function index(): Response|ResponseFactory
    {
        return inertia('JobType/Index')->with('jobTypes', JobType::userJobType(auth()->user()));
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        auth()->user()->jobTypes()->create([
            'uuid' => Str::uuid()->toString(),
            'name' => strtolower($request->name),
        ]);

        return back();
    }

    public function destroy(JobType $jobType)
    {
        try {
            $jobType->delete();
            return back();
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Unable to delete job type.']);
        }
    }
}

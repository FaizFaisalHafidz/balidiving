<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $query = Event::with('user')
            ->where('status', '!=', 'cancelled');

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Search
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('location', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        // Sort
        $sortBy = $request->get('sort', 'start_date');
        $sortOrder = $request->get('order', 'asc');
        
        $query->orderBy($sortBy, $sortOrder);

        $events = $query->paginate(9)->through(function ($event) {
            return [
                'id' => $event->id,
                'title' => $event->title,
                'slug' => $event->slug,
                'description' => $event->description,
                'image' => $event->image,
                'location' => $event->location,
                'location_url' => $event->location_url,
                'start_date' => $event->start_date->format('Y-m-d H:i:s'),
                'end_date' => $event->end_date->format('Y-m-d H:i:s'),
                'max_participants' => $event->max_participants,
                'registered_participants' => $event->registered_participants,
                'available_slots' => $event->availableSlots(),
                'is_full' => $event->isFull(),
                'status' => $event->status,
                'is_featured' => $event->is_featured,
                'organizer' => [
                    'id' => $event->user->id,
                    'name' => $event->user->name,
                    'avatar' => $event->user->avatar ?? null,
                ],
            ];
        });

        return Inertia::render('events/index', [
            'events' => $events,
            'filters' => [
                'search' => $request->search ?? '',
                'status' => $request->status ?? 'all',
                'sort' => $sortBy,
                'order' => $sortOrder,
            ],
        ]);
    }

    public function show(string $slug)
    {
        $event = Event::with(['user'])
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('events/show', [
            'event' => [
                'id' => $event->id,
                'title' => $event->title,
                'slug' => $event->slug,
                'description' => $event->description,
                'image' => $event->image,
                'location' => $event->location,
                'location_url' => $event->location_url,
                'start_date' => $event->start_date->format('Y-m-d H:i:s'),
                'end_date' => $event->end_date->format('Y-m-d H:i:s'),
                'max_participants' => $event->max_participants,
                'registered_participants' => $event->registered_participants,
                'available_slots' => $event->availableSlots(),
                'is_full' => $event->isFull(),
                'status' => $event->status,
                'is_featured' => $event->is_featured,
                'organizer' => [
                    'id' => $event->user->id,
                    'name' => $event->user->name,
                    'email' => $event->user->email,
                    'avatar' => $event->user->avatar ?? null,
                ],
                'is_upcoming' => $event->isUpcoming(),
                'is_ongoing' => $event->isOngoing(),
                'is_completed' => $event->isCompleted(),
            ],
        ]);
    }
}

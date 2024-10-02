<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('product-management.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

<?php

namespace App\Http\Controllers;
use App\Models\User;
class UsernamesController extends Controller
{
    function getUsernamesList() {
        $userModel = new User();
        $data=$userModel->getUsernamesList();
        return response()->json($data);
    }
}
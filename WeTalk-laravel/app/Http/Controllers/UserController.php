<?php

namespace App\Http\Controllers;
use App\Models\User;
class UserController extends Controller
{
    function getUser() {
        $userModel = new User();
        $data=$userModel->getUser();
        return response()->json($data);
    }
}

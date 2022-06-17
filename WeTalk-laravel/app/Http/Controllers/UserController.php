<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
class UserController extends Controller
{
    function getUser() {
        $userModel = new User();
        $data=$userModel->getUser();
        return response()->json($data);
    }
    function addUser(Request $request) {
        $userModel = new User();
        $data=$userModel->addUser($request->all());
    }
}

<?php
namespace App\Models;
use DB;
class User
{
    function getUser() {
        $data=DB::table('users')->get();
        return $data;
    }
    function getUsernamesList() {
        $data=DB::table('usernameslist')->get();
        return $data;
    }
}

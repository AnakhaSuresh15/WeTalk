<?php
namespace App\Models;
use DB;
class User
{
    function getUser() {
        $data=DB::table('users')->get();
        return $data;
    }
    function addUser($data) {
        DB::table('users')->insert($data);
    }
}

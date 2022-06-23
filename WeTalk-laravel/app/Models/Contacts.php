<?php
namespace App\Models;
use DB;
class Contacts
{
    function getContacts() {
        $data=DB::table('contacts')->get();
        return $data;
    }
    function addContacts($data) {
        DB::table('contacts')->insert($data);
    }
}

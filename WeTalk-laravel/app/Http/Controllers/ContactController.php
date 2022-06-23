<?php

namespace App\Http\Controllers;
use App\Models\Contacts;
use Illuminate\Http\Request;
class ContactController extends Controller
{
    function getContacts() {
        $contactsModel = new Contacts();
        $data=$contactsModel->getContacts();
        return response()->json($data);
    }
    function addContacts(Request $request) {
        $contactsModel = new Contacts();
        $data=$contactsModel->addContacts($request->all());
    }
}

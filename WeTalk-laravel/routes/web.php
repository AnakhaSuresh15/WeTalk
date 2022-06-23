<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/userdata', 'UserController@getUser');
Route::post('/adduser', 'UserController@addUser');
Route::get('/contacts', 'ContactController@getContacts');
Route::post('/addcontact', 'ContactController@addContacts');


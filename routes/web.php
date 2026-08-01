<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes - Math Learning Studio (No Database Required)
|--------------------------------------------------------------------------
*/

// Welcome Hub - Selection Portal
Route::get('/', function () {
    return view('welcome');
})->name('portal');

// FPB & KPK Interactive Studio
Route::get('/fpbkpk', function () {
    return view('fpbkpk');
})->name('fpbkpk');

// Pembagian Porogapit Interactive Studio
Route::get('/pembagian', function () {
    return view('pembagian');
})->name('pembagian');

// Legacy alias redirect
Route::get('/math2', function () {
    return redirect()->route('pembagian');
});

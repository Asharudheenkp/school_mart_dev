<?php

Route::get('/', function(){

    $images = [asset('/bag.jpg'), asset('/book.jpg'), asset('/pen.jpg'),  asset('/pen_2.jpg'),  asset('/pencile.jpg')];
    return response()->json(['status' => true, 'data' => [ 'book', 'ball', 'mike', 'jios', 'sim'], 'images' => $images]);
});
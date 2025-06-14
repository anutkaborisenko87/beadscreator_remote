<?php

if (!function_exists('getSlug')) {
    function getSlug($slug)
    {
        $parse = parse_url($slug, PHP_URL_PATH);
        $explode = explode("/", $parse);
        return end($explode);
    }
}

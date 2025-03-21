<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" type="image/png" href="{{ Vite::asset("resources/images/sitelogo.png")}}">

    <title>{{env('APP_NAME')}}</title>
    @viteReactRefresh
    @vite('resources/js/app.jsx')
</head>
<body>
<main class="flex flex-col justify-center items-center" style="height: 100%; background: #D9D9D9;">
    <div class="text-center"
         style="background: #AEC2ED; border-radius: 15px; box-shadow: 10px 10px 10px #031945;">
        <p class="text-base text-indigo-600"
           style="margin: 0;
                  font-size: 5em;
                  font-weight: bold;
                  background: #1F51BD;
                  border-radius: 15px 15px 0 0;
                  padding: 0.5em;
                  color: #D9D9D9;">503</p>
        <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl"
            style="padding: 1em; color: #031945;">{{ __('main.page_unavailable_error_title') }}</h1>
        <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8"
           style="color: #031945; padding: 2em;">{{ __('main.page_unavailable_error_intro') }}</p>
        <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8"
           style="color: #031945; padding: 2em;">{{ __('main.page_unavailable_error_later') }}</p>
    </div>
</main>
</body>
</html>

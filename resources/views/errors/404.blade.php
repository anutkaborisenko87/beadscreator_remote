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
                  color: #D9D9D9;">404</p>
        <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl"
            style="padding: 1em; color: #031945;">{{ __('main.page_not_found_title') }}</h1>
        <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8"
           style="color: #031945; padding: 2em;">{{ __('main.page_not_found_intro') }}</p>
        <div class="mt-10 flex items-center justify-center gap-x-6" style="background: #031945;
                                                                           margin: 2em;
                                                                           padding: 1em;
                                                                           border-radius: 15px;
                                                                           box-shadow: 10px 10px 10px #031945b5;">
            <a href="{{ url()->previous() }}"
               class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
               style="text-decoration: none;
                      font-size: 1em;
                      color: #D9D9D9;"
            >{{ __('main.page_not_found_button') }}</a>
        </div>
    </div>
</main>
</body>
</html>

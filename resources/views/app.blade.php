<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        {{-- Inline style to set the HTML background color for light mode only --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }
        </style>

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <link rel="icon" href="https://balidiving.com/images/bali-diving-logo.svg" sizes="any">
        <link rel="icon" href="https://balidiving.com/images/bali-diving-logo.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="https://balidiving.com/images/bali-diving-logo.svg">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
        
        {{-- Sui Generis Font for Bali Diving --}}
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
        
        <style>
            @font-face {
                font-family: 'Sui Generis';
                src: url('https://balidiving.com/fonts/SuiGeneris-Regular.woff2') format('woff2'),
                     url('https://balidiving.com/fonts/SuiGeneris-Regular.woff') format('woff');
                font-weight: 400;
                font-style: normal;
                font-display: swap;
            }
            
            body {
                font-family: 'Montserrat', 'Instrument Sans', sans-serif;
            }
            
            .font-sui {
                font-family: 'Sui Generis', 'Montserrat', sans-serif;
            }
        </style>

        {{-- Midtrans Snap Script --}}
        <script type="text/javascript"
            src="https://app.sandbox.midtrans.com/snap/snap.js"
            data-client-key="{{ config('midtrans.client_key') }}"></script>

        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>

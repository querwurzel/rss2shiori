# rss2shiori

some script importing rss feeds to shiori

## Requirements

[Deno 1.5+](https://deno.land)

## Prologue

`deno run --allow-run --allow-read import.ts /bin/echo sample.rss`

## Usage

1. `deno run --allow-run --allow-read import.ts /path/to/shiori bookmarks.rss`
2. update shiori afterwards by calling `shiori update`

## Epilogue

All imported feeds are assigned to the shiori user account (id 0, effectively the admin account).
In order to change ownership you will have to update the database manually.


import { assert } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import {
  deserializeFeed,
  FeedType,
  RSS2
} from "https://deno.land/x/rss@0.2.6/mod.ts";

/*
Usage:
  shiori add url [flags]
Flags:
  -e, --excerpt string   Custom excerpt for this bookmark
  -h, --help             help for add
  --log-archival         Log the archival process
  -a, --no-archival      Save bookmark without creating offline archive
  -o, --offline          Save bookmark without fetching data from internet
  -t, --tags strings     Comma-separated tags for this bookmark
  -i, --title string     Custom title for this bookmark
*/

const rss2shiori = (shiori: string, ...rss: string[]) => {
  rss.forEach(async (file) => {
    const content = await Deno.readTextFile(file);
    const [feedType, feed] = await deserializeFeed(content) as [FeedType, RSS2];

    feed.channel.items.forEach((item, idx) => {
      const title = item.title;
      const link = item.link;
      const tags = item.categories?.join();

      if (!(title && link && tags)) {
        console.error("Found strange rss item:", item);
        return;
      }

      const call = async () => {
        const sub = Deno.run(
          {
            cmd: [
              shiori,
              "add",
              link,
              "--tags",
              tags,
              "--title",
              title,
              "--offline"
            ],
          },
        );
        await sub.status();
      };

      setTimeout(call, idx * 500); // delay spawns
    });
  });
};

assert(
  Deno.args.length >= 2,
  "expecting arguments: <shiori binary> <rss file> [rss files]",
);

rss2shiori(Deno.args[0], ...Deno.args.slice(1));

export { rss2shiori };

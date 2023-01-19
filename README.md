# SilverBullet plug for posting to [micro.blog](https://micro.blog)

## Wait, SilverBullet?

If you don't know what it is, check its [webpage](https://silverbullet.md), but
if you want me to spoil the fun: it is an extensible note taking app with
markdown and plain files at its core (well... there is a bit of magic in there
too, but what good it would be without a little magic?)

## Build

To build this plug, make sure you have `plugos-bundle` installed. If not, be
sure to have [Deno](https://deno.land) installed first, then run:

```shell
deno install -f -A --unstable --importmap https://deno.land/x/silverbullet/import_map.json https://deno.land/x/silverbullet/plugos/bin/plugos-bundle.ts
```

After this, build the plug with

```shell
deno task build
```

Or to watch for changes and rebuild automatically

```shell
deno task watch
```

Then, load the locally built plug, add it to your `PLUGS` note with an absolute
path, for instance:

```
- file:/Users/you/path/to/micro_blog.plug.json
```

And run the `Plugs: Update` command in SilverBullet.

## Installation

If you would like to install this plug straight from Github, make sure you have
the `.json` file committed to the repo and simply add

```
- github:jahzielv/silverbullet-micro-blog/micro_blog.plug.json
```

to your `PLUGS` file, run `Plugs: Update` command and off you go!

## Usage

First, add your micro.blog token to your `SECRETS` file:

```
microblog:
  token: {YOUR_APP_TOKEN}
```

then, add

```
---
$share:
- microblog
---
```

to your post's frontmatter.

Finally, use the `Share: Publish` command to publish your SilverBullet page to your micro.blog!

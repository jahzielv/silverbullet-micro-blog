import { space } from "$sb/silverbullet-syscall/mod.ts";
import { readSecrets } from "$sb/lib/secrets_page.ts";
import { cleanMarkdown } from "$sb-plugs/markdown/util.ts";

const MICRO_BLOG_URL = new URL("https://micro.blog/micropub");

const r = /^---\n(?:.|.\s)*\n*---/;

async function markdownToPost(text: string): Promise<string> {
  const match = text.split(r);
  const [_, content] = match;
  console.log(match);
  return await cleanMarkdown(content);
}

export async function publish(event: PublishEvent): Promise<boolean> {
  const text = await space.readPage(event.name);
  const cleanedText = await markdownToPost(text);
  const token = (await readSecrets(["microblog"]))[0].token;
  MICRO_BLOG_URL.searchParams.append("h", "entry");
  MICRO_BLOG_URL.searchParams.append("content", cleanedText);
  try {
    const resp = await fetch(MICRO_BLOG_URL.toString(), {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (resp.status > 200) {
      return true;
    }
  } catch (error) {
    console.error(error, "fetch error");
    return false;
  }
}

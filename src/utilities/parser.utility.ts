import { Marked, Parsed } from "../../deps.ts";

const parseMarkdown = async (filename: string): Promise<Parsed> => {
  const decoder = new TextDecoder("utf-8");
  const markdown = decoder.decode(
    await Deno.readFile(`./markdown/${filename}`)
  );
  return Marked.parse(markdown);
};

interface Meta {
  title: string;
  date: string;
  tags: string[];
  series: string;
}

export const getBlogMetaArray = async (): Promise<Meta[]> => {
  const metaArray: Meta[] = [];

  for await (const dirEntry of Deno.readDir("./markdown")) {
    console.log(dirEntry.name);

    metaArray.push((await parseMarkdown(dirEntry.name)).meta as Meta);
  }

  return metaArray;
};

// specific file get markdown and meta for /blog/:id
// return object of { markdown, meta }

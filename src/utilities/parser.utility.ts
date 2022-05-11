import { Marked, Parsed } from "../../deps.ts";

const parseMarkdown = async (filename: string): Promise<Parsed> => {
  const decoder = new TextDecoder("utf-8");
  const markdown = decoder.decode(
    await Deno.readFile(`./markdown/${filename}`)
  );
  return Marked.parse(markdown);
};

interface Meta {
  filename: string;
  title: string;
  date: string;
  tags: string[];
  series: string;
}

export const getBlogMetaArray = async (): Promise<Meta[]> => {
  const metaArray: Meta[] = [];

  for await (const dirEntry of Deno.readDir("./markdown")) {
    const data = (await parseMarkdown(dirEntry.name)).meta as Meta;
    data.filename = dirEntry.name.split(".markdown")[0];
    metaArray.push(data);
  }

  return metaArray;
};

export const getBlogPost = async (
  filename: string
): Promise<{ blogPost: string; blogMeta: Meta }> => {
  const parsed = await parseMarkdown(filename + ".markdown");

  return { blogPost: parsed.content, blogMeta: parsed.meta as Meta };
};

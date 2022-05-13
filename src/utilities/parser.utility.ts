import { Marked } from "../deps.ts";

interface Meta {
  filename: string;
  title: string;
  date: string;
  tags: string[];
  series: string;
}

const parseMeta = async (filename: string): Promise<Meta> => {
  const decoder = new TextDecoder("utf-8");
  const markdown = decoder.decode(
    await Deno.readFile(`./markdown/${filename}`)
  );

  const metaObj: Meta = {
    filename: "",
    title: "",
    date: "",
    tags: [],
    series: "",
  };

  const lines = markdown.split("---")[1].split("\n");
  lines.forEach((line) => {
    switch (line.split(":")[0]) {
      case "title":
        metaObj.title = line.split(":")[1].trim();
        break;
      case "date":
        metaObj.date = line.split(":")[1].trim();
        break;
      case "tags":
        metaObj.tags = line
          .split(":")[1]
          .trim()
          .split(",")
          .map((x) => x.trim());
        break;
      case "series":
        metaObj.series = line.split(":")[1].trim();
        break;
    }
  });

  return metaObj;
};

const parseMarkdown = async (filename: string): Promise<string> => {
  const decoder = new TextDecoder("utf-8");
  const markdown = decoder.decode(
    await Deno.readFile(`./markdown/${filename}`)
  );
  return Marked.parse(markdown).content;
};

export const getBlogMetaList = async (): Promise<Meta[]> => {
  const metaArray: Meta[] = [];

  for await (const dirEntry of Deno.readDir("./markdown")) {
    const meta = await parseMeta(dirEntry.name);
    meta.filename = dirEntry.name.split(".markdown")[0];
    metaArray.push(meta);
  }

  return metaArray;
};

export const getBlogPost = async (
  filename: string
): Promise<{ blogContent: string; blogMeta: Meta }> => {
  const content = await parseMarkdown(filename + ".markdown");
  const meta = await parseMeta(filename + ".markdown");

  return { blogContent: content, blogMeta: meta };
};

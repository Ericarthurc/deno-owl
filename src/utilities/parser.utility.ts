import { Marked } from "../deps.ts";

interface Meta {
  fileName: string;
  title: string;
  date: string;
  tags: string[];
  series: string;
}

const parseFile = async (
  fileName: string
): Promise<{ fileString: string; fileName: string }> => {
  const decoder = new TextDecoder("utf-8");
  const fileString = decoder.decode(
    await Deno.readFile(`./markdown/${fileName}`)
  );

  return { fileString, fileName };
};

const parseMeta = (fileString: string, fileName: string): Meta => {
  const metaObj: Meta = {
    fileName: "",
    title: "",
    date: "",
    tags: [],
    series: "",
  };

  const lines = fileString.split("---")[1].split("\n");
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

  metaObj.fileName = fileName.split(".markdown")[0];

  return metaObj;
};

const parseMarkdown = (fileString: string): string => {
  return Marked.parse(fileString).content;
};

export const getBlogMetaList = async (): Promise<Meta[]> => {
  const metaArray: Meta[] = [];

  for await (const dirEntry of Deno.readDir("./markdown")) {
    const fileData = await parseFile(dirEntry.name);
    const meta = parseMeta(fileData.fileString, fileData.fileName);
    metaArray.push(meta);
  }

  return metaArray;
};

export const getBlogPost = async (
  fileName: string
): Promise<{ blogContent: string; blogMeta: Meta }> => {
  const fileData = await parseFile(fileName + ".markdown");
  const content = parseMarkdown(fileData.fileString);
  const meta = parseMeta(fileData.fileString, fileData.fileName);

  return { blogContent: content, blogMeta: meta };
};

import { Poem } from '@nx-expo-poetry/models';

export interface PoemResponse {
  title: string;
  author: string;
  lines: string[];
  linecount: string;
}

export function mapPoemResponseToPoem(response: PoemResponse): Poem {
  return {
    title: response.title,
    author: response.author,
    lines: response.lines,
    lineCount: parseInt(response.linecount, 10),
  };
}

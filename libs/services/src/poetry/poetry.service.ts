import { PoemResponse } from '../models/poem-response.interface';

const POETRY_BASE_URL = 'https://poetrydb.org/';

export async function getPoemOfTheDay(): Promise<PoemResponse[]> {
  const response: Response = await fetch(POETRY_BASE_URL + 'random', {
    method: 'GET',
  });
  if (response.ok) {
    return await response.json();
  }
  throw response;
}

export async function getPoemsWithAuthor(
  author: string
): Promise<PoemResponse[]> {
  const response: Response = await fetch(POETRY_BASE_URL + 'author/' + author, {
    method: 'GET',
  });
  if (response.ok) {
    return await response.json();
  }
  throw response;
}

export const poetryService = { getPoemOfTheDay };

import { compareTwoStrings } from 'string-similarity';

import { PoemResponse } from '../models/poem-response.interface';

const POETRY_BASE_URL = 'https://poetrydb.org/';

export async function getPoemOfTheDay(): Promise<PoemResponse[]> {
  const response: Response = await fetch(POETRY_BASE_URL + 'random', {
    method: 'GET',
  });
  if (response.ok) {
    const poemResponse = await response.json();
    if (!poemResponse.status) {
      // when it got a status code in the reponse, it is an invalid response
      return poemResponse;
    }
  }
  throw response;
}

export async function getPoemsWithTitle(
  title: string
): Promise<PoemResponse[]> {
  const response: Response = await fetch(
    POETRY_BASE_URL + 'title/' + encodeURIComponent(title),
    {
      method: 'GET',
    }
  );
  if (response.ok) {
    const poemResponse = await response.json();
    if (!poemResponse.status) {
      // when it got a status code in the reponse, it is an invalid response
      return poemResponse;
    }
  }
  throw response;
}

export async function getPoemsWithAuthor(
  author: string
): Promise<PoemResponse[]> {
  console.log(POETRY_BASE_URL + 'author/' + encodeURIComponent(author));
  const response: Response = await fetch(
    POETRY_BASE_URL + 'author/' + encodeURIComponent(author),
    {
      method: 'GET',
    }
  );
  if (response.ok) {
    const poemResponse = await response.json();
    if (!poemResponse.status) {
      // when it got a status code in the reponse, it is an invalid response
      return poemResponse;
    }
  }
  throw response;
}

export async function searchPoems(
  searchQuery: string
): Promise<PoemResponse[]> {
  return Promise.all([
    getPoemsWithTitle(searchQuery).catch(() => {
      return [];
    }),
    getPoemsWithAuthor(searchQuery).catch(() => {
      return [];
    }),
  ]).then(([poems1, poems2]) => {
    console.log('poems2', poems2);
    poems1.forEach(
      (poem) => (poem.similarity = compareTwoStrings(poem.title, searchQuery))
    );
    poems2.map(
      (poem) => (poem.similarity = compareTwoStrings(poem.author, searchQuery))
    );
    return [...poems1, ...poems2].sort(
      (poem1: PoemResponse, poem2: PoemResponse) => {
        return (poem2.similarity ?? 0) - (poem1.similarity ?? 0);
      }
    );
  });
}

export const poetryService = {
  getPoemOfTheDay,
  getPoemsWithTitle,
  getPoemsWithAuthor,
  searchPoems,
};

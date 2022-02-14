import {
  fetchPoemOfTheDay,
  poemOfTheDayAdapter,
  poemOfTheDayReducer,
} from './poem-of-the-day.slice';

describe('poemOfTheDay reducer', () => {
  it('should handle initial state', () => {
    const expected = poemOfTheDayAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(poemOfTheDayReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchPoemOfTheDays', () => {
    let state = poemOfTheDayReducer(
      undefined,
      fetchPoemOfTheDay.pending(null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = poemOfTheDayReducer(
      state,
      fetchPoemOfTheDay.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = poemOfTheDayReducer(
      state,
      fetchPoemOfTheDay.rejected(new Error('Uh oh'), null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});

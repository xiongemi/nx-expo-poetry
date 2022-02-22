import { fetchSearch, searchReducer } from './search.slice';

describe('search reducer', () => {
  it('should handle initial state', () => {
    const expected = searchAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(searchReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchSearchs', () => {
    let state = searchReducer(undefined, fetchSearch.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = searchReducer(
      state,
      fetchSearch.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = searchReducer(
      state,
      fetchSearch.rejected(new Error('Uh oh'), null, null)
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

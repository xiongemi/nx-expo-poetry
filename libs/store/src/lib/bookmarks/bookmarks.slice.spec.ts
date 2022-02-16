import { bookmarksAdapter, bookmarksReducer } from './bookmarks.slice';

describe('bookmarks reducer', () => {
  it('should handle initial state', () => {
    const expected = bookmarksAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(bookmarksReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchBookmarkss', () => {
    let state = bookmarksReducer(undefined, fetchBookmarks.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = bookmarksReducer(
      state,
      fetchBookmarks.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = bookmarksReducer(
      state,
      fetchBookmarks.rejected(new Error('Uh oh'), null, null)
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

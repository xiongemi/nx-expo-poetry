import { Poem } from '@nx-expo-poetry/models';
import {
  bookmarksActions,
  bookmarksSelectors,
  fetchBookmark,
  RootState,
} from '@nx-expo-poetry/store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

const mapStateToProps = (state: RootState) => {
  return {
    poem: bookmarksSelectors.getBookmarkPoem(state),
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, void, AnyAction>
) => {
  return {
    fetchBookmark(title: string, author: string) {
      dispatch(fetchBookmark({ title, author }));
    },
    bookmark(formattedDate: string, poem: Poem) {
      dispatch(
        bookmarksActions.add({
          formattedDate,
          id: encodeURIComponent(poem.title),
          poem: {
            ...poem,
            lines: poem.lines.slice(0, 1),
          },
        })
      );
    },
  };
};

type mapStateToPropsType = ReturnType<typeof mapStateToProps>;
type mapDispatchToPropsType = ReturnType<typeof mapDispatchToProps>;

type BookmarkProps = mapStateToPropsType & mapDispatchToPropsType;

export { mapStateToProps, mapDispatchToProps };
export type { BookmarkProps };

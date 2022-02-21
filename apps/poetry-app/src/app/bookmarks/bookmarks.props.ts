import {
  RootState,
  bookmarksSelectors,
  bookmarksActions,
  BookmarksEntity,
} from '@nx-expo-poetry/store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

const mapStateToProps = (state: RootState) => {
  return {
    bookmarks: bookmarksSelectors.selectAllBookmarks(state),
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, void, AnyAction>
) => {
  return {
    removeBookmark(bookmark: BookmarksEntity) {
      dispatch(bookmarksActions.remove(bookmark.id));
    },
    addBookmark(bookmark: BookmarksEntity) {
      dispatch(bookmarksActions.add(bookmark));
    },
  };
};

type mapStateToPropsType = ReturnType<typeof mapStateToProps>;
type mapDispatchToPropsType = ReturnType<typeof mapDispatchToProps>;

type BookmarksProps = mapStateToPropsType & mapDispatchToPropsType;

export { mapStateToProps, mapDispatchToProps };
export type { BookmarksProps };

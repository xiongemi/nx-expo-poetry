import { RootState, bookmarksSelectors } from '@nx-expo-poetry/store';

const mapStateToProps = (state: RootState) => {
  return {
    poems: bookmarksSelectors.selectBookmarksPoems(state),
  };
};

type mapStateToPropsType = ReturnType<typeof mapStateToProps>;

type BookmarksProps = mapStateToPropsType;

export { mapStateToProps };
export type { BookmarksProps };

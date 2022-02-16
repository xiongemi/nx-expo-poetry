import React from 'react';
import { Headline } from 'react-native-paper';
import { connect } from 'react-redux';

import Bookmark from './bookmark/bookmark';
import { mapStateToProps, BookmarksProps } from './bookmarks.props';

export function Bookmarks({ poems }: BookmarksProps) {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {poems?.length ? (
        poems.map((poem) => poem && <Bookmark poem={poem} />)
      ) : (
        <Headline>No poems bookmarked~</Headline>
      )}
    </>
  );
}

export default connect(mapStateToProps, null)(Bookmarks);

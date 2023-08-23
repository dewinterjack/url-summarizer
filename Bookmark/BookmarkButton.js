import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BookmarkContext } from './BookmarkContext';

export default function BookmarkButton({ article, summary }) {
  const { state, dispatch } = useContext(BookmarkContext);

  const handleBookmark = () => {
    const isBookmarked = state.bookmarks.some(
      bookmark => bookmark.article === article && bookmark.summary === summary
    );

    if (isBookmarked) {
      const index = state.bookmarks.findIndex(
        bookmark => bookmark.article === article && bookmark.summary === summary
      );
      dispatch({ type: 'REMOVE_BOOKMARK', payload: index });
    } else {
      dispatch({ type: 'ADD_BOOKMARK', payload: { article, summary } });
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleBookmark}>
      <Text style={styles.text}>Bookmark</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    marginTop: 20,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});

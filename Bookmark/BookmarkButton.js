import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BookmarkContext } from './BookmarkContext';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function BookmarkButton({ article, title, summary }) {
  const { state, dispatch } = useContext(BookmarkContext);

  const isBookmarked = state.bookmarks.some(
    bookmark => bookmark.article === article && bookmark.summary === summary
  );

  const handleBookmark = () => {
    if (isBookmarked) {
      const index = state.bookmarks.findIndex(
        bookmark => bookmark.article === article && bookmark.summary === summary
      );
      dispatch({ type: 'REMOVE_BOOKMARK', payload: index });
    } else {
      dispatch({ type: 'ADD_BOOKMARK', payload: { article, title, summary } });
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleBookmark}>
      {isBookmarked ? (
        <Ionicons name="bookmark" size={32} />
      ) : (
        <Ionicons name="bookmark-outline" size={32} />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});

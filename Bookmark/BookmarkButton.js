import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import useBookmarks from './useBookmarks';

export default function BookmarkButton({ article, summary }) {
  const { bookmarks, addBookmark } = useBookmarks();

  const handleBookmark = () => {
    addBookmark(article, summary);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleBookmark}>
      <Text style={styles.text}>Bookmark</Text>
    </TouchableOpacity>
  )
};

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

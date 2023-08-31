import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { BookmarkContext } from '../Bookmark/BookmarkContext'; // Import your context

const BookmarksScreen = ({ navigation }) => {
  const { state } = useContext(BookmarkContext); // Use your context
  const { bookmarks } = state;

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
              /* Handle opening individual articles here */
            }}
          >
            <Text style={styles.listItemText}>{item.article.title /* Access the article's title */}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  listItem: {
    padding: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  listItemText: {
    fontSize: 18,
  },
});

export default BookmarksScreen;

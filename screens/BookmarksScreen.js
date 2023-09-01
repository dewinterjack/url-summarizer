import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { BookmarkContext } from '../Bookmark/BookmarkContext';
import ArticleModal from '../components/ArticleModal';

const BookmarksScreen = ({ navigation }) => {
  const { state } = useContext(BookmarkContext);
  const { bookmarks } = state;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handlePress = (article) => {
    setSelectedArticle(article);
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => handlePress(item.article)}
          >
            <Text style={styles.listItemText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      <ArticleModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        article={selectedArticle}
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

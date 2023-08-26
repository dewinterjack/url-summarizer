import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const profileLinks = [
  { title: 'Bookmarks', navigateTo: 'BookmarksScreen' },
];

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.detailsText}>User Details Here</Text>
      </View>
      <View style={styles.bottomContainer}>
        <FlatList
          data={profileLinks}
          keyExtractor={item => item.title}
          renderItem={({ item }) => (
            <View style={styles.separator}>
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => navigation.navigate(item.navigateTo)}
              >
              <View style={styles.iconWithText}>
                <Ionicons name="bookmark" size={24} style={styles.icon} />
                <Text style={styles.listItemText}>{item.title}</Text>
              </View>
                <Ionicons name="chevron-forward" size={24} />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  bottomContainer: {
    flex: 3,
    backgroundColor: '#e6e6e6',
  },
  detailsText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
  },
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10
  },
  listItemText: {
    fontSize: 18,
  },
  separator: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
});

export default ProfileScreen;

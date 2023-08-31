import React, { useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Button } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

const profileLinks = [
  { title: 'Bookmarks', navigateTo: 'BookmarksScreen' },
];

const PlaceholderImage = require('../assets/images/profile.png');

const ProfileScreen = ({ navigation }) => {


  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
    } else {
      alert('You did not select any image.');
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity>
          <Image
            style={styles.profileImage}
            source={PlaceholderImage}
          />
          </TouchableOpacity>
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#000',
  },
});

export default ProfileScreen;

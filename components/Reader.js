import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

function Reader({ content }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.content}>{content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    fontSize: 16,
  },
});

export default Reader;

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Keyboard, Dimensions } from 'react-native';

function URLSubmitter({ handleSubmit }) {
  const [inputText, setInputText] = useState('');
  const [submittedText, setSubmittedText] = useState('');

  const handleFormSubmit = () => {
    if (inputText.trim() !== '' && handleSubmit) {
      handleSubmit(inputText);
      setSubmittedText(inputText);
      setInputText('');
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={text => setInputText(text)}
          placeholder="Enter URL"
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <Text>Read and manage articles using AI.</Text>
      </View>
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 100
  },
  topContainer: {
    flex: 1,
  },
  bottomContainer: {
    flex: 2
  },
  input: {
    width: screenWidth * 0.7,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 25,
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  submittedText: {
    marginTop: 20,
    fontSize: 16,
  }
});

export default URLSubmitter;

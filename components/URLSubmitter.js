import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Keyboard } from 'react-native';

function URLSubmitter({ handleSubmit }) {
  const [inputText, setInputText] = useState('');
  const [submittedText, setSubmittedText] = useState('');

  const handleFormSubmit = () => {
    if (handleSubmit) {
      handleSubmit(inputText);
      setSubmittedText(inputText);
      setInputText('');
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
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
  },
});

export default URLSubmitter;

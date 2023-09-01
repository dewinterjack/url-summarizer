import React from 'react';
import { Modal, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Reader from './Reader';

const ArticleModal = ({ isVisible, onClose, article }) => {
  return (
    <Modal visible={isVisible} onRequestClose={onClose}>
      <Reader content={article} />
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close" size={32} />
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
    closeButton: {
      marginBottom: 50,
      alignSelf: 'center'
    },
  });
  

export default ArticleModal;
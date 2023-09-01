import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator, Modal, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import URLSubmitter from '../components/URLSubmitter';
import Reader from '../components/Reader';
import useArticle from '../hooks/useArticle';
import useSummary from '../hooks/useSummary';
import BookmarkButton from '../Bookmark/BookmarkButton';

export default function HomeScreen() {
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const [isArticleVisible, setIsArticleVisible] = useState(false);

  const onArticleFetched = () => {
    resetSummary();
    setIsSummaryVisible(false);
    setIsArticleVisible(true);
  };

  const onFetchSummary = () => {
    setIsSummaryVisible(true);
  };

  const { article, title, isLoading: isArticleLoading, fetchArticle } = useArticle(onArticleFetched);
  const { summary, isLoading: isSummaryLoading, fetchSummary, resetSummary } = useSummary(article, onFetchSummary);

  return (
    <View style={styles.container}>

      {isArticleLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator} />
      ) : (
        <URLSubmitter handleSubmit={fetchArticle} />
      )}

      <Modal
        animationType="slide"
        transparent={false}
        visible={isArticleVisible}
        onRequestClose={() => setIsArticleVisible(false)}>

        <View style={styles.modalHeader}>
          <View style={{ flex: 1 }} />
          <BookmarkButton article={article} title={title}/>
          {isSummaryVisible
            ? <TouchableOpacity style={styles.summaryButton} onPress={() => setIsSummaryVisible(false)}>
              <Text style={styles.summaryButtonText}>Hide Summary</Text>
            </TouchableOpacity>
            : <TouchableOpacity style={styles.summaryButton} onPress={fetchSummary}>
              <Text style={styles.summaryButtonText}>Read Summary</Text>
            </TouchableOpacity>
          }
        </View>

        {isSummaryVisible && (
          <View style={styles.summaryContainer}>
            {isSummaryLoading
              ? <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicatorSummary} />
              : <ScrollView>
                <Reader content={summary} />
              </ScrollView>
            }
          </View>
        )}

        <Reader content={article} />
        <TouchableOpacity style={styles.closeButton} onPress={() => setIsArticleVisible(false)}>
          <Ionicons name="close" size={32} />
        </TouchableOpacity>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    flexShrink: 1,
    maxHeight: 300
  },
  summaryButton: {
    marginTop: 25
  },
  closeButton: {
    marginBottom: 50,
    alignSelf: 'center'
  },
  activityIndicator: {
    marginTop: 20,
    alignSelf: 'center'
  },
  activityIndicatorSummary: {
    alignSelf: 'center',
    marginTop: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
});

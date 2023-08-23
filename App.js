import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator, Modal, Button, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import URLSubmitter from './components/URLSubmitter';
import Reader from './components/Reader';
import useArticle from './hooks/useArticle';
import useSummary from './hooks/useSummary';

export default function App() {

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

  const { article, isLoading: isArticleLoading, fetchArticle } = useArticle(onArticleFetched);
  const { summary, isLoading: isSummaryLoading, fetchSummary, resetSummary } = useSummary(article, onFetchSummary);

  return (
    <View style={styles.container}>
      <URLSubmitter handleSubmit={fetchArticle} />
      {isArticleLoading && <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator} />}

      <Modal
        animationType="slide"
        transparent={false}
        visible={isArticleVisible}
        onRequestClose={() => setIsArticleVisible(false)}>

        <View style={styles.modalHeader}>
          <View style={{ flex: 1 }} />
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
        <Button title="Close" onPress={() => setIsArticleVisible(false)} />
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

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator, Modal, Button, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import URLSubmitter from './components/URLSubmitter';
import Reader from './components/Reader';

export default function App() {
  const [article, setArticle] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const [isSummaryFetched, setIsSummaryFetched] = useState(false);

  const fetchArticle = async submittedUrl => {
    setIsLoading(true);
    try {
      const response = await fetch('https://url-summary-backend.jackdewinter.repl.co/fetch-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: submittedUrl }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setArticle(responseData.article);
        setSummary('');
        setIsSummaryFetched(false);
        setIsSummaryVisible(false);
        console.log('Server responded with article');
      } else {
        console.error('POST request for article failed:', response.status, response.statusText);
      }

      setIsModalVisible(true);
    } catch (error) {
      console.error('Error sending POST request for article:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSummary = async () => {
    setIsSummaryVisible(true);
    if (!isSummaryFetched) {
      setIsLoading(true);
      try {
        const response = await fetch('https://url-summary-backend.jackdewinter.repl.co/generate-summary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ article: article }),
        });

        if (response.ok) {
          const responseData = await response.json();
          setSummary(responseData.summary);
          setIsSummaryFetched(true);
          console.log('Server responded with summary');
        } else {
          console.error('POST request for summary failed:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error sending POST request for summary:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsSummaryVisible(!isSummaryVisible);
    }
  };

  return (
    <View style={styles.container}>
      <URLSubmitter handleSubmit={fetchArticle} />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator} />}

      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>

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
            {isLoading
              ? <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicatorSummary} />
              : <ScrollView>
                <Reader content={summary} />
              </ScrollView>
            }
          </View>
        )}

        <Reader content={article} />
        <Button title="Close" onPress={() => setIsModalVisible(false)} />
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

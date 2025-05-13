import Loader from '@/components/common/Loader';
import FeedList from '@/components/feed/FeedList';
import React, {Suspense} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

function FeedHomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Suspense fallback={<Loader />}>
        <FeedList />
      </Suspense>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedHomeScreen;

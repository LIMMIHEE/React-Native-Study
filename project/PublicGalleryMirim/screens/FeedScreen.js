import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {PAGE_LIMIT, getNewerPosts, getOlderPosts, getPosts} from '../lib/posts';
import PostCard from '../components/PostCard';

function FeedScreen() {
  const [posts, setPosts] = useState(null);
  const [noMorePost, setNoMorePost] = useState(false);
  const [refreshing, setRefereshing] = useState(false);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  const onLoadMore = async () => {
    if (noMorePost || !posts || posts.length > PAGE_LIMIT) {
      return;
    }

    const lastPost = posts[posts.length - 1];
    const olderPost = await getOlderPosts(lastPost.id);
    if (olderPost.length < PAGE_LIMIT) {
      setNoMorePost(true);
    }

    setPosts(posts.concat(olderPost));
  };

  const onRefresh = async () => {
    if (!posts || posts.length === 0 || refreshing) {
      return;
    }

    const firstPost = posts[0];
    setRefereshing(true);
    const newerPosts = await getNewerPosts(firstPost.id);
    setRefereshing(false);
    if (newerPosts.length === 0) {
      return;
    }

    setPosts(newerPosts.concat(posts));
  };

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.75}
      ListFooterComponent={
        !noMorePost && (
          <ActivityIndicator style={styles.spinner} size={32} color="#6200ee" />
        )
      }
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    />
  );
}

const renderItem = ({item}) => (
  <PostCard
    createdAt={item.createdAt}
    description={item.description}
    id={item.id}
    user={item.user}
    photoURL={item.photoURL}
  />
);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 48,
  },
  spinner: {
    height: 64,
  },
});

export default FeedScreen;

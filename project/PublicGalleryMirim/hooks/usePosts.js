import {useEffect, useState} from 'react';
import {getNewerPosts, getOlderPosts, getPosts, PAGE_LIMIT} from '../lib/posts';

export default function usePosts(userId) {
  const [posts, setPosts] = useState(null);
  const [noMorePost, setNoMorePost] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onLoadMore = async () => {
    if (noMorePost || !posts || posts.length < PAGE_LIMIT) {
      return;
    }
    const lastPost = posts[posts.length - 1];
    const olderPosts = await getOlderPosts(lastPost.id, userId);
    if (olderPosts.length < PAGE_LIMIT) {
      setNoMorePost(true);
    }
    setPosts(posts.concat(olderPosts));
  };

  const onRefresh = async () => {
    if (!posts || posts.length === 0 || refreshing) {
      return;
    }
    const firstPost = posts[0];
    setRefreshing(true);
    const newerPosts = await getNewerPosts(firstPost.id, userId);
    setRefreshing(false);
    if (newerPosts.length === 0) {
      return;
    }
    setPosts(newerPosts.concat(posts));
  };

  useEffect(() => {
    getPosts({userId}).then(_posts => {
      setPosts(_posts);
      if (_posts.length < PAGE_LIMIT) {
        setNoMorePost(true);
      }
    });
  }, [userId]);

  return {
    posts,
    noMorePost,
    refreshing,
    onLoadMore,
    onRefresh,
  };
}

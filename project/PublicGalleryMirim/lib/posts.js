import firestore from '@react-native-firebase/firestore';

const postsCollection = firestore().collection('posts');

export const PAGE_LIMIT = 3;

export function createPost({user, photoURL, description}) {
  return postsCollection.add({
    user,
    photoURL,
    description,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
}

export async function getPosts() {
  const snapShot = await postsCollection
    .orderBy('createdAt', 'desc')
    .limit(PAGE_LIMIT)
    .get();
  const posts = snapShot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return posts;
}

export async function getOlderPosts(id) {
  const cursorDoc = await postsCollection.doc(id).get();
  const snapShot = await postsCollection
    .orderBy('createdAt', 'desc')
    .startAfter(cursorDoc)
    .limit(PAGE_LIMIT)
    .get();

  const posts = snapShot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return posts;
}

export async function getNewerPosts(id) {
  const cursorDoc = await postsCollection.doc(id).get();
  const snapShot = await postsCollection
    .orderBy('createdAt', 'desc')
    .endBefore(cursorDoc)
    .limit(PAGE_LIMIT)
    .get();

  const posts = snapShot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return posts;
}

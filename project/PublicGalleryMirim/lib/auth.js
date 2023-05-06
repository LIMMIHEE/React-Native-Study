import auth from '@react-native-firebase/auth';

export function signIn({email, password}) { //로그인
    return auth().signInWithEmailAndPassword(email,password);
}

export function signUp({email, password}) { //회원가입
    return auth().createUserWithEmailAndPassword(email,password);
}

export function subscribeAuth(callback) { 
    // 앱 가동 또는 로그인 상태 변경 시 현 사용자 정보를 받아오는 콜백함수 등록
    return auth().onAuthStateChanged(callback);
}

export function signOut() { //로그아웃
    return auth().signOut();
}
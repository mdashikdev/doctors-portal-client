import { signInWithPopup, GoogleAuthProvider,signOut } from "firebase/auth";
import {auth} from './firebase.config';

const GoogleProvider = new GoogleAuthProvider();

export const GoogleLogin = async () => {
    try {
        const result = await signInWithPopup(auth, GoogleProvider);
        return result.user;
    } catch (error) {
        return error.message;
    }
}

export const logoutCurrentUser = () => {
    return signOut(auth).then(() => {
        return 'signed out';
      }).catch((error) => {
        return error.message;
      });
}

// export const CreateCustomeUser = (name,email,password) => {
//     return createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       if(userCredential.user){
//         updateProfile(auth.currentUser, {
//             displayName: name, photoURL: "https://example.com/jane-q-user/profile.jpg"
//           }).then(() => {
//             return userCredential.user
//           }).catch((error) => {
//             return error.message;
//           });
//       }else{
//         return 'user registration failed';
//       }
//     })
//     .catch((error) => {
//       return error.message;
//     });
// }
import { ref } from "vue";
//
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
//

const user = ref(auth.currentUser);

// auth changes
onAuthStateChanged(auth, (myUser) => {
  console.log("userFromGetUser: ", myUser);
  user.value = myUser;
});
//

export const getUser = () => {
  return { user };
};
//

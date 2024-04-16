import { ref } from "vue";
//
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
//

const user = ref(auth.currentUser);

onAuthStateChanged(auth, (_user) => {
  console.log("user", user.displayName);
  user.value = _user;
});
//

const getUser = () => {
  return { user };
};
//

export default getUser;

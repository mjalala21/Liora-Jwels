import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser} from "./redux/slices/UserSlice";
import { getUserById } from "./services/api";
import AppRoutes from "./routes/AppRoutes";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    async function loadUser() {

      const userId = localStorage.getItem("userId");

      if (!userId){
         dispatch(setUserLoaded());
        return;
      }
      const user = await getUserById(userId);

      dispatch(setUser(user));

      // dispatch(setUserLoaded());
    }

    loadUser();

  }, [dispatch]);

  return <AppRoutes />;
}

export default App;
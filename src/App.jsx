import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser} from "./redux/slices/UserSlice";
// import { getUserById } from "./services/api";
import { getUserById } from "./services/userApi";
import AppRoutes from "./routes/AppRoutes";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    async function loadUser() {

      const userId = localStorage.getItem("userId");

      if (!userId){
        
        return;
      }
      const user = await getUserById(userId);

      dispatch(setUser(user));

   
    }

    loadUser();

  }, []);

  return <AppRoutes />;
}

export default App;
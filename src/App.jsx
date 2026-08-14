  import { useEffect } from "react";
  import { useDispatch } from "react-redux";
  import { setUser} from "./redux/slices/UserSlice";

  import { ToastContainer } from "react-toastify";


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

    return (

      <>
    
    <AppRoutes />;

         <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
        toastClassName="liora-toast"
        bodyClassName="liora-toast-body"
      />

</>
    )
  }

  export default App;


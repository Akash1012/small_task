import { Navigate } from "react-router-dom";

// 1 Create Private Routes

const PrivateRoute = ({ children }) => {
  const isAuth = localStorage.getItem("token");
  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return children;
};

<PrivateRoute>
  <Route path="/dashboard" component={Dashboard} />
</PrivateRoute>;

// 2 which hook used in redux

const { trips } = useSelector(() => state.data);
const dispatch = useDispatch();

<button onClick={() => dispatch(addCounter())}>Add</button>;

// 3 Root Reducer and create store

const rootReducer = combineReducers({
  data: dataReducer,
  trip: reducer,
});

export default rootReducer;
middlewares = [thunks];

createStore(rootReducer, applyMiddleware(...middlewares));

// 4. How to handle 404 route

<Route path"*" element={<NotFound/>}/>

// 5 Hooks from react router dom

useHistory: "Access the history instance without pulling it from props"
useParams: "Get the parameter passed on the URL without using the props object"
useLocation: "Return the location object that represents the current URL"
useRouteMatch: "Attempts to match the current URL in the same way that a <Route> would."
useNavigate: "Access the navigate function without pulling it from props" // old useHistory


// 6. How to implement  errorBoundries

class errorBoundries extends React.component{
    state = {
        hasError : false
    }
    static getDerivedStateFromError() {
        // This method is used to render a fallback UI after an error has been thrown.
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // This method is used to log error information.er.
        console.log(error, info);
    }

    render() {
        if(this.state.hasError) {
            return <div>SomeThing Went Wrong</div>
        }
        return this.props.children
    }
}

<errorBoundries><App/></errorBoundries>

// 7. code splitting in react
import { Suspense } from "react";

const OtherComp =  React.lazy(() =>  import('./component'))

<Suspense fallback={<div>Loading...</div>}>
    <OtherComp/>
</Suspense>

// 8. Write custom hooks

import { useEffect,useState } from "react";

const useFetchApi  = (url = "") => {
    const [data,setData] = useState([])
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(url).then((res) => res.json()).then((data) => {
            setData(data);
            setError(null)
        }).catch((error) => {
            setError(error);
            setData([])
        }).finally(() => setLoading(false))
    },[url])

    return {
        loading,error,data
    }
}


export default useFetchAPI  

const {data,loading,error} = useFetchAPI("url");

if(error) return <p>Error !</p>
if(loading) return <p>Loading...</p>
// to run data

import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter,Route,Switch } from "react-router-dom";
import {Link} from 'react-router-dom'
import { signout } from "./actions/userActions";
import CartScreen from "./screens/CartScreen";
import  HomeScreen  from "./screens/HomeScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductScreen from './screens/ProductScreen'
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddress from "./screens/ShippingAddress";
import SigninScreen from "./screens/SigninScreen";
function App() {
    const cart=useSelector(state=>state.cart)
    const  userSignin = useSelector(state => state.userSignin)
    const {userInfo}=userSignin;
    const {cartItems}=cart;
    const dispatch=useDispatch();
    const signoutHandler=()=>{
      // todo
        dispatch(signout());
    }
  return (
      <BrowserRouter>
    <div className="grid-container">
        <header className="row">
            <div>
                <Link className="brand" to="/">amazona</Link>
            </div>
            <div>
                <Link to="/cart">Cart
                {cartItems.length>0&&
                <span className="badge">{cartItems.length}</span>
                }
                </Link>
                
              { userInfo?
              
              (<div className="dropdown">
                <Link to="#">{userInfo.name}<i className="fa fa-caret-down"></i>{" "}</Link>
                <ul className="dropdown-content">
                <li>
                    <Link to='/profile'>User Profile</Link>
                  </li>
                  <li>
                    <Link to='/orderhistory'>OrderHistory</Link>
                  </li>
                 <li>
                 <Link to="/signin" onClick={signoutHandler}>Signout</Link>
                 </li>
                </ul>
              </div>
              )
              
              :
              
              <Link to="/signin">Sign In</Link>
                    
                }
                
                
                
              
               
               
            </div>
           
        </header>
        <main >
           <Switch>
            <Route path="/product/:id" component={ProductScreen}  ></Route>
            <Route path="/cart/:id?" component={CartScreen}  ></Route>
            <Route path="/placeorder" component={PlaceOrderScreen}  ></Route>
            <Route path="/order/:id" component={OrderScreen}  ></Route>
            <Route path="/shipping" component={ShippingAddress}  ></Route>
            <Route path="/orderHistory" component={OrderHistoryScreen}  ></Route>
            <Route path="/payment" component={PaymentMethodScreen}  ></Route>
            <Route path='/signin' component={SigninScreen}></Route>
            <Route path='/register' component={RegisterScreen}></Route>
             <Route path="/" component={HomeScreen} exact></Route>
             <Route path="/profile" component={ProfileScreen} exact></Route>
            </Switch>
           <div>
         
           </div>

        </main>
        <footer className="row center">
            <div>All Right Reserved
             
            </div>
           
        </footer>
    </div>
    </BrowserRouter>
    
    
  )
}

export default App;

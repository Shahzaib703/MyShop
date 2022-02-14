import { combineReducers, createStore } from "redux";
import { StoreRaduser,MassagesRaduser,OrdersRaduser } from "./Raduser/Radusers";

const Radeusers = combineReducers({ AllProducts: StoreRaduser,AllMassages: MassagesRaduser,AllOrders:OrdersRaduser });

const store = createStore(Radeusers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;

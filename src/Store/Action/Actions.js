import Actions from "./Constents";

function setAllProducts(payload) {
  return {
    type: Actions.ADD_ALL_DATA_TO_STORE,
    payload,
  };
}
function addProduct(payload) {
  return {
    type: Actions.ADD_PRODUCT_TO_STORE,
    payload,
  };
}

function AddMassage(payload) {
  return {
    type: Actions.ADD_MASSAGE_TO_STORE,
    payload,
  };
}

function RemoveMassage(payload) {
  return {
    type: Actions.REMOVE_MASSAGE_TO_STORE,
    payload,
  };
}

function RemoveAllMassage(payload) {
  return {
    type: Actions.REMOVE_All_MASSAGES_TO_STORE,
    payload,
  };
}

function AddOrder(payload) {
  return {
    type: Actions.ADD_ORDER_TO_STORE,
    payload,
  };
}

function RemoveOrder(payload) {
  return {
    type: Actions.REMOVE_ORDER_TO_STORE,
    payload,
  };
}

function RemoveAllOrder(payload) {
  return {
    type: Actions.REMOVE_ALL_ORDERS_TO_STORE,
    payload,
  };
}
export { setAllProducts, AddMassage, AddOrder, RemoveOrder, RemoveMassage,RemoveAllOrder,RemoveAllMassage,addProduct };

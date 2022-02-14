import Actions from "../Action/Constents";

const StoreRaduser = (state = [], { type, payload }) => {
  switch (type) {
    case Actions.ADD_ALL_DATA_TO_STORE:
      return payload;
      case Actions.ADD_PRODUCT_TO_STORE:
        return [...state,{...payload}]
    default:
      return state;
  }
};

const MassagesRaduser = (state = [], { type, payload }) => {
  switch (type) {
    case Actions.ADD_MASSAGE_TO_STORE:
      return [...state, { ...payload }];
    case Actions.REMOVE_MASSAGE_TO_STORE:
      return state.filter((MSG) => {
        return MSG.key !== payload.key;
      });
    case Actions.REMOVE_All_MASSAGES_TO_STORE:
      return [];
    default:
      return state;
  }
};

const OrdersRaduser = (state = [], { type, payload }) => {
  switch (type) {
    case Actions.ADD_ORDER_TO_STORE:
      return [...state, { ...payload }];
    case Actions.REMOVE_ORDER_TO_STORE:
      return state.filter((Order) => {
        return Order.key !== payload.key;
      });
    case Actions.REMOVE_ALL_ORDERS_TO_STORE:
      return [];
    default:
      return state;
  }
};

export { StoreRaduser, MassagesRaduser, OrdersRaduser };

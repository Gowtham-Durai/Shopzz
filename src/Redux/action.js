import Action from "./actionType";

export function loadProducts(product) {
  return {
    payload: product,
    type: Action.LOAD_PRODUCT,
  };
}

export function addProduct(product) {
  return {
    payload: product,
    type: Action.ADD_TO_CART,
  };
}

export function subtractProduct(product) {
  return {
    payload: product,
    type: Action.SUBTRACT_FROM_CART,
  };
}

export function deleteProduct(product) {
  return {
    payload: product,
    type: Action.DELETE_FROM_CART,
  };
}

export function checkout_cart() {
  return {
    type: Action.CHECK_OUT,
  };
}

export function filterProduct(filter) {
  return {
    payload: filter,
    type: Action.FILTER,
  };
}

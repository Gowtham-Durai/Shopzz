

import Action from "./actionType"


const initialState = {
    products:[],
    cart:[],
    cart_count:0,
    nextId:0,
    search:{},
    cart_total:0
}
export default function ProductReducer(state = initialState,action){
    switch(action.type){

        case Action.FILTER:
          return {
            ...state,search:action.payload
          }
     
        case Action.LOAD_PRODUCT:
            return {...state,
                    products:action.payload}
        case Action.ADD_TO_CART:{
                  const existingProductIndex = state.cart.findIndex(
                      (item) => item.product.id === action.payload.id
                    );
              
                    if (existingProductIndex !== -1) {
                    
                                  const updatedCart = [...state.cart];
                                          updatedCart[existingProductIndex] = {
                                                  ...updatedCart[existingProductIndex],
                                                  count: updatedCart[existingProductIndex].count + 1,
                                                      };
                          
                                  return {
                                  ...state,
                                  cart: updatedCart,
                                  cart_count: state.cart_count + 1, 
                      };
                    } else {
                    
                      return {
                        ...state,
                        cart: [...state.cart,
                                      {
                                      product: action.payload,
                                      count: 1,
                                      id: state.nextId, 
                                      },
                                  ],
                        cart_count: state.cart_count + 1, 
                        nextId: state.nextId + 1, 
                      };
                    }
                  }
        case Action.SUBTRACT_FROM_CART: {
                const existingProductIndex = state.cart.findIndex(
                        (item) => item.product.id === action.payload.id
                      );
                    
                      if (existingProductIndex !== -1) {
                        const updatedCart = [...state.cart];
                        const currentItem = updatedCart[existingProductIndex];
                    
                        
                        if (currentItem.count > 1) {
                          updatedCart[existingProductIndex] = {
                            ...currentItem,
                            count: currentItem.count - 1,
                          };
                    
                          return {
                            ...state,
                            cart: updatedCart,
                            cart_count: state.cart_count - 1, 
                          };
                        } else {
                      
                          updatedCart.splice(existingProductIndex, 1);
                    
                          return {
                            ...state,
                            cart: updatedCart,
                            cart_count: state.cart_count - 1, 
                          };
                        }
                      }
              
              
                return state;
              }
            
        case Action.DELETE_FROM_CART:{
                  
                const existingProductIndex = state.cart.findIndex(
                      (item) => item.product.id === action.payload.id);
                  
                if (existingProductIndex !== -1) {
                      console.log(existingProductIndex);
                      const cart_count = state.cart[existingProductIndex].count;
                      const updatedCart = [...state.cart];
                    
                      updatedCart.splice(existingProductIndex, 1);
                    
                      return {
                        ...state,
                        cart: updatedCart,
                        cart_count:state.cart_count-cart_count, 
                      };
                  
                      }
                      return state;
                }
      
        case Action.CHECK_OUT:
            return initialState;
        default:
                return state;
        
    }
}

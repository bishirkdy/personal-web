const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

export const updateCart = (state) => {
    state.totalPrice = addDecimals(
        state.items.reduce((sum , item) => sum + Number(item.offerPrice || 0 ) , 0)
    )
    state.itemCount = state.items.length
    console.log("item",state);
    
    localStorage.setItem("cart" , JSON.stringify(state))
    return state
    }
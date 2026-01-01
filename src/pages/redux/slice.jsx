import { createSlice } from "@reduxjs/toolkit";

const cartSlice= createSlice({
    name:'cart',
    initialState:[{items:[],newItemCount:0}],
    reducers:{
        addToCart(state,action){
            const newItem=action.payload;
            const existingItem=state.items.find(item=>item.id===newItem.id)
            state.ItemCount++;

            if (!existingItem){
                state.item.push({...newItem,quantity:1});
            }else{
                existingItem.quantity++;
            }


        }
    }
})
export const {addToCart}=cartSlice.actions;
export default cartSlice.reducer;
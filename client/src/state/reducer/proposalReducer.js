const  intialState = {
    
};
const ProposalReducer = (state =intialState, action)=>{
    let addState = action.payload;
    switch(action.type){
        
        case  "add_proposal" : 
        return {
            ...state,
            proposals:addState
        }
        default: return state;
    }
}
export  default ProposalReducer;
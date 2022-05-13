const intialState = {
    default: { name: "garv" }
};
const UserReducer = (state = intialState, action) => {
    let addState = action.payload;
    switch (action.type) {

        case "add":
            return {
                ...state,
                ...addState
            }
        case "update":
            let updateState = state;
            console.log(addState,"update state data")
            Object.keys(updateState).forEach(key=> {
                if(key === addState.filter){
                    updateState[key] = addState.data;
                }
            })
            return updateState;
            // console.log(updateState,"update state ")

        default: return state;
    }
}
export default UserReducer;
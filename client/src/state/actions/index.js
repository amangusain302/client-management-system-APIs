export const addState = (data)=>{
    console.log(data,"add state");
    return {
        type:"add",
        payload:data
    }
} 
export const updateState = (data)=>{
    console.log(data,"update state");
    return {
        type:"update",
        payload:data
    }
}
// export const  addProposalState = (data)=>{
//     return {
//         type:"addProposal",
//         payload:data
//     }
// }
// export const updateState = (data)=>{
//     return {
//         type:"update",
//         payload:data
//     }
// }

// export const deleteState = (data)=>{
//     return {
//         type:"delete",
//         payload:data
//     }
// }


const SearchReducer=(state,action)=>{
    switch (action.type) {
        case "Search_Reset":
          return {
            search:"",
          };
        case "Search_People":
          return {
            search:action.payload
        };
        default:
          return state;
      }   
};
export default SearchReducer;
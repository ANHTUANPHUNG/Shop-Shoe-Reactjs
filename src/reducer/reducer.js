export const initState ={
    productList:[],
    categoryList:[],
    priceList:[],
    colorList:[],
    companyList:[],
    filters:{
        searchText:'',
        recommended:'All',
        color:'All',
        category:'All',
        price:'0,0',
    }
}
export const reducer = (state,action) =>{
    switch (action.type) {
      case 'productList/fetchData':{
        return{
          ...state,
          productList: action.payload
          }
        }
      case 'priceList/fetchData':{
        return{
          ...state,
          priceList: action.payload
          }
        }
      case 'colorList/fetchData':{
        return{
          ...state,
          colorList: action.payload
          }
        }
      case 'companyList/fetchData':{
        return{
          ...state,
          companyList: action.payload
          }
        }
      case 'categoryList/fetchData':{
        return{
          ...state,
          categoryList: action.payload
          }
        }
        case 'filters/searchText':{
          return{
            ...state,
            filters:{
              ...state.filters,
              searchText:action.payload
            }
          }
        }
        case 'filters/searchCompany':{
          return{
            ...state,
            filters:{
              ...state.filters,
              recommended:action.payload
            }
          }
        }
        case 'filters/searchCategory':{
          return{
            ...state,
            filters:{
              ...state.filters,
              category:action.payload
            }
          }
        }
        case 'filters/searchColor':{
          return{
            ...state,
            filters:{
              ...state.filters,
              color:action.payload
            }
          }
        }
        case 'filters/searchPrice':{
          return{
            ...state,
            filters:{
              ...state.filters,
              price:action.payload
            }
          }
        }
        default:
            break;
    }
}
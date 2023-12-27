export const getProductList =(payload) =>{
    return{
        type:'productList/fetchData',
        payload:payload
    }
}
export const getCategory =(payload) =>{
    return{
        type:'categoryList/fetchData',
        payload:payload
    }
}
export const getCompany =(payload) =>{
    return{
        type:'companyList/fetchData',
        payload:payload
    }
}
export const getColor =(payload) =>{
    return{
        type:'colorList/fetchData',
        payload:payload
    }
}
export const getPrice =(payload) =>{
    return{
        type:'priceList/fetchData',
        payload:payload
    }
}

export const setSearchText =(payload) =>{
    return{
        type:'filters/searchText',
        payload:payload
    }
}
export const setSearchCompany =(payload) =>{
    return{
        type:'filters/searchCompany',
        payload:payload
    }
}
export const setSearchCategory =(payload) =>{
    return{
        type:'filters/searchCategory',
        payload:payload
    }
}
export const setSearchColor =(payload) =>{
    return{
        type:'filters/searchColor',
        payload:payload
    }
}
export const setSearchPrice =(payload) =>{
    return{
        type:'filters/searchPrice',
        payload:payload
    }
}
   
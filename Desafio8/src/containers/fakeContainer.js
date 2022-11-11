import userGenerator from "../others/userGenerator";
class FakeContainer {
    constructor() {}
    getProducts(quantity){
        const products = [];
        for(let i = 0; i<=quantity;i++){
            products.push(userGenerator());
        }
        return products;
    }
}


export default FakeContainer;
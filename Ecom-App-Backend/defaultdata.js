import Products from "./models/productsSchema"
import productdata from "./constant/productdata"

const DefaultData = async() => {
    try {
        await Products.deleteMany({});
        const storeData = await Products.insertMany(productdata);
    } catch (error) {
        console.log("error" + error.message);        
    }
};

export default DefaultData;
import query from "../database.js";

const createProduct = (
    productName,
    category,
    productDescription,
    productImage,
    price,
    quantityInstock
) => {
    return query(
        "INSERT INTO products (productName, category, productDescription, productImage, price, quantityInstock) " +
            "VALUES (?,?,?,?,?,?)",
        [
            productName,
            category,
            productDescription,
            productImage,
            price,
            quantityInstock,
        ]
    );
};

const getAllProducts = () => {
    return query("SELECT * FROM products ORDER BY productId Desc");
};

const getProductById = (productId) => {
    return query("SELECT * FROM products " + "WHERE productId=?", [productId]);
};
const getProductAndOrderSummary = () => {
    return query(
        "SELECT " +
            "(SELECT COUNT(productId)  from products) AS totalProducts, " +
            "(SELECT COUNT(userId) as totalUsers from users) AS totalUsers " +
            "FROM dual"
    );
};

const getProductBySearch = (productName, category) => {
    return query(
        "SELECT * FROM products " + "WHERE productName LIKE ? OR category=?",
        ["%" + productName + "%", category]
    );
};
// const getProductByName = (productName) => {
//   return query("SELECT * FROM products " +
//     "WHERE productName=?", [productName])
// }
// const getProductByCategory = (productCat) => {
//   return query("SELECT * FROM products " +
//     "WHERE category=?", [productCat])
// }
const updateProduct = (
    productId,
    productName,
    category,
    productDescription,
    productImage,
    price,
    quantityInstock
) => {
    return query(
        "UPDATE products " +
            "SET productName=?, category=?, productDescription=?, productImage=?, price=?, quantityInstock=? " +
            "WHERE productId=?",
        [
            productName,
            category,
            productDescription,
            productImage,
            price,
            quantityInstock,
            productId,
        ]
    );
};
const deleteProduct = (ProductId) => {
    return query("DELETE FROM products " + "WHERE productId=?", [ProductId]);
};

export default {
    createProduct,
    getAllProducts,
    getProductById,
    getProductBySearch,
    getProductAndOrderSummary,
    updateProduct,
    deleteProduct,
};

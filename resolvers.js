const { products, categories, reviews } = require("./dummyData");
const { v4: uuid } = require("uuid");
const resolvers = {
  Query: {
    products: (parent, { filter }, context) => {
      let filteredProducts = products;
      if (filter) {
        if (filter.onSale === true) {
          return (filteredProducts = filteredProducts.filter(
            (product) => product.onSale
          ));
        }
      }
      return filteredProducts;
    },
    product: (parent, args, context) => {
      const { id } = args;
      return products.find((product) => product.id === id);
    },
    categories: (parent, args, context) => categories,
    category: (parent, args, context) => {
      const { id } = args;
      return categories.find((category) => category.id === id);
    },
    reviews: (parent, args, context) => reviews,
    review: (parent, { id: reviewId }, context) => {
      return reviews.find((review) => review.id === reviewId);
    },
  },
  Category: {
    products: (parent, args, context) => {
      const categoryId = parent.id;
      return products.filter((product) => product.categoryId === categoryId);
    },
  },
  Product: {
    category: (parent, args, context) => {
      const categoryId = parent.categoryId;
      return categories.find((category) => category.id === categoryId);
    },
    review: (parent, args, context) => {
      const productId = parent.id;
      return reviews.filter((review) => review.productId === productId);
    },
  },
  Mutation: {
    addCategory: (parent, { input }, context) => {
      const { name } = input;
      const newCategory = {
        id: uuid(),
        name,
      };
      categories.push(newCategory);
      return newCategory;
    },
    addProduct: (parent, { input }, context) => {
      const { name, description, quantity, price, image, onSale, categoryId } =
        input;
      const newProduct = {
        id: uuid(),
        name,
        description,
        quantity,
        price,
        image,
        onSale,
        categoryId,
      };
      products.push(newProduct);
      return newProduct;
    },
  },
};

module.exports = resolvers;

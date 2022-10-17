const { products, categories, reviews } = require("./dummyData");

const resolvers = {
  Query: {
    products: (parent, args, context) => products,
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
};

module.exports = resolvers;

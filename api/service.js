const client = require("./client");

const sanitizeResponse = (response) => {
  if (response.error) {
    throw response;
  }
};

const author = {
  name: "Jorge",
  lastname: "Rangel",
};

const getItems = (query) => {
  return client.search(query).then((response) => {
    const categories =
      response.filters.length && response.filters[0].values
        ? response.filters[0].values[0].path_from_root.map((elem) => elem.name)
        : [];
    const items = response.results.map((item) => {
      const [amount, decimals] = item.price.toString().split(".");
      return {
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: parseInt(amount),
          decimals: parseInt(decimals),
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
      };
    });

    return {
      author,
      categories,
      items,
    };
  });
};

const getItem = (query) => {
  return client
    .getItem(query)
    .then((responses) => {
      responses.forEach((resp) => sanitizeResponse(resp));
      return responses;
    })
    .then((responses) => {
      const [item, description] = responses;
      const [amount, decimals] = item.price.toString().split(".");

      return {
        author,
        item: {
          id: item.id,
          title: item.title,
          price: {
            currency: item.currency_id,
            amount: parseInt(amount),
            decimals: parseInt(decimals),
          },
          picture: item.thumbnail,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping,
          sold_quantity: item.sold_quantity,
          description: description.plain_text,
        },
      };
    });
};

module.exports = {
  getItems,
  getItem,
};

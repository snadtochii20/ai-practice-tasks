function calculateDiscount(price, customerType) {
  if (price < 0) {
    throw new Error("Invalid price");
  }

  if (customerType === "vip") {
    return price * 0.8;
  }

  if (customerType === "regular") {
    return price * 0.95;
  }

  return price;
}

module.exports = { calculateDiscount };
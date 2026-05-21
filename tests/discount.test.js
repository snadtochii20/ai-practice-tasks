const { calculateDiscount } = require("../src/discount");

describe("calculateDiscount", () => {
  test("повертає знижку 20% для vip клієнта", () => {
    expect(calculateDiscount(100, "vip")).toBe(80);
  });

  test("повертає знижку 5% для regular клієнта", () => {
    expect(calculateDiscount(100, "regular")).toBe(95);
  });

  test("повертає ціну без знижки для невідомого типу клієнта", () => {
    expect(calculateDiscount(100, "guest")).toBe(100);
  });

  test("правильно обробляє граничний випадок price = 0", () => {
    expect(calculateDiscount(0, "vip")).toBe(0);
  });

  test("викидає помилку для від’ємної ціни", () => {
    expect(() => calculateDiscount(-10, "vip")).toThrow("Invalid price");
  });
});
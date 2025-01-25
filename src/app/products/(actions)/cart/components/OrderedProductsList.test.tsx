import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import OrderedProductsList from "./OrderedProductsList";
import { CartContext } from "@/app/context/CartContext";

const MOCKED_CART_ITEMS = new Map([
  [
    "1",
    {
      id: "1",
      name: "Item 1",
      quantity: 2,
      price: 100,
    },
  ],
  [
    "2",
    {
      id: "2",
      name: "Item 2",
      quantity: 3,
      price: 200,
    },
  ],
]);

describe("OrderedProductsList", () => {
  test("should render 'No items in cart' when cart is empty", () => {
    render(
      <CartContext>
        <OrderedProductsList />
      </CartContext>
    );

    expect(screen.getByText("No items in cart")).toBeTruthy();
  });

  test("should render product details when items are in the cart", () => {
    const { getByText } = render(
      <CartContext initialItems={MOCKED_CART_ITEMS}>
        <OrderedProductsList />
      </CartContext>
    );

    expect(getByText(/Item 1/)).toBeTruthy();
    expect(getByText(/Quantity: 2/)).toBeTruthy();
    expect(getByText(/Single item price: 100/)).toBeTruthy();
    expect(getByText(/Total price: 200/)).toBeTruthy();

    expect(getByText(/Item 2/)).toBeTruthy();
    expect(getByText(/Quantity: 3/)).toBeTruthy();
    expect(getByText(/Single item price: 200/)).toBeTruthy();
    expect(getByText(/Total price: 600/)).toBeTruthy();
  });
});

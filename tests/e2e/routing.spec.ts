import { test, expect } from "@playwright/test";

test.describe("Routing check", () => {
  test("Navigating through pages", async ({ page }) => {
    await page.goto("/");
    const buttons = await page.getByRole("link").all();
    expect(buttons).toHaveLength(9);

    const checkParts = page.getByRole("button", {
      name: "Check parts!",
    });

    await checkParts.click();
    await page.waitForURL("/parts");
    expect(page).toHaveURL("/parts");

    await (await page.getByRole("link", { name: "Go to part" }).all())
      .at(0)
      ?.click();

    expect(page.getByRole("heading", { name: "Part Info" })).toBeTruthy();

    await page.getByRole("link", { name: "Orders" }).click();
    await page.waitForURL("/orders");
    expect(page).toHaveURL("/orders");
  });
});

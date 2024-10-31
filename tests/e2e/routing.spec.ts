import { test, expect } from "@playwright/test";

test.describe("Routing check", () => {
  test("Navigating through pages", async ({ page }) => {
    await page.goto("/");
    const buttons = await page.getByRole("button").all();
    expect(buttons).toHaveLength(2);

    // const storageBtn = page.getByRole("button", {
    //   name: "Check storage state",
    // });
    // const homePageLink = page.getByRole("link", { name: "Home" });

    // await homePageLink.click();

    // await page.waitForURL("/");

    // expect(page).toHaveURL("/");

    // await storageBtn.click();
    // await page.waitForURL("/storage");
    // expect(page).toHaveURL("/storage");

    // await page.waitForSelector("canvas");

    // const graphs = await page.getByRole("img").all();

    // expect(graphs).toHaveLength(4);
  });
});

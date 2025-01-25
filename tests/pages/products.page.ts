import { Locator, Page } from "@playwright/test";
import { URLs } from "../utils/constants";

export class ProductsPage {
  private readonly page: Page;
  private readonly url = URLs.STORAGE_PAGE;
  readonly navigation: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navigation = page.getByRole("navigation");
  }

  async navigate() {
    return this.page.goto(this.url);
  }

  async getNavigation() {
    return this.navigation;
  }
}

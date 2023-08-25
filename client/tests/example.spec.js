// @ts-check
const { test, expect } = require("@playwright/test");

const BASE_URL = "http://localhost:5173/";
const ADRESS_OF_WALLET =
  "01577ff13eb5224486cdc4fbe977f9ecc8454402f7b96dfac5d51ff9b7647bf3";
const ADRESS_OF_RECIPIENT =
  "c8f5d5187d09c506a2edb31934ff25727f8105e37a995c0cd48f29fb64bd3fd3";

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});

test("Should get the wallet balance", async ({ page }) => {
  await page.getByLabel("Wallet Address").fill(ADRESS_OF_WALLET);
  await expect(page.getByText("100")).toBeVisible();
});

test("Should Transfer and amount of ETH to another wallet", async ({
  page,
  request,
}) => {
  const walletInput = page.getByLabel("Wallet Address");

  await walletInput.fill(ADRESS_OF_WALLET);
  await page.getByText("Transfer").click();
  await page.waitForURL("**/transfer");
  await page.waitForLoadState("load");

  await page.getByLabel("Send Amount").type("10");
  await page.getByLabel("Recipient").fill(ADRESS_OF_RECIPIENT);
  await page.getByRole("button", { name: "Transfer" }).click();

  const toast = page.locator('div[class*="c-toast__root"]').isVisible();

  await page.getByText("Wallet").click();
  await page.waitForURL("**/");

  await walletInput.dblclick();
  await walletInput.press("Delete");
  await walletInput.fill(ADRESS_OF_WALLET);
  await expect(page.getByText("90")).toBeVisible();
});

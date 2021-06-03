const { chromium } = require('playwright')

describe("Myrapname.com", () => {
  let browser
  let page

  beforeAll(async () => {
    browser = await chromium.launch({headless: false, slowMo: 50})
    page = await browser.newPage()

    if(!page) throw new Error("No Connection Established")

    await page.goto("https://www.myrapname.com", {
      waitUntil: "networkidle0"
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  it("should load myrapname.com", async () => {
    expect(page).not.toBeNull();
    expect(await page.title()).toBe('My Rap Name - A generator to automatically make rapper names')
  });
});

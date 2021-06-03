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

  it("should exist", async () => {
    await page.goto("https://www.myrapname.com");
  })
})
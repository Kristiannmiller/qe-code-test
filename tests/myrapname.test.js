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

  it("should display a form", async () => {
    expect(await page.click('form'))
  });

  it("should display buttons", async () => {
    expect(await page.click('text=Suggest Male Rap Name'))
    expect(await page.click('text=Suggest Female Rap Name'))
  });

  it("should display inputs", async () => {
    expect(await page.click('[name=firstname]'))
    expect(await page.click('[name=lastinitial]'))
    expect(await page.click('text=Use Nickname'))
  });

});

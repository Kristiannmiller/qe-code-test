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

  it("should display an error message if first name input is blank", async () => {
    await page.fill('[name=lastinitial]', 'M')
    await page.click('text=Suggest Male Rap Name')
    expect(await page.isVisible('text=You must enter your first name'))
  });

  it("should allow a user to modify input values", async () => {
    await page.fill('[name=firstname]', 'Kristi')
    await page.fill('[name=lastinitial]', 'A')

    expect(await page.innerText('[name=firstname]', 'Kristi'))
    expect(await page.innerText('[name=lastinitial]', 'A'))
    expect(await page.uncheck('[type=checkbox]')) // verify that checkbox is not checked?
  });

});

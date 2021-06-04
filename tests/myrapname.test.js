/* DEPENDENCIES */
const { chromium } = require('playwright')

describe("Myrapname.com", () => {
  /* VARIABLES */
  let browser
  let page

  /* SETUP */
  beforeAll(async () => {
    browser = await chromium.launch()
    page = await browser.newPage()

    if(!page) throw new Error("No Connection Established")

    await page.goto("https://www.myrapname.com", {
      waitUntil: "networkidle"
    });
  });

  /* CLEANUP */
  afterAll(async () => {
    await browser.close();
  });

  /* TESTS */
  // extra test - verifies correct page loads
  it("should load myrapname.com", async () => {
    expect(page).not.toBeNull();
    expect(await page.title()).toBe('My Rap Name - A generator to automatically make rapper names')
  });
  // tests that the form element is visible
  it("should display a form", async () => {
    const form = await page.isVisible('form')

    expect(form).toBeTruthy() // changed this from expect(await page.click('form')). Is this better?
  });
  // tests that the button elements are visible
  it("should display buttons", async () => {
    const maleSubmitButton = await page.isVisible('text=Suggest Male Rap Name')
    const femaleSubmitButton = await page.isVisible('text=Suggest Female Rap Name')

    expect(maleSubmitButton).toBeTruthy()
    expect(femaleSubmitButton).toBeTruthy()
  });
  // tests that the input elements are visible
  it("should display inputs", async () => {
    const firstName = await page.isVisible('[name=firstname]')
    const initial = await page.isVisible('[name=lastinitial]')
    const nickname = await page.isVisible('text=Use Nickname')

    expect(firstName).toBeTruthy()
    expect(initial).toBeTruthy()
    expect(nickname).toBeTruthy()
  });
  // tests that the error message is visible if first name input is blank
  it("should display an error message if first name input is empty", async () => {
    await page.fill('[name=lastinitial]', 'M')
    await page.click('text=Suggest Male Rap Name')

    expect(await page.isVisible('text=You must enter your first name'))
  });
  // tests that the form accepts a user's actions
  it("should allow a user to modify input values", async () => {
    await page.fill('[name=firstname]', 'Kristi')
    await page.fill('[name=lastinitial]', 'A')

    expect(await page.innerText('[name=firstname]', 'Kristi'))
    expect(await page.innerText('[name=lastinitial]', 'A'))
    expect(await page.uncheck('[type=checkbox]')) // verify that checkbox is not checked?
  });
  // tests that a new rap name is added after submit
  it("should allow a user to create a male rap name", async () => {
    await page.fill('[name=firstname]', 'Felix')
    await page.fill('[name=lastinitial]', 'F')
    await page.click('text=Suggest Male Rap Name')
    const result = await page.innerText("div:has(div:has(h1))")

    expect(await page.isVisible(`text=${result}`))
  });
    // tests that a new rap name is added after submit and all created rap names are visible
  it("should allow a user to create multiple female rap names and view previous names", async () => {
    const result = await page.innerText("div:has(div:has(h1))")
    await page.fill('[name=firstname]', 'Loretta')
    await page.fill('[name=lastinitial]', 'X')
    await page.click('text=Suggest Female Rap Name')
    const result1 = await page.innerText("div:has(div:has(h1))")

    expect(await page.isVisible(`text=${result1}`))

    await page.fill('[name=firstname]', 'Henrietta')
    await page.fill('[name=lastinitial]', 'P')
    await page.click('text=Suggest Female Rap Name')
    const result2 = await page.innerText("div:has(div:has(h1))")

    expect(await page.isVisible(`text=${result2}`))
    expect(await page.isVisible(`text=${result1}`))
    expect(await page.isVisible(`text=${result}`))
  });
});

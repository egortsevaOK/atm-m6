/* eslint-disable max-len */
const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('chai').assert;
const {expect} = require('chai');
let driver;

describe('Onliner catalog tests', async function() {
  this.timeout(30000);
  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });
  afterEach(async () => {
    await driver.quit();
  });
  it('should open order form', async function() {
    await driver.get('https://catalog.onliner.by/');
    const selectAppliances =  driver.findElement(By.css('[data-id=\'3\']'));
    await selectAppliances.click();
    const selectCleaning =  driver.findElement(By.xpath('//*[contains(text(),\'Уборка\')]'));
    const actions = driver.actions({async: true});
    await actions.move({origin: selectCleaning}).perform();
    const selectRobotVacuumCleaners = await driver.findElement(By.xpath('//*[contains(@class,\'catalog-navigation-list__aside-item_active\')]//span[contains(text(),\'Роботы-пылесосы\')]'));
    await selectRobotVacuumCleaners.click();
    const selectTypeFloor = await driver.findElement(By.xpath('//input[@value=\'floor\']/..'));
    await driver.executeScript('arguments[0].scrollIntoView();', selectTypeFloor);
    await selectTypeFloor.click();
    const selectRoborockProducer = driver.findElement(By.xpath('//ul[@class=\'schema-filter__list\']//input[@value=\'roborock\']/..'));
    await driver.executeScript('arguments[0].scrollIntoView();', selectRoborockProducer);
    await selectRoborockProducer.click();
    const goodsCounter = await driver.findElement(By.css('.schema-filter-button__state_control'));
    await driver.wait(until.elementTextContains(goodsCounter, 'Найдено'), 5000);
    const productsBtn = await driver.findElement(By.css('#schema-products .schema-product__group:first-of-type .schema-product__button.button.button_orange'));
    await productsBtn.click();
    const cityConfitmationElement = await driver.findElement(By.css('.offers-list__target'));
    await driver.executeScript('arguments[0].scrollIntoView();', cityConfitmationElement);
    const confirmationButton = driver.findElement(By.xpath('//span[contains(text(), "верно")]'));
    await driver.wait(until.elementIsVisible(confirmationButton), 5000);
    await confirmationButton.click();
    const buyNowButton = await driver.findElement(By.css('.offers-list__item:first-child .offers-list__control.offers-list__control_default.helpers_hide_tablet [href]'));
    await buyNowButton.click();
    await driver.wait(until.elementLocated(By.css('.cart-form__title_extended-alter')), 5000);
    const orderFormTitle = await driver.findElement(By.css('.cart-form__title_extended-alter'));
    assert.isTrue(await orderFormTitle.isDisplayed());
    expect(await orderFormTitle.getText()).to.include('Оформление заказа');
  });
});


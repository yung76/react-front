const { After, Before, AfterAll, setDefaultTimeout } = require('cucumber');
const { driver } = require('./web_driver');

//set default step timeout
setDefaultTimeout(120 * 1000);

Before(function() {
    //Before Scenario hook
});

After(async function() {
    //After Scenario Hook 
    //return driver.quit();
    await driver.manage().deleteAllCookies();
});

AfterAll(function() {
    //perform some shared teardown 
    return driver.quit();
});
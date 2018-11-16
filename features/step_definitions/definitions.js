const { Given, When, Then } = require('cucumber');
const assert = require('assert');
const { driver } = require('../support/web_driver');

Given(/^browser to web site "([^"]*)"$/, async function (url) {
    driver.get(url);
  });

When(/^search a jobs$/, async function () {
  //return 'pending';
  var titlejobs = driver.findElement({xpath: "//div[contains(@id,'role-directory')]//a[3]/div[2]" });
  titlejobs.getText().then(function(texttitle) {
    console.info(texttitle);
    assert.equal(texttitle,'Aseguramiento de la calidad, localización y servicio al cliente');
  });
});

Then(/^click in label quality assurance$/, async function () {
  var jobs = driver.findElement({xpath: "//div[contains(@id,'role-directory')]//a[3]/div[3]" });
  jobs.getText().then(function(text) {
    console.log(text);
  });
  jobs.click();
  driver.sleep(3000).then(function() {
    
  });
});

Then(/^looking for list details jobs$/, async function() {
  
  driver.getCurrentUrl().then(function(url) {
    console.info(url);
  });
});
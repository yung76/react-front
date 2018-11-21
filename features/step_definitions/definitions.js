const { Given, When, Then } = require('cucumber');
const assert = require('assert');
const { driver } = require('../support/web_driver');

Given(/^browser to web site "([^"]*)"$/, async function (url) {
    driver.get(url);
  });

When(/^search a jobs$/, async function () {
  var titlejobs = driver.findElement({xpath: "//div[@class='Table-column Table-headline Table-middle is-wrapped is-firstMobile']//div[contains (.,'Aseguramiento de la calidad, localización y servicio al cliente')]" });
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
});

Then(/^looking for list details jobs$/, async function() {
  check_list = driver.findElement({xpath: "//div[@class='Expandable-toggle is-active']/div[contains(.,'Quality')]"});
     check_list.getText().then(function(text) {
     console.info(text);
     assert.equal(text,'Quality Assurance');
   });

 var list_jobs = driver.findElements({xpath: "//div[contains(@data-group,'quality')]//div[contains(@class,'Table-column Table-headline is-wrapped is-firstMobile')]"});
 list_jobs.then(found => console.log('elements found? %s', !!found.leght));
});
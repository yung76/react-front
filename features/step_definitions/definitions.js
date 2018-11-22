const { Given, When, Then } = require('cucumber');
const assert = require('assert');
const { driver, By, until } = require('../support/web_driver');

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
  var jobs = driver.findElement(By.xpath("//div[contains(@id,'role-directory')]//a[3]/div[3]"));
  jobs.getText().then(function(text) {
    console.log(text);
  });

  jobs.click().then(function () {
    console.log("Cliked ")
  });

});

Then(/^looking for list details jobs$/, async function() {
    
  return driver.wait(until.elementLocated(By.xpath("//div[@class='Expandable-toggle is-active']")),130000).then(
    function(){
        var checl_list = driver.findElement(By.xpath("//div[@class='Expandable-toggle is-active']"));
        checl_list.getText().then(function(text) {
          console.log("encontre la lista");
          console.info(text);
        });

    });

  //     check_list.getText().then(function(text) {
  //     console.info(text);
  //     assert.equal(text,'Quality Assurance');
  //  });

 //var list_jobs = driver.findElements({xpath: "//div[contains(@data-group,'quality')]//div[contains(@class,'Table-column Table-headline is-wrapped is-firstMobile')]"});
 //list_jobs.then(found => console.log('elements found? %s', !!found.leght));
});
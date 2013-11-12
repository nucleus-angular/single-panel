module.exports = {
  name: 'single panel',

  'should only allow one single panel to be visible': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="expander1"] .handle')
      .assert.visible('[data-ut="expander1"] .content', 'single panel visible')
    .click('[data-ut="expander2"] .handle')
      .assert.visible('[data-ut="expander2"] .content', 'new single panel visible')
      .assert.notVisible('[data-ut="expander1"] .content', 'old single panel not visible')
    .done();
  },

  'should keeping the single panel open in clicking inside the content of the single panel': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="expander1"] .handle')
      .assert.visible('[data-ut="expander1"] .content', 'single panel visible')
    .click('[data-ut="expander1"] .content')
      .assert.visible('[data-ut="expander1"] .content', 'single panel still visible')
    .done();
  },

  'should hide single panel element when clicking outside of the content': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="expander1"] .handle')
      .assert.visible('[data-ut="expander1"] .content', 'single panel visible')
    .click('.home-page header:nth-child(1)')
      .assert.notVisible('[data-ut="expander1"] .content', 'single panel not visible')
    .done();
  }
}
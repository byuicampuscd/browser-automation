var casper = require('casper').create({
    verbose: true,
    logLevel: "debug"
})

var options = casper.cli.options,
    password = options.password,
    userName = options.userName

casper.start('https://secure.byui.edu/cas/login?entityId=https://byui.brightspace.com/shibboleth-sp&service=https://shib.byui.edu/idp/Authn/Cas', function () {
    casper.sendKeys('input#username.loginRequired', userName)
    casper.sendKeys('input#password.loginRequired', password)
})

casper.then(function () {

    this.click('input.btn-login')
    console.log('USER HAS BEEN LOGGED IN')
    this.capture('test.png')


}).then(function () {
    this.echo(this.getTitle())
}).run()

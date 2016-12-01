var casper = require('casper').create({
        verbose: true,
        logLevel: "debug"
    }),
    url = 'https://byui.brightspace.com/d2l/lms/importExport/export/export_select_components.d2l?ou=167864'

var options = casper.cli.options,
    password = options.password,
    userName = options.userName

casper.start('https://byui.brightspace.com/d2l/login?noredirect=true', function () {
    casper.sendKeys('input[name="userName"]', userName)
    casper.sendKeys('input[name="password"]', password)
})

casper.then(function () {
        this.capture('login.png')

    this.click('form a.vui-button')
    casper.thenOpen(url, function () {
        console.log('USER HAS BEEN LOGGED IN')
        this.capture('test.png')
    })

}).then(function () {
    this.click('input[name="includeContent"]')
}).then(function () {
    this.click('input[name="includeDiscuss"]')
}).then(function () {
    this.click('input[name="includeDropbox"]')
}).then(function () {
    this.click('input[name="includeGrades"]')
}).then(function () {
    this.click('input[name="includeQuizzes"]')
}).then(function () {
    this.click('input[name="includeRubrics"]')
}).then(function () {

    console.log("EVERYTHING HAS BEEN CLICKED")
    this.click("a.vui-button-primary")
    console.log("CONFIRM EXPORT SCREEN")
    this.capture('test2.png')
    this.click("a.vui-button-primary")
    this.capture('test3.png')

}).then(function () {
    this.echo(this.getTitle())
}).run()

var casper = require('casper').create(),
    url = 'https://byui.brightspace.com/d2l/lms/importExport/export/export_select_components.d2l?ou=167864'

var options = casper.cli.options,
    password = options.password,
    userName = options.userName

casper.start('https://byui.brightspace.com/d2l/login?noredirect=true', function () {
    casper.sendKeys('input[name="userName"]', userName)
    casper.sendKeys('input[name="password"]', password)
})

casper.then(function () {

    this.click('form a.vui-button')
    casper.thenOpen(url, function () {
        console.log('lets view the posts')
        this.capture('test.png')
    })

}).then(function () {
    this.click("input#z_i")
}).then(function () {
    this.click("input#z_e")
}).then(function () {
    this.click("input#z_m")
}).then(function () {
    this.click("input#z_q")
}).then(function () {
    this.click("input#z_u")
}).then(function () {
    this.click("input#z_y")
}).then(function () {

    this.click("#z_a")
    this.capture('test7.png')

}).then(function () {
    this.echo(this.getTitle())
}).run()

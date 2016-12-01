const prompt = require("prompt"),
    Browser = require('zombie'),
    courseURL = 'https://byui.brightspace.com/d2l/home/167864',
    schema = {
        properties: {
            name: {
                required: true
            },
            password: {
                hidden: true
            }
        }
    }

prompt.start()

prompt.get(schema, function (err, result) {

    var name = result.name,
        pass = result.password,
        browser = new Browser()

    browser.visit('https://byui.brightspace.com/d2l/login?noredirect=true', function (err) {

        browser
            .fill('input[name="userName"]', name)
            .fill('input[name="password"]', pass)

        browser
            .clickLink('Log In', function () {

                browser.visit(courseURL, function (err) {

                    var injectedScript = browser.document.createElement("script");
                    injectedScript.setAttribute("type", "text/javascript");
                    injectedScript.setAttribute("src", "http://code.jquery.com/jquery-1.11.0.min.js");

                    browser.body.appendChild(injectedScript);

                    console.log(browser.evaluate("$.getJSON('/d2l/api/lp/1.8/users/whoami', e => {console.log(e)})"));

                })

            })
    })

})
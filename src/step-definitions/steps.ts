import { Given, Then, When } from '@wdio/cucumber-framework';

import loginPage from '../pages/login.page';
import securePage from '../pages/secure.page';

const pages = {
    //login: loginPage
    //secure:securePage
}

Given(/^I am on the (\w+) page$/, async (page) => {
    //browser.url(`https://the-internet.herokuapp.com/
    await browser.url('https://the-internet.herokuapp.com/login');
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await loginPage.login(username, password)
});

Then(/^I should see a flash message saying (.*)$/, async (message) => {
    await expect(securePage.flashAlert).toBeExisting();
    await expect(securePage.flashAlert).toHaveTextContaining(message);
    browser.pause(3000);
});


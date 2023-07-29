import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'
import fs from 'fs';
import {startFlow} from 'lighthouse';
import open from 'open';

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        const puppeteerBrowser = await browser.getPuppeteer()
        const page = (await puppeteerBrowser.pages())[0];
        const flow = await startFlow(page);

        await LoginPage.open()
        await LoginPage.login('tomsmith', 'SuperSecretPassword!')

        await expect(SecurePage.flashAlert).toHaveTextContaining(
            'You logged into a secure area!')
        
        await flow.snapshot()
        const report = await flow.generateReport();
        fs.writeFileSync('flow-report.html', report);
        await open('flow-report.html', {wait: true});
    })
})


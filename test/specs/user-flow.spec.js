/**
 * test with page objects
 */
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'
import fs from 'fs';
import lighthouse from 'lighthouse';
import {startFlow} from 'lighthouse';
import open from 'open';
//import { startFlow } from 'lighthouse/core/user-flow.js'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {

        const puppeteerBrowser = await browser.getPuppeteer()
      //  const page = await puppeteerBrowser.newPage()

        const page = (await puppeteerBrowser.pages())[0];
     //  const page = await puppeteerBrowser.newPage();
   
        const flow = await startFlow(page, {name: 'Single Navigation'});
        await flow.navigate('https://web.dev/performance-scoring/');

        await browser.closeWindow()

        const report = await flow.generateReport();
        fs.writeFileSync('flow-report.html', report);
        await open('flow-report.html', {wait: false});

//         await browser.close();
// writeFileSync('report.html', await flow.generateReport());
        // await LoginPage.open()

        // await LoginPage.login('tomsmith', 'SuperSecretPassword!')


        // await expect(SecurePage.flashAlert).toBeExisting()
        // await expect(SecurePage.flashAlert).toHaveTextContaining(
        //     'You logged into a secure area!')
    })
})


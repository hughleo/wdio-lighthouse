import fs from 'fs';
import { startFlow } from 'lighthouse';
import open from 'open';

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        const puppeteerBrowser = await browser.getPuppeteer()

        const page = (await puppeteerBrowser.pages())[0];
   
        const flow = await startFlow(page);
        await flow.navigate('https://web.dev/performance-scoring/');

        await browser.closeWindow()

        const report = await flow.generateReport();
        fs.writeFileSync('flow-report.html', report);
        // await open('flow-report.html', {wait: true});
    })
})


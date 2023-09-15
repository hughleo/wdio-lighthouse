import fs from 'fs';
import { startFlow } from 'lighthouse';
import open from 'open';

describe('Lighthouse demo', () => {
    it('should perform timespan audit', async () => {
        const puppeteerBrowser = await browser.getPuppeteer()

        const page = (await puppeteerBrowser.pages())[0];

        const flow = await startFlow(page);
        await flow.navigate('https://qachallengeaccepted.com/', { name: 'Navigation only' });

        await flow.startTimespan({ name: 'Timespan'})
        await $('i.mobile-nav-toggle').click()
        await $('=Roadmap').click()
        await $('h2=Roadmap').waitForDisplayed()

        await flow.endTimespan()

        const report = await flow.generateReport();

        fs.writeFileSync('flow-report.html', report);
        await open('flow-report.html', {wait: true});
    })
})


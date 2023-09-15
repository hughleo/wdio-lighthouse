import fs from 'fs';
import { startFlow } from 'lighthouse';
import open from 'open';

describe('Lighthouse demo', () => {
    it('should perform navigation audit with warm cache', async () => {
        const puppeteerBrowser = await browser.getPuppeteer()
        const page = (await puppeteerBrowser.pages())[0];

        const flow = await startFlow(page);
        await flow.navigate('https://qachallengeaccepted.com/',
            {
                name: 'Warm navigation',
                configContext: {
                    settingsOverrides: { disableStorageReset: true }
                }
            });

        const report = await flow.generateReport();

        fs.writeFileSync('flow-report.html', report);
        await open('flow-report.html', { wait: true });
    })
})


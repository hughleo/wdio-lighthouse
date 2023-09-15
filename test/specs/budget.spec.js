import fs from 'fs';
import { startFlow } from 'lighthouse';
import open from 'open';

describe('Lighthouse demo', () => {
    it('should perform navigation with assertion', async () => {
        const puppeteerBrowser = await browser.getPuppeteer()

        const page = (await puppeteerBrowser.pages())[0];

        const flow = await startFlow(page);
        await flow.navigate('https://qachallengeaccepted.com/');

        const result = await flow.createFlowResult();

        const scores = {};
        const categories = result.steps[0].lhr.categories;
        for (let key in categories) {
            scores[key] = categories[key].score;
        }

        expect(scores.performance).toBeGreaterThanOrEqual(0.70)
    })
})


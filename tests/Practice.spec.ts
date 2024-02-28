import { test, expect } from '@playwright/test';

import {AxeBuilder} from '@axe-core/playwright';
import { createHtmlReport } from 'axe-html-reporter';
const fs = require('fs');
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('https://www.twitter.com/'); // 3
 
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4
    const reportHTML = createHtmlReport({
      results: accessibilityScanResults,
      options: {
        projectKey: "homepage"
      },
    });
 
    // if (!fs.existsSync("build/reports/accessibility-report.html")) {
    //   fs.mkdirSync("build/reports", {
    //     recursive: true,
    //   });
    // }
    // fs.writeFileSync("build/reports/accessibility-report.html", reportHTML);
    //expect(accessibilityScanResults.violations).toEqual([]); // 5
  });

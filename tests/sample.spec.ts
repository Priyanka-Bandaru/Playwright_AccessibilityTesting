import { test, expect } from '@playwright/test';

import { AxeBuilder } from '@axe-core/playwright';
const csvWriter = require('csv-writer');

test('Accessibility test and CSV report', async ({ page }) => {
  await page.goto('https://tutorialsninja.com/demo/');

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  // Define CSV headers
  const csvHeaders = [
    { id: 'id', title: 'Violation ID' },
    { id: 'impact', title: 'Impact Level' },
    { id: 'description', title: 'Description' },
    { id: 'nodes', title: 'Affected Nodes' },
  ];

  // Extract data from violations and format for CSV
  const csvData = accessibilityScanResults.violations.map(violation => ({
    id: violation.id,
    impact: violation.impact,
    description: violation.description,
    nodes: violation.nodes.length,
  }));

  // Configure and write CSV data
  const csvWriterOptions = {
    header: csvHeaders,
    path: 'accessibility_report.csv',
  };

  await csvWriter.default.writeRecords(csvData, csvWriterOptions)
    .then(() => console.log('CSV report generated successfully!'))
    .catch(error => console.error('Error writing CSV report:', error));

  expect(accessibilityScanResults.violations.length).toBe(0); // Check for no violations
});
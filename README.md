# Playwright E2E Test Automation Framework

This is a sample Playwright framework for testing [SauceDemo](https://www.saucedemo.com/) using Page Object Model (POM), test data externalization, logging, and environment configuration.

## Features

- Playwright with JavaScript
- Page Object Model (POM)
- Test data in JSON files
- Routes managed in `routes.js`
- Environment support via `.env`
- Logging to `logs/` folder
- Allure Reporting (optional setup)
- CI/CD Ready

## Project Structure
playwright-framework/
├── tests/
│ └── login.spec.js
├── pages/
│ ├── LoginPage.js
│ └── InventoryPage.js
├── data/
│ └── testData.json
├── utils/
│ └── logger.js
├── routes.js
├── .env
├── .gitignore
├── README.md
└── playwright.config.js

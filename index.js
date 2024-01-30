const puppeteer = require('puppeteer');
const express = require('express');
const morgan = require('morgan');
const app = express();

// Use morgan middleware for logging HTTP requests
app.use(morgan('dev'));

app.get('/generate-pdf', async (req, res) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const htmlContent = `
            <html>
                <head>
                    <title>PDF Content</title>
                </head>
                <body>
                    <h1>Hello, PDF!</h1>
                    <p>This is a sample PDF generated using Puppeteer, Node.js, and Express.</p>
                </body>
            </html>
        `;
        await page.setContent(htmlContent);

        await page.pdf({ path: 'result.pdf', format: 'A4' });
        await browser.close();

        res.send('PDF generated successfully');
    } catch (error) {
        res.status(500).send('Error generating PDF: ' + error);
    }
});

app.listen(5060, () => {
    console.log('Server is running on port 5060');
});

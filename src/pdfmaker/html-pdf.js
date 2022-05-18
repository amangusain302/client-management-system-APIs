const fs = require('fs')
const path = require('path')
const utils = require('util')
const puppeteer = require('puppeteer')
const hb = require('handlebars')
const readFile = utils.promisify(fs.readFile)




async function getTemplateHtml() {
    console.log("Loading template file in memory")
    try {
        const invoicePath = path.resolve("./src/pdfmaker/invoice12.html");
        return await readFile(invoicePath, 'utf8');
    } catch (err) {
        return Promise.reject(err);
    }
}

async function generatePdf(invoice_no) {
    let data = {
        status: false,
        message: "not created"
    };
    await getTemplateHtml().then(async (res) => {
        // Now we have the html code of our template in res object
        // you can check by logging it on console
        console.log("Compiing the template with handlebars")
        const template = hb.compile(res, { strict: true });
        // we have compile our code with handlebars
        const result = template(data);
        // We can use this to add dyamic data to our handlebas template at run time from database or API as per need. you can read the official doc to learn more https://handlebarsjs.com/
        const html = result;
        // we are using headless mode
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage()

        // We set the page content as the generatede html by handlebars
        let content_log = await page.setContent(html)
        console.log(content_log,'html  content logs');
        // We use pdf function to generate the pdf in the same folder as this file.
        let pdf_log = await page.pdf({ path: `invoices/invoice.pdf`, format: 'A4', printBackground: true })
        console.log(pdf_log,'pdf creation logs');
        await browser.close();
        fs.rename('invoices/invoice.pdf', `invoices/${invoice_no}.pdf`, (error) => {
            if (error) {

                // Show the error 
                console.log(error);
            }
        });
        console.log("PDF Generated")
        console.log(pdf_log,'pdf creation logs');
        // return { status: true, message: "pdf Created", };
        data.status = true;
        data.message = "created";
    }).catch(err => {
        console.error(err)
    });
    return data;
}
module.exports = generatePdf;
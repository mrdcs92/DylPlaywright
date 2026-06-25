const { test, expect } = require('@playwright/test');
const ExcelJs = require('exceljs');


async function excelTest(searchText, replaceText, change, excelFilePath) {


    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(excelFilePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);

    const cell = worksheet.getCell(output.row, output.column + change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(excelFilePath);
}

async function readExcel(worksheet, searchText) {

    let output = { row: -1, column: -1 }
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            //console.log(cell.value);
            if (cell.value == searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        })
    })

    return output;

}

test("Upload download excel validation", async ({ page }) => {

    const textSearch = "Mango";
    const updateValue = '350';

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    await downloadPromise;
    const download = await downloadPromise;
    await download.saveAs("C:/Users/mrdcs/Downloads/download.xlsx");

    excelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, "C:/Users/mrdcs/Downloads/download.xlsx");

    await page.locator("#fileinput").click();

    await page.locator("#fileinput").setInputFiles("C:/Users/mrdcs/Downloads/download.xlsx");

    const textLocator = page.getByText(textSearch);

    const desiredRow = await page.getByRole("row").filter({has: textLocator});
    expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
})
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

excelTest("banana", 350, {rowChange: 0, colChange:2 }, "excelFiles/excelTest.xlsx");
import {test as baseTest} from '@playwright/test';

interface testDataForOrder {
    username: string;
    password: string;
    productName: string;
}

export const customTest = baseTest.extend<{testDataForOrder:testDataForOrder}>(
    {
        testDataForOrder: {
            username: "misterdcs92@gmail.com",
            password: "1999222dst!taN1999222",
            productName: "ZARA COAT 3"
        }
    }
)
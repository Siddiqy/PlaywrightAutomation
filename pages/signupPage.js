import { expect } from "@playwright/test";
import BasePage from "./basePage";
import {baseUrl} from "../config"
import {
    emailFld,
    firstNameFld,
    lastNameFld,
    companyNameFld,
    storeNameFld,
    warningMsg,
    getSartedBtn,
    PasswordPage,
    passwordFld,
    nextBtn,
    shopifyPage,
    skipBtn,
    pageTitle,
    firstName,
    lastName,
    companyName,
    invStoreName,
    password,
} from "../pageobjects/signup"

class SignUpPage extends BasePage {
    constructor(page) {
        super(page)
    }

    async goToWebsite() {
        await super.open(baseUrl)
        return await super.waitForPageLoad()
    }

    async verifyPageTitle() {
        const title = await this.page.title()
        return expect(title).toBe(pageTitle)
    }

    async validSignUp(emailId, storeName) {
        await this.findAndFill(emailFld, emailId)
        await this.findAndFill(firstNameFld, firstName)
        await this.findAndFill(lastNameFld, lastName)
        await this.findAndFill(companyNameFld, companyName)
        await this.findAndFill(storeNameFld, storeName)
        await this.findAndClick(getSartedBtn)    
    }

    async verifyDuplicateAccount() {
        const warningMsgLoc = await this.page.getByText(warningMsg)
        return expect(warningMsgLoc).toHaveText('An account with this email already exists');
    }

    async verifyInvStoreName() {
        const storeValue = await this.page.locator("input[title='A valid store URL']").inputValue()
        return expect(storeValue).not.toEqual(expect.stringMatching(/^[^\s.]+(\.[^\s.]+)+$/))
    }
    
    async verifyCreatePasswordPage() {
        const passwordPageLoc = await this.page.getByText(PasswordPage)
        return expect(passwordPageLoc).toHaveText('Create Password');
    }

    async setNewPassword() {
        await this.findAndFill(passwordFld, password)
        await this.findAndClick(nextBtn)
    }

    async verifyConnectShopifyPage() {
        const shopifyPageLoc = await this.page.getByText(shopifyPage)
        return expect(shopifyPageLoc).toHaveText('Install Shopify');
    }

    async verifySuccessLogin() {
        await this.findAndClick(skipBtn)
        await this.waitForPageLoad()
    }
}

export default SignUpPage
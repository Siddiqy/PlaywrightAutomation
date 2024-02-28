import { test, expect } from '@playwright/test';
import SignUpPage from '../pages/signupPage';
import { emailId, usedEmail, storeEmail, storeName, invStoreName } from '../pageobjects/signup';

test('Verify the website signup page', async ({ page }) => {
    const signUpPage = new SignUpPage(page)
    await signUpPage.goToWebsite();
    await signUpPage.verifyPageTitle();
});

test('Verify successfully create an account', async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.goToWebsite();
    await signUpPage.validSignUp(emailId, storeName);
    await signUpPage.verifyCreatePasswordPage();
    await signUpPage.setNewPassword();
    await signUpPage.verifyConnectShopifyPage();
    await signUpPage.verifySuccessLogin()
});

test('Verify ensure duplicate account creation is prevented', async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.goToWebsite();
    await signUpPage.validSignUp(usedEmail, storeName);
    await signUpPage.verifyDuplicateAccount();
});

test('Verify that its not possible to link a Shopify store with an invalid store domain', async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.goToWebsite();
    await signUpPage.validSignUp(storeEmail, invStoreName);
    await signUpPage.verifyInvStoreName();
});
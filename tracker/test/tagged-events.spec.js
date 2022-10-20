const { test } = require('./support/harness')
const { mockRequest, mockManyRequests, isMac, expectCustomEvent } = require('./support/test-utils')
const { expect } = require('@playwright/test')

test.describe('tagged-events extension', () => {
    test('tracks a tagged link click with custom props + url prop', async ({ page }) => {
        await page.goto('/tagged-event.html')

        const linkURL = await page.locator('#link').getAttribute('href')

        const plausibleRequestMock = mockRequest(page, '/api/event')
        await page.click('#link')
        expectCustomEvent(await plausibleRequestMock, 'Payment Complete', { amount: '100', method: "Credit Card", url: linkURL })
    });

    test('tracks a tagged form submit with custom props and ignores plausible-event-url class', async ({ page }) => {
        await page.goto('/tagged-event.html')
        const plausibleRequestMock = mockRequest(page, '/api/event')
        await page.click('#form-submit')
        expectCustomEvent(await plausibleRequestMock, 'Signup', { type: "Newsletter" })
    });

    test('tracks click and auxclick on any tagged HTML element', async ({ page }, workerInfo) => {
        await page.goto('/tagged-event.html')

        const plausibleRequestMockList = mockManyRequests(page, '/api/event', 3)

        await page.click('#button')
        await page.click('#span')
        await page.click('#div', { modifiers: [isMac(workerInfo) ? 'Meta' : 'Control'] })

        const requests = await plausibleRequestMockList
        expect(requests.length).toBe(3)
        requests.forEach(request => expectCustomEvent(request, 'Custom Event', { foo: "bar" }))
    });

    test('does not track elements without plausible-event-name class + link elements navigate', async ({ page }) => {
        await page.goto('/tagged-event.html')
        const linkLocator = page.locator('#not-tracked-link')

        const linkURL = await linkLocator.getAttribute('href')

        const plausibleRequestMock = mockRequest(page, '/api/event')
        const navigationRequestMock = mockRequest(page, linkURL)

        await page.click('#not-tracked-button')
        await page.click('#not-tracked-span')
        await linkLocator.click()

        expect(await plausibleRequestMock, "should not have made Plausible request").toBeNull()
        expect((await navigationRequestMock).url()).toContain(linkURL)
    });

    test('tracks tagged HTML elements when their child element is clicked', async ({ page }, workerInfo) => {
        await page.goto('/tagged-event.html')

        const plausibleRequestMockList = mockManyRequests(page, '/api/event', 2)

        await page.click('#div-child')
        await page.click('#link-child', { modifiers: [isMac(workerInfo) ? 'Meta' : 'Control'] })

        const requests = await plausibleRequestMockList
        expect(requests.length).toBe(2)
        requests.forEach(request => expectCustomEvent(request, 'Custom Event', { foo: "bar" }))
    });
});

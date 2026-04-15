import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test('Homepage should pass axe accessibility checks', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .exclude('#google-analytics') // Exclude third-party scripts
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Sprint page should pass axe accessibility checks', async ({ page }) => {
    await page.goto('/sprint-claridad-comercial');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .exclude('#google-analytics')
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Team page should pass axe accessibility checks', async ({ page }) => {
    await page.goto('/equipo');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .exclude('#google-analytics')
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Navigation should be keyboard accessible', async ({ page }) => {
    await page.goto('/');
    
    // Test keyboard navigation through main menu
    await page.keyboard.press('Tab'); // Should focus on skip link or first focusable element
    await page.keyboard.press('Tab'); // Navigate to next element
    
    // Check if focus is visible
    const focusedElement = await page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('Color contrast should meet WCAG AA standards', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .analyze();

    // Filter for color contrast violations
    const contrastViolations = accessibilityScanResults.violations.filter(
      violation => violation.id === 'color-contrast'
    );

    expect(contrastViolations).toEqual([]);
  });

  test('All images should have alt text', async ({ page }) => {
    await page.goto('/');
    
    const images = await page.locator('img').all();
    
    for (const image of images) {
      const alt = await image.getAttribute('alt');
      const ariaLabel = await image.getAttribute('aria-label');
      const ariaLabelledBy = await image.getAttribute('aria-labelledby');
      const role = await image.getAttribute('role');
      
      // Image should have alt text or be marked as decorative
      expect(
        alt !== null || 
        ariaLabel !== null || 
        ariaLabelledBy !== null || 
        role === 'presentation' || 
        role === 'none'
      ).toBe(true);
    }
  });

  test('Focus should be trapped in mobile menu when open', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // Mobile viewport
    await page.goto('/');
    
    // Open mobile menu
    const menuButton = page.locator('[aria-label="Toggle menu"]');
    await menuButton.click();
    
    // Check if menu is open
    const mobileMenu = page.locator('.lg\\:hidden [role="menu"], .lg\\:hidden nav');
    await expect(mobileMenu).toBeVisible();
    
    // Test keyboard navigation within menu
    await page.keyboard.press('Tab');
    const focusedElement = await page.locator(':focus');
    
    // Focused element should be within the mobile menu
    const isWithinMenu = await focusedElement.isVisible();
    expect(isWithinMenu).toBe(true);
  });

  test('ARIA landmarks should be present', async ({ page }) => {
    await page.goto('/');
    
    // Check for required landmarks
    const main = page.locator('main, [role="main"]');
    await expect(main).toBeVisible();
    
    const nav = page.locator('nav, [role="navigation"]');
    await expect(nav).toBeVisible();
    
    const footer = page.locator('footer, [role="contentinfo"]');
    await expect(footer).toBeVisible();
  });

  test('Form controls should have associated labels', async ({ page }) => {
    await page.goto('/');
    
    const inputs = await page.locator('input, textarea, select').all();
    
    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        const hasLabel = await label.count() > 0;
        
        expect(
          hasLabel || 
          ariaLabel !== null || 
          ariaLabelledBy !== null
        ).toBe(true);
      }
    }
  });

  test('Headings should follow proper hierarchy', async ({ page }) => {
    await page.goto('/');
    
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    const headingLevels: number[] = [];
    
    for (const heading of headings) {
      const tagName = await heading.evaluate(el => el.tagName.toLowerCase());
      const level = parseInt(tagName.charAt(1));
      headingLevels.push(level);
    }
    
    // Check heading hierarchy
    let previousLevel = 0;
    for (const level of headingLevels) {
      if (previousLevel === 0) {
        // First heading should be h1
        expect(level).toBe(1);
      } else {
        // Subsequent headings should not skip levels
        expect(level - previousLevel).toBeLessThanOrEqual(1);
      }
      previousLevel = level;
    }
  });
});
/**
 * Color Contrast Checker for WCAG AA Compliance
 * Checks the color combinations used in the design system
 */

// Convert HSL to RGB
function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return [r, g, b];
}

// Calculate relative luminance
function getLuminance(r, g, b) {
  const rsRGB = r / 255;
  const gsRGB = g / 255;
  const bsRGB = b / 255;

  const R = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const G = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const B = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

// Calculate contrast ratio
function getContrastRatio(luminance1, luminance2) {
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Parse HSL string like "221.2 83.2% 53.3%"
function parseHSL(hslString) {
  const parts = hslString.trim().split(/\s+/);
  return {
    h: parseFloat(parts[0]),
    s: parseFloat(parts[1].replace('%', '')),
    l: parseFloat(parts[2].replace('%', ''))
  };
}

// Color palette from CSS variables
const colors = {
  // Light mode
  background: "0 0% 100%",           // White
  foreground: "222.2 84% 4.9%",     // Very dark blue
  primary: "221.2 83.2% 53.3%",     // Blue
  "primary-foreground": "210 40% 98%", // Nearly white
  secondary: "210 40% 96.1%",       // Light gray
  "secondary-foreground": "222.2 47.4% 11.2%", // Dark blue
  muted: "210 40% 96.1%",           // Light gray
  "muted-foreground": "215.4 16.3% 40.9%", // Medium gray (updated for AA compliance)
  destructive: "0 84.2% 50.2%",     // Red (updated for AA compliance)
  "destructive-foreground": "0 0% 100%", // Pure white
};

function checkContrastRatio(color1HSL, color2HSL, name1, name2) {
  const hsl1 = parseHSL(color1HSL);
  const hsl2 = parseHSL(color2HSL);
  
  const [r1, g1, b1] = hslToRgb(hsl1.h, hsl1.s, hsl1.l);
  const [r2, g2, b2] = hslToRgb(hsl2.h, hsl2.s, hsl2.l);
  
  const luminance1 = getLuminance(r1, g1, b1);
  const luminance2 = getLuminance(r2, g2, b2);
  
  const contrast = getContrastRatio(luminance1, luminance2);
  
  const passAA = contrast >= 4.5;
  const passAALarge = contrast >= 3.0;
  const passAAA = contrast >= 7.0;
  
  return {
    combination: `${name1} on ${name2}`,
    contrast: contrast.toFixed(2),
    passAA,
    passAALarge,
    passAAA,
    status: passAA ? '✅ PASS' : '❌ FAIL'
  };
}

function runContrastCheck() {
  console.log('🎨 Color Contrast Audit for WCAG AA Compliance\n');
  
  const combinations = [
    // Primary text combinations
    { fg: 'foreground', bg: 'background', desc: 'Main text on background' },
    { fg: 'primary-foreground', bg: 'primary', desc: 'Primary button text' },
    { fg: 'secondary-foreground', bg: 'secondary', desc: 'Secondary button text' },
    { fg: 'muted-foreground', bg: 'background', desc: 'Muted text on background' },
    { fg: 'muted-foreground', bg: 'muted', desc: 'Muted text on muted background' },
    { fg: 'destructive-foreground', bg: 'destructive', desc: 'Error button text' },
    
    // Interactive elements
    { fg: 'primary', bg: 'background', desc: 'Primary color on background (links, etc.)' },
    { fg: 'destructive', bg: 'background', desc: 'Error color on background' },
  ];
  
  const results = [];
  
  combinations.forEach(({ fg, bg, desc }) => {
    if (colors[fg] && colors[bg]) {
      const result = checkContrastRatio(colors[fg], colors[bg], fg, bg);
      result.description = desc;
      results.push(result);
      
      console.log(`${result.status} ${result.description}`);
      console.log(`   Contrast: ${result.contrast}:1`);
      console.log(`   AA: ${result.passAA ? '✅' : '❌'} | AA Large: ${result.passAALarge ? '✅' : '❌'} | AAA: ${result.passAAA ? '✅' : '❌'}`);
      console.log('');
    }
  });
  
  const failedChecks = results.filter(r => !r.passAA);
  
  console.log('\n📊 Summary:');
  console.log(`Total combinations checked: ${results.length}`);
  console.log(`Passed AA: ${results.length - failedChecks.length}`);
  console.log(`Failed AA: ${failedChecks.length}`);
  
  if (failedChecks.length > 0) {
    console.log('\n❌ Failed combinations that need attention:');
    failedChecks.forEach(check => {
      console.log(`   - ${check.description} (${check.contrast}:1)`);
    });
  } else {
    console.log('\n🎉 All color combinations pass WCAG AA standards!');
  }
  
  return results;
}

if (require.main === module) {
  runContrastCheck();
}

module.exports = { runContrastCheck, checkContrastRatio };
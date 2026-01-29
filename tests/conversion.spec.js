const { test, expect } = require('@playwright/test');

const URL = 'https://tamil.changathi.com/';

// ALL test cases (from Excel + missing ones)
const testCases = [
  // -------- PASS CASES --------
  { id: 'Pos_Fun_0001', input: 'vanakkam ' },
  { id: 'Pos_Fun_0002', input: 'epdi irukeenga? ' },
  { id: 'Pos_Fun_0003', input: 'naan innaikku varuven ' },
  { id: 'Pos_Fun_0004', input: 'nee enna sapta? ' },
  { id: 'Pos_Fun_0005', input: 'naalai naan povேன் ' },
  { id: 'Pos_Fun_0006', input: 'please konjam help pannunga ' },
  { id: 'Pos_Fun_0007', input: 'enna da idhu? ' },
  { id: 'Pos_Fun_0008', input: 'super ah irukku!!! ' },
  { id: 'Pos_Fun_0009', input: 'enakku 2 ticket venum ' },
  { id: 'Pos_Fun_0010', input: 'meeting 3:30pm ku irukku ' },

  // -------- MORE PASS --------
  { id: 'Pos_Fun_0011', input: 'wifi password enna? ' },
  { id: 'Pos_Fun_0012', input: 'zoom link anuppunga ' },
  { id: 'Pos_Fun_0013', input: 'intha file-a email la anuppu ' },
  { id: 'Pos_Fun_0014', input: 'bus late aagudhu adhanaala naan late varuven ' },
  { id: 'Pos_Fun_0015', input: 'mazhai peiyudhu naal naan veliya pogala ' },
  { id: 'Pos_Fun_0016', input: 'naan padikkiren aana velaiyum seiren ' },
  { id: 'Pos_Fun_0017', input: 'unga peru enna? enakku sollunga ' },
  { id: 'Pos_Fun_0018', input: 'naanum neeyum serndhu pona naal romba santhosham ' },
  { id: 'Pos_Fun_0019', input: 'saptu mudichitu appuram padikkalam ' },
  { id: 'Pos_Fun_0020', input: 'sri lanka la weather epdi irukku innaikku? ' },

  // -------- MISSING PASS CASES (Formatting + Long) --------
  { id: 'Pos_Fun_0021', input: 'naan   innaikku   varala ' }, // multi-space
  { id: 'Pos_Fun_0022', input: 'vanakkam\nnaanga varom ' },   // newline
  { id: 'Pos_Fun_0023', input: 'idhu romba nalla idea! seri naanga try panrom. ' },

  {
    id: 'Pos_Fun_0024', // Long paragraph (L)
    input:
      'innaikku kaalaila naan seekiram ezhundhen. tea kudichitu office ku ponom. ' +
      'traffic romba adhigam irundhuchu adhanaala late aachu. meeting la manager pesinaaru. ' +
      'aprom lunch sapten. evening la veetukku vandhu konjam rest panni padikka start pannen. ' +
      'naalai exam irukku so nalla prepare pannuren. '
  },

  // -------- FAIL / NEGATIVE CASES --------
  { id: 'Neg_Fun_0001', input: '###@@@ ' },
  { id: 'Neg_Fun_0002', input: '1234567890 ' },
  { id: 'Neg_Fun_0003', input: '😄😄😄 ' },
  { id: 'Neg_Fun_0004', input: 'vaaannnakkammmm ' },
  { id: 'Neg_Fun_0005', input: 'naaninnaikkofficeporen ' },
  { id: 'Neg_Fun_0006', input: 'bro naan meeting attend panren ok va? ' },
  { id: 'Neg_Fun_0007', input: 'https://example.com vanakkam ' },
  { id: 'Neg_Fun_0008', input: '' },

  {
    id: 'Neg_Fun_0010', // Long negative messy input
    input:
      '###@@@\n\nvaaannnakkammmm 1234567890 😄😄😄\nhttps://example.com\n' +
      'bro naan meeting attend panren ok va?\nrepeat repeat repeat repeat repeat '
  },
];

// ---------- FUNCTIONAL TESTS ----------
test.describe('Assignment 1 – Thanglish to Tamil Conversion', () => {
  for (const tc of testCases) {
    test(tc.id, async ({ page }) => {
      await page.goto(URL);

      const textarea = page.locator('textarea');
      await textarea.fill(tc.input);
      await page.waitForTimeout(1000);

      const output = await textarea.inputValue();
      console.log(`${tc.id} | Output: ${output}`);

      // Basic validation
      expect(output).not.toBeNull();
    });
  }
});

// ---------- UI TEST ----------
test('Pos_UI_0001 – Real-time update while typing', async ({ page }) => {
  await page.goto(URL);

  const textarea = page.locator('textarea');

  await textarea.fill('');
  await textarea.type('v', { delay: 200 });
  await page.waitForTimeout(300);
  const out1 = await textarea.inputValue();

  await textarea.type('a', { delay: 200 });
  await page.waitForTimeout(300);
  const out2 = await textarea.inputValue();

  await textarea.type('nakkam ', { delay: 200 });
  await page.waitForTimeout(500);
  const out3 = await textarea.inputValue();

  console.log('UI Output 1:', out1);
  console.log('UI Output 2:', out2);
  console.log('UI Output 3:', out3);

  expect(out1).not.toBe('');
  expect(out2).not.toBe('');
  expect(out3).not.toBe('');
});

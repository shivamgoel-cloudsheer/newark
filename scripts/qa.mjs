// QA driver: navigation check, console errors, screenshots of all key pages.
import { chromium } from 'playwright'
import { mkdirSync } from 'fs'

const BASE = 'http://localhost:4173'
const OUT = 'scripts/shots'
mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

const errors = []
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(`[console.error] ${m.text()}`)
})
page.on('pageerror', (e) => errors.push(`[pageerror] ${e.message}`))

async function shot(name, fullPage = false) {
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage })
}

await page.goto(BASE + '/', { waitUntil: 'networkidle' })
await shot('00-gallery')

// client-side nav check
await page.click('a[href="/ember"]')
await page.waitForTimeout(1500)
await shot('01-nav-click-check')

for (const v of ['ember', 'aegis', 'pulse']) {
  await page.goto(`${BASE}/${v}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1600)
  await shot(`10-${v}-hero`)
  await page.evaluate(() => window.scrollBy(0, 1600))
  await page.waitForTimeout(900)
  await shot(`11-${v}-mid`)
  await page.evaluate(() => window.scrollBy(0, 2200))
  await page.waitForTimeout(900)
  await shot(`12-${v}-lower`)
}

// game: place heads and run
await page.goto(`${BASE}/pulse/game`, { waitUntil: 'networkidle' })
await page.waitForTimeout(1200)
await shot('20-game-plan')
await page.click('text=✨ Pro layout')
await page.waitForTimeout(400)
await shot('21-game-placed')
await page.click('text=Start the fire')
await page.waitForTimeout(3200) // countdown + ignition
await shot('22-game-burning')
await page.waitForTimeout(5000)
await shot('23-game-mid')
// fast-forward to results
try {
  await page.click('text=3× speed', { timeout: 2000 })
} catch {}
await page.waitForTimeout(16000)
await shot('24-game-result')

// services + chat
await page.goto(`${BASE}/aegis/services`, { waitUntil: 'networkidle' })
await page.waitForTimeout(1200)
await shot('30-services')
await page.click('button[aria-label="Open chat"]')
await page.waitForTimeout(600)
await shot('31-chat')

console.log('\n=== ERRORS ===')
console.log(errors.length ? errors.join('\n') : '(none)')
await browser.close()

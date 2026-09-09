import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })

await page.goto('http://localhost:5188/')

// Wait for intro animation to complete
await page.waitForTimeout(3000)

// Screenshot of the top (intro)
await page.screenshot({ path: 'C:/Users/Nahu/AppData/Local/Temp/opencode/v-01-intro.png' })

// Scroll to #first
await page.evaluate(() => {
  document.querySelector('#first').scrollIntoView({ behavior: 'instant', block: 'start' })
  window.scrollBy(0, -100)
})
await page.waitForTimeout(1500)
await page.screenshot({ path: 'C:/Users/Nahu/AppData/Local/Temp/opencode/v-02-first.png' })

// Scroll to #features
await page.evaluate(() => {
  document.querySelector('#features').scrollIntoView({ behavior: 'instant', block: 'start' })
  window.scrollBy(0, -100)
})
await page.waitForTimeout(1500)
await page.screenshot({ path: 'C:/Users/Nahu/AppData/Local/Temp/opencode/v-03-features.png' })

// Scroll to first video panel
await page.evaluate(() => {
  document.querySelectorAll('.video-panel')[0]?.scrollIntoView({ behavior: 'instant', block: 'start' })
})
await page.waitForTimeout(2000)
await page.screenshot({ path: 'C:/Users/Nahu/AppData/Local/Temp/opencode/v-04-videopanel1.png' })

// Scroll to #galeria
await page.evaluate(() => {
  document.querySelector('#galeria').scrollIntoView({ behavior: 'instant', block: 'start' })
  window.scrollBy(0, -100)
})
await page.waitForTimeout(1500)
await page.screenshot({ path: 'C:/Users/Nahu/AppData/Local/Temp/opencode/v-05-galeria.png' })

// Scroll down more for gallery sub-sections
await page.evaluate(() => window.scrollBy(0, 1200))
await page.waitForTimeout(1500)
await page.screenshot({ path: 'C:/Users/Nahu/AppData/Local/Temp/opencode/v-06-galeria2.png' })

// Scroll to second video panel
await page.evaluate(() => {
  document.querySelectorAll('.video-panel')[1]?.scrollIntoView({ behavior: 'instant', block: 'start' })
})
await page.waitForTimeout(2000)
await page.screenshot({ path: 'C:/Users/Nahu/AppData/Local/Temp/opencode/v-07-videopanel2.png' })

// Scroll to CTA section
await page.evaluate(() => {
  const sections = document.querySelectorAll('#wrapper > section')
  sections[sections.length - 2]?.scrollIntoView({ behavior: 'instant', block: 'start' })
})
await page.waitForTimeout(1500)
await page.screenshot({ path: 'C:/Users/Nahu/AppData/Local/Temp/opencode/v-08-cta.png' })

// Scroll to #contacto
await page.evaluate(() => {
  document.querySelector('#contacto').scrollIntoView({ behavior: 'instant', block: 'start' })
  window.scrollBy(0, -100)
})
await page.waitForTimeout(1500)
await page.screenshot({ path: 'C:/Users/Nahu/AppData/Local/Temp/opencode/v-09-contacto.png' })

// Open chat
await page.evaluate(() => {
  document.querySelector('.chat-toggle')?.click()
})
await page.waitForTimeout(1000)
await page.screenshot({ path: 'C:/Users/Nahu/AppData/Local/Temp/opencode/v-10-chat.png' })

await browser.close()
console.log('Screenshots saved')

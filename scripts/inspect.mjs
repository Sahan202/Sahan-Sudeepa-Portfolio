import { chromium } from 'playwright-core';
const browser = await chromium.launch({channel:'chrome',headless:true});
const page = await browser.newPage({viewport:{width:320,height:900},reducedMotion:'reduce'});
await page.goto('http://127.0.0.1:3100');
console.log(JSON.stringify(await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,elements:[...document.querySelectorAll('body *')].map(e=>({tag:e.tagName,cls:e.className,left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right})).filter(e=>e.right>innerWidth+1||e.left < -1).slice(0,35)})),null,2));
await page.setViewportSize({width:1440,height:1000});
await page.goto('http://127.0.0.1:3100');
await page.screenshot({path:'test-results/hero-desktop.png',animations:'disabled'});
await browser.close();

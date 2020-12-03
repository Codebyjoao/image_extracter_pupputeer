const puppeteer = require('puppeteer');
const fs = require('fs');
 
(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://www.youtube.com/c/RocketSeat/videos');

  const imgList = await page.evaluate(() =>{

    const nodeList = document.querySelectorAll('#contents img')
    const imgArray = [...nodeList]

    const imgList = imgArray.map(img =>({
      
      src: img.src

    }))

    const  neoImagList = []
    for(i in imgList){
      if(imgList[i].src != ""){
        
        neoImagList.push(imgList[i])
      }

    }

    
    return neoImagList
  })
 
  fs.writeFile('youtuberocket.json', JSON.stringify(imgList, null, 2), err =>{
      if(err) throw new Error('something went wrong')

      console.log('well done')
  })

  await browser.close();
})();
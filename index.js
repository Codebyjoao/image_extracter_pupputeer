const puppeteer = require('puppeteer');
const fs = require('fs');
 
(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  const search = 'mc+igu'
  await page.goto(`https://www.youtube.com/results?search_query=${search}`);

  //Pegar imagens e os links

  //listar imagens com os links

  //pegar todos os itens da pagina

  //criar pagina com os videos

  //separar o audio do video

  const elemetsList = await page.evaluate(() =>{

    const nodeList = document.querySelectorAll('#thumbnail img') 
    const imgArray = [...nodeList]

    const ndList = document.querySelectorAll('#thumbnail')
    const urlArray =[...ndList]

    const imgList = imgArray.map(img =>({
      
      src: img.src

    }))

    const urlList = urlArray.map(url =>({

      href: url.href

    }))

    const  neoImgList = []
    for(i in imgList){
      if(imgList[i].src != ""){
        
        neoImgList.push(imgList[i])
      }

    }
    return [imgList, urlList]

  })

  
  const img = elemetsList[0]
  const url = elemetsList[1]
 
  fs.writeFile('youtubesearch.json', JSON.stringify(img, null, 2), err =>{
      if(err) throw new Error('something went wrong')

      console.log('well done')
  })

  fs.writeFile('youtubesearchlink.json', JSON.stringify(url, null, 2), err =>{
    if(err) throw new Error('something went wrong')

    console.log('well done')
})

  await browser.close();
})();
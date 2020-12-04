const puppeteer = require('puppeteer');
const fs = require('fs');
 
(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  const search = 'node+js'
  await page.goto(`https://www.youtube.com/results?search_query=${search}`);

  //Pegar imagens e os links

  //listar imagens com os links

  //pegar todos os itens da pagina

  //criar pagina com os videos

  //separar o audio do video

  const elemetsList = await page.evaluate(() =>{

    const nodeList = document.querySelectorAll('#thumbnail img')
    const imgArray = [...nodeList]

    const imgList = imgArray.map(img =>({
      
      src: img.src

    }))

    const ndList = document.querySelectorAll('#thumbnail')
    const urlArray =[...ndList]

    const urlList = urlArray.map(url =>({

      href: url.href

    })) 

    const elemetsList = {
      
    }

    const  neoImagList = []
    for(i in imgList){
      if(imgList[i].src != ""){
        
        neoImagList.push(imgList[i])
      }

    }
    return neoImagList;
  })
 
  fs.writeFile('youtubesearch.json', JSON.stringify(elemetsList, null, 2), err =>{
      if(err) throw new Error('something went wrong')

      console.log('well done')
  })

  //await browser.close();
})();
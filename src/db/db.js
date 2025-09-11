

import Dexie from "dexie";


export const db = new Dexie("mediaWebFeed")
db.version(1).stores({
    feed:"++id,title,desc, image, category, table, link, createdAt"
})


export async function seedIfEmpty() {
  
    const count = await db.feed.count()
    if(count===0){
        await db.feed.add({
            title: "prueba 1",
            desc: "esto es una prueba no te preocupes",
            image: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?cs=srgb&dl=pexels-steve-1266808.jpg&fm=jpg',
            category: "testPrueba",
            link: "testPruebalol",
            createdAt: new Date()
        })
        await db.feed.add({
            title: "prueba 2",
            desc: "esto es una prueba no te preocupes",
            image: 'https://api.nga.gov/iiif/99758d9d-c10b-4d02-a198-7e49afb1f3a6/0,0,12666,7124/!1536,864/0/default.jpg',
            category: "testPrueba",
            link: "testPruebalol",
            createdAt: new Date()
        })
        await db.feed.add({
            title: "prueba 3",
            desc: "esto es una prueba no te preocupes",
            image: 'https://artisanhd.com/wp-content/uploads/2022/07/The-Great-Wave-off-Kanagawa-painting-by-Japanese-artist-Katsushika-Hokusai.png',
            category: "testPrueba",
            link: "testPruebalol",
            createdAt: new Date()
        })
        await db.feed.add({
            title: "prueba 4",
            desc: "esto es una prueba no te preocupes",
            image: 'https://www.vangoghstudio.com/Files/6/102000/102147/FileBrowser/paintings/self-portrait-grey-felt-hat-2.jpg',
            category: "testPrueba",
            link: "testPruebalol",
            createdAt: new Date()
        })
        await db.feed.add({
            title: "prueba 5",
            desc: "esto es una prueba no te preocupes",
            image: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?cs=srgb&dl=pexels-steve-1266808.jpg&fm=jpg',
            category: "testPrueba",
            link: "testPruebalol",
            createdAt: new Date()
        })
        await db.feed.add({
            title: "prueba 6",
            desc: "esto es una prueba no te preocupes",
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_TljCFW7xARb95u6yf6R6kxg-8tFANm_1fw&s',
            category: "testPrueba",
            link: "testPruebalol",
            createdAt: new Date()
        })
        await db.feed.add({
            title: "prueba 7",
            desc: "esto es una prueba no te preocupes",
            image: 'https://www.eff.org/files/banner_library/robotai.png',
            category: "testPrueba",
            link: "testPruebalol",
            createdAt: new Date()
        })
    }
    
    
}

export async function getPinById(id) {
  return await db.feed.get(id)
}





import Dexie from "dexie";


export const db = new Dexie("PinterestFeed")
db.version(1).stores({
    feed:"++id,title,desc, image, category, table, link, createdAt"
})


export async function seedIfEmpty() {
  
    const count = await db.feed.count()
    if(count===0){
          await db.feed.add({
        title:"carajo",
        desc:"Nada que decir",
        image:null,
        category:"shit",
        link:"youtube",
        createdAt:new Date()
    })
    }
    
    
}

export async function getPinById(id) {
  return await db.feed.get(id)
}
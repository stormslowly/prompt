import createClient from "./redis";

import {readFileSync} from "fs"
import {join} from "path"


const skipChars = ['路',
  '弄',
  '区',
  '幢',
  '号']


async function setup() {
  const redisClient = createClient()

  const addresses = readFileSync(join(__dirname, '..', 'address.txt'), 'utf-8').split('\n')
  // countChar(addresses)


  for (const add of addresses) {

    const m = redisClient.multi()

    const chars = add.trim().split('').filter(c => skipChars.indexOf(c) < 0)

    chars.forEach(c => {
      console.log(`${__filename}:43 \n`, c);
      m.sadd(`c:${c}`, add)
    })

    await m.execAsync()
  }

  await redisClient.quitAsync()
}

if (!module.parent) {

  (async function () {

    try {
      await setup()
    } catch (e) {
      console.log(`${__filename}:22 \n`, e);
    }
  })()
    .then(() => {
      console.log(`${__filename}:21 \n`, 'done!');
    })

}


function countChar(addresses: string[]) {
  const counterMap: any = {}

  for (const add of addresses) {
    const words = add.split('')

    words.forEach((c) => {
      if (counterMap[c]) {
        counterMap[c] += 1
      } else [
        counterMap[c] = 1
      ]
    })
  }


  console.log(`${__filename}:34 setup\n`, Object.keys(counterMap).sort((k1, k2) => counterMap[k2] - counterMap[k1]).slice(0, 100));

  const top100Characters = Object.keys(counterMap).sort((k1, k2) => counterMap[k2] - counterMap[k1]).slice(0, 100)

  top100Characters.forEach((c) => {
    console.log(c, '=>', counterMap[c])
  })
}

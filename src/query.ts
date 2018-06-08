const startFrom = 2

import createClient from "./redis";


const performTag = 'queryTime'

async function query(word) {

  const redisClient = createClient()


  console.time(performTag)

  const m = redisClient.multi()
  const chars = word.split('').filter(c => c)


  chars.forEach(c => {
    m.exists(`c:${c}`)
  })

  const exits = await m.execAsync()

  const querym = redisClient.multi()

  const queryChars = chars.filter((_, i) => exits[i])

  if (queryChars.length >= startFrom) {

    const resultSet = 'qrSet'

    const cSets = queryChars.map(c => `c:${c}`)

    querym.sinterstore(resultSet, ...cSets)
    querym.smembers(resultSet)

    const mRes = await querym.execAsync()

    const hitAdds = last(mRes)


    console.log(hitAdds.join('\n'))
    console.log(`\n ${hitAdds.length} hits`)
    console.timeEnd(performTag)
  }

  await redisClient.quitAsync()
}


if (!module.parent) {

  const word = process.argv[2]

  console.log(`==================> `, word, `  <==================\n`);

  query(word.trim())
    .catch()
    .then(() => {

    })
}


function last<T>(a: T[]): T | null {
  return a[a.length - 1] || null
}

import type { NextApiRequest, NextApiResponse } from 'next'
import knextfile from '../../../knexfile'

const db = require('knex')(knextfile)

interface Queue {
  id: string;
  queue: string;
  name: string;
  song_name: string;
  youtube_url: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { queueId } = req.query

  if (req.method == 'GET') {
    let response = {
      id: null,
      name: null,
      queue: new Array<Queue>(),
    }

    await db('queues')
      .where('id', queueId)
      .first()
      .then(function(row: any) {
        response = {
          ...response,
          id: row.id,
          name: row.queue_name
        }
      })

    await db('queue')
      .where('queue', queueId)
      .orderBy('created')
      .then(function(rows: Queue[]) {
        response.queue = rows
      })

    return res.json(response)
  }
  else if (req.method === 'POST') {
    const { name, songName, youTubeUrl } = req.body

    let resultset: any[] = [];

    await db('queue')
      .insert({
        queue: queueId,
        name: name,
        song_name: songName,
        youtube_url: youTubeUrl,
      },
      ['id', 'name', 'song_name', 'youtube_url', 'created'])
      .then(function(rows: Queue[]) {
        resultset = rows
      })

    return res.json(resultset)
  }
  else if (req.method === 'PATCH') {
    const { id } = req.body

    await db('queue')
      .where('queue', queueId)
      .where('id', id)
      .update({
        performed: 'now()'
      })
      .then((rows: number) => {
        if (rows > 1) {
          console.error('More than one row was updated')
          return res.status(500).json({})
        }
      })

    return res.json({ id: id })
  }
  else if (req.method === 'DELETE') {
    const { id } = req.body

    let affectedRows = -1

    await db('queue')
      .where('id', id)
      .where('queue', queueId)
      .del()
      .then((rows: number) => {
        if (rows > 1) {
          console.error('More than one row was deleted')
          return res.status(500).json({})
        }

        affectedRows = rows;
      })

    return res.json({ "id": id })
  }

  res.status(501).json({})
}

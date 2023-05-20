import { describe, expect, test } from '@jest/globals';
import { AddToQueueInput } from '../__generated__/resolvers-types';
import QueueAPI from './queueAPI';

import QueuesAPI from './queuesAPI';

const queuesApi = new QueuesAPI();
const queueApi = new QueueAPI();

describe('queues API', () => {
  test('add to queue', async () => {
    const queue = await queuesApi.createQueue('queueAPI test');

    const input = {
      queueId: queue.id,
      name: 'Song Luan',
      songName: 'Neu Em Khong Ve',
      youTubeUrl: 'https://youtu.be/g9ccsHOCRAs',
    } as AddToQueueInput;

    const result = await queueApi.addToQueue(input);

    expect(result).toHaveProperty('id');
  });
});

import { describe, expect, test } from '@jest/globals';
import QueuesAPI from './queuesAPI';

const queuesApi = new QueuesAPI();

describe('queues API', () => {
  test('create queue', async () => {
    const queueName = 'test queue';

    const newQueue = await queuesApi.createQueue(queueName);

    expect(newQueue.name).toBe(queueName);
  });
});

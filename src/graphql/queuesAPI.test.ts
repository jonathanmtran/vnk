import { describe, expect, test } from '@jest/globals';
import QueuesAPI from './queuesAPI';

const queuesApi = new QueuesAPI();

describe('queues API', () => {
  test('create queue', async () => {
    const queueName = 'test queue';

    const newQueue = await queuesApi.createQueue(queueName);

    expect(newQueue.name).toBe(queueName);
  });

  test('get queue', async () => {
    const newQueue = await queuesApi.createQueue('test get queue');

    const queue = await queuesApi.getQueue(newQueue.id);

    expect(queue).toHaveProperty('id', newQueue.id);
  });

  test('delete queue', async () => {
    const queue = await queuesApi.createQueue('test delete queue');

    const queueId = queue.id;

    await queuesApi.deleteQueue(queueId);

    const deletedQueue = await queuesApi.getQueue(queueId);

    expect(deletedQueue).toBeUndefined();
  });
});

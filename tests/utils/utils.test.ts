import {sleep} from '@/utils/utils';

describe('utils/utils', () => {
  describe('sleep', () => {
    beforeAll(() => {
      vi.useFakeTimers()
    })

    it('should resolve the promise after the timeout', async () => {
      // Arrange
      const msTime = 100;
      const sleepPromise = sleep(msTime);
      vi.advanceTimersByTime(msTime);

      // Act & Assert
      await expect(sleepPromise).resolves.toBeUndefined;
    });
  });
});

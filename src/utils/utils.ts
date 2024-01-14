/**
 * Promisify setTimeout
 *
 * @param msTime number of milliseconds to wait
 * @returns Empty promise
 */
export function sleep(msTime: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, msTime);
  });
}

/* eslint-disable no-console */
let cloakBrowserMutex = Promise.resolve();

function acquireMutex(): Promise<() => void> {
  let release: () => void = () => {};
  const nextLock = new Promise<void>((resolve) => {
    release = resolve;
  });
  const wait = cloakBrowserMutex.then(() => release);
  cloakBrowserMutex = nextLock;
  return wait;
}

async function runWorker(id: number) {
  console.log(`Worker ${id} acquiring lock...`);
  const release = await acquireMutex();
  console.log(`Worker ${id} acquired lock!`);
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log(`Worker ${id} releasing lock...`);
  release();
  console.log(`Worker ${id} released lock.`);
}

async function main() {
  const workers = Array.from({ length: 5 }, (_, i) => runWorker(i));
  await Promise.all(workers);
  console.log("All workers finished.");
}

main().catch(console.error);

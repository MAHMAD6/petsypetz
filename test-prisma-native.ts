import { db } from './src/lib/db';

async function main() {
  const allMedia = await db.media.findMany();
  console.log('All Media:', allMedia);
}

main()
  .then(async () => {
    // await db.$disconnect(); // Not needed for the test, global client might stay alive
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });

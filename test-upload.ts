import { db } from "./src/lib/db";

async function run() {
  console.log("Testing db.media.findMany...");
  const media = await db.media.findMany();
  console.log("FindMany result:", media);

  console.log("Testing db.media.create...");
  const newMedia = await db.media.create({
    data: {
      type: "IMAGE",
      url: "/uploads/test.jpg",
      title: "test.jpg",
    }
  });
  console.log("Create result:", newMedia);
}

run().catch(console.error);

run().catch(console.error);

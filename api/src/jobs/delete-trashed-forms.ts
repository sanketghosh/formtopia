import { db } from "@/lib/prisma";
import cron from "node-cron";
// Run the task every minute
cron.schedule("* * * * *", async () => {
  // Find trashed forms that have been trashed for more than 2 minutes
  const trashedForms = await db.form.findMany({
    where: {
      isTrashed: true,
      trashedAt: {
        lt: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      },
    },
  });

  // Delete the trashed forms
  await Promise.all(
    trashedForms.map((form) => db.form.delete({ where: { id: form.id } }))
  );
});

// cron.schedule("*/1 * * * * *", async () => {
//   // Find trashed forms that have been trashed for more than 2 minutes
//   const trashedForms = await db.form.findMany({
//     where: {
//       isTrashed: true,
//       trashedAt: {
//         lt: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
//       },
//     },
//   });

//   // Delete the trashed forms
//   await Promise.all(
//     trashedForms.map((form) => db.form.delete({ where: { id: form.id } }))
//   );
// });

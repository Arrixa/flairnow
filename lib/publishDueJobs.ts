import prisma from "@/lib/prisma";

async function publishDueJobs() {
  try {
    const currentDate = new Date();

    const dueJobs = await prisma.jobPosting.findMany({
      where: {
        status: 'DRAFT',
        publishedAt: {
          lte: currentDate,
        },
      },
    });

    for (const job of dueJobs) {
      await prisma.jobPosting.update({
        where: {
          id: job.id,
        },
        data: {
          status: 'PUBLISHED',
        },
      });

      console.log(`Job ${job.id} published.`);
    }
  } catch (error) {
    console.error('Error publishing due jobs:', error);
  } 
}

// Scheduled jobs with Vercel Cron Jobs and Vercel Functions
publishDueJobs();

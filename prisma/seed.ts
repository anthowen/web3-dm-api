import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        address: '0x388C818CA8B9251b393131C08a736A67ccB19297',
        signature:
          '0x15cea1ee501926c879a53db15919d136aa3a440c461464b046f8bb5f463362ad4a62ce751bebc9f795b9c34e775e60c2d9b1846902e6b28f2d39ec0fbee056e51b',
      },
      {
        address: '0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326',
        signature:
          '0x25cea1ee501926c879a53db15919d136aa3a440c461464b046f8bb5f463362ad4a62ce751bebc9f795b9c34e775e60c2d9b1846902e6b28f2d39ec0fbee056e51b',
      },
      {
        address: '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5',
        signature:
          '0x35cea1ee501926c879a53db15919d136aa3a440c461464b046f8bb5f463362ad4a62ce751bebc9f795b9c34e775e60c2d9b1846902e6b28f2d39ec0fbee056e51b',
      },
    ],
  });
}

main()
  .then(() => {
    console.info('Finished seeding data.');
  })
  .catch((error) => {
    console.error(error);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });

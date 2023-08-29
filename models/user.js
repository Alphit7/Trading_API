const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createUserWithProfile(userData, profileData) {
  try {
    return await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({ data: userData });

      const profile = await prisma.profile.create({
        data: {
          ...profileData,
          user: { connect: { id: user.id } },
        },
      });

      return { user, profile };
    });
  } catch (error) {
    throw error;
  }
}

async function authenticateUser(email, password) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && user.password === password) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getUserByEmail,
  authenticateUser,
  createUserWithProfile,
};

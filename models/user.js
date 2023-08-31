const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

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


async function loginUser(email, password) {
  try {
    const user = await getUserByEmail(email);

    if (user) {
      const passwordMatches = await bcrypt.compare(password, user.password);

      if (passwordMatches) {
        return { message: 'Login successful' };
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  loginUser,
  getUserByEmail,
  createUserWithProfile,
};

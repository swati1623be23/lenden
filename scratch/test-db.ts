import { prisma } from "../lib/prisma";
import { hashPassword } from "../lib/auth";

async function main() {
  console.log("Starting test-db script...");
  try {
    const email = `test_${Date.now()}@example.com`;
    const hashedPassword = await hashPassword("password123");
    console.log("Hashed password:", hashedPassword);
    
    console.log("Creating user with email:", email);
    const user = await prisma.user.create({
      data: {
        name: "Test User",
        email,
        password: hashedPassword,
      },
    });
    console.log("User created successfully:", user);
    
    console.log("Querying created user...");
    const queried = await prisma.user.findUnique({
      where: { email },
    });
    console.log("Queried user:", queried);
  } catch (error) {
    console.error("Error during execution:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

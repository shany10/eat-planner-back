import { createUser } from "../src/models";

export const userSeeder = async () => {
  const users = [
    {
      firstname: "Admin",
      lastname: "System",
      email: "admin@gym.com",
      number: "0000000000",
      password: "Admin123!",
      role: "admin" as const,
      active: true
    },
    {
      firstname: "Jean",
      lastname: "Manager",
      email: "jean.manager@gym.com",
      number: "0000000001",
      password: "Manager123!",
      role: "manager" as const,
      active: true
    }
  ];

  console.log("🌱 Seeding users...");
  
 
  const createdUsers = [];
  for (const userData of users) {
    const user = await createUser(userData);
    createdUsers.push(user);
  }
  
  console.log(`✅ ${createdUsers.length} users created`);
  
  return createdUsers;
};

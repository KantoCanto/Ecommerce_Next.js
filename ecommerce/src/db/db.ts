import { PrismaClient } from "@prisma/client";

//when called, creates a new instance of "Prismalient".
//it's structured as a function to ensure that the creation logic can be controlled, specifically to implemnet the singleton pattern effectively
const prismaClientSingleton = () => {
  return new PrismaClient();
};

//this TS declaration extends the global namespace by adding a new variable "prisma"
//The type of prisma is either undefined or whatecer is returned by the function "prismaClientSingleton"
//THis is useful for holding a singleton reference that can be accessed globally in the application
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

//Here prisma is assigned the globally stored instance if it exists (globalThis.prisma) or a new instance created by prismaClientSingleton, if there is none

const db = globalThis.prisma ?? prismaClientSingleton();

//This line exports the singleton instance so that it can be imported and used in other parts of the application
//This ensures that all parts of your application use the same instance of PrismaClient
export default db;

//environment specific global assignment
//In non-production environments, this line assigns the singleton instance back to "globalThis.prisma"
//This is helpful for cases where you might restart parts of the app without restarting the entire environment, preserving database connections and other configurations
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

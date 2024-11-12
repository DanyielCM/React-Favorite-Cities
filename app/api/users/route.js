import { NextResponse } from "next/server";
import { AppDataSource } from "@/lib/data-source";
import { User } from "@/entity/User";

async function initializeDataSource() {
  
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
}

export async function GET() {
  await initializeDataSource();
  const userRepo = AppDataSource.getRepository(User);
  const users = await userRepo.find();
  return NextResponse.json(users);
}

export async function POST(req) {
  await initializeDataSource();
  const { name, age } = await req.json();
  const userRepo = AppDataSource.getRepository(User);

  const user = userRepo.create({ name, age });
  await userRepo.save(user);
  return NextResponse.json({ message: "User created", user });
}



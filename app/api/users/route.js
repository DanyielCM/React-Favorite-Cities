import { NextResponse } from "next/server";
import { AppDataSource } from "@/lib/data-source";
import { User } from "@/entity/User";
import { Location } from "@/entity/Location";

async function initializeDataSource() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
}

export async function GET(request) {
  await initializeDataSource();
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({
    email
  });
  return NextResponse.json(user);
}

export async function POST(request) {
  await initializeDataSource();
  const { email, name, locations } = await request.json();
  const userRepo = AppDataSource.getRepository(User);
  const locationRepo = AppDataSource.getRepository(Location);
  const obj_locations = [];
  for (const locationName of locations) {
    let location = await locationRepo.findOneBy({ name: locationName });

    if (!location) {
      // If location doesn't exist, create it
      location = locationRepo.create({ name: locationName });
      await locationRepo.save(location);
    }
    obj_locations.push(location);
  }
  const user = userRepo.create({ email, name, favoriteLocations: obj_locations, });
  await userRepo.save(user);

  return NextResponse.json({ message: "User created", user });
}



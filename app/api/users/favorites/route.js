import { NextResponse } from 'next/server';
import { AppDataSource } from '@/lib/data-source';
import { User } from '@/entity/User';
import { Location } from '@/entity/Location';

async function initializeDataSource() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
}

export async function GET(request) {
  await initializeDataSource();
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({
    email,
  });
  const locations = [];
  user.favoriteLocations.forEach((location) => locations.push(location.name));
  return NextResponse.json(locations);
}

export async function PUT(request) {
  await initializeDataSource();
  const { email, location } = await request.json();
  const userRepo = AppDataSource.getRepository(User);
  const locationRepo = AppDataSource.getRepository(Location);
  const userF = await userRepo.findOneBy({
    email,
  });

  let locationF = await locationRepo.findOneBy({ name: location });

  if (!locationF) {
    // If location doesn't exist, create it
    locationF = locationRepo.create({ name: location });
    await locationRepo.save(locationF);
  }
  userF.favoriteLocations.push(locationF);
  await userRepo.save(userF);

  return NextResponse.json({ message: 'User created', userF });
}

export async function DELETE(request) {
  await initializeDataSource();
  const { email, location } = await request.json();
  const userRepo = AppDataSource.getRepository(User);
  const locationRepo = AppDataSource.getRepository(Location);
  const userF = await userRepo.findOneBy({
    email,
  });

  let locationF = await locationRepo.findOneBy({ name: location });

  if (!locationF) {
    return NextResponse.json(
      { message: 'Location not found' },
      { status: 404 }
    );
  }

  userF.favoriteLocations = userF.favoriteLocations.filter(
    (loc) => loc.id !== locationF.id
  );
  await userRepo.save(userF);

  return NextResponse.json({
    message: 'Location removed from favorites',
    userF,
  });
}

import { db } from "./client.ts"
import { courses, enrollments, users } from "./schema.ts"
import { hash } from 'argon2'
import {fakerPT_BR as faker} from '@faker-js/faker'

async function seed() {
   const passwordHash = await hash('123456')

    const userInsert = await db.insert(users).values([
        {name: faker.person.fullName(), 
         email: faker.internet.email(),
         password: passwordHash,
         role:'student'},
         

        {name: faker.person.fullName(), 
         email: faker.internet.email(),
         password: passwordHash,
         role:'student'},

        {name: faker.person.fullName(), 
         email: faker.internet.email(),
         password: passwordHash,
         role:'student'},
    
    ]).returning()

     const coursesInsert = await db.insert(courses).values([
        { title: faker.lorem.words(4)},
        { title: faker.lorem.words(4)},
     ]).returning()

     await db.insert(enrollments).values([
        {coursesId: coursesInsert[0].id, userId: userInsert[0].id},
        {coursesId: coursesInsert[0].id, userId: userInsert[1].id},
        {coursesId: coursesInsert[1].id, userId: userInsert[2].id},
     ])
}

seed()
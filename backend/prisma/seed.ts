import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient()

async function seed() {

    fs.readdir("./resources/seed-data", (err, files) => {
        files.forEach((file, idx) => {
            const fileParts = file.split('.')
            const fileName = fileParts[0]
            const noteContents = fs.readFileSync(`./resources/seed-data/${file}`).toString()
            prisma.note.upsert({
                where: {
                    id: idx
                },
                update: {
                    title: fileName,
                    content: noteContents
                },
                create: {
                    title: fileName,
                    content: noteContents
                }
            })
                .catch(() => console.log(`Failed to add ${fileName}`))

        })
    })
}

seed()
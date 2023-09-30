import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs'
import { prisma } from '@/utils/db'

const createNewUser = async () => {
  // NOTE: if db not yet have user need to create and redirect to jouranl page
  const user = await currentUser()
  if (!user) return redirect('/')

  const match = await prisma.user.findUnique({
    where: { clerkId: user.id as string },
  })

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user?.emailAddresses[0].emailAddress,
      },
    })
  }

  redirect('/journal')
}

async function NewUser() {
  await createNewUser()

  return <div>...loading</div>
}

export default NewUser

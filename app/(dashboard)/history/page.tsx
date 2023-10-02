import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getData = async () => {
  const user = await getUserByClerkID()
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    select: {
      sentimentScore: true,
    },
  })

  const sum = analyses.reduce((all, current) => all + current.sentimentScore, 0)
  const average = Math.round(sum / analyses.length)

  return { analyses, average }
}

async function HistoryPage() {
  const { analyses, average } = await getData()
  return <div>HistoryPage: {average}</div>
}

export default HistoryPage

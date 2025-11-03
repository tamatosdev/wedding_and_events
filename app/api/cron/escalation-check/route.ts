import { NextRequest, NextResponse } from 'next/server'
import { checkAndEscalateQueries } from '@/lib/escalation'

export const dynamic = 'force-dynamic'

/**
 * Cron endpoint to check and escalate queries
 * This should be called every 5-10 minutes by a cron service
 * 
 * For Vercel, use Vercel Cron Jobs
 * For other platforms, set up a cron job to call this endpoint
 * 
 * Example cron schedule: every 5 minutes (configured in vercel.json)
 */
export async function GET(request: NextRequest) {
  try {
    // Vercel Cron includes 'x-vercel-cron' header - check for that first
    const isVercelCron = request.headers.get('x-vercel-cron') === '1'
    
    // Optional: Add API key authentication for security (only if not from Vercel)
    if (!isVercelCron) {
      const authHeader = request.headers.get('authorization')
      const cronSecret = process.env.CRON_SECRET

      if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }
    }

    console.log('🕐 Starting escalation check...')
    await checkAndEscalateQueries()
    console.log('✅ Escalation check completed')

    return NextResponse.json({
      success: true,
      message: 'Escalation check completed',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error in escalation check cron:', error)
    return NextResponse.json(
      { 
        error: 'Failed to run escalation check',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}


import { auth } from '@clerk/nextjs/server'
import { createSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  const { userId: clerkID} = auth()

  if (!clerkID) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createSupabaseClient()

  // Fetch user data from Supabase
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('id')
    .eq('clerk_user_id', clerkID)
    .single()

  if (userError) {
    // Continue without Supabase data if there's an error
    console.error('Error fetching user data:', userError)
    if (userError.code === 'PGRST116') {
      // User not found, create a new user in Supabase
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({ clerk_user_id: clerkID })
        .select('id')
        .single()
        if (createError) {
          console.error('Error creating user in Supabase:', createError)
          return NextResponse.json({ error: 'Error creating user in Supabase' }, { status: 500 })
        }
        return NextResponse.json({clerkID, ...newUser})
    }
  }

  const userInfo = {
    clerkID,
    ...userData, // this key might be missing, if the user is not in the database yet
  }

  return NextResponse.json(userInfo)
}

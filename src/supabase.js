import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://thaxrotrsoxbldamugzt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoYXhyb3Ryc294YmxkYW11Z3p0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4ODUzMDUsImV4cCI6MjA5MzQ2MTMwNX0.Yv-sfDb5q8f86S3sjafv6d7g7pwJxuhG2yv2ABtW-Dw'

export const supabase = createClient(supabaseUrl, supabaseKey)
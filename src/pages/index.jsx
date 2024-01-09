import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import MusicPlayer from '@/components/MusicPlayer'

const inter = Inter({ subsets: ['latin'] })

function Home() {
  return (
    <>
      <MusicPlayer />
    </>
  )
}

export default Home

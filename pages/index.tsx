import { useAddress, useContract } from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Login from '../components/Login'
import PropagateLoader from "react-spinners/PropagateLoader";

const Home: NextPage = () => {
  const address = useAddress();
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );

  console.log(address)


  if (isLoading) return (
    <div className='bg-[#091B18] min-h-screen flex flex-col items-center justify-center'>
      <div className='flex items-center space-x-2 mb-10'>
        <img className='rounded-full h-20 w-20' src="https://i.imgur.com/4h7mAu7.png" alt="" />
        <h1 className='text-lg text-white font-bold'>Loading the PAPAFAM DRAW</h1>
      </div>
      <PropagateLoader color='white' size={30} />
    </div>
  )

  if (!address) return <Login />

  return (
    <div className="bg-[#091B18] min-h-screen flex flex-col">
      <Head>
        <title>My Lottery App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
    </div>
  )
}

export default Home

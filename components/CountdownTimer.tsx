import { useContract, useContractData } from '@thirdweb-dev/react';
import React from 'react'
import Countdown from 'react-countdown';


type RProps = {
	hours: number;
	minutes: number;
	seconds: number;
	completed: boolean;
}

const CountdownTimer = () => {
	const { contract, isLoading } = useContract(
		process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
	);
	const { data: expiration, isLoading: isLoadingExpiration } = useContractData(contract, "expiration")

	const renderer = ({ hours, minutes, seconds, completed }: RProps) => {
		if (completed) {
			return (
				<div className=''>
					<h2 className='text-white text-xl text-center animate-bounce'>Ticket Sale now CLOSED for this draw</h2>

					<div className='flex space-x-6'>
					<div className='flex-1 '>
						<div className='countdown animate-pulse'>{hours}</div>
						<div className='countdown-label'>hours</div>
					</div>
					<div className='flex-1 '>
						<div className='countdown animate-pulse'>{minutes}</div>
						<div className='countdown-label'>minutes</div>
					</div>
					<div className='flex-1 '>
						<div className='countdown animate-pulse'>{seconds}</div>
						<div className='countdown-label'>seconds</div>
					</div>
				</div>
				</div>
			)
		}

		return (
			<div className=''>
				<h3 className='text-white text-sm mb-2 italic'>Time remaining</h3>
				<div className='flex space-x-6'>
					<div className='flex-1 '>
						<div className='countdown'>{hours}</div>
						<div className='countdown-label'>hours</div>
					</div>
					<div className='flex-1 '>
						<div className='countdown'>{minutes}</div>
						<div className='countdown-label'>minutes</div>
					</div>
					<div className='flex-1 '>
						<div className='countdown'>{seconds}</div>
						<div className='countdown-label'>seconds</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div><Countdown date={new Date(expiration * 1000)} renderer={renderer} /></div>
	)
}

export default CountdownTimer
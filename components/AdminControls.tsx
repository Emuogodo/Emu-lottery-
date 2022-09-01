import React from 'react'

import {
	StarIcon, CurrencyDollarIcon, ArrowPathIcon, ArrowUturnDownIcon
} from "@heroicons/react/24/solid"
import { useContract, useContractCall, useContractData } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { CURRENCY } from '../constants';
import toast from 'react-hot-toast';

const AdminControls = () => {
	const { contract, isLoading } = useContract(
		process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
	);
	const { data: totalCommission } = useContractData(contract, "operatorTotalCommission")

	const { mutateAsync: DrawWinnerTicket } = useContractCall(contract, "DrawWinnerTicket")
	const { mutateAsync: RefundAll } = useContractCall(contract, "RefundAll")
	const { mutateAsync: restartDraw } = useContractCall(contract, "restartDraw")
	const { mutateAsync: WithdrawCommission } = useContractCall(contract, "WithdrawCommission")

	const handleDrawWinnerTicket = async () => {
		const notification = toast.loading("Picking a Lucky Winner...");

		try {
			const data = await DrawWinnerTicket([{}]);

			toast.success("A winner has been selected", {
				id: notification
			})
		} catch (error) {
			toast.error("Whoops something went wrong!", {
				id: notification
			})
			console.error("contact call failure", error)
		}
	}

	const handleWithdrawCommission = async () => {
		const notification = toast.loading("Withdrawing commision...");

		try {
			const data = await WithdrawCommission([{}]);

			toast.success("Your Commision has been withdrawn successfully!", {
				id: notification
			})
		} catch (error) {
			toast.error("Whoops something went wrong!", {
				id: notification
			})
			console.error("contact call failure", error)
		}
	}

	const handleRestartDraw = async () => {
		const notification = toast.loading("Restarting draw...");

		try {
			const data = await restartDraw([{}]);

			toast.success("Draw restarted successfully!", {
				id: notification
			})
		} catch (error) {
			toast.error("Whoops something went wrong!", {
				id: notification
			})
			console.error("contact call failure", error)
		}
	}

	const handleRefundAll = async () => {
		const notification = toast.loading("Refunding all...");

		try {
			const data = await RefundAll([{}]);

			toast.success("All refunded successfully!", {
				id: notification
			})
		} catch (error: any) {
			toast.error("Whoops something went wrong!", {
				id: notification
			})
			console.error("contact call failure", error.message)
		}
	}

	return (
		<div className='text-white text-center px-5 py-3 rounded-md border border-emerald-300/20'>
			<h2 className='font-bold'>Admin Controls</h2>
			<p className='mb-5'>Total Commision to be withdrawn: {totalCommission && ethers.utils.formatEther(totalCommission.toString())} {CURRENCY}</p>
			<div className='flex flex-col space-y-1 md:flex-row md:space-y-0 md:space-x-2'>
				<button onClick={handleDrawWinnerTicket} className='admin-button'>
					<StarIcon className='h-6 mx-auto mb-2' />
					Draw Winner
				</button>
				<button onClick={handleWithdrawCommission} className='admin-button'>
					<CurrencyDollarIcon className='h-6 mx-auto mb-2' />
					Withdraw Commission
				</button>
				<button onClick={handleRestartDraw} className='admin-button'>
					<ArrowPathIcon className='h-6 mx-auto mb-2' />
					Restart Draw
				</button>
				<button onClick={handleRefundAll} className='admin-button'>
					<ArrowUturnDownIcon className='h-6 mx-auto mb-2' />
					Refund All
				</button>
			</div>
		</div>
	)
}

export default AdminControls
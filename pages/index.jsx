import React from 'react'
import { Button, Popup } from '../components'
import Link from 'next/link'

function Home() {
	return (
		<>
			<h1>Hello, world</h1>
			<Button className='egorka' />
			<Button className='koll ' />
			<Link href='/egorka'>
				<a>Go to egorka</a>
			</Link>

			<Popup>
				<form>
					<input type='text' />
					<input type='text' />
					<input type='text' />
				</form>
			</Popup>
			<img src='/images/icons/navigation/poppover.svg' alt='' />
		</>
	)
}

export default Home

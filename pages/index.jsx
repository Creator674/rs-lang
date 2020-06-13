import React from 'react'
import { Button } from '../components'
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
		</>
	)
}

export default Home

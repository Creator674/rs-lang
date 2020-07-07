import { LandingCard } from './landingCard'
import { dataLandingCards } from './dataLandingCards'

export const LandingCards = () => { 
    const list = dataLandingCards.map((item) => {
      return (
        <div className=''>
            <LandingCard {...item} />
        </div>
      )
    })
    return <div className=''>{list}</div>
}
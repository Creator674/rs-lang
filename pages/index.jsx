import React, { useContext, useEffect } from 'react'
import { Context } from 'context'
import './style.less'
import { AppLayout } from 'layouts'
import Link from 'next/link'
import { ButtonLogIn, UserAvatar, SignInSignUpSwitcher, withInfo } from 'components'

import { getLocalStorageProp } from '../lib/localStorage'
import { LandingMember, dataLandingMembers } from 'components/LandingMember'
import { LandingCard, dataLandingCards } from 'components/LandingCard'

const MainPage = ({ showInfo }) => {
  const {
    appSettings: { isAuthorized },
  } = useContext(Context)
  useEffect(() => {
    isAuthorized && showInfo({ message: 'Logged in successfully', type: 'success' })
    isAuthorized === false && showInfo({ message: 'Logged out', type: 'info' })
  }, [isAuthorized])

  return (
    <AppLayout>
      <div className='landing-box'>
        <header className='header'>
          <div className='container header__wrapper'>
            <div className='logo-wrapper'>
              <div className='hamburger header__hamburger'>
                <span className='hamburger__line'></span>
              </div>
              <div className='logo'>
                <picture>
                  <source media='(min-width: 768px)' srcSet='images/landing/logo_big.svg' />
                  <img src='images/landing/logo_small.svg' className='logo__image' alt='Learning girl' />
                </picture>
              </div>
            </div>
            <div className='nav-wrapper'>
              <nav className='header__navigation'>
                <ul className='navigation'>
                  <li className='navigation__item'>
                    <a className='navigation__link' href='#home'>
                      Home
                    </a>
                  </li>
                  <li className='navigation__item'>
                    <a className='navigation__link' href='#games'>
                      Games
                    </a>
                  </li>
                  <li className='navigation__item'>
                    <a className='navigation__link' href='#algorithm'>
                      Algorithm
                    </a>
                  </li>
                  <li className='navigation__item'>
                    <a className='navigation__link' href='#about-us'>
                      About Us
                    </a>
                  </li>
                </ul>
              </nav>
              <div className='header__login'>
                {!isAuthorized ? (
                  <ButtonLogIn>
                    <SignInSignUpSwitcher />
                  </ButtonLogIn>
                ) : (
                  <UserAvatar />
                )}
              </div>
            </div>
          </div>
        </header>

        <section className='promo' id='home'>
          <div className='container promo__wrapper'>
            <div className='promo__content'>
              <h1 className='promo__title'>
                <span className='promo__title-thin'>up</span>DATE!&nbsp;
                <span className='promo__title-thin'>up</span>GRADE!{' '}
                <span className='promo__title-indent'>
                  UP
                  <span className='promo__title-thin'>lift&nbsp;yourself!</span>
                </span>
              </h1>
              <picture>
                <source media='(min-width: 768px)' srcSet='images/landing/learning-girl_big.png' />
                <img src='images/landing/learning-girl.png' className='promo__image' alt='Learning girl' />
              </picture>
              <div className='promo__text-wrapper'>
                <p className='promo__text'>
                  RSLang is an applicaton, that will help you to&nbsp;improve and expand the limits of your English
                  vocabulary.
                </p>
                <p className='promo__text'>
                  Our application has 6&nbsp;different difficulty levels in each of 6&nbsp;games , that will suit
                  everyone.
                </p>
                <Link href='/learn'>
                  <button className='btn-start promo__button'>Start Learning</button>
                </Link>
              </div>
            </div>
          </div>

          <div className='container promo__video-wrapper'>
            <div className='promo__video video'>
              <div className='video__content'>
                <iframe
                  width='1280'
                  height='720'
                  src='https://www.youtube.com/embed/8S0FDjFBj8o'
                  frameBorder='0'
                  allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <div className='container promo__slogans'>
              <p className='promo__slogan'>everything is perfect</p>
              <p className='promo__slogan'>convinient, nice and interesting</p>
              <p className='promo__slogan'>intuitive</p>
            </div>
          </div>
        </section>

        <section className='games' id='games'>
          <div className='container games__wrapper'>
            <h2 className='section-title'>Games</h2>
            <ul className='games__list'>
              {dataLandingCards.map((card) => (
                <LandingCard key={card.title} {...card} />
              ))}
            </ul>
          </div>
        </section>

        <section className='algorithm' id='algorithm'>
          <div className='container algorithm__wrapper'>
            <h2 className='section-title'>Algorithm</h2>
            <div className='algorithm__content'>
              <div className='algorithm__light'>
                <p className='algorithm__text'>
                  This algorythm is inpired by the &#8220;Spaced repetition&#8221; methodology. It is similar to
                  &#8220;Leitner system&#8221;, but has several differences.
                </p>
                <p className='algorithm__text'>
                  <a className='algorithm__link' href='https://en.wikipedia.org/wiki/Spaced_repetition' target='_blank'>
                    <span className='algorithm__subtitle'>Spaced repetition</span>
                  </a>
                  <br />
                  Spaced repetition is an{' '}
                  <a
                    className='algorithm__link'
                    href='https://en.wikipedia.org/wiki/Evidence-based_education'
                    target='_blank'
                  >
                    evidence-based learning
                  </a>{' '}
                  technique that is usually performed with{' '}
                  <a className='algorithm__link' href='https://en.wikipedia.org/wiki/Flashcard' target='_blank'>
                    flashcards
                  </a>
                  . Newly introduced and more difficult flashcards are shown more frequently while older and less
                  difficult flashcards are shown less frequently in order to exploit the psychological{' '}
                  <a className='algorithm__link' href='https://en.wikipedia.org/wiki/Spacing_effect' target='_blank'>
                    spacing effect
                  </a>
                  . The use of spaced repetition has been shown to increase rate of learning.
                </p>
                <p className='algorithm__text'>
                  <a className='algorithm__link' href='https://en.wikipedia.org/wiki/Leitner_system' target='_blank'>
                    <span className='algorithm__subtitle'>Leitner system</span>
                  </a>
                  <br />
                  In this method flashcards are sorted into groups according to how well the learner knows each one in
                  the Leitner's learning box. The learners try to recall the solution written on a flashcard. If they
                  succeed, they send the card to the next group. If they fail, they send it back to the first group.
                </p>
              </div>
              <div className='algorithm__dark'>
                <p className='algorithm__text'>
                  <span className='algorithm__subtitle'>Algorithm differentiators</span>
                  <br />
                  In this particular algorithm we based on following approach:
                </p>
                <ul className='algorithm__list'>
                  <li className='algorithm__item'>5 level word knowing: 0, 20, 40, 60, 80, 100 (scoring model)</li>
                  <li className='algorithm__item'>
                    In case if correct answer provided during training or game knowledge of current world will be
                    promoted on next level
                  </li>
                  <li className='algorithm__item'>
                    In case if incorrect answer provided during training or game knowledge of current world will be
                    demoted to previous level
                  </li>
                  <li className='algorithm__item'>Each world have 20 score by default</li>
                  <li className='algorithm__item'>
                    Each level have different time interval for next repetition: 0&thinsp;&ndash;&thinsp;10&thinsp;sec,
                    20&thinsp;&ndash;&thinsp;5&nbsp;min, 40&thinsp;&ndash;&thinsp;20&thinsp;min,
                    60&thinsp;&ndash;&thinsp;1&thinsp;day, 100&thinsp;&ndash;&thinsp;1&thinsp;week
                  </li>
                </ul>
                <p className='algorithm__text'>
                  <a
                    className='algorithm__link'
                    href='https://en.wikipedia.org/wiki/Leitner_system#/media/File:Leitner_system.svg'
                    target='_blank'
                  >
                    Illustration
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className='about-us' id='about-us'>
          <div className='container'>
            <h2 className='section-title about-us__title'>About Us</h2>
            <p className='about-us__subtitle'>
              <a className='about-us__link' href='https://github.com/s-squad/rs-lang' target='_blank'>
                Snow White and the 7 Dwarfs
              </a>
            </p>
            <div className='about-us__mentor'>
              <img
                className='about-us__picture-mentor'
                src='images/landing/vladislavkhlebec.png'
                alt='Vladislav Khlebec'
              />
              <h5 className='member__name'>Vladislav Khlebec</h5>
              <p className='member__position'>mentor</p>
            </div>
            <ul className='about-us__list'>
              {dataLandingMembers.map((member) => (
                <LandingMember key={member.name} {...member} />
              ))}
            </ul>
          </div>
        </section>

        <footer className='footer'>
          <div className='container footer__wrapper'>
            <div className='footer__logo-line'>
              <object type='image/svg+xml' data='images/landing/logo_small.svg' className='logo-object'>
                Your browser does not support SVG
              </object>
              <span className='footer__copyright'>@&nbsp;Copyright</span>
            </div>
            <a href='https://rollingscopes.com/' className='footer__rsschool-line'>
              <span className='footer__rsschool-logo'></span>
              <span className='footer__semibold'>RS</span>
              <span className='footer__light'>School&nbsp;</span>
              <span className='footer__semibold footer__add-color'>2020</span>
              <span className='footer__light footer__add-color'>Q1</span>
            </a>
          </div>
        </footer>
      </div>
    </AppLayout>
  )
}

export default withInfo(MainPage)

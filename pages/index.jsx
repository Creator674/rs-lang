import React from 'react'
import './style.less'

import { LandingCard, dataLandingCards } from 'components/LandingCard'
import { ButtonLogIn } from 'components'

const MainPage = () => {
  return (
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
                  <a className='navigation__link' href='#home'>
                    Games
                  </a>
                </li>
                <li className='navigation__item'>
                  <a className='navigation__link' href='#home'>
                    Algorithm
                  </a>
                </li>
                <li className='navigation__item'>
                  <a className='navigation__link' href='#home'>
                    About Us
                  </a>
                </li>
              </ul>
            </nav>
            <div className='header__login'>
              <ButtonLogIn />
            </div>
          </div>
        </div>
      </header>

      <section className='promo'>
        <div className='container promo__wrapper'>
          <div className='promo__content'>
            <h1 className='promo__title'>Take your vocabulary to the next level</h1>
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
              <button className='btn-start promo__button'>Start Learning</button>
            </div>
          </div>
        </div>

        <div className='container promo__video-wrapper'>
          <div className='promo__video video'>
            <video className='video__content' src='#' width='260' height='142' preload=''></video>
            <button className='video__button'>
              <span className='visually-hidden'>Play</span>
            </button>
            <h4 className='video__title'>Learn Words</h4>
          </div>

          <div className='container promo__slogans'>
            <p className='promo__slogan'>everything is perfect</p>
            <p className='promo__slogan'>convinient, nice and interesting</p>
            <p className='promo__slogan'>intuitive</p>
          </div>
        </div>
      </section>

      <section className='games'>
        <div className='container games__wrapper'>
          <h2 className='section-title'>Games</h2>
          <ul className='games__list'>
            {dataLandingCards.map((card) => (
              <LandingCard key={card.title} {...card} />
            ))}
          </ul>
        </div>
      </section>

      <section className='algorithm'>
        <div className='container algorithm__wrapper'>
          <h2 className='section-title'>Algorithm</h2>
          <div className='algorithm__content'>
            <div className='algorithm__light'>
              <p className='algorithm__text'>
                What you study is based on what you already know and what you’ll use most, not what someone else says
                you should learn. Lingvist is designed to get you into a learning flow with no distractions.
              </p>
              <p className='algorithm__text'>
                What you study is based on what you already know and what you’ll use most, not what someone else says
                you should learn. What you study is based on what you already know and what you’ll use most, not what
                someone else says you should learn.
              </p>
              <p className='algorithm__text'>
                Lingvist is designed to get you into a learning flow with no distractions.
              </p>
            </div>
            <div className='algorithm__dark'>
              <p className='algorithm__text'>
                What you study is based on what you already know and what you’ll use most, not what someone else says
                you should learn. Lingvist is designed to get you into a learning flow with no distractions.
              </p>
              <p className='algorithm__text'>
                What you study is based on what you already know and what you’ll use most, not what someone else says
                you should learn. What you study is based on what you already know and what you’ll use most, not what
                someone else says you should learn.
              </p>
              <p className='algorithm__text'>
                Lingvist is designed to get you into a learning flow with no distractions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='about-us'>
        <div className='container'>
          <h2 className='section-title about-us__title'>About Us</h2>
          <p className='about-us__subtitle'>Snow White and the 7 dwarfs</p>
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
            <li className='about-us__item'>
              <div className='member'>
                <div className='member__wrapper'>
                  <h5 className='member__name'>Dima Xmiel</h5>
                  <p className='member__position'>team-lead</p>
                </div>
                <a href='' className='member__github'>
                  <span className='member__nikname'>xmelsky</span>
                  <span className='member__github-icon'></span>
                </a>
                <img src='images/landing/xmelsky.png' alt='Dima Xmiel' className='member__picture' />
              </div>
            </li>
            <li className='about-us__item'>
              <div className='member'>
                <div className='member__wrapper'>
                  <h5 className='member__name'>Dima Xmiel</h5>
                  <p className='member__position'>team-lead</p>
                </div>
                <a href='' className='member__github'>
                  <span className='member__nikname'>xmelsky</span>
                  <span className='member__github-icon'></span>
                </a>
                <img src='images/landing/xmelsky.png' alt='Dima Xmiel' className='member__picture' />
              </div>
            </li>
            <li className='about-us__item'>
              <div className='member'>
                <div className='member__wrapper'>
                  <h5 className='member__name'>Dima Xmiel</h5>
                  <p className='member__position'>team-lead</p>
                </div>
                <a href='' className='member__github'>
                  <span className='member__nikname'>xmelsky</span>
                  <span className='member__github-icon'></span>
                </a>
                <img src='images/landing/xmelsky.png' alt='Dima Xmiel' className='member__picture' />
              </div>
            </li>
            <li className='about-us__item'>
              <div className='member'>
                <div className='member__wrapper'>
                  <h5 className='member__name'>Dima Xmiel</h5>
                  <p className='member__position'>team-lead</p>
                </div>
                <a href='' className='member__github'>
                  <span className='member__nikname'>xmelsky</span>
                  <span className='member__github-icon'></span>
                </a>
                <img src='images/landing/xmelsky.png' alt='Dima Xmiel' className='member__picture' />
              </div>
            </li>
            <li className='about-us__item'>
              <div className='member'>
                <div className='member__wrapper'>
                  <h5 className='member__name'>Dima Xmiel</h5>
                  <p className='member__position'>team-lead</p>
                </div>
                <a href='' className='member__github'>
                  <span className='member__nikname'>xmelsky</span>
                  <span className='member__github-icon'></span>
                </a>
                <img src='images/landing/xmelsky.png' alt='Dima Xmiel' className='member__picture' />
              </div>
            </li>
            <li className='about-us__item'>
              <div className='member'>
                <div className='member__wrapper'>
                  <h5 className='member__name'>Dima Xmiel</h5>
                  <p className='member__position'>team-lead</p>
                </div>
                <a href='' className='member__github'>
                  <span className='member__nikname'>xmelsky</span>
                  <span className='member__github-icon'></span>
                </a>
                <img src='images/landing/xmelsky.png' alt='Dima Xmiel' className='member__picture' />
              </div>
            </li>
            <li className='about-us__item'>
              <div className='member'>
                <div className='member__wrapper'>
                  <h5 className='member__name'>Dima Xmiel</h5>
                  <p className='member__position'>team-lead</p>
                </div>
                <a href='' className='member__github'>
                  <span className='member__nikname'>xmelsky</span>
                  <span className='member__github-icon'></span>
                </a>
                <img src='images/landing/xmelsky.png' alt='Dima Xmiel' className='member__picture' />
              </div>
            </li>
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
  )
}

export default MainPage

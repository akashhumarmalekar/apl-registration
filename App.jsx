import React from 'react';

const EVENT = {
  name: 'Anand Premier League',
  date: '14 September 2026',
  time: '4:30 PM onwards',
  venue: '9 Star Turf'
};

/**
 * Top hero section — displays the tournament identity and event details
 * as a stylised matchday ticket stub.
 */
export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__inner">
        <span className="hero__eyebrow">🏏 Season opener · 2026</span>
        <h1 className="hero__title">
          Anand<br />Premier <em>League</em>
        </h1>

        <div className="ticket">
          <div className="ticket__main">
            <div className="ticket__row">
              <span className="ticket__icon" aria-hidden="true">📅</span>
              <div>
                <p className="ticket__label">Match day</p>
                <p className="ticket__value">{EVENT.date}</p>
              </div>
            </div>
            <div className="ticket__row">
              <span className="ticket__icon" aria-hidden="true">⏰</span>
              <div>
                <p className="ticket__label">First ball</p>
                <p className="ticket__value">{EVENT.time}</p>
              </div>
            </div>
            <div className="ticket__row">
              <span className="ticket__icon" aria-hidden="true">📍</span>
              <div>
                <p className="ticket__label">Venue</p>
                <p className="ticket__value">{EVENT.venue}</p>
              </div>
            </div>
          </div>
          <div className="ticket__stub" aria-hidden="true">
            <span className="ticket__vertical">APL · 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}

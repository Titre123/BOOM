import React from 'react';
import '../styles/components/sponsor.css'

const sponsors = [
  { name: 'Spotify', logo: 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png' },
  { name: 'Apple Music', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { name: 'Pandora', logo: 'https://cdn.freebiesupply.com/logos/large/2x/pandora-1-logo-png-transparent.png' },
];

const SponsorSection = () => {
  return (
    <div className="SponsorSection">
      <div className="SponsorSection-container">
        <div className="SponsorSection-title">Sponsored by:</div>
        <div className="SponsorSection-logos">
        {sponsors.map((sponsor) => (
          <div key={sponsor.name} className="sponsor">
            <img src={sponsor.logo} alt={sponsor.name} />
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default SponsorSection;

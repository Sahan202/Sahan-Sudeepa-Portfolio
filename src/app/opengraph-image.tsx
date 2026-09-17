import { ImageResponse } from 'next/og';
export const alt = 'Sahan Sudeepa — Software Engineer & Full-Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#10110f',
          color: '#f1f0e9',
          display: 'flex',
          flexDirection: 'column',
          padding: '70px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 21,
            color: '#b1b2a9',
          }}
        >
          <span>Sahan.</span>
          <span>BASED IN SRI LANKA</span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 70,
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -5,
          }}
        >
          <span>SAHAN</span>
          <span style={{ color: '#e9b783' }}>SUDEEPA.</span>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 35,
            fontSize: 25,
            color: '#b1b2a9',
          }}
        >
          Software Engineer & Full-Stack Developer
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 'auto',
            paddingTop: 20,
            borderTop: '1px solid #35372e',
            fontSize: 17,
            color: '#e9b783',
          }}
        >
          Thoughtful interfaces. Solid engineering.
        </div>
      </div>
    ),
    size
  );
}

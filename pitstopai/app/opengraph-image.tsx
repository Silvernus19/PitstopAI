import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'PitStopAI - Your Kenyan AI Mechanic'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    background: '#0D0D0D', // pit-black
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    position: 'relative',
                    padding: '40px',
                }}
            >
                {/* Background Decorative Element */}
                <div
                    style={{
                        position: 'absolute',
                        top: -100,
                        left: -100,
                        width: 400,
                        height: 400,
                        background: 'radial-gradient(circle, rgba(255,107,0,0.15) 0%, rgba(0,0,0,0) 70%)',
                        borderRadius: '50%',
                    }}
                />

                {/* Logo and Brand */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: '#FF6B00', // pit-accent
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '24px',
                        boxShadow: '0 0 40px rgba(255,107,0,0.3)'
                    }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                            <circle cx="7" cy="17" r="2" />
                            <path d="M9 17h6" />
                            <circle cx="17" cy="17" r="2" />
                        </svg>
                    </div>
                    <h1 style={{
                        fontSize: '84px',
                        fontWeight: '900',
                        color: 'white',
                        margin: 0,
                        letterSpacing: '-2px'
                    }}>
                        PitStop<span style={{ color: '#FF6B00' }}>AI</span>
                    </h1>
                </div>

                {/* Tagline */}
                <div style={{
                    fontSize: '32px',
                    color: '#A1A1AA', // pit-subtext
                    textAlign: 'center',
                    maxWidth: '800px',
                    lineHeight: 1.4,
                    fontWeight: '500'
                }}>
                    Your Professional Kenyan AI Mechanic for Reliable Diagnostics, Part Prices, and Trusted Mechanics.
                </div>

                {/* Footer info */}
                <div style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#52525B',
                }}>
                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>pitstopai.com</span>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#52525B', margin: '0 12px' }} />
                    <span style={{ fontSize: '18px' }}>Expertly maintaining Kenyan roads</span>
                </div>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    )
}

import { useState, useEffect } from 'react'
import type { Product } from './types/ecommerce'
import { getProducts } from './services/api'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
import logoVHash from './assets/logoVHash.png'
import logoKiHash from './assets/logoKiHash.png'
import './App.css'

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
   <div style={{ fontFamily: 'Segoe UI, sans-serif', width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '0px 24px 24px 24px' }}>
      {/* Top Navbar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #0078D4', marginBottom: '24px' }}>
        {/* Brand Logos Container */}
<div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
  <img 
    src={logoVHash} 
    alt="Vhaash Technologies" 
    style={{ height: '42px', width: 'auto', objectFit: 'contain' }} 
  />
  <div style={{ width: '1px', height: '32px', backgroundColor: '#CBD5E1' }} />
  <img 
    src={logoKiHash} 
    alt="KiHash" 
    style={{ width: '135px', height: 'auto', objectFit: 'contain' }} 
  />
</div>
        <div>
          <h1 style={{ margin: 0, color: '#0F2C59', fontSize: '24px' }}>CloudMart Store</h1>
          <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '14px' }}>React 19 + TypeScript + Azure Demo</p>
        </div>
        <div style={{ background: '#0078D4', color: '#fff', padding: '8px 18px', borderRadius: '20px', fontWeight: 'bold', fontSize: '15px' }}>
          🛒 Cart: {cartCount}
        </div>
      </header>

      {/* Loading state */}
      {loading ? (
       <div style={{ textAlign: 'center', padding: '80px 20px' }}>
    {/* CSS Spinner */}
    <div
      style={{
        width: '48px',
        height: '48px',
        border: '5px solid #E2E8F0',
        borderTop: '5px solid #0078D4',
        borderRadius: '50%',
        margin: '0 auto 16px',
        animation: 'spin 1s linear infinite'
      }}
    />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
    <h3 style={{ color: '#0F2C59', margin: '0 0 8px' }}>Fetching Catalog from DummyJSON API...</h3>
    <p style={{ color: '#64748B', margin: 0, fontSize: '14px' }}>Simulating cloud API latency (3.5s)</p>
  </div>
      ) : (
        /* Product Cards Grid */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
    gap: '20px',     width: '100%' }}>
          {products.map((item) => (
            <div
              key={item.id}
              style={{
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
              }}
            >
              <div>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={{ width: '100%', height: '180px', objectFit: 'contain', background: '#F8FAFC', borderRadius: '6px' }}
                />
                <span style={{ display: 'inline-block', marginTop: '10px', padding: '2px 8px', background: '#E2E8F0', borderRadius: '4px', fontSize: '11px', textTransform: 'uppercase', color: '#334155', fontWeight: 'bold' }}>
                  {item.category}
                </span>
                <h3 style={{ fontSize: '16px', color: '#1E293B', margin: '8px 0 4px', height: '42px', overflow: 'hidden' }}>
                  {item.title}
                </h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#F59E0B' }}>
                  ★ {item.rating} / 5.0
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#0F2C59' }}>
                  ${item.price}
                </span>
                <button
                  onClick={() => setCartCount((prev) => prev + 1)}
                  style={{
                    backgroundColor: '#0078D4',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '13px'
                  }}
                >
                  + Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

import brandAmbassadorImg from '../assets/brand.png'

// Placeholder components for sections
const HeroSection = () => (
  <div className='hero-section'>
    <div className='container'>
      <div className='hero-content'>
        <h1>Layani Pelanggan 24/7 Dengan AI Agents</h1>
        <p>
          Otomatiskan layanan pelanggan Anda, tingkatkan penjualan, dan bangun
          hubungan yang lebih baik dengan pelanggan Anda menggunakan agen AI
          canggih kami.
        </p>
        <div className='hero-buttons'>
          <Link to='/register' className='btn'>
            Daftar Sekarang
          </Link>
          <Link to='/contact' className='btn ghost'>
            Konsultasi dengan Kami
          </Link>
        </div>
      </div>
      <div className='hero-image'>
        {/* Placeholder for brand ambassador photo */}
        <img src={brandAmbassadorImg} alt='Brand Ambassador' />
      </div>
    </div>
  </div>
)

const AboutSection = () => (
  <div className='about-section'>
    <div className='about-content'>
      <h2>Tingkatkan Penjualan dan Efisiensi</h2>
      <p>
        Platform kami membantu Anda mengubah prospek menjadi pelanggan setia.
        Dengan otomatisasi cerdas, Anda dapat fokus pada hal yang paling
        penting: mengembangkan bisnis Anda. Analitik mendalam memberi Anda
        wawasan untuk membuat keputusan yang lebih baik.
      </p>
    </div>
    <div className='about-image'>
      <div className='phone-mockup'>
        <div className='testbox'>
          <div className='testhead'>
            <div className='avatar'>C</div>
            <span>Client</span>
          </div>
          <div className='testmsgs'>
            <div className='bbl user landing-chat-bubble'>
              Halo, apakah produk ini ready?
            </div>
            <div className='bbl ai landing-chat-bubble'>
              Tentu! Stok kami selalu update. Silahkan diorder.
            </div>
            <div className='bbl user landing-chat-bubble'>
              Oke, saya order sekarang.
            </div>
          </div>
          <div className='row' style={{ padding: '10px' }}>
            <input type='text' className='input' placeholder='Ketik pesan...' />
            <button className='btn send-btn'>&#10148;</button>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const PricingSection = () => (
  <div className='pricing-section'>
    <h2>Harga & Paket</h2>
    <div className='pricing-cards'>
      <div className='pricing-card'>
        <h3>Basic</h3>
        <p className='price'>
          Rp 150.000<span>/bulan</span>
        </p>
        <ul>
          <li>1 Agen AI</li>
          <li>1.000 Pesan/Bulan</li>
          <li>Integrasi WhatsApp</li>
          <li>Analitik Dasar</li>
        </ul>
        <Link to='/register' className='btn ghost'>
          Pilih Paket
        </Link>
      </div>
      <div className='pricing-card featured'>
        <h3>Pro</h3>
        <p className='price'>
          Rp 450.000<span>/bulan</span>
        </p>
        <ul>
          <li>5 Agen AI</li>
          <li>5.000 Pesan/Bulan</li>
          <li>Integrasi Multi-platform</li>
          <li>Analitik Lanjutan</li>
          <li>Dukungan Prioritas</li>
        </ul>
        <Link to='/register' className='btn'>
          Pilih Paket
        </Link>
      </div>
      <div className='pricing-card'>
        <h3>Enterprise</h3>
        <p className='price'>Hubungi Kami</p>
        <ul>
          <li>Agen AI Tanpa Batas</li>
          <li>Volume Pesan Kustom</li>
          <li>Fitur Kustom</li>
          <li>Dukungan Khusus</li>
        </ul>
        <Link to='/contact' className='btn ghost'>
          Hubungi Sales
        </Link>
      </div>
    </div>
  </div>
)

const TestimonialSection = () => (
  <div className='testimonial-section'>
    <div className='container'>
      <h2>Apa Kata Klien Kami</h2>
    </div>
    <div className='testimonial-slider'>
      <div className='testimonial-track'>
        {/* Original Cards */}
        <div className='testimonial-card'>
          <p>
            &quot;Sejak menggunakan platform ini, efisiensi layanan pelanggan kami
            meningkat 200%. Sangat direkomendasikan!&quot;
          </p>
          <p className='client-name'>- John Doe, CEO TechCorp</p>
        </div>
        <div className='testimonial-card'>
          <p>
            &quot;Analitiknya sangat membantu kami memahami pelanggan. Penjualan kami
            naik 30% dalam tiga bulan pertama.&quot;
          </p>
          <p className='client-name'>
            - Jane Smith, Marketing Head at Marketify
          </p>
        </div>
        <div className='testimonial-card'>
          <p>
            &quot;Sangat mudah digunakan dan diintegrasikan dengan sistem kami yang
            sudah ada. Tim dukungan juga sangat membantu.&quot;
          </p>
          <p className='client-name'>- Samuel Green, IT Director</p>
        </div>
        <div className='testimonial-card'>
          <p>
            &quot;Agen AI-nya luar biasa! Menghemat banyak waktu tim kami untuk
            menjawab pertanyaan berulang.&quot;
          </p>
          <p className='client-name'>- Emily White, Operations Manager</p>
        </div>
        <div className='testimonial-card'>
          <p>
            &quot;Platform yang kuat dengan harga yang sangat terjangkau. Nilai yang
            luar biasa untuk bisnis kecil kami.&quot;
          </p>
          <p className='client-name'>- Michael Brown, Small Business Owner</p>
        </div>
        <div className='testimonial-card'>
          <p>
            &quot;Saya suka bagaimana saya bisa mengelola semua saluran komunikasi
            saya dari satu tempat. Jenius!&quot;
          </p>
          <p className='client-name'>- Sarah Johnson, Social Media Manager</p>
        </div>
        {/* Duplicate Cards for seamless loop */}
        <div className='testimonial-card'>
          <p>
            &quot;Sejak menggunakan platform ini, efisiensi layanan pelanggan kami
            meningkat 200%. Sangat direkomendasikan!&quot;
          </p>
          <p className='client-name'>- John Doe, CEO TechCorp</p>
        </div>
        <div className='testimonial-card'>
          <p>
            &quot;Analitiknya sangat membantu kami memahami pelanggan. Penjualan kami
            naik 30% dalam tiga bulan pertama.&quot;
          </p>
          <p className='client-name'>
            - Jane Smith, Marketing Head at Marketify
          </p>
        </div>
        <div className='testimonial-card'>
          <p>
            &quot;Sangat mudah digunakan dan diintegrasikan dengan sistem kami yang
            sudah ada. Tim dukungan juga sangat membantu.&quot;
          </p>
          <p className='client-name'>- Samuel Green, IT Director</p>
        </div>
        <div className='testimonial-card'>
          <p>
            &quot;Agen AI-nya luar biasa! Menghemat banyak waktu tim kami untuk
            menjawab pertanyaan berulang.&quot;
          </p>
          <p className='client-name'>- Emily White, Operations Manager</p>
        </div>
        <div className='testimonial-card'>
          <p>
            &quot;Platform yang kuat dengan harga yang sangat terjangkau. Nilai yang
            luar biasa untuk bisnis kecil kami.&quot;
          </p>
          <p className='client-name'>- Michael Brown, Small Business Owner</p>
        </div>
        <div className='testimonial-card'>
          <p>
            &quot;Saya suka bagaimana saya bisa mengelola semua saluran komunikasi
            saya dari satu tempat. Jenius!&quot;
          </p>
          <p className='client-name'>- Sarah Johnson, Social Media Manager</p>
        </div>
      </div>
    </div>
  </div>
)

const Footer = () => (
  <footer className='footer'>
    <p>&copy; {new Date().getFullYear()} KALIS.AI. Semua Hak Dilindungi.</p>
  </footer>
)

export default function Landing() {
  return (
    <div className='landing-page'>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PricingSection />
      <TestimonialSection />
      <Footer />
    </div>
  )
}
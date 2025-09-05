import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "Apa itu platform digitalisasi UMKM Stride?",
      answer: "Stride adalah platform komprehensif yang membantu UMKM Indonesia bertransformasi digital dengan menyediakan tools untuk membuat toko online, mengelola inventory, analytics, dan berbagai fitur digital lainnya dalam satu platform yang mudah digunakan."
    },
    {
      question: "Bagaimana cara memulai digitalisasi bisnis saya?",
      answer: "Sangat mudah! Daftar akun gratis, konsultasi dengan tim ahli kami, setup platform sesuai kebutuhan bisnis Anda, ikuti training, dan bisnis digital Anda siap go-live. Seluruh proses didampingi penuh oleh tim support kami."
    },
    {
      question: "Berapa biaya untuk menggunakan platform Stride?",
      answer: "Kami menyediakan berbagai paket yang terjangkau mulai dari paket basic gratis hingga paket premium. Biaya disesuaikan dengan fitur dan kebutuhan bisnis Anda. Konsultasi gratis untuk mendapatkan rekomendasi paket terbaik."
    },
    {
      question: "Apakah saya perlu keahlian teknis untuk menggunakan platform ini?",
      answer: "Tidak sama sekali! Platform Stride dirancang user-friendly untuk UMKM tanpa background teknis. Kami juga menyediakan training lengkap dan support 24/7 untuk memastikan Anda dapat mengoperasikan platform dengan mudah."
    },
    {
      question: "Bagaimana keamanan data bisnis saya dijamin?",
      answer: "Keamanan data adalah prioritas utama kami. Kami menggunakan enkripsi tingkat enterprise, backup otomatis, dan infrastruktur cloud terpercaya. Data Anda disimpan dengan standar keamanan internasional dan compliance yang ketat."
    },
    {
      question: "Apakah bisa integrasi dengan sistem yang sudah ada?",
      answer: "Ya, platform Stride dapat diintegrasikan dengan berbagai sistem existing seperti POS, accounting software, payment gateway, dan marketplace. Tim teknis kami akan membantu proses integrasi agar berjalan lancar."
    },
    {
      question: "Bagaimana cara mendapatkan support jika ada masalah?",
      answer: "Kami menyediakan support 24/7 melalui berbagai channel: live chat, WhatsApp, email, dan phone support. Tim support kami terdiri dari ahli yang siap membantu menyelesaikan masalah teknis maupun konsultasi bisnis."
    },
    {
      question: "Apakah ada training untuk menggunakan platform?",
      answer: "Tentu! Kami menyediakan training komprehensif mulai dari basic hingga advanced. Training tersedia dalam bentuk video tutorial, webinar, workshop, dan one-on-one session dengan trainer berpengalaman."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <div className="faq-header">
          <h2>Frequently Asked Questions</h2>
          <p>Temukan jawaban untuk pertanyaan yang sering diajukan tentang digitalisasi UMKM</p>
        </div>
        
        <div className="faq-list">
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <button 
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
              >
                <span>{faq.question}</span>
                <div className="faq-icon">
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className={activeIndex === index ? 'rotated' : ''}
                  >
                    <path 
                      d="M6 9L12 15L18 9" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
              <div className={`faq-answer ${activeIndex === index ? 'expanded' : ''}`}>
                <div className="faq-answer-content">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-cta">
          <h3>Masih ada pertanyaan lain?</h3>
          <p>Tim support kami siap membantu Anda 24/7</p>
          <a href="/contact" className="faq-contact-btn">
            Hubungi Kami
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
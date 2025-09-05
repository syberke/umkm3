import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Halo! Saya adalah asisten AI Stride. Saya dapat membantu Anda dengan informasi tentang produk, digitalisasi UMKM, dan layanan kami. Ada yang bisa saya bantu?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simple AI responses based on keywords
  const getAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Knowledge base responses
    const responses = {
      greeting: [
        'Halo! Senang bertemu dengan Anda. Bagaimana saya bisa membantu Anda hari ini?',
        'Hai! Saya di sini untuk membantu Anda dengan segala kebutuhan terkait Stride.',
        'Selamat datang! Ada yang ingin Anda ketahui tentang produk atau layanan kami?'
      ],
      product: [
        'Kami memiliki berbagai koleksi sepatu berkualitas tinggi mulai dari casual, running, formal, hingga sport. Setiap produk dibuat dengan material terbaik dan desain yang trendy. Apakah ada kategori tertentu yang Anda cari?',
        'Produk Stride dirancang khusus untuk kenyamanan dan gaya. Kami memiliki berbagai pilihan warna dan ukuran. Ingin melihat koleksi terbaru kami?',
        'Semua produk Stride menggunakan teknologi terdepan untuk memberikan kenyamanan maksimal. Kami juga menyediakan garansi kualitas untuk setiap pembelian.'
      ],
      digitalization: [
        'Digitalisasi UMKM adalah fokus utama kami. Kami membantu UMKM Indonesia go-digital dengan platform terintegrasi yang mudah digunakan. Sudah 500+ UMKM yang berhasil meningkatkan penjualan hingga 300% dengan bantuan kami.',
        'Platform digitalisasi Stride menyediakan toko online, manajemen inventory, analytics, dan customer support dalam satu sistem. Kami juga memberikan training dan pendampingan penuh.',
        'Dengan digitalisasi, UMKM dapat menjangkau pasar yang lebih luas, meningkatkan efisiensi operasional, dan membuat keputusan berdasarkan data. Ingin konsultasi gratis?'
      ],
      price: [
        'Harga produk kami sangat kompetitif, mulai dari Rp 399.000 hingga Rp 650.000 tergantung kategori dan fitur. Kami juga sering memberikan promo menarik!',
        'Untuk informasi harga terbaru dan promo yang sedang berlangsung, Anda bisa langsung menghubungi tim sales kami atau melihat katalog produk.',
        'Kami menawarkan berbagai paket digitalisasi mulai dari paket basic gratis hingga premium. Harga disesuaikan dengan kebutuhan bisnis Anda.'
      ],
      contact: [
        'Anda bisa menghubungi kami melalui WhatsApp di +62 895 0614 7763, email di info@stride.co.id, atau datang langsung ke toko kami di Bogor. Kami buka setiap hari jam 08:00-22:00.',
        'Tim customer service kami siap membantu 24/7. Hubungi kami kapan saja untuk konsultasi atau informasi lebih lanjut.',
        'Untuk konsultasi digitalisasi UMKM, Anda bisa booking session gratis dengan tim ahli kami melalui WhatsApp atau website.'
      ],
      order: [
        'Untuk memesan produk, Anda bisa langsung klik tombol "Pesan via WhatsApp" di halaman produk, atau hubungi kami langsung. Kami akan membantu proses pemesanan hingga pengiriman.',
        'Proses pemesanan sangat mudah! Pilih produk, tentukan ukuran dan warna, lalu hubungi kami via WhatsApp. Kami akan konfirmasi detail dan arrange pengiriman.',
        'Kami menerima berbagai metode pembayaran dan menyediakan layanan pengiriman ke seluruh Indonesia. Garansi produk dan kepuasan pelanggan adalah prioritas kami.'
      ]
    };

    // Determine response category based on keywords
    if (message.includes('hai') || message.includes('halo') || message.includes('hello')) {
      return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
    } else if (message.includes('produk') || message.includes('sepatu') || message.includes('koleksi')) {
      return responses.product[Math.floor(Math.random() * responses.product.length)];
    } else if (message.includes('digital') || message.includes('umkm') || message.includes('platform')) {
      return responses.digitalization[Math.floor(Math.random() * responses.digitalization.length)];
    } else if (message.includes('harga') || message.includes('biaya') || message.includes('price')) {
      return responses.price[Math.floor(Math.random() * responses.price.length)];
    } else if (message.includes('kontak') || message.includes('hubungi') || message.includes('contact')) {
      return responses.contact[Math.floor(Math.random() * responses.contact.length)];
    } else if (message.includes('pesan') || message.includes('beli') || message.includes('order')) {
      return responses.order[Math.floor(Math.random() * responses.order.length)];
    } else {
      // Default responses for unrecognized queries
      const defaultResponses = [
        'Maaf, saya belum sepenuhnya memahami pertanyaan Anda. Bisakah Anda menjelaskan lebih detail? Atau Anda bisa menanyakan tentang produk, digitalisasi UMKM, harga, atau cara pemesanan.',
        'Saya masih belajar untuk memberikan jawaban yang lebih baik. Sementara itu, Anda bisa menghubungi tim customer service kami untuk bantuan lebih lanjut.',
        'Pertanyaan yang menarik! Untuk informasi lebih spesifik, saya sarankan Anda menghubungi tim ahli kami yang akan memberikan jawaban detail sesuai kebutuhan Anda.'
      ];
      return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getAIResponse(inputValue);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const handleQuickAction = (action) => {
    setInputValue(action);
    handleSendMessage();
  };

  const quickActions = [
    'Info produk terbaru',
    'Cara digitalisasi UMKM',
    'Harga dan promo',
    'Cara pemesanan',
    'Hubungi customer service'
  ];

  return (
    <div className="chatbot-container">
      <button 
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Chat dengan AI Assistant"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
          <div className="chatbot-header">
            <div className="chatbot-avatar">🤖</div>
            <div className="chatbot-info">
              <h3>Stride AI Assistant</h3>
              <p>Siap membantu Anda 24/7</p>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.type}`}>
                <div className="message-avatar">
                  {message.type === 'user' ? '👤' : '🤖'}
                </div>
                <div className="message-content">
                  {message.content}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="message-avatar">🤖</div>
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ketik pesan Anda..."
              disabled={isTyping}
            />
            <button 
              className="send-button"
              onClick={handleSendMessage}
              disabled={isTyping || !inputValue.trim()}
            >
              ➤
            </button>
          </div>

          {messages.length === 1 && (
            <div className="quick-actions" style={{ padding: '0 20px 20px' }}>
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="quick-action"
                  onClick={() => handleQuickAction(action)}
                >
                  {action}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
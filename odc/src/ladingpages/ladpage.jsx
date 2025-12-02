import React, { useState, useEffect } from 'react';
import { Activity, Heart, Calendar, Video, Users, Shield, Clock, Star } from 'lucide-react';
import "./ladpage.css"
import { useNavigate } from 'react-router-dom';

export default function MediConnectLanding() {
  const [scrollY, setScrollY] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
 const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const heroImages = [
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-teal-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Heart className="w-10 h-10 text-teal-500" fill="currentColor" />
                <Activity className="w-5 h-5 text-cyan-500 absolute top-0 right-0" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                VitalConnect
              </span>
            </div>
            
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#home" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">Home</a>
              <a href="#about" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">About</a>
              <a href="#services" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">Services</a>
              <a href="#contact" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">Contact</a>
            </div>

            <div className="flex space-x-4">
              <button onClick={()=>navigate("/login")}className="px-6 py-2.5 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                Patient Login
              </button>
              <button onClick={()=>navigate("/doctorlogin")}className="px-6 py-2.5 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                Doctor Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 z-10">
              <div className="inline-block px-4 py-2 bg-teal-100 rounded-full">
                <span className="text-teal-700 font-semibold flex items-center gap-2">
                  <Star className="w-4 h-4" fill="currentColor" />
                  Trusted Healthcare Platform
                </span>
              </div>
              
              <h1 className="text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent animate-pulse">
                  Your Health,
                </span>
                <br />
                <span className="text-gray-800">Our Priority</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Connect with certified healthcare professionals instantly. Get expert medical consultations from the comfort of your home, 24/7.
              </p>
              
              <div className="flex gap-4 pt-4">
                <button onClick={()=>navigate("/login")}className="px-8 py-4 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Start Consultation
                </button>
                <button className="px-8 py-4 rounded-full backdrop-blur-sm bg-white/60 border-2 border-teal-300 text-teal-700 font-bold text-lg hover:bg-white/80 hover:shadow-xl transition-all duration-300">
                  Learn More
                </button>
              </div>

              <div className="flex gap-8 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600">50K+</div>
                  <div className="text-gray-600 text-sm">Patients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-600">1000+</div>
                  <div className="text-gray-600 text-sm">Doctors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600">4.9★</div>
                  <div className="text-gray-600 text-sm">Rating</div>
                </div>
              </div>
            </div>

            {/* Image Carousel with Glassmorphism */}
            <div className="relative h-[500px] rounded-3xl overflow-hidden">
              {heroImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    idx === activeImage ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Healthcare ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent" />
                </div>
              ))}
              
              {/* Glassmorphism overlay */}
              <div className="absolute bottom-8 left-8 right-8 backdrop-blur-lg bg-white/30 rounded-2xl p-6 border border-white/50 shadow-2xl">
                <h3 className="text-white font-bold text-xl mb-2">24/7 Medical Support</h3>
                <p className="text-white/90">Expert care whenever you need it</p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
      </section>

      {/* Features Section */}
      <section id="services" className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
              Why Choose VitalConnect?
            </h2>
            <p className="text-xl text-gray-600">Healthcare reimagined for the digital age</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Video, title: "Video Consultations", desc: "Face-to-face appointments with specialists", color: "teal" },
              { icon: Calendar, title: "Easy Scheduling", desc: "Book appointments in seconds", color: "cyan" },
              { icon: Clock, title: "24/7 Availability", desc: "Round-the-clock medical support", color: "teal" },
              { icon: Shield, title: "Secure & Private", desc: "HIPAA compliant platform", color: "cyan" },
              { icon: Users, title: "Expert Doctors", desc: "Certified healthcare professionals", color: "teal" },
              { icon: Heart, title: "Comprehensive Care", desc: "All specialties under one roof", color: "cyan" }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-3xl backdrop-blur-md bg-white/60 border border-gray-200 hover:border-teal-300 hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                  feature.color === 'teal' ? 'from-teal-400 to-teal-600' : 'from-cyan-400 to-cyan-600'
                } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=600&fit=crop"
                alt="Medical team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600/30 to-cyan-600/30" />
              <div className="absolute inset-0 backdrop-blur-[2px]" />
            </div>

            <div className="space-y-6">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                About VitalConnect
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We're revolutionizing healthcare by connecting patients with top-tier medical professionals through our cutting-edge telemedicine platform. Our mission is to make quality healthcare accessible to everyone, anywhere, anytime.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                With advanced technology and a network of certified specialists, we ensure you receive the best medical care without leaving your home.
              </p>
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold hover:shadow-xl hover:scale-105 transition-all duration-300">
                Read Our Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-400 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Transform Your Healthcare Experience?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Join thousands of patients who trust VitalConnect for their medical needs
          </p>
          <button onClick={()=>navigate("/login")}className="px-10 py-5 rounded-full bg-white text-teal-600 font-bold text-lg hover:shadow-2xl hover:scale-110 transition-all duration-300">
            Get Started Today
          </button>
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-8 h-8 text-teal-400" fill="currentColor" />
                <span className="text-2xl font-bold">VitalConnect</span>
              </div>
              <p className="text-gray-400">Your trusted healthcare partner, available 24/7</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-teal-400 transition-colors">Home</a>
                <a href="#" className="block text-gray-400 hover:text-teal-400 transition-colors">About Us</a>
                <a href="#" className="block text-gray-400 hover:text-teal-400 transition-colors">Services</a>
                <a href="#" className="block text-gray-400 hover:text-teal-400 transition-colors">Contact</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-lg">Services</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-teal-400 transition-colors">Video Consultation</a>
                <a href="#" className="block text-gray-400 hover:text-teal-400 transition-colors">Chat Support</a>
                <a href="#" className="block text-gray-400 hover:text-teal-400 transition-colors">Prescriptions</a>
                <a href="#" className="block text-gray-400 hover:text-teal-400 transition-colors">Lab Tests</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-lg">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>support@vitalconnect.com</p>
                <p>+1 (555) 123-4567</p>
                <p>24/7 Emergency Hotline</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; 2025 VitalConnect. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
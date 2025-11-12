"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  Target,
  Eye,
  Users,
  Award,
  Leaf,
  Heart,
  TrendingUp,
  Shield,
  Facebook,
  Instagram,
  Twitter
} from "lucide-react"

export default function AboutContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
      
      setTimeout(() => setSubmitStatus("idle"), 3000)
    } catch (error) {
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const values = [
    {
      icon: Target,
      title: "Fokus pada Pemberdayaan",
      description: "Membangun kemandirian ekonomi masyarakat desa melalui pengembangan UMKM dan potensi lokal"
    },
    {
      icon: Leaf,
      title: "Berkelanjutan",
      description: "Mendukung praktik pertanian dan produksi yang ramah lingkungan untuk generasi mendatang"
    },
    {
      icon: Heart,
      title: "Kepedulian Sosial",
      description: "Mengutamakan kesejahteraan masyarakat dan pemerataan ekonomi di tingkat desa"
    },
    {
      icon: Shield,
      title: "Transparansi",
      description: "Menjalankan usaha dengan prinsip keterbukaan dan akuntabilitas kepada masyarakat"
    }
  ]

  const achievements = [
    { icon: Users, number: "1000+", label: "Petani Bermitra" },
    { icon: TrendingUp, number: "500+", label: "Produk Lokal" },
    { icon: Award, number: "15+", label: "Desa Binaan" },
    { icon: Heart, number: "5000+", label: "Pelanggan Setia" }
  ]

  const contactInfo = [
    {
      icon: MapPin,
      title: "Alamat",
      info: "Jl. Desa Sejahtera No. 123, Purwokerto, Jawa Tengah 53116"
    },
    {
      icon: Phone,
      title: "Telepon",
      info: "+62 812-3456-7890"
    },
    {
      icon: Mail,
      title: "Email",
      info: "info@bumdes-sejahtera.id"
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      info: "Senin - Jumat: 08.00 - 17.00 WIB"
    }
  ]

  const socialMedia = [
    { icon: Facebook, name: "Facebook", url: "#", color: "hover:text-blue-600" },
    { icon: Instagram, name: "Instagram", url: "#", color: "hover:text-pink-600" },
    { icon: Twitter, name: "Twitter", url: "#", color: "hover:text-sky-500" }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-[#F5F8E8]">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=600&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#556B2F]/95 via-[#556B2F]/85 to-[#556B2F]/75" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center w-full"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Tentang Kami
            </h1>
            <p className="text-xl text-[#EFF5D2] max-w-2xl mx-auto">
              Bersama membangun ekonomi desa yang mandiri dan berkelanjutan
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-[#556B2F] mb-6">
                BUMDES Sejahtera
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                BUMDES Sejahtera adalah Badan Usaha Milik Desa yang berdedikasi untuk mengembangkan 
                potensi ekonomi lokal dan memberdayakan masyarakat desa. Kami hadir sebagai jembatan 
                antara produk unggulan desa dengan pasar yang lebih luas.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Sejak berdiri, kami telah bermitra dengan lebih dari 1000 petani dan UMKM lokal, 
                menghadirkan produk berkualitas tinggi yang ramah lingkungan dan mendukung kesejahteraan 
                masyarakat desa.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Dengan komitmen pada transparansi dan keberlanjutan, kami terus berinovasi untuk 
                menciptakan ekosistem ekonomi desa yang kuat dan mandiri.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop"
                  alt="BUMDES"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#556B2F]/60 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#8FA31E] to-[#C6D870] rounded-2xl opacity-20 blur-2xl" />
            </motion.div>
          </div>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-[#EFF5D2]/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#8FA31E] to-[#C6D870] rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#556B2F]">Visi</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Menjadi BUMDES terdepan dalam pemberdayaan ekonomi desa yang berkelanjutan, 
                inovatif, dan berdampak positif bagi kesejahteraan masyarakat.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-[#EFF5D2]/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#8FA31E] to-[#C6D870] rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#556B2F]">Misi</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#8FA31E] mt-1">•</span>
                  <span>Mengembangkan produk unggulan desa yang berkualitas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8FA31E] mt-1">•</span>
                  <span>Memberdayakan UMKM dan petani lokal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8FA31E] mt-1">•</span>
                  <span>Menerapkan praktik bisnis yang berkelanjutan</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Values */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-[#556B2F] mb-4">Nilai-Nilai Kami</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Prinsip dan komitmen yang menjadi landasan setiap langkah kami
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#EFF5D2]/20"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#8FA31E] to-[#C6D870] rounded-xl flex items-center justify-center mb-4">
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#556B2F] mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#556B2F] via-[#6B7F35] to-[#556B2F] rounded-3xl p-12 relative overflow-hidden mb-20"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6D870] rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8FA31E] rounded-full blur-3xl" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white text-center mb-12">
                Pencapaian Kami
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <achievement.icon className="w-8 h-8 text-[#C6D870]" />
                      </div>
                    </div>
                    <div className="text-4xl font-bold text-[#C6D870] mb-2">
                      {achievement.number}
                    </div>
                    <div className="text-[#EFF5D2] font-medium">{achievement.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#556B2F] mb-4">Hubungi Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ada pertanyaan atau ingin bermitra dengan kami? Jangan ragu untuk menghubungi kami
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-[#F5F8E8] rounded-xl hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#8FA31E] to-[#C6D870] rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#556B2F] mb-1">{info.title}</h3>
                      <p className="text-gray-700">{info.info}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-br from-[#F5F8E8] to-[#EFF5D2] p-6 rounded-2xl mb-8">
                <h3 className="font-bold text-[#556B2F] mb-4">Ikuti Kami</h3>
                <div className="flex gap-4">
                  {socialMedia.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-all hover:-translate-y-1 ${social.color}`}
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-lg h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d109.14089995!3d-7.4246649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655c3061b5a69d%3A0x4027a76e352e4a0!2sPurwokerto%2C%20Banyumas%20Regency%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="bg-white border-2 border-[#EFF5D2] rounded-2xl p-8 shadow-lg">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#556B2F] mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-[#EFF5D2] rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#8FA31E] transition"
                      placeholder="Masukkan nama Anda"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#556B2F] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-[#EFF5D2] rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#8FA31E] transition"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#556B2F] mb-2">
                      Subjek *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-[#EFF5D2] rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#8FA31E] transition"
                      placeholder="Topik pesan Anda"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#556B2F] mb-2">
                      Pesan *
                    </label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-[#EFF5D2] rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#8FA31E] transition resize-none"
                      placeholder="Tulis pesan Anda di sini..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-gradient-to-r from-[#8FA31E] to-[#C6D870] text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-[#8FA31E]/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Kirim Pesan
                      </>
                    )}
                  </button>

                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-center"
                    >
                      ✓ Pesan berhasil dikirim! Kami akan segera menghubungi Anda.
                    </motion.div>
                  )}

                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center"
                    >
                      ✗ Terjadi kesalahan. Silakan coba lagi.
                    </motion.div>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#556B2F] via-[#6B7F35] to-[#556B2F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#C6D870] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8FA31E] rounded-full blur-3xl" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Mari Bergabung Bersama Kami
          </h2>
          <p className="text-[#EFF5D2] text-lg mb-8">
            Jadilah bagian dari gerakan pemberdayaan ekonomi desa yang berkelanjutan
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/products"
              className="px-8 py-4 bg-white text-[#556B2F] font-semibold rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Belanja Produk Kami
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              Mitra dengan Kami
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
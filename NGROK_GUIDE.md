# Panduan Menggunakan Ngrok di Proyek Ini

## Menggunakan Ngrok untuk Webhook

Ngrok digunakan untuk membuat tunnel dari internet publik ke server lokal Anda (localhost:5000), sehingga platform eksternal seperti Telegram, WhatsApp, dll. bisa mengirimkan webhook ke aplikasi Anda.

## Cara Menggunakan Ngrok dengan Docker

### 1. Persiapan
- Pastikan Anda memiliki akun ngrok dan authtoken valid
- Dapatkan authtoken dari: https://dashboard.ngrok.com/get-started/your-authtoken

### 2. Cara Menjalankan
1. Ganti `YOUR_NGROK_AUTHTOKEN_HERE` di file `docker-compose-ngrok.yml` dengan authtoken Anda yang sebenarnya
2. Jalankan server backend di localhost:5000:
   ```bash
   cd server
   npm run dev
   ```
3. Dalam terminal terpisah, jalankan ngrok:
   ```bash
   docker-compose -f docker-compose-ngrok.yml up ngrok
   ```

### 3. Mendapatkan URL Publik
Setelah ngrok berjalan, Anda bisa:
- Melihat URL publik di log container
- Atau kunjungi http://localhost:4040 untuk antarmuka web ngrok dan lihat Forwarding URL

### 4. Menggunakan URL untuk Webhook
Gunakan URL dari ngrok untuk mendaftarkan webhook ke platform eksternal:
- Misalnya: `https://abc123.ngrok.io/webhook/telegram`

## Alternatif: Menggunakan Ngrok CLI
Jika Anda lebih suka menggunakan ngrok CLI:
1. Install ngrok CLI dari https://ngrok.com/download
2. Set authtoken:
   ```bash
   ngrok config add-authtoken <YOUR_NGROK_AUTHTOKEN>
   ```
3. Jalankan:
   ```bash
   ngrok http 5000
   ```

## Catatan Penting
- Authtoken ngrok adalah rahasia dan tidak boleh dibagikan
- URL dari ngrok berubah setiap kali Anda memulai sesi baru
- Gunakan variabel lingkungan untuk menyimpan authtoken, jangan hardcode di file
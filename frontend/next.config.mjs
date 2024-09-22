/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      // Kalau nambah gambar, pastiin domain ada di sini
      "lh3.googleusercontent.com",
      "s3.us-west-2.amazonaws.com",
      "www.google.com",
      "images-ctf.baslerweb.com",
      "graduate.northeastern.edu",
      "img.freepik.com",
      "www.shutterstock.com",
    ],
  },
};

export default nextConfig;

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const NEXTAUTH_URL = process.env.NEXTAUTH_URL || 'https://front-end-sistem-penjualan-fusx8irx5-noname000-webs-projects.vercel.app/';

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  try {
    const redirectLink = `${NEXTAUTH_URL}/auth/authentication?email=${encodeURIComponent(email)}`;

    await resend.emails.send({
      from: 'Website Login <onboarding@resend.dev>',
      to: email,
      subject: 'Kode OTP Anda',
      html: `
        <p>Kode OTP Anda: <strong>${otp}</strong></p>
        <p>Atau klik link ini untuk memverifikasi: 
          <a href="${redirectLink}">Verifikasi Sekarang</a>
        </p>
      `,
    });

    return NextResponse.json({
      status: 'sukses',
      message: 'OTP berhasil dikirim.',
      redirectUrl: redirectLink
    });
  } catch (err) {
    console.error('Error sending OTP:', err);
    return NextResponse.json({
      status: 'gagal',
      message: 'Gagal mengirim OTP.',
    });
  }
}

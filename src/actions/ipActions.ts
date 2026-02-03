'use server';

import prisma from '@/lib/prisma';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function blockIp(ip: string, reason: string = 'Manuel Engelleme') {
  try {
    const exists = await prisma.blockedIp.findUnique({ where: { ip } });
    if (exists) return { success: false, message: 'Bu IP zaten engelli.' };

    await prisma.blockedIp.create({
      data: { ip, reason }
    });

    revalidatePath('/admin');
    return { success: true, message: 'IP başarıyla engellendi.' };
  } catch (error) {
    return { success: false, message: 'Engelleme başarısız.' };
  }
}

export async function unblockIp(ip: string) {
  try {
    await prisma.blockedIp.delete({ where: { ip } });
    revalidatePath('/admin');
    return { success: true, message: 'Engel kaldırıldı.' };
  } catch (error) {
    return { success: false, message: 'İşlem başarısız.' };
  }
}

export async function isCurrentIpBlocked() {
  try {
    const headersList = await headers();
    let ip = headersList.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
    if (ip === '::1') ip = '127.0.0.1';

    const blockedEntry = await prisma.blockedIp.findUnique({
      where: { ip }
    });

    return !!blockedEntry;
  } catch (error) {
    console.error("IP Kontrol Hatası:", error);
    return false;
  }
}
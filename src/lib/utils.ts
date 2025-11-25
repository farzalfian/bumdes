import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function generateWhatsAppMessage(
  cart: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>,
  finalTotal: number
): string {
  let message = "Halo, saya ingin memesan:\n\n";
  
  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`;
    message += `   Qty: ${item.quantity} x ${formatPrice(item.price)}\n`;
    message += `   Subtotal: ${formatPrice(item.price * item.quantity)}\n\n`;
  });
  
  message += `*Total: ${formatPrice(finalTotal)}*\n\n`;
  message += "Mohon informasi untuk proses selanjutnya. Terima kasih!";
  
  return encodeURIComponent(message);
}
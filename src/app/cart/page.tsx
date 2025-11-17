"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice, generateWhatsAppMessage } from '@/lib/utils';
import PageTransition from '@/components/PageTransition';
import font from "@/lib/font"

export default function Page() {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const shippingCost = cartTotal > 500000 ? 0 : 20000;
  const finalTotal = cartTotal + shippingCost;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    setIsCheckingOut(true);
    
    // Generate WhatsApp message
    const message = generateWhatsAppMessage(cart, finalTotal);
    const whatsappUrl = `https://wa.me/6281234567890?text=${message}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    setTimeout(() => setIsCheckingOut(false), 1000);
  };

  if (cart.length === 0) {
    return (
      <PageTransition>
        <main className={`relative h-full min-h-screen w-full bg-primary-foreground ${font.primary}`}>
          <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-green-50 flex items-center justify-center px-4">
            <div className="text-center max-w-md">
              <div className="w-32 h-32 mx-auto mb-6 bg-quaternary rounded-full flex items-center justify-center shadow-lg">
                <ShoppingBag className="w-16 h-16 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-primary mb-3">Your cart is empty</h1>
              <p className="text-gray-600 mb-8">
                Looks like you haven&apos;t added anything to your cart yet.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-medium hover:bg-secondary transition shadow-md hover:shadow-lg"
              >
                <ArrowLeft className="w-5 h-5" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <main className={`relative h-full min-h-screen w-full bg-primary-foreground ${font.primary}`}>
        <div className="min-h-screen bg-linear-to-br from-quaternary via-white to-quaternary py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <Link
                href="/#products"
                className="inline-flex items-center gap-2 text-secondary hover:text-primary mb-4 transition"
              >
                <ArrowLeft className="w-5 h-5" />
                Continue Shopping
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-primary">Shopping Cart</h1>
              <p className="text-gray-600 mt-2">{cart.length} items in your cart</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-6 border-2 border-tertiary/30 hover:border-secondary hover:shadow-xl transition"
                  >
                    <div className="flex gap-6">
                      <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-xl overflow-hidden bg-quaternary border-2 border-tertiary/20">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <div>
                            <Link
                              href={`/product/${item.id}`}
                              className="font-semibold text-lg text-primary hover:text-secondary transition"
                            >
                              {item.name}
                            </Link>
                            <p className="text-sm text-gray-600 mt-1">
                              {formatPrice(item.price)} per item
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition flex-shrink-0"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center border-2 border-tertiary rounded-xl bg-quaternary/50">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-tertiary/30 transition text-primary"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-6 font-medium text-primary">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-tertiary/30 transition text-primary"
                              disabled={item.quantity >= item.stock}
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="font-bold text-xl text-primary">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                            {item.quantity >= item.stock && (
                              <div className="text-xs text-red-500 mt-1">Max stock reached</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={clearCart}
                  className="w-full py-3 text-red-500 hover:bg-red-50 rounded-xl font-medium transition border-2 border-red-200"
                >
                  Clear All Items
                </button>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 border-2 border-tertiary/40 shadow-lg sticky top-24">
                  <h2 className="text-2xl font-bold text-primary mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal ({cart.length} items)</span>
                      <span className="font-medium text-primary">{formatPrice(cartTotal)}</span>
                    </div>

                    <div className="flex justify-between text-gray-700">
                      <span>Shipping</span>
                      <span className="font-medium">
                        {shippingCost === 0 ? (
                          <span className="text-secondary font-semibold">FREE</span>
                        ) : (
                          <span className="text-primary">{formatPrice(shippingCost)}</span>
                        )}
                      </span>
                    </div>

                    {cartTotal < 500000 && (
                      <div className="p-3 bg-quaternary border-2 border-tertiary rounded-lg text-sm text-primary">
                        💡 Add {formatPrice(500000 - cartTotal)} more for free shipping!
                      </div>
                    )}

                    <div className="border-t-2 border-tertiary/30 pt-4">
                      <div className="flex justify-between items-baseline">
                        <span className="text-lg font-semibold text-primary">Total</span>
                        <span className="text-3xl font-bold text-primary">
                          {formatPrice(finalTotal)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-4 bg-primary text-white rounded-xl font-medium hover:bg-secondary transition flex items-center justify-center gap-2 disabled:bg-gray-400 shadow-md hover:shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {isCheckingOut ? 'Opening WhatsApp...' : 'Checkout via WhatsApp'}
                  </button>

                  <p className="text-xs text-gray-600 text-center mt-4">
                    You will be redirected to WhatsApp to complete your order
                  </p>

                  <div className="mt-6 pt-6 border-t-2 border-tertiary/30">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                      <span className="text-secondary font-bold">✓</span>
                      Secure checkout
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-700 mt-2">
                      <span className="text-secondary font-bold">✓</span>
                      30-day return policy
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
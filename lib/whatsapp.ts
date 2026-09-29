import type { CartItem } from "@/types";

const MESSAGE_LIMIT = 1800;

function formatMoney(amount: number) {
  return `$${amount.toFixed(2)}`;
}

function buildFullMessage(items: CartItem[], total: number) {
  const lines = items.map(
    ({ product, quantity }) =>
      `• ${product.name} x${quantity} - ${formatMoney(product.price * quantity)}`
  );

  return [
    "Hola! Quisiera ordenar los siguientes productos:",
    "",
    ...lines,
    "",
    `Total: ${formatMoney(total)}`,
  ].join("\n");
}

function buildShortMessage(items: CartItem[], total: number) {
  const lines = items.map(
    ({ product, quantity }) => `• ${product.name} x${quantity}`
  );

  return [
    "Hola! Quisiera ordenar los siguientes productos:",
    "",
    ...lines,
    "",
    `Total: ${formatMoney(total)}`,
  ].join("\n");
}

export function normalizeWhatsAppNumber(whatsappNumber: string) {
  return whatsappNumber.replace(/\D/g, "");
}

export function buildWhatsAppOrderUrl(
  whatsappNumber: string,
  items: CartItem[]
) {
  const phone = normalizeWhatsAppNumber(whatsappNumber);
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  let message = buildFullMessage(items, total);

  if (message.length > MESSAGE_LIMIT) {
    console.warn(
      `WhatsApp order message exceeded ${MESSAGE_LIMIT} characters (${message.length}). Using shortened format (name + quantity only).`
    );
    message = buildShortMessage(items, total);
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

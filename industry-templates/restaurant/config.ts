import type { IndustryTemplate } from "@/config/industry.config";

export const restaurantTemplate: IndustryTemplate = {
  id: "restaurant",
  name: { en: "Restaurant", es: "Restaurante" },
  tagline: {
    en: "Menu, orders, kitchen and delivery — branded for one venue or a chain.",
    es: "Menú, pedidos, cocina y delivery — para un local o cadena.",
  },
  description: {
    en: "Online menu, product catalog with categories, cart and checkout, kitchen-side order management and WhatsApp pickup/delivery notifications.",
    es: "Menú online, catálogo de productos con categorías, carrito y checkout, gestión de pedidos del lado de cocina y notificaciones WhatsApp para pickup/delivery.",
  },
  icon: "UtensilsCrossed",
  recommendedArchetype: "operations",
  modules: [
    "ecommerce",
    "payments",
    "communication",
    "notifications",
    "user-operations",
    "analytics",
    "dynamic-content",
  ],
  roles: [
    {
      key: "owner",
      label: { en: "Owner", es: "Dueño" },
      description: {
        en: "Top-level account holder. Full access to all venues.",
        es: "Titular de la cuenta. Acceso total a todas las sucursales.",
      },
    },
    {
      key: "admin",
      label: { en: "Manager", es: "Encargado" },
      description: {
        en: "Manages menu, staff, orders and reports for one venue.",
        es: "Gestiona menú, personal, pedidos y reportes para una sucursal.",
      },
    },
    {
      key: "kitchen",
      label: { en: "Kitchen", es: "Cocina" },
      description: {
        en: "Views incoming orders and updates preparation status.",
        es: "Ve los pedidos entrantes y actualiza el estado de preparación.",
      },
    },
    {
      key: "delivery",
      label: { en: "Delivery", es: "Repartidor" },
      description: {
        en: "Picks up orders and updates delivery status.",
        es: "Recoge pedidos y actualiza el estado de entrega.",
      },
    },
    {
      key: "customer",
      label: { en: "Customer", es: "Cliente" },
      description: {
        en: "Browses menu, places orders, tracks delivery.",
        es: "Explora el menú, hace pedidos, sigue su entrega.",
      },
    },
  ],
  dashboardSections: [
    { key: "menu", label: { en: "Menu", es: "Menú" }, href: "/app/ecommerce", icon: "Menu" },
    { key: "orders", label: { en: "Orders", es: "Pedidos" }, href: "/app/ecommerce/orders", icon: "Receipt" },
    { key: "profile", label: { en: "Profile", es: "Perfil" }, href: "/app/profile", icon: "UserCog" },
    { key: "inbox", label: { en: "Messages", es: "Mensajes" }, href: "/app/inbox", icon: "MessagesSquare" },
  ],
  adminSections: [
    { key: "menu", label: { en: "Menu manager", es: "Editor de menú" }, href: "/admin/content", icon: "FileText" },
    { key: "orders", label: { en: "Order operations", es: "Operación de pedidos" }, href: "/admin/payments", icon: "Receipt" },
    { key: "staff", label: { en: "Staff", es: "Personal" }, href: "/admin/users", icon: "Users" },
    { key: "comms", label: { en: "WhatsApp / SMS", es: "WhatsApp / SMS" }, href: "/admin/communication", icon: "MessagesSquare" },
  ],
  dataModels: [
    {
      name: "MenuCategory",
      fields: [
        { name: "id", type: "uuid", required: true },
        { name: "name", type: "string", required: true },
        { name: "sortOrder", type: "int" },
      ],
    },
    {
      name: "Product",
      fields: [
        { name: "id", type: "uuid", required: true },
        { name: "categoryId", type: "uuid", required: true },
        { name: "name", type: "string", required: true },
        { name: "description", type: "text" },
        { name: "price", type: "decimal", required: true },
        { name: "available", type: "boolean", required: true },
        { name: "imageUrl", type: "string" },
      ],
    },
    {
      name: "Order",
      fields: [
        { name: "id", type: "uuid", required: true },
        { name: "customerId", type: "uuid", required: true },
        { name: "status", type: "enum:received|preparing|ready|out_for_delivery|delivered|cancelled", required: true },
        { name: "total", type: "decimal", required: true },
        { name: "channel", type: "enum:pickup|delivery|dine_in" },
        { name: "createdAt", type: "timestamp", required: true },
      ],
    },
    {
      name: "OrderItem",
      fields: [
        { name: "id", type: "uuid", required: true },
        { name: "orderId", type: "uuid", required: true },
        { name: "productId", type: "uuid", required: true },
        { name: "quantity", type: "int", required: true },
        { name: "unitPrice", type: "decimal", required: true },
        { name: "notes", type: "text" },
      ],
    },
  ],
  communicationFlows: [
    {
      id: "order-confirmation",
      label: { en: "Order confirmation", es: "Confirmación de pedido" },
      steps: ["customer.places_order", "whatsapp.send_receipt", "email.send_receipt"],
    },
    {
      id: "order-status-update",
      label: { en: "Order status update", es: "Cambio de estado de pedido" },
      steps: ["kitchen.updates_status", "whatsapp.notify_customer"],
    },
    {
      id: "support-conversation",
      label: { en: "Support conversation", es: "Conversación con soporte" },
      steps: ["customer.opens_chat", "operator.replies", "ticket.resolve"],
    },
  ],
  paymentFlows: [
    {
      id: "checkout",
      label: { en: "Online checkout", es: "Checkout online" },
      steps: ["cart.review", "payment.method_select", "payment.confirm", "order.create"],
    },
    {
      id: "pos",
      label: { en: "POS / in-store", es: "POS / en local" },
      steps: ["cashier.creates_order", "payment.method_select", "payment.confirm"],
    },
  ],
  notificationFlows: [
    {
      id: "kitchen-ticket",
      label: { en: "Kitchen ticket", es: "Comanda" },
      steps: ["order.created", "kitchen.in_app_notification"],
    },
    {
      id: "delivery-assigned",
      label: { en: "Delivery assigned", es: "Repartidor asignado" },
      steps: ["order.ready", "delivery.push_notification"],
    },
  ],
  requiredIntegrations: ["clerk", "neon"],
  optionalIntegrations: ["stripe", "mercadopago", "twilio", "resend", "google-maps"],
};

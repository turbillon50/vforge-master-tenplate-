/**
 * Default legal content shipped with the template.
 * Override per-app via Admin → Legal Pages.
 * These are placeholders. Have your lawyer review before launching.
 */

import type { LegalSlug } from "./legal.config";

interface DefaultLegalPage {
  slug: LegalSlug;
  titleEn: string;
  titleEs: string;
  bodyEn: string;
  bodyEs: string;
  version: number;
  updatedAt: Date;
}

const now = new Date();

export const defaultLegalContent: Record<LegalSlug, DefaultLegalPage> = {
  terms: {
    slug: "terms",
    titleEn: "Terms and Conditions",
    titleEs: "Términos y Condiciones",
    version: 1,
    updatedAt: now,
    bodyEn: `## 1. Acceptance of Terms
By accessing or using this application you agree to these Terms. If you do not agree, do not use the service.

## 2. Account
You are responsible for safeguarding your account credentials. You must be at least 16 years old to create an account.

## 3. Acceptable Use
You agree not to misuse the service, attempt unauthorized access, or violate applicable laws.

## 4. Content
You retain rights to content you submit. You grant us a license to host and display that content as needed to operate the service.

## 5. Payments
Paid features are billed according to the plan you choose. Refunds follow the policy stated at checkout.

## 6. Termination
We may suspend or terminate access for breach. You may close your account anytime via /delete-account.

## 7. Disclaimers
The service is provided "as is" without warranties of any kind.

## 8. Limitation of Liability
To the maximum extent permitted by law, our liability is limited to the amounts you paid in the 12 months prior to the claim.

## 9. Changes
We may update these Terms. Material changes will be announced in-app or by email.

## 10. Contact
Questions about these Terms? Email us via the support page.`,
    bodyEs: `## 1. Aceptación de los Términos
Al acceder o usar esta aplicación aceptas estos Términos. Si no estás de acuerdo, no uses el servicio.

## 2. Cuenta
Eres responsable de proteger tus credenciales. Debes tener al menos 16 años para crear una cuenta.

## 3. Uso Aceptable
Te comprometes a no abusar del servicio, intentar accesos no autorizados ni violar leyes aplicables.

## 4. Contenido
Conservas los derechos sobre el contenido que envías. Nos otorgas una licencia para alojarlo y mostrarlo según sea necesario para operar el servicio.

## 5. Pagos
Las funciones de pago se facturan según el plan elegido. Los reembolsos siguen la política indicada al momento de la compra.

## 6. Terminación
Podemos suspender o terminar el acceso por incumplimiento. Puedes cerrar tu cuenta cuando quieras vía /delete-account.

## 7. Renuncias
El servicio se proporciona "tal cual" sin garantías de ningún tipo.

## 8. Limitación de Responsabilidad
En la máxima medida permitida por la ley, nuestra responsabilidad se limita a los montos que pagaste en los 12 meses previos al reclamo.

## 9. Cambios
Podemos actualizar estos Términos. Los cambios materiales se anunciarán en la app o por email.

## 10. Contacto
¿Preguntas? Escríbenos desde la página de soporte.`,
  },
  privacy: {
    slug: "privacy",
    titleEn: "Privacy Policy",
    titleEs: "Política de Privacidad",
    version: 1,
    updatedAt: now,
    bodyEn: `## 1. Information We Collect
- Account: name, email, profile data you provide.
- Usage: device, browser, IP, pages viewed, in-app actions.
- Payments: handled by payment processors (Stripe, Mercado Pago).
- Communications: messages you send via the support and contact forms.

## 2. How We Use Information
- To provide and improve the service.
- To send transactional notifications (email, SMS, push, WhatsApp).
- To prevent fraud and abuse.
- To comply with legal obligations.

## 3. Sharing
We share data only with service providers (Clerk auth, Neon database, Resend email, Twilio SMS/WhatsApp, payment processors, analytics) and when required by law.

## 4. Retention
We keep account data while your account is active and for the period required to comply with legal/accounting obligations.

## 5. Your Rights
You can access, update, export or delete your data. Submit deletion requests at /delete-account.

## 6. Children
The service is not directed to children under 16. We do not knowingly collect data from minors.

## 7. International Transfers
Data may be processed in countries where our providers operate, with appropriate safeguards.

## 8. Security
We use industry-standard measures including encryption in transit, hashed credentials and least-privilege access.

## 9. Changes
We will notify users of material changes in-app or by email.

## 10. Contact
Email the data protection contact listed on the support page.`,
    bodyEs: `## 1. Información que Recopilamos
- Cuenta: nombre, email, datos de perfil que proporcionas.
- Uso: dispositivo, navegador, IP, páginas vistas, acciones en la app.
- Pagos: procesados por proveedores (Stripe, Mercado Pago).
- Comunicaciones: mensajes que envías vía soporte y contacto.

## 2. Cómo Usamos la Información
- Para proveer y mejorar el servicio.
- Para enviar notificaciones transaccionales (email, SMS, push, WhatsApp).
- Para prevenir fraude y abuso.
- Para cumplir obligaciones legales.

## 3. Compartición
Compartimos datos sólo con proveedores de servicio (auth Clerk, base Neon, email Resend, SMS/WhatsApp Twilio, procesadores de pago, analítica) y cuando lo exige la ley.

## 4. Retención
Conservamos los datos mientras tu cuenta esté activa y por el periodo requerido para cumplir obligaciones legales/contables.

## 5. Tus Derechos
Puedes acceder, actualizar, exportar o borrar tus datos. Solicita borrado en /delete-account.

## 6. Niños
El servicio no se dirige a menores de 16 años. No recopilamos datos a sabiendas de menores.

## 7. Transferencias Internacionales
Los datos pueden procesarse en países donde operan nuestros proveedores, con salvaguardas apropiadas.

## 8. Seguridad
Usamos medidas estándar de la industria incluyendo encriptación en tránsito, credenciales hash y acceso de mínimo privilegio.

## 9. Cambios
Notificaremos cambios materiales en la app o por email.

## 10. Contacto
Escribe al contacto de protección de datos listado en la página de soporte.`,
  },
  cookies: {
    slug: "cookies",
    titleEn: "Cookie Policy",
    titleEs: "Política de Cookies",
    version: 1,
    updatedAt: now,
    bodyEn: `## What are cookies?
Cookies are small text files stored on your device by your browser to make websites work or work better.

## Categories
- **Necessary**: required for authentication and security. Cannot be disabled.
- **Analytics**: help us understand how the app is used. Optional.
- **Marketing**: support relevant promotions. Optional.

## Managing Cookies
You can manage preferences from the cookie banner or your browser settings. Blocking essential cookies may break the app.

## Third Parties
Some cookies are set by third-party services we use (auth, analytics, payment processors).`,
    bodyEs: `## ¿Qué son las cookies?
Las cookies son pequeños archivos de texto que tu navegador almacena en tu dispositivo para que los sitios funcionen o funcionen mejor.

## Categorías
- **Necesarias**: requeridas para autenticación y seguridad. No se pueden desactivar.
- **Analítica**: nos ayudan a entender cómo se usa la app. Opcionales.
- **Marketing**: soportan promociones relevantes. Opcionales.

## Gestión
Puedes gestionar preferencias desde el banner o desde la configuración del navegador. Bloquear cookies esenciales puede romper la app.

## Terceros
Algunas cookies son establecidas por servicios de terceros (auth, analítica, pagos).`,
  },
  "delete-account": {
    slug: "delete-account",
    titleEn: "Account Deletion",
    titleEs: "Borrado de Cuenta",
    version: 1,
    updatedAt: now,
    bodyEn: `## How to request deletion
Submit the form below with the email used to sign up. We will verify ownership and process the request.

## What gets deleted
- Profile, settings and preferences.
- Authored content where not shared with others.
- Cached usage data.

## What we may retain
- Transactional records required by tax and accounting law (usually 5-10 years).
- Security event logs to prevent fraud.
- Backups, which are purged on rotation.

## Timeline
We respond within 7 days and complete deletion within 30 days.

## Contact
Email the support address on the support page.`,
    bodyEs: `## Cómo solicitar el borrado
Envía el formulario con el email usado al registrarte. Verificaremos la propiedad y procesaremos la solicitud.

## Qué se borra
- Perfil, configuración y preferencias.
- Contenido propio que no esté compartido con terceros.
- Datos de uso en caché.

## Qué podemos retener
- Registros transaccionales requeridos por leyes fiscales y contables (usualmente 5-10 años).
- Logs de eventos de seguridad para prevenir fraude.
- Backups, que se purgan al rotar.

## Tiempos
Respondemos en 7 días y completamos el borrado en máximo 30 días.

## Contacto
Escribe al email de soporte de la página de soporte.`,
  },
  "ios-policy": {
    slug: "ios-policy",
    titleEn: "App Store Policy",
    titleEs: "Política App Store",
    version: 1,
    updatedAt: now,
    bodyEn: `## App Store Compliance Disclosure

### Data collected
- Identifiers (account email, user id)
- Usage data
- Diagnostics

### Data linked to identity
- Email, name, profile picture
- Purchase history (if applicable)

### Third-party SDKs
- Clerk (auth)
- Stripe / Mercado Pago (payments — optional)
- Resend (email — optional)
- Twilio (SMS / WhatsApp — optional)
- Google Maps (maps — optional)
- OpenRouter (AI — optional)

### In-app purchases
If enabled, purchases use Apple's in-app purchase system in accordance with App Store guidelines.

### Account deletion
Users can request account deletion at /delete-account or directly within the app.`,
    bodyEs: `## Cumplimiento App Store

### Datos recopilados
- Identificadores (email de cuenta, id de usuario)
- Datos de uso
- Diagnósticos

### Datos vinculados a la identidad
- Email, nombre, foto de perfil
- Historial de compras (si aplica)

### SDKs de terceros
- Clerk (auth)
- Stripe / Mercado Pago (pagos — opcional)
- Resend (email — opcional)
- Twilio (SMS / WhatsApp — opcional)
- Google Maps (mapas — opcional)
- OpenRouter (IA — opcional)

### Compras dentro de la app
Si están habilitadas, las compras usan el sistema de Apple cumpliendo las guidelines del App Store.

### Borrado de cuenta
Los usuarios pueden solicitar el borrado en /delete-account o directamente en la app.`,
  },
  "android-policy": {
    slug: "android-policy",
    titleEn: "Play Store Policy",
    titleEs: "Política Play Store",
    version: 1,
    updatedAt: now,
    bodyEn: `## Play Store Data Safety Disclosure

### Data collected
- Personal info (name, email)
- App activity (in-app interactions)
- Device or other IDs

### Data shared
- With service providers listed in the Privacy Policy.
- Not sold to third parties.

### Security practices
- Data encrypted in transit (HTTPS).
- Users can request data deletion at /delete-account.

### Third-party SDKs
- Clerk, Stripe, Mercado Pago, Resend, Twilio, Google Maps, OpenRouter — used per feature configuration.

### In-app purchases
If enabled, purchases use Google Play Billing in accordance with Play Store policies.`,
    bodyEs: `## Divulgación de Seguridad de Datos Play Store

### Datos recopilados
- Info personal (nombre, email)
- Actividad en la app (interacciones)
- Identificadores de dispositivo

### Datos compartidos
- Con proveedores listados en la Política de Privacidad.
- No se venden a terceros.

### Prácticas de seguridad
- Datos encriptados en tránsito (HTTPS).
- Los usuarios pueden solicitar borrado en /delete-account.

### SDKs de terceros
- Clerk, Stripe, Mercado Pago, Resend, Twilio, Google Maps, OpenRouter — usados según la configuración de cada feature.

### Compras dentro de la app
Si están habilitadas, las compras usan Google Play Billing cumpliendo las políticas del Play Store.`,
  },
  support: {
    slug: "support",
    titleEn: "Support",
    titleEs: "Soporte",
    version: 1,
    updatedAt: now,
    bodyEn: "Visit the Support page for help.",
    bodyEs: "Visita la página de Soporte para obtener ayuda.",
  },
};

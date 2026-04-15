# Configuración de Stripe

Esta guía te ayudará a configurar Stripe para el sistema de pagos del Sprint de Claridad Comercial.

## Pasos de Configuración

### 1. Crear cuenta de Stripe

1. Ve a [https://stripe.com](https://stripe.com) y crea una cuenta
2. Selecciona México como país
3. Completa la verificación de tu negocio

### 2. Obtener las API Keys

1. En el Dashboard de Stripe, ve a **Developers → API keys**
2. Copia la **Publishable key** (empieza con `pk_`)
3. Copia la **Secret key** (empieza con `sk_`)

### 3. Crear los productos y precios

1. Ve a **Products** en el Dashboard
2. Crea dos productos:

#### Sprint Regular
- Nombre: "Sprint de Claridad Comercial - Regular"
- Precio: $29,250 MXN (one-time)
- Guarda el Price ID (empieza con `price_`)

#### Círculo Interno
- Nombre: "Sprint de Claridad Comercial - Círculo Interno"
- Precio: $59,250 MXN (one-time)
- Guarda el Price ID (empieza con `price_`)

### 4. Configurar Webhooks

1. Ve a **Developers → Webhooks**
2. Crea un nuevo endpoint:
   - URL: `https://utopica.io/api/payment/webhook`
   - Eventos a escuchar:
     - `checkout.session.completed`
     - `payment_intent.payment_failed`
3. Guarda el **Signing secret** (empieza con `whsec_`)

### 5. Actualizar variables de entorno

En tu archivo `.env.local`, actualiza:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_tu_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_tu_publishable_key
STRIPE_PRICE_REGULAR_ID=price_tu_price_regular_id
STRIPE_PRICE_CIRCULO_ID=price_tu_price_circulo_id
STRIPE_WEBHOOK_SECRET=whsec_tu_webhook_secret
```

### 6. Configuración en producción

Para Netlify:
1. Ve a Site settings → Environment variables
2. Agrega todas las variables de Stripe
3. Redespliega el sitio

## Testing

Para probar en desarrollo:
1. Usa las test keys (empiezan con `sk_test_` y `pk_test_`)
2. Usa tarjetas de prueba:
   - Exitosa: `4242 4242 4242 4242`
   - Falla: `4000 0000 0000 0002`

## Verificación

1. Prueba el flujo completo de pago
2. Verifica que se actualicen los cupos en Trello
3. Confirma que llegue el email de confirmación
4. Revisa los logs en Stripe Dashboard

## Soporte

Si tienes problemas:
- Revisa los logs en Stripe Dashboard → Developers → Logs
- Verifica que las variables de entorno estén correctas
- Contacta a soporte@stripe.com para ayuda específica de México
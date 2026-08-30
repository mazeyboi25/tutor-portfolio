# Teacher Portfolio

A short, student-friendly teacher portfolio with a landscape classroom hero and a compact enrollment payment wall.

## Edit teacher details
Open `content.js` and change the name, role, about text, subjects, enrollment price, and email.

## Connect payment
Paste your real checkout URL into `paymentLink` inside `content.js`.

Examples that work well:
- Stripe Payment Link
- PayPal checkout link
- Gumroad checkout
- Any hosted payment page

If `paymentLink` is blank, the enrollment form falls back to preparing an email to the teacher asking for the payment link.

## Hero image
The supplied hero image is stored at:
`assets/hero-books.png`

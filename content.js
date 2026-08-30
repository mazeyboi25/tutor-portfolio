// Edit the teacher's information here. The page updates automatically.
window.TEACHER_PORTFOLIO = {
  shortName: "Ms. Rivera",
  fullName: "Alexandra Rivera",
  role: "Science & Research Teacher",
  sinceYear: "2018",

  heroIntro: "A welcoming classroom for big questions, creative thinking, and the confidence to keep trying.",
  about: "I keep lessons clear, practical, and human. We learn by asking, making, testing, discussing, and trying again—not by pretending every answer appears on the first attempt.",
  yearsTeaching: "8+",
  studentCount: "1,200+",

  subjects: [
    { name: "General Science", description: "Notice patterns. Test ideas. Explain what you discover." },
    { name: "Research", description: "Ask better questions and build answers you can defend." },
    { name: "Study Skills", description: "Learn how to plan, practice, remember, and improve." }
  ],

  // Enrollment / payment wall
  enrollmentPrice: "49",
  currency: "USD",
  enrollText: "Reserve your place and get access to guided lessons, learning materials, and teacher support.",
  priceNote: "One payment. Your seat is reserved after checkout.",

  // Paste a real Stripe Payment Link, PayPal checkout, Gumroad checkout, etc. here.
  // Example: "https://buy.stripe.com/your-link"
  paymentLink: "",

  // Used as a fallback when paymentLink is blank.
  email: "teacher@example.com"
};

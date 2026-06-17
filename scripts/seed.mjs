// Run with: node --env-file=.env.local scripts/seed.mjs
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const { MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
if (!MONGODB_URI) { console.error("Missing MONGODB_URI"); process.exit(1); }
if (!ADMIN_EMAIL || !ADMIN_PASSWORD) { console.error("Missing ADMIN_EMAIL / ADMIN_PASSWORD"); process.exit(1); }

await mongoose.connect(MONGODB_URI);

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  passwordHash: String,
  role: { type: String, default: "admin" },
}, { timestamps: true });
const User = mongoose.models.User || mongoose.model("User", UserSchema);

const ProjectSchema = new mongoose.Schema({
  title: String, slug: { type: String, unique: true }, tagline: String, description: String,
  client: String, year: Number, stack: [String], industry: String,
  visualStyle: String, accentColor: String, liveUrl: String,
  featured: Boolean, layout: String, published: { type: Boolean, default: true },
  body: String, results: [{ label: String, value: String }],
}, { timestamps: true });
const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);

// Create admin user
const existing = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() });
if (existing) {
  console.log(`✓ Admin user already exists: ${ADMIN_EMAIL}`);
} else {
  const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await User.create({ email: ADMIN_EMAIL, passwordHash: hash });
  console.log(`✓ Created admin user: ${ADMIN_EMAIL}`);
}

// Seed projects (only if none exist)
const count = await Project.countDocuments();
if (count > 0) {
  console.log(`✓ Projects already seeded (${count} found). Skipping.`);
} else {
  await Project.insertMany([
    {
      title: "ReloadedMens", slug: "reloaded-mens", year: 2025,
      tagline: "Premium men's streetwear e-commerce, Delhi",
      client: "ReloadedMens", industry: "E-commerce",
      stack: ["Next.js", "Node.js", "Express", "MongoDB", "Tailwind"],
      visualStyle: "reloaded", layout: "featured", featured: true,
      description: "Full e-commerce platform for a Delhi-based men's fashion brand — storefront, inventory, coupon system, returns, lead capture, and ad-driven funnels.",
      body: "A Delhi-based men's fashion brand needed a modern e-commerce platform capable of selling trendy clothing online, managing inventory and categories, handling coupons and promotions, managing orders and returns, and running Meta ad lead campaigns — all while maintaining a premium streetwear brand identity.\n\nWe designed and built a fully custom platform on Next.js with Tailwind for the storefront, Node and Express for the API, and MongoDB Atlas for data. The admin panel covers inventory, categories, orders, returns, coupons, promotions, and lead management — all the operational surface area the brand actually uses day-to-day.\n\nThe storefront leans into a dark luxury aesthetic with high-contrast typography, mobile-first shopping flow, and conversion-optimized product pages. The result is centralized operations, faster inventory management, an improved customer shopping experience, and significantly stronger brand positioning online.",
      results: [
        { label: "Page speed", value: "94/100" },
        { label: "Mobile-first", value: "100%" },
        { label: "Admin modules", value: "08" },
        { label: "SEO score", value: "A+" },
      ],
    },
    {
      title: "EstateOps CRM", slug: "estateops-crm", year: 2025,
      tagline: "Real-estate broker pipeline",
      client: "Confidential", industry: "Real Estate",
      stack: ["React", "Express", "MongoDB"],
      visualStyle: "realty", layout: "half",
      description: "CRM and pipeline tool for a real-estate brokerage — listings, leads, deal stages, and broker dashboards.",
    },
    {
      title: "Klassroom", slug: "klassroom", year: 2024,
      tagline: "Video LMS & course platform",
      industry: "EdTech",
      stack: ["Next.js", "Mux", "MongoDB"],
      visualStyle: "lms", layout: "half",
      description: "Learning management system with video streaming, course progress, quizzes, and instructor dashboards.",
    },
    {
      title: "Subkit", slug: "subkit", year: 2024,
      tagline: "Subscription SaaS dashboard",
      industry: "SaaS",
      stack: ["Next.js", "Stripe", "PostgreSQL"],
      visualStyle: "saas", layout: "half",
      description: "Multi-tenant SaaS dashboard with subscription billing, team management, and usage analytics.",
    },
    {
      title: "LeadDesk", slug: "leaddesk", year: 2024,
      tagline: "Meta-ads lead capture & CRM",
      industry: "Marketing Tech",
      stack: ["Node.js", "MongoDB", "Meta API"],
      visualStyle: "crm", layout: "half",
      description: "Lead capture system integrated with Meta ads — auto-imports leads, scores them, and pushes to a sales pipeline.",
    },
  ]);
  console.log("✓ Seeded 5 starter projects");
}

await mongoose.disconnect();
console.log("\n✓ Done. Run `npm run dev` and visit http://localhost:3000");
console.log(`✓ Admin panel: http://localhost:3000/admin (login: ${ADMIN_EMAIL})`);

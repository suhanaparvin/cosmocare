import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use("*", logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-9f89ce1e/health", (c) => {
  return c.json({ status: "ok" });
});

// Provider registration endpoint
app.post("/providers/register", async (c) => {
  try {
    const body = await c.req.json();
    const { role, name, email, phone, ...additionalData } = body;

    if (!role || !name || !email || !phone) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const providerData = {
      id: crypto.randomUUID(),
      role,
      name,
      email,
      phone,
      ...additionalData,
      registeredAt: new Date().toISOString(),
      verified: true, // Auto-verify for now
      status: "active",
    };

    const key = `provider:${role}:${providerData.id}`;
    await kv.set(key, providerData);

    return c.json({ success: true, provider: providerData });
  } catch (error) {
    console.error("Provider registration error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get providers by role
app.get("/providers/:role", async (c) => {
  try {
    const role = c.req.param("role");
    const prefix = `provider:${role}:`;
    const providers = await kv.getByPrefix(prefix);

    return c.json({ providers });
  } catch (error) {
    console.error("Get providers error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get all providers
app.get("/providers", async (c) => {
  try {
    const allProviders = await kv.getByPrefix("provider:");
    const providersByRole = {
      ambulance: [],
      doctor: [],
      hospital: [],
      dispensary: [],
      pathological: [],
      insurance: [],
    };

    allProviders.forEach((provider) => {
      if (providersByRole[provider.role]) {
        providersByRole[provider.role].push(provider);
      }
    });

    return c.json({ providers: providersByRole });
  } catch (error) {
    console.error("Get all providers error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

Deno.serve(app.fetch);

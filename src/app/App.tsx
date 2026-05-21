import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "../../utils/supabase/info";

// ─── SUPABASE CLIENT ──────────────────────────────────────────────────────────
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || `https://${projectId}.supabase.co`;
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || publicAnonKey;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── SHARED STYLES ────────────────────────────────────────────────────────────
const S = {
  input: {
    width: "100%",
    height: 44,
    border: "1.5px solid #e5e7eb",
    borderRadius: 12,
    padding: "0 14px",
    fontSize: 14,
    background: "white",
    color: "#1e293b",
    boxSizing: "border-box",
  },
  btn: {
    width: "100%",
    height: 44,
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: 12,
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
  },
  btnRed: {
    width: "100%",
    height: 44,
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: 12,
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
  },
  btnOutline: {
    height: 44,
    background: "white",
    color: "#374151",
    border: "1.5px solid #e5e7eb",
    borderRadius: 12,
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    padding: "0 16px",
  },
  card: {
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    padding: 16,
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  },
  gradCard: { borderRadius: 20, padding: 20, color: "white" },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: "#374151",
    marginBottom: 6,
    display: "block",
  },
  err: { color: "#ef4444", fontSize: 13, marginTop: 6 },
  tag: {
    background: "#eff6ff",
    color: "#1d4ed8",
    fontSize: 11,
    padding: "3px 10px",
    borderRadius: 20,
    fontWeight: 600,
  },
  badge: {
    display: "inline-block",
    background: "#dcfce7",
    color: "#16a34a",
    fontSize: 10,
    padding: "2px 8px",
    borderRadius: 20,
    fontWeight: 700,
  },
};

// ─── TOAST ────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 9999,
        background: type === "error" ? "#ef4444" : "#16a34a",
        color: "white",
        borderRadius: 12,
        padding: "12px 20px",
        fontWeight: 600,
        fontSize: 14,
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        maxWidth: 320,
      }}
    >
      {msg}
    </div>
  );
}

function useToast() {
  const [toast, setToast] = useState(null);
  const show = (msg, type = "success") => setToast({ msg, type });
  const hide = () => setToast(null);
  return { toast, show, hide };
}

// ─── STARS ────────────────────────────────────────────────────────────────────
function Stars({ rating, count, size = 14 }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i <= Math.round(rating) ? "#f59e0b" : "none"}
          stroke="#f59e0b"
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      {rating > 0 && (
        <span style={{ fontSize: size - 2, color: "#6b7280", marginLeft: 2 }}>
          {Number(rating).toFixed(1)}
        </span>
      )}
      {count > 0 && (
        <span style={{ fontSize: size - 3, color: "#9ca3af" }}>({count})</span>
      )}
    </span>
  );
}

// ─── RATING MODAL ─────────────────────────────────────────────────────────────
function RatingModal({ provider, userId, onClose, onDone }) {
  const [stars, setStars] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!stars) return;
    setLoading(true);
    const { error } = await supabase
      .from("ratings")
      .upsert({ provider_id: provider.id, user_id: userId, stars, review });
    setLoading(false);
    if (error) {
      alert(error.message);
      return;
    }
    setDone(true);
    onDone?.();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 16,
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: 20,
          padding: 24,
          width: "100%",
          maxWidth: 360,
        }}
      >
        {done ? (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ fontSize: 40 }}>⭐</div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>
              Thank you!
            </div>
            <div style={{ color: "#64748b", fontSize: 14, marginBottom: 20 }}>
              Your Verified Cosmocare review has been saved.
            </div>
            <button onClick={onClose} style={S.btn}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 16 }}>
                Rate {provider.name}
              </div>
              <button
                onClick={onClose}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 20,
                  color: "#94a3b8",
                }}
              >
                ×
              </button>
            </div>
            <div style={S.badge}>✓ Verified Cosmocare User</div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 8,
                margin: "20px 0",
              }}
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transform:
                      (hovered || stars) >= i ? "scale(1.25)" : "scale(1)",
                    transition: "transform 0.15s",
                  }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => setStars(i)}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill={(hovered || stars) >= i ? "#f59e0b" : "none"}
                    stroke="#f59e0b"
                    strokeWidth="2"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </button>
              ))}
            </div>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review (optional)..."
              style={{
                width: "100%",
                border: "1.5px solid #e5e7eb",
                borderRadius: 12,
                padding: "10px 14px",
                fontSize: 14,
                minHeight: 80,
                resize: "none",
                boxSizing: "border-box",
              }}
            />
            <button
              disabled={!stars || loading}
              onClick={submit}
              style={{ ...S.btn, marginTop: 14, opacity: !stars ? 0.5 : 1 }}
            >
              {loading ? "Submitting..." : "Submit Rating"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginScreen({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast, show, hide } = useToast();

  const roles = [
    "patient",
    "doctor",
    "hospital",
    "ambulance",
    "dispensary",
    "pathological",
    "insurance",
  ];
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    onAuth();
  };

  const handleSignup = async () => {
    setError("");
    setLoading(true);
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { name: form.name, role: form.role, phone: form.phone },
      },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    // Automatically sign in the user after successful signup
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    if (signInError) {
      setError(
        "Account created but sign in failed. Please try logging in manually.",
      );
      setMode("login");
      return;
    }
    show("Account created successfully! Welcome to Cosmocare.");
    onAuth();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f9ff, #e0f2fe, #f0fdf4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={hide} />}
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              width: 72,
              height: 72,
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 14px",
              boxShadow: "0 8px 32px rgba(37,99,235,0.35)",
            }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="#ef4444"
              stroke="#ef4444"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#1e293b",
              letterSpacing: -1,
            }}
          >
            Cosmocare
          </div>
          <div style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>
            Your healthcare companion in Kolkata
          </div>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: 24,
            padding: 28,
            boxShadow: "0 4px 40px rgba(0,0,0,0.08)",
          }}
        >
          {/* Tabs */}
          <div
            style={{
              display: "flex",
              background: "#f1f5f9",
              borderRadius: 12,
              padding: 4,
              marginBottom: 24,
            }}
          >
            {["login", "signup"].map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setError("");
                }}
                style={{
                  flex: 1,
                  padding: "9px 0",
                  border: "none",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: 14,
                  background: mode === m ? "white" : "transparent",
                  color: mode === m ? "#2563eb" : "#64748b",
                  boxShadow: mode === m ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                }}
              >
                {m === "login" ? "Log In" : "Sign Up"}
              </button>
            ))}
          </div>

          {mode === "signup" && (
            <div style={{ marginBottom: 14 }}>
              <label style={S.label}>Full Name</label>
              <input
                placeholder="Your full name"
                value={form.name}
                onChange={set("name")}
                style={S.input}
              />
            </div>
          )}

          <div style={{ marginBottom: 14 }}>
            <label style={S.label}>Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={set("email")}
              style={S.input}
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={S.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={set("password")}
              style={S.input}
            />
          </div>

          {mode === "signup" && (
            <>
              <div style={{ marginBottom: 14 }}>
                <label style={S.label}>Phone Number</label>
                <input
                  placeholder="+91 98XXX XXXXX"
                  value={form.phone}
                  onChange={set("phone")}
                  style={S.input}
                />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={S.label}>I am a...</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {roles.map((r) => (
                    <button
                      key={r}
                      onClick={() => setForm((f) => ({ ...f, role: r }))}
                      style={{
                        padding: "8px 14px",
                        borderRadius: 10,
                        border: "1.5px solid",
                        cursor: "pointer",
                        fontSize: 13,
                        fontWeight: 600,
                        textTransform: "capitalize",
                        borderColor: form.role === r ? "#2563eb" : "#e5e7eb",
                        background: form.role === r ? "#eff6ff" : "white",
                        color: form.role === r ? "#2563eb" : "#64748b",
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {error && <div style={S.err}>{error}</div>}

          <button
            onClick={mode === "login" ? handleLogin : handleSignup}
            disabled={loading}
            style={{
              ...S.btn,
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              marginTop: 8,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading
              ? "Please wait..."
              : mode === "login"
                ? "LOGIN"
                : "CREATE ACCOUNT"}
          </button>

          {mode === "login" && (
            <div style={{ textAlign: "center", marginTop: 14 }}>
              <button
                onClick={() => setMode("signup")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#2563eb",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Don't have an account? Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PROVIDER REGISTRATION FORM ───────────────────────────────────────────────
function ProviderSetup({ profile, onDone }) {
  const [form, setForm] = useState({
    name: profile.name,
    specialty: "",
    address: "",
    phone: profile.phone || "",
    fee: "",
    services: "",
    availability: "Available",
  });
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const typeLabels = {
    doctor: "Doctor",
    hospital: "Hospital",
    ambulance: "Ambulance Service",
    dispensary: "Pharmacy",
    pathological: "Diagnostic Lab",
    insurance: "Insurance Provider",
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { error } = await supabase.from("providers").insert({
      user_id: profile.id,
      name: form.name,
      type: profile.role,
      specialty: form.specialty,
      address: form.address,
      phone: form.phone,
      fee: form.fee,
      availability: form.availability,
      services: form.services
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      is_available: true,
    });
    setLoading(false);
    if (error) {
      alert(error.message);
      return;
    }
    onDone();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          background: "white",
          borderRadius: 24,
          padding: 28,
          boxShadow: "0 4px 40px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #2563eb, #7c3aed)",
            borderRadius: 16,
            padding: "16px 20px",
            color: "white",
            marginBottom: 24,
          }}
        >
          <div style={{ fontWeight: 800, fontSize: 20 }}>
            Complete Your Profile
          </div>
          <div style={{ fontSize: 13, opacity: 0.85 }}>
            Set up your {typeLabels[profile.role] || profile.role} listing
          </div>
        </div>
        {[
          ["name", "Provider / Business Name", "text"],
          ["specialty", "Specialty / Type", "text"],
          ["address", "Full Address in Kolkata", "text"],
          ["phone", "Contact Phone Number", "text"],
          ["fee", "Consultation / Service Fee (e.g. ₹500)", "text"],
          ["services", "Services Offered (comma-separated)", "text"],
        ].map(([k, label, type]) => (
          <div key={k} style={{ marginBottom: 14 }}>
            <label style={S.label}>{label}</label>
            <input
              type={type}
              placeholder={label}
              value={form[k]}
              onChange={set(k)}
              style={S.input}
            />
          </div>
        ))}
        <div style={{ marginBottom: 20 }}>
          <label style={S.label}>Current Availability</label>
          <select
            value={form.availability}
            onChange={set("availability")}
            style={{ ...S.input, cursor: "pointer" }}
          >
            <option>Available</option>
            <option>Busy</option>
            <option>Closed</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ ...S.btn, opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Saving..." : "Go Live on Cosmocare"}
        </button>
      </div>
    </div>
  );
}

// ─── PROVIDERS LIST (Hospitals / Doctors / Ambulances / etc) ─────────────────
function ProviderList({ type, userId, title, color, emptyMsg }) {
  const [providers, setProviders] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("rating");
  const [ratingFor, setRatingFor] = useState(null);
  const { toast, show, hide } = useToast();

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("providers")
      .select("*")
      .eq("type", type)
      .order("created_at", { ascending: false });
    setProviders(data || []);

    // Load average ratings
    if (data?.length) {
      const ids = data.map((p) => p.id);
      const { data: rData } = await supabase
        .from("ratings")
        .select("provider_id, stars")
        .in("provider_id", ids);
      const rMap = {};
      (rData || []).forEach((r) => {
        if (!rMap[r.provider_id]) rMap[r.provider_id] = [];
        rMap[r.provider_id].push(r.stars);
      });
      const avgMap = {};
      Object.entries(rMap).forEach(([id, arr]) => {
        avgMap[id] = {
          avg: arr.reduce((a, b) => a + b, 0) / arr.length,
          count: arr.length,
        };
      });
      setRatings(avgMap);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [type]);

  // Real-time subscription
  useEffect(() => {
    const sub = supabase
      .channel(`providers-${type}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "providers",
          filter: `type=eq.${type}`,
        },
        load,
      )
      .subscribe();
    return () => supabase.removeChannel(sub);
  }, [type]);

  const filtered = providers
    .filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.specialty || "").toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (sort === "rating")
        return (ratings[b.id]?.avg || 0) - (ratings[a.id]?.avg || 0);
      if (sort === "availability")
        return (b.is_available ? 1 : 0) - (a.is_available ? 1 : 0);
      return 0;
    });

  const book = async (provider) => {
    const reason = prompt("Reason for appointment?");
    if (!reason) return;
    const { error } = await supabase.from("appointments").insert({
      patient_id: userId,
      provider_id: provider.id,
      date: new Date().toLocaleDateString(),
      time: "To be confirmed",
      reason,
      type: "in-person",
    });
    if (error) show(error.message, "error");
    else show(`Appointment booked with ${provider.name}!`);
  };

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={hide} />}
      {ratingFor && (
        <RatingModal
          provider={ratingFor}
          userId={userId}
          onClose={() => setRatingFor(null)}
          onDone={() => {
            load();
            setRatingFor(null);
            show("Rating saved!");
          }}
        />
      )}

      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <div style={{ flex: 1, position: "relative" }}>
          <input
            placeholder={`Search ${title}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ ...S.input, paddingLeft: 38 }}
          />
          <span
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94a3b8",
              fontSize: 16,
            }}
          >
            🔍
          </span>
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{
            ...S.input,
            width: "auto",
            cursor: "pointer",
            paddingRight: 10,
          }}
        >
          <option value="rating">By Rating</option>
          <option value="availability">By Availability</option>
        </select>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>
          Loading {title}...
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div
          style={{ textAlign: "center", padding: "48px 0", color: "#94a3b8" }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏥</div>
          <div style={{ fontWeight: 700, fontSize: 16, color: "#1e293b" }}>
            No {title} Yet
          </div>
          <div style={{ fontSize: 13, marginTop: 6 }}>{emptyMsg}</div>
        </div>
      )}

      {filtered.map((p) => {
        const r = ratings[p.id] || { avg: 0, count: 0 };
        return (
          <div key={p.id} style={{ ...S.card, marginBottom: 14 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 8,
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{p.name}</div>
                {p.specialty && (
                  <div
                    style={{ fontSize: 13, color: "#2563eb", fontWeight: 600 }}
                  >
                    {p.specialty}
                  </div>
                )}
                {p.address && (
                  <div style={{ fontSize: 12, color: "#64748b" }}>
                    📍 {p.address}
                  </div>
                )}
                {r.count > 0 ? (
                  <Stars rating={r.avg} count={r.count} />
                ) : (
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>
                    No ratings yet
                  </div>
                )}
                <div style={{ ...S.badge, marginTop: 4 }}>
                  ✓ Verified by Cosmocare Users
                </div>
              </div>
              <div
                style={{ textAlign: "right", flexShrink: 0, marginLeft: 10 }}
              >
                <span
                  style={{
                    background: p.is_available ? "#dcfce7" : "#fee2e2",
                    color: p.is_available ? "#16a34a" : "#dc2626",
                    fontSize: 11,
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontWeight: 700,
                  }}
                >
                  {p.availability || (p.is_available ? "Available" : "Busy")}
                </span>
                {p.fee && (
                  <div
                    style={{
                      fontWeight: 700,
                      color: "#1e293b",
                      marginTop: 6,
                      fontSize: 14,
                    }}
                  >
                    {p.fee}
                  </div>
                )}
              </div>
            </div>

            {p.services?.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  marginBottom: 10,
                }}
              >
                {p.services.map((s) => (
                  <span key={s} style={S.tag}>
                    {s}
                  </span>
                ))}
              </div>
            )}

            {p.phone && (
              <div style={{ fontSize: 13, color: "#64748b", marginBottom: 10 }}>
                📞 {p.phone}
              </div>
            )}

            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => book(p)}
                style={{ ...S.btn, flex: 1, height: 40, fontSize: 13 }}
              >
                Book Now
              </button>
              <button
                onClick={() => setRatingFor(p)}
                style={{ ...S.btnOutline, height: 40, fontSize: 13 }}
              >
                ⭐ Rate
              </button>
              {p.phone && (
                <a
                  href={`tel:${p.phone}`}
                  style={{
                    ...S.btnOutline,
                    height: 40,
                    fontSize: 13,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  📞
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── AMBULANCE SEARCH ─────────────────────────────────────────────────────────
function AmbulanceSearch({ userId }) {
  const [location, setLocation] = useState("");
  const [searched, setSearched] = useState(false);
  return (
    <div>
      <div
        style={{
          ...S.gradCard,
          background: "linear-gradient(135deg, #ef4444, #dc2626)",
          marginBottom: 20,
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>
          🚑 Emergency Ambulance
        </div>
        <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 14 }}>
          Find registered ambulances near you in Kolkata
        </div>
        <input
          placeholder="Enter your pickup location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{
            ...S.input,
            background: "rgba(255,255,255,0.2)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "white",
            marginBottom: 12,
          }}
        />
        <button
          onClick={() => setSearched(true)}
          style={{
            background: "white",
            color: "#dc2626",
            border: "none",
            borderRadius: 12,
            padding: "12px",
            fontWeight: 700,
            width: "100%",
            cursor: "pointer",
          }}
        >
          Find Ambulance Now
        </button>
      </div>
      {searched && (
        <ProviderList
          type="ambulance"
          userId={userId}
          title="Ambulances"
          color="#ef4444"
          emptyMsg="No ambulance providers registered yet. Ambulance drivers can register to appear here."
        />
      )}
    </div>
  );
}

// ─── MAP SEARCH ───────────────────────────────────────────────────────────────
function MapSearch({ userId }) {
  const [providers, setProviders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    supabase
      .from("providers")
      .select("*")
      .then(({ data }) => setProviders(data || []));
  }, []);

  const filtered =
    filter === "all" ? providers : providers.filter((p) => p.type === filter);
  const typeColors = {
    hospital: "#ef4444",
    doctor: "#2563eb",
    ambulance: "#f97316",
    dispensary: "#16a34a",
    pathological: "#7c3aed",
    insurance: "#0891b2",
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: 17,
            color: "#1e293b",
            marginBottom: 10,
          }}
        >
          Healthcare Map — Kolkata
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["all", "hospital", "doctor", "ambulance", "dispensary"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                border: "1.5px solid",
                fontSize: 12,
                cursor: "pointer",
                fontWeight: 600,
                textTransform: "capitalize",
                borderColor: filter === f ? "#2563eb" : "#e5e7eb",
                background: filter === f ? "#2563eb" : "white",
                color: filter === f ? "white" : "#64748b",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Map visual */}
      <div
        style={{
          background: "linear-gradient(135deg, #e8f4fd, #dff0e8)",
          borderRadius: 16,
          height: 220,
          position: "relative",
          overflow: "hidden",
          marginBottom: 16,
          border: "1px solid #e5e7eb",
        }}
      >
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.2,
          }}
        >
          {[20, 40, 60, 80].map((i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={`${i}%`}
              x2="100%"
              y2={`${i}%`}
              stroke="#94a3b8"
              strokeWidth="1"
            />
          ))}
          {[20, 40, 60, 80].map((i) => (
            <line
              key={`v${i}`}
              x1={`${i}%`}
              y1="0"
              x2={`${i}%`}
              y2="100%"
              stroke="#94a3b8"
              strokeWidth="1"
            />
          ))}
        </svg>
        {/* User pin */}
        <div
          style={{
            position: "absolute",
            left: "48%",
            top: "48%",
            transform: "translate(-50%,-50%)",
            zIndex: 5,
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "#2563eb",
              border: "3px solid white",
              boxShadow: "0 0 0 6px rgba(37,99,235,0.2)",
            }}
          />
        </div>
        {filtered.map((p, i) => {
          const lx = 10 + ((i * 23) % 75);
          const ly = 10 + ((i * 17) % 70);
          return (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              style={{
                position: "absolute",
                left: `${lx}%`,
                top: `${ly}%`,
                background: typeColors[p.type] || "#64748b",
                color: "white",
                border: selected?.id === p.id ? "2px solid #1e293b" : "none",
                borderRadius: 8,
                padding: "3px 8px",
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {p.name.split(" ")[0]}
            </button>
          );
        })}
        <div
          style={{
            position: "absolute",
            bottom: 8,
            right: 8,
            background: "white",
            borderRadius: 8,
            padding: "6px 10px",
            fontSize: 11,
            color: "#64748b",
          }}
        >
          📍 You are in Kolkata
        </div>
      </div>

      {selected && (
        <div
          style={{
            ...S.card,
            marginBottom: 16,
            borderLeft: `4px solid ${typeColors[selected.type] || "#64748b"}`,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>
                {selected.name}
              </div>
              <div style={{ fontSize: 13, color: "#64748b" }}>
                {selected.specialty} • {selected.address}
              </div>
              {selected.phone && (
                <div style={{ fontSize: 13, color: "#64748b" }}>
                  📞 {selected.phone}
                </div>
              )}
            </div>
            <button
              onClick={() => setSelected(null)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#94a3b8",
                fontSize: 20,
              }}
            >
              ×
            </button>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button style={{ ...S.btn, flex: 1, height: 40, fontSize: 13 }}>
              🧭 Navigate
            </button>
            {selected.phone && (
              <a
                href={`tel:${selected.phone}`}
                style={{
                  ...S.btnOutline,
                  height: 40,
                  fontSize: 13,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                📞 Call
              </a>
            )}
          </div>
        </div>
      )}

      <div
        style={{
          fontWeight: 600,
          fontSize: 14,
          color: "#64748b",
          marginBottom: 10,
        }}
      >
        ALL PROVIDERS ({filtered.length})
      </div>
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: 32, color: "#94a3b8" }}>
          No providers registered yet in this category.
        </div>
      ) : (
        filtered.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p)}
            style={{
              ...S.card,
              marginBottom: 10,
              width: "100%",
              textAlign: "left",
              cursor: "pointer",
              borderLeft: `3px solid ${typeColors[p.type] || "#e5e7eb"}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
              <div
                style={{
                  fontSize: 12,
                  color: "#64748b",
                  textTransform: "capitalize",
                }}
              >
                {p.type} • {p.address || "Kolkata"}
              </div>
            </div>
            <span
              style={{
                background: p.is_available ? "#dcfce7" : "#fee2e2",
                color: p.is_available ? "#16a34a" : "#dc2626",
                fontSize: 11,
                padding: "2px 10px",
                borderRadius: 20,
                fontWeight: 700,
              }}
            >
              {p.is_available ? "Open" : "Busy"}
            </span>
          </button>
        ))
      )}
    </div>
  );
}

// ─── E-PHARMACY ───────────────────────────────────────────────────────────────
function EPharmacy({ userId }) {
  const [medicines, setMedicines] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const { toast, show, hide } = useToast();

  useEffect(() => {
    supabase
      .from("medicines")
      .select("*, providers(name)")
      .then(({ data }) => setMedicines(data || []));
    supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", userId)
      .then(({ data }) => setCart((data || []).map((c) => c.medicine_name)));
  }, [userId]);

  const toggleCart = async (med) => {
    if (cart.includes(med.name)) {
      await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", userId)
        .eq("medicine_name", med.name);
      setCart((c) => c.filter((x) => x !== med.name));
      show(`${med.name} removed from cart`);
    } else {
      await supabase.from("cart_items").insert({
        user_id: userId,
        medicine_name: med.name,
        brand: med.brand,
        price: med.price,
      });
      setCart((c) => [...c, med.name]);
      show(`${med.name} added to cart!`);
    }
  };

  const filtered = medicines.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      (m.brand || "").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={hide} />}
      <div style={{ position: "relative", marginBottom: 16 }}>
        <input
          placeholder="Search medicines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ ...S.input, paddingLeft: 38 }}
        />
        <span
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#94a3b8",
          }}
        >
          🔍
        </span>
      </div>
      {cart.length > 0 && (
        <div
          style={{
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: 12,
            padding: "12px 16px",
            marginBottom: 14,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontWeight: 600, color: "#1d4ed8", fontSize: 14 }}>
            🛒 {cart.length} item{cart.length > 1 ? "s" : ""} in cart
          </div>
          <button
            style={{
              ...S.btn,
              width: "auto",
              padding: "8px 16px",
              height: 36,
              fontSize: 13,
            }}
          >
            Checkout
          </button>
        </div>
      )}
      {filtered.length === 0 ? (
        <div
          style={{ textAlign: "center", padding: "48px 0", color: "#94a3b8" }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>💊</div>
          <div style={{ fontWeight: 700, fontSize: 16, color: "#1e293b" }}>
            No Medicines Listed Yet
          </div>
          <div style={{ fontSize: 13, marginTop: 6 }}>
            Pharmacy providers can add medicines from their dashboard.
          </div>
        </div>
      ) : (
        filtered.map((m) => (
          <div key={m.id} style={{ ...S.card, marginBottom: 12 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{m.name}</div>
                <div style={{ fontSize: 13, color: "#64748b" }}>
                  {m.brand} • {m.category}
                </div>
                {m.providers?.name && (
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>
                    By {m.providers.name}
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 6,
                  }}
                >
                  <span
                    style={{ fontWeight: 800, fontSize: 16, color: "#16a34a" }}
                  >
                    {m.price}
                  </span>
                  {m.mrp && (
                    <span
                      style={{
                        fontSize: 12,
                        color: "#94a3b8",
                        textDecoration: "line-through",
                      }}
                    >
                      {m.mrp}
                    </span>
                  )}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    background: m.in_stock ? "#dcfce7" : "#fee2e2",
                    color: m.in_stock ? "#16a34a" : "#dc2626",
                    fontSize: 11,
                    padding: "2px 10px",
                    borderRadius: 20,
                    fontWeight: 700,
                  }}
                >
                  {m.in_stock ? "IN STOCK" : "OUT"}
                </span>
                {m.in_stock && (
                  <button
                    onClick={() => toggleCart(m)}
                    style={{
                      ...S.btn,
                      width: "auto",
                      padding: "8px 14px",
                      height: 36,
                      fontSize: 13,
                      background: cart.includes(m.name) ? "#ef4444" : "#2563eb",
                    }}
                  >
                    {cart.includes(m.name) ? "Remove" : "Add to Cart"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// ─── BLOOD BANK ───────────────────────────────────────────────────────────────
function BloodBank({ userId, userName }) {
  const [donors, setDonors] = useState([]);
  const [selected, setSelected] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [phone, setPhone] = useState("");
  const { toast, show, hide } = useToast();

  useEffect(() => {
    supabase
      .from("blood_donors")
      .select("*, profiles(name, phone)")
      .then(({ data }) => setDonors(data || []));
    supabase
      .from("blood_donors")
      .select("id")
      .eq("user_id", userId)
      .single()
      .then(({ data }) => {
        if (data) setRegistered(true);
      });
  }, [userId]);

  const register = async () => {
    if (!selected) return;
    const { error } = await supabase.from("blood_donors").upsert({
      user_id: userId,
      blood_type: selected,
      name: userName,
      phone,
      is_available: true,
    });
    if (error) {
      show(error.message, "error");
      return;
    }
    setRegistered(true);
    show(`Registered as ${selected} blood donor!`);
    supabase
      .from("blood_donors")
      .select("*, profiles(name, phone)")
      .then(({ data }) => setDonors(data || []));
  };

  const byType = {};
  donors.forEach((d) => {
    if (!byType[d.blood_type]) byType[d.blood_type] = [];
    byType[d.blood_type].push(d);
  });

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={hide} />}
      <div
        style={{
          ...S.gradCard,
          background: "linear-gradient(135deg, #dc2626, #991b1b)",
          marginBottom: 20,
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>
          🩸 Blood Donor Registry
        </div>
        <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 16 }}>
          Real donors registered on Cosmocare
        </div>
        {!registered ? (
          <>
            <input
              placeholder="Your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                ...S.input,
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "white",
                marginBottom: 10,
              }}
            />
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 14,
              }}
            >
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bt) => (
                <button
                  key={bt}
                  onClick={() => setSelected(bt)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 10,
                    border: "2px solid",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: 13,
                    background:
                      selected === bt ? "white" : "rgba(255,255,255,0.15)",
                    color: selected === bt ? "#dc2626" : "white",
                    borderColor:
                      selected === bt ? "white" : "rgba(255,255,255,0.3)",
                  }}
                >
                  {bt}
                </button>
              ))}
            </div>
            <button
              disabled={!selected}
              onClick={register}
              style={{
                background: "white",
                color: "#dc2626",
                border: "none",
                borderRadius: 12,
                padding: "12px",
                fontWeight: 700,
                width: "100%",
                cursor: "pointer",
                opacity: !selected ? 0.6 : 1,
              }}
            >
              Register as Blood Donor
            </button>
          </>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 28 }}>✅</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>
                You are a registered donor!
              </div>
              <div style={{ fontSize: 13, opacity: 0.85 }}>
                Thank you for saving lives
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>
        Available Donors ({donors.length})
      </div>
      {Object.keys(byType).length === 0 ? (
        <div style={{ textAlign: "center", padding: 32, color: "#94a3b8" }}>
          No donors registered yet. Be the first!
        </div>
      ) : (
        Object.entries(byType).map(([bt, list]) => (
          <div key={bt} style={{ ...S.card, marginBottom: 12 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  background: "#fee2e2",
                  color: "#dc2626",
                  fontWeight: 800,
                  fontSize: 16,
                  padding: "4px 14px",
                  borderRadius: 10,
                }}
              >
                {bt}
              </span>
              <span style={{ fontSize: 13, color: "#64748b" }}>
                {list.length} donor{list.length > 1 ? "s" : ""}
              </span>
            </div>
            {list.map((d) => (
              <div
                key={d.id}
                style={{
                  fontSize: 13,
                  color: "#374151",
                  padding: "4px 0",
                  borderTop: "1px solid #f1f5f9",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>👤 {d.name}</span>
                {d.phone && (
                  <a
                    href={`tel:${d.phone}`}
                    style={{ color: "#2563eb", textDecoration: "none" }}
                  >
                    📞 {d.phone}
                  </a>
                )}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

// ─── AI HEALTH ASSISTANT ──────────────────────────────────────────────────────
function AIAssistant({ userId }) {
  const [tab, setTab] = useState("chat");
  const [msgs, setMsgs] = useState([
    {
      role: "ai",
      text: "Hi! I'm Cosmo 🤖 your AI health assistant. Describe your symptoms or ask a health question!",
    },
  ]);
  const [input, setInput] = useState("");
  const [records, setRecords] = useState([]);
  const [uploadState, setUploadState] = useState("idle");
  const [prescription, setPrescription] = useState(null);
  const endRef = useRef(null);
  const { toast, show, hide } = useToast();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);
  useEffect(() => {
    if (tab === "records")
      supabase
        .from("medical_records")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .then(({ data }) => setRecords(data || []));
  }, [tab, userId]);

  const responses = {
    headache:
      "For headaches, try Paracetamol 500mg and stay well hydrated. If it persists over 2 days or is severe, see a neurologist.",
    fever:
      "For mild fever (<101°F): Paracetamol 500mg every 6 hrs, rest, and drink ORS. See a doctor if fever exceeds 103°F or lasts 3+ days.",
    cold: "For common cold: steam inhalation, Cetirizine for runny nose, rest and fluids. Antibiotics are not needed for viral colds.",
    cough:
      "For dry cough: warm water with honey, Benadryl cough syrup. For productive cough with fever, see a doctor.",
    diabetes:
      "For diabetes management, regular blood sugar monitoring is key. Metformin is commonly prescribed. Diet and exercise are equally important.",
    appointment:
      "You can book appointments from the Doctors or Hospitals tab. All registered providers are live on Cosmocare!",
    default:
      "I'm Cosmo, your health assistant! I can help with general symptoms, medicine queries, or guide you to the right specialist. Tell me what's bothering you.",
  };

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMsgs((m) => [...m, userMsg]);
    const lower = input.toLowerCase();
    const key =
      Object.keys(responses).find((k) => lower.includes(k)) || "default";
    setTimeout(
      () => setMsgs((m) => [...m, { role: "ai", text: responses[key] }]),
      700,
    );
    setInput("");
  };

  const simulateUpload = () => {
    setUploadState("processing");
    setTimeout(() => {
      setPrescription({
        doctor: "Dr. Priya Chatterjee, MD",
        date: new Date().toLocaleDateString(),
        medicines: [
          {
            name: "Amoxicillin 500mg",
            dosage: "1 tablet",
            instructions: "Twice daily after meals",
            duration: "5 days",
          },
          {
            name: "Paracetamol 500mg",
            dosage: "1 tablet",
            instructions: "For fever/pain as needed",
            duration: "3 days",
          },
          {
            name: "Vitamin C 1000mg",
            dosage: "1 tablet",
            instructions: "Once daily",
            duration: "7 days",
          },
        ],
        notes:
          "Rest well. Drink fluids. Return if symptoms worsen after 3 days.",
      });
      setUploadState("done");
    }, 2500);
  };

  const saveRecord = async () => {
    const { error } = await supabase.from("medical_records").insert({
      user_id: userId,
      doctor_name: prescription.doctor,
      date: prescription.date,
      medicines: prescription.medicines,
      notes: prescription.notes,
    });
    if (error) {
      show(error.message, "error");
      return;
    }
    show("Prescription saved to Medical Records!");
    setTab("records");
    setUploadState("idle");
    setPrescription(null);
  };

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={hide} />}
      <div
        style={{
          display: "flex",
          gap: 4,
          background: "#f1f5f9",
          borderRadius: 12,
          padding: 4,
          marginBottom: 20,
        }}
      >
        {[
          ["chat", "💬 Chat"],
          ["upload", "📄 Prescription"],
          ["records", "🗂️ Records"],
        ].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{
              flex: 1,
              padding: "9px 4px",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              background: tab === id ? "white" : "transparent",
              color: tab === id ? "#2563eb" : "#64748b",
              boxShadow: tab === id ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "chat" && (
        <div>
          <div
            style={{
              height: 360,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginBottom: 14,
            }}
          >
            {msgs.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                  gap: 8,
                  alignItems: "flex-end",
                }}
              >
                {m.role === "ai" && (
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      flexShrink: 0,
                    }}
                  >
                    🤖
                  </div>
                )}
                <div
                  style={{
                    maxWidth: "75%",
                    background: m.role === "user" ? "#2563eb" : "white",
                    color: m.role === "user" ? "white" : "#1e293b",
                    borderRadius:
                      m.role === "user"
                        ? "18px 18px 4px 18px"
                        : "18px 18px 18px 4px",
                    padding: "12px 16px",
                    fontSize: 14,
                    border: m.role === "ai" ? "1px solid #e5e7eb" : "none",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Describe symptoms or ask a question..."
              style={{ ...S.input, flex: 1 }}
            />
            <button
              onClick={send}
              style={{ ...S.btn, width: 44, padding: 0, flexShrink: 0 }}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {tab === "upload" && (
        <div>
          {uploadState === "idle" && (
            <div>
              <div
                style={{
                  border: "2px dashed #bfdbfe",
                  borderRadius: 16,
                  padding: 32,
                  textAlign: "center",
                  background: "#eff6ff",
                  marginBottom: 16,
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 12 }}>📷</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>
                  Upload Prescription
                </div>
                <div
                  style={{ color: "#64748b", fontSize: 13, marginBottom: 20 }}
                >
                  AI will extract medicine names, dosages and instructions
                </div>
                <button
                  onClick={simulateUpload}
                  style={{ ...S.btn, width: "auto", padding: "10px 24px" }}
                >
                  📤 Upload Prescription
                </button>
              </div>
            </div>
          )}
          {uploadState === "processing" && (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  border: "4px solid #dbeafe",
                  borderTop: "4px solid #2563eb",
                  borderRadius: "50%",
                  margin: "0 auto 20px",
                  animation: "spin 1s linear infinite",
                }}
              />
              <div style={{ fontWeight: 700, fontSize: 17 }}>
                AI Processing...
              </div>
              <div style={{ color: "#64748b", fontSize: 14, marginTop: 6 }}>
                Extracting prescription data
              </div>
            </div>
          )}
          {uploadState === "done" && prescription && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    background: "#dcfce7",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ✅
                </div>
                <div style={{ fontWeight: 700 }}>Prescription Extracted</div>
              </div>
              <div style={{ ...S.card, marginBottom: 12 }}>
                <div style={{ fontSize: 13 }}>
                  <b>Doctor:</b> {prescription.doctor}
                </div>
                <div style={{ fontSize: 13, marginTop: 4 }}>
                  <b>Date:</b> {prescription.date}
                </div>
              </div>
              {prescription.medicines.map((m, i) => (
                <div
                  key={i}
                  style={{
                    ...S.card,
                    marginBottom: 10,
                    borderLeft: "4px solid #2563eb",
                  }}
                >
                  <div style={{ fontWeight: 700 }}>{m.name}</div>
                  <div style={{ fontSize: 13, color: "#2563eb" }}>
                    {m.dosage}
                  </div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>
                    {m.instructions} • {m.duration}
                  </div>
                </div>
              ))}
              {prescription.notes && (
                <div
                  style={{
                    background: "#fef9c3",
                    border: "1px solid #fde68a",
                    borderRadius: 12,
                    padding: "12px 16px",
                    fontSize: 13,
                    color: "#854d0e",
                    marginBottom: 14,
                  }}
                >
                  <b>Notes:</b> {prescription.notes}
                </div>
              )}
              <button
                onClick={saveRecord}
                style={{ ...S.btn, background: "#16a34a" }}
              >
                💾 Save to Medical Records
              </button>
            </div>
          )}
        </div>
      )}

      {tab === "records" && (
        <div>
          {records.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "48px 0",
                color: "#94a3b8",
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>🗂️</div>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#1e293b" }}>
                No Medical Records
              </div>
              <div style={{ fontSize: 13, marginTop: 6 }}>
                Upload a prescription to save it here
              </div>
              <button
                onClick={() => setTab("upload")}
                style={{
                  ...S.btn,
                  width: "auto",
                  padding: "10px 24px",
                  marginTop: 16,
                }}
              >
                Upload Now
              </button>
            </div>
          ) : (
            records.map((r, i) => (
              <div key={r.id} style={{ ...S.card, marginBottom: 14 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700 }}>Prescription #{i + 1}</div>
                    <div style={{ fontSize: 13, color: "#64748b" }}>
                      {r.date} • {r.doctor_name}
                    </div>
                  </div>
                  <span style={S.badge}>SAVED</span>
                </div>
                {(r.medicines || []).map((m, j) => (
                  <div
                    key={j}
                    style={{
                      fontSize: 13,
                      color: "#374151",
                      padding: "4px 0",
                      borderTop: j > 0 ? "1px solid #f1f5f9" : "none",
                    }}
                  >
                    • {typeof m === "object" ? `${m.name} — ${m.dosage}` : m}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────
function ProfilePage({ profile, onAI, onLogout }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: profile.name,
    phone: profile.phone || "",
    location: profile.location || "Kolkata",
  });
  const [saving, setSaving] = useState(false);
  const { toast, show, hide } = useToast();

  const save = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ name: form.name, phone: form.phone, location: form.location })
      .eq("id", profile.id);
    setSaving(false);
    if (error) {
      show(error.message, "error");
      return;
    }
    show("Profile updated!");
    setEditing(false);
  };

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={hide} />}
      <div style={{ ...S.card, textAlign: "center", marginBottom: 16 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #2563eb, #7c3aed)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 12px",
            fontSize: 28,
            fontWeight: 800,
            color: "white",
          }}
        >
          {profile.name
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)}
        </div>
        <div style={{ fontWeight: 800, fontSize: 20 }}>{profile.name}</div>
        <div style={{ color: "#64748b", fontSize: 14 }}>{profile.email}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            marginTop: 10,
          }}
        >
          <span style={S.badge}>✓ Verified Patient</span>
          <span
            style={{
              background: "#eff6ff",
              color: "#2563eb",
              fontSize: 11,
              padding: "3px 10px",
              borderRadius: 20,
              fontWeight: 600,
            }}
          >
            📍 {profile.location || "Kolkata"}
          </span>
        </div>
        <button
          onClick={() => setEditing(!editing)}
          style={{
            ...S.btnOutline,
            marginTop: 14,
            width: "auto",
            padding: "8px 20px",
            fontSize: 13,
          }}
        >
          {editing ? "Cancel" : "✏️ Edit Profile"}
        </button>
      </div>

      {editing && (
        <div style={{ ...S.card, marginBottom: 16 }}>
          {[
            ["name", "Full Name"],
            ["phone", "Phone Number"],
            ["location", "Location"],
          ].map(([k, l]) => (
            <div key={k} style={{ marginBottom: 12 }}>
              <label style={S.label}>{l}</label>
              <input
                value={form[k]}
                onChange={(e) =>
                  setForm((f) => ({ ...f, [k]: e.target.value }))
                }
                style={S.input}
              />
            </div>
          ))}
          <button
            onClick={save}
            disabled={saving}
            style={{ ...S.btn, opacity: saving ? 0.7 : 1 }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}

      <button
        onClick={onAI}
        style={{
          width: "100%",
          background: "linear-gradient(135deg, #2563eb, #7c3aed)",
          color: "white",
          border: "none",
          borderRadius: 16,
          padding: "18px 20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 14,
          textAlign: "left",
          marginBottom: 12,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            background: "rgba(255,255,255,0.2)",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            flexShrink: 0,
          }}
        >
          🤖
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>
            AI Health Assistant
          </div>
          <div style={{ fontSize: 13, opacity: 0.85 }}>
            Chat, upload prescriptions, view records
          </div>
        </div>
      </button>

      {[
        "Appointment History",
        "Notifications",
        "Privacy & Security",
        "Help & Support",
      ].map((item) => (
        <div
          key={item}
          style={{
            ...S.card,
            marginBottom: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 14 }}>{item}</div>
          <div style={{ color: "#94a3b8" }}>›</div>
        </div>
      ))}

      <button
        onClick={onLogout}
        style={{
          ...S.btnRed,
          marginTop: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        🚪 Sign Out
      </button>
    </div>
  );
}

// ─── PROVIDER DASHBOARD ───────────────────────────────────────────────────────
function ProviderDashboard({ profile, onLogout }) {
  const [providerData, setProviderData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [tab, setTab] = useState("overview");
  const [newMed, setNewMed] = useState({
    name: "",
    brand: "",
    price: "",
    mrp: "",
    category: "",
  });
  const [availability, setAvailability] = useState("Available");
  const { toast, show, hide } = useToast();

  const colorMap = {
    doctor: "#2563eb",
    hospital: "#7c3aed",
    ambulance: "#ef4444",
    dispensary: "#16a34a",
    pathological: "#d97706",
    insurance: "#0891b2",
  };
  const color = colorMap[profile.role] || "#2563eb";

  useEffect(() => {
    supabase
      .from("providers")
      .select("*")
      .eq("user_id", profile.id)
      .single()
      .then(({ data }) => {
        setProviderData(data);
        if (data) {
          setAvailability(data.availability || "Available");
          supabase
            .from("appointments")
            .select("*, profiles(name, phone)")
            .eq("provider_id", data.id)
            .then(({ data: apts }) => setAppointments(apts || []));
          supabase
            .from("ratings")
            .select("*")
            .eq("provider_id", data.id)
            .then(({ data: r }) => setRatings(r || []));
          if (profile.role === "dispensary")
            supabase
              .from("medicines")
              .select("*")
              .eq("provider_id", data.id)
              .then(({ data: m }) => setMedicines(m || []));
        }
      });
  }, [profile.id]);

  const updateAvailability = async (val) => {
    setAvailability(val);
    await supabase
      .from("providers")
      .update({ availability: val, is_available: val === "Available" })
      .eq("user_id", profile.id);
    show(`Status updated to ${val}`);
  };

  const addMedicine = async () => {
    if (!newMed.name || !providerData) return;
    const { error } = await supabase
      .from("medicines")
      .insert({ ...newMed, provider_id: providerData.id, in_stock: true });
    if (error) {
      show(error.message, "error");
      return;
    }
    show(`${newMed.name} added!`);
    setNewMed({ name: "", brand: "", price: "", mrp: "", category: "" });
    supabase
      .from("medicines")
      .select("*")
      .eq("provider_id", providerData.id)
      .then(({ data }) => setMedicines(data || []));
  };

  const avgRating = ratings.length
    ? (ratings.reduce((a, b) => a + b.stars, 0) / ratings.length).toFixed(1)
    : "–";

  return (
    <div
      style={{ minHeight: "100vh", background: "#f8fafc", paddingBottom: 20 }}
    >
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={hide} />}
      <div
        style={{
          background: `linear-gradient(135deg, ${color}, ${color}cc)`,
          color: "white",
          padding: "14px 20px",
          boxShadow: `0 2px 12px ${color}44`,
        }}
      >
        <div
          style={{
            maxWidth: 680,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontWeight: 800, fontSize: 17 }}>{profile.name}</div>
            <div
              style={{
                fontSize: 12,
                opacity: 0.8,
                textTransform: "capitalize",
              }}
            >
              {profile.role} Dashboard
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <select
              value={availability}
              onChange={(e) => updateAvailability(e.target.value)}
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "white",
                borderRadius: 10,
                padding: "6px 10px",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <option style={{ color: "#1e293b" }}>Available</option>
              <option style={{ color: "#1e293b" }}>Busy</option>
              <option style={{ color: "#1e293b" }}>Closed</option>
            </select>
            <button
              onClick={onLogout}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: 10,
                padding: "8px 14px",
                cursor: "pointer",
                color: "white",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "20px 16px" }}>
        {/* Stats */}
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          {[
            ["Appointments", appointments.length],
            ["Rating", avgRating === "–" ? "No ratings" : `⭐ ${avgRating}`],
            ["Reviews", ratings.length],
          ].map(([l, v]) => (
            <div key={l} style={{ flex: 1, ...S.card, textAlign: "center" }}>
              <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>
                {l.toUpperCase()}
              </div>
              <div style={{ fontWeight: 800, fontSize: 18, color: "#1e293b" }}>
                {v}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 4,
            background: "#f1f5f9",
            borderRadius: 12,
            padding: 4,
            marginBottom: 20,
          }}
        >
          {[
            ["overview", "Overview"],
            ["appointments", "Appointments"],
            ["reviews", "Reviews"],
            ...(profile.role === "dispensary"
              ? [["medicines", "Medicines"]]
              : []),
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                flex: 1,
                padding: "9px 4px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                background: tab === id ? "white" : "transparent",
                color: tab === id ? color : "#64748b",
                boxShadow: tab === id ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "overview" && providerData && (
          <div>
            <div style={{ ...S.card, marginBottom: 14 }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>
                Your Listing
              </div>
              {[
                ["Name", providerData.name],
                ["Specialty", providerData.specialty],
                ["Address", providerData.address],
                ["Phone", providerData.phone],
                ["Fee", providerData.fee],
              ]
                .filter(([, v]) => v)
                .map(([l, v]) => (
                  <div
                    key={l}
                    style={{
                      display: "flex",
                      gap: 8,
                      padding: "6px 0",
                      borderBottom: "1px solid #f1f5f9",
                      fontSize: 14,
                    }}
                  >
                    <span style={{ color: "#94a3b8", minWidth: 80 }}>{l}</span>
                    <span style={{ fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
            </div>
            {providerData.services?.length > 0 && (
              <div style={{ ...S.card }}>
                <div style={{ fontWeight: 700, marginBottom: 10 }}>
                  Services
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {providerData.services.map((s) => (
                    <span key={s} style={S.tag}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "appointments" && (
          <div>
            {appointments.length === 0 ? (
              <div
                style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}
              >
                No appointments yet. Patients will appear here when they book.
              </div>
            ) : (
              appointments.map((a) => (
                <div key={a.id} style={{ ...S.card, marginBottom: 12 }}>
                  <div style={{ fontWeight: 700 }}>
                    {a.profiles?.name || "Patient"}
                  </div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>
                    {a.reason}
                  </div>
                  <div style={{ fontSize: 13, color: "#2563eb", marginTop: 4 }}>
                    {a.date} • {a.time}
                  </div>
                  <span
                    style={{
                      background: "#eff6ff",
                      color: "#2563eb",
                      fontSize: 11,
                      padding: "2px 10px",
                      borderRadius: 20,
                      fontWeight: 600,
                      marginTop: 6,
                      display: "inline-block",
                    }}
                  >
                    {a.status}
                  </span>
                  {a.profiles?.phone && (
                    <div style={{ fontSize: 13, marginTop: 6 }}>
                      📞 {a.profiles.phone}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {tab === "reviews" && (
          <div>
            {ratings.length === 0 ? (
              <div
                style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}
              >
                No reviews yet.
              </div>
            ) : (
              ratings.map((r) => (
                <div key={r.id} style={{ ...S.card, marginBottom: 12 }}>
                  <Stars rating={r.stars} count={0} />
                  {r.review && (
                    <div
                      style={{ fontSize: 14, color: "#374151", marginTop: 8 }}
                    >
                      {r.review}
                    </div>
                  )}
                  <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 6 }}>
                    {new Date(r.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "medicines" && profile.role === "dispensary" && (
          <div>
            <div style={{ ...S.card, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 12 }}>
                Add Medicine
              </div>
              {[
                ["name", "Medicine Name"],
                ["brand", "Brand"],
                ["price", "Price (e.g. ₹50)"],
                ["mrp", "MRP"],
                ["category", "Category"],
              ].map(([k, l]) => (
                <div key={k} style={{ marginBottom: 10 }}>
                  <input
                    placeholder={l}
                    value={newMed[k]}
                    onChange={(e) =>
                      setNewMed((f) => ({ ...f, [k]: e.target.value }))
                    }
                    style={S.input}
                  />
                </div>
              ))}
              <button onClick={addMedicine} style={S.btn}>
                + Add Medicine
              </button>
            </div>
            {medicines.map((m) => (
              <div
                key={m.id}
                style={{
                  ...S.card,
                  marginBottom: 10,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700 }}>{m.name}</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>
                    {m.brand} • {m.category}
                  </div>
                  <div style={{ fontWeight: 800, color: "#16a34a" }}>
                    {m.price}
                  </div>
                </div>
                <span
                  style={{
                    background: "#dcfce7",
                    color: "#16a34a",
                    fontSize: 11,
                    padding: "2px 10px",
                    borderRadius: 20,
                    fontWeight: 700,
                    alignSelf: "flex-start",
                  }}
                >
                  {m.in_stock ? "In Stock" : "Out"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PATIENT DASHBOARD ────────────────────────────────────────────────────────
function PatientDashboard({ profile, onLogout }) {
  const [nav, setNav] = useState("home");
  const [tab, setTab] = useState("hospitals");

  const navItems = [
    { id: "home", label: "Home", emoji: "🏠", color: "#2563eb" },
    { id: "map", label: "Map", emoji: "🗺️", color: "#0891b2" },
    { id: "ambulance", label: "Ambulance", emoji: "🚑", color: "#dc2626" },
    { id: "wellness", label: "Wellness", emoji: "🌿", color: "#16a34a" },
    { id: "profile", label: "Profile", emoji: "👤", color: "#7c3aed" },
  ];

  return (
    <div
      style={{ minHeight: "100vh", background: "#f8fafc", paddingBottom: 80 }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
          color: "white",
          padding: "14px 20px",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 2px 12px rgba(37,99,235,0.3)",
        }}
      >
        <div
          style={{
            maxWidth: 680,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                background: "rgba(255,255,255,0.2)",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              ❤️
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16 }}>Cosmocare</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>
                Welcome back, {profile.name.split(" ")[0]}! 👋
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: 10,
                padding: 8,
                cursor: "pointer",
                color: "white",
                position: "relative",
              }}
            >
              🔔
              <span
                style={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  width: 8,
                  height: 8,
                  background: "#ef4444",
                  borderRadius: "50%",
                }}
              />
            </button>
            <button
              onClick={onLogout}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: 10,
                padding: "8px 12px",
                cursor: "pointer",
                color: "white",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "20px 16px" }}>
        {nav === "home" && (
          <div>
            <div
              style={{
                ...S.gradCard,
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                marginBottom: 14,
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>
                🚑 Need Help Now?
              </div>
              <div style={{ fontSize: 13, opacity: 0.9, marginBottom: 14 }}>
                Find nearest ambulance in Kolkata instantly
              </div>
              <button
                onClick={() => setNav("ambulance")}
                style={{
                  background: "white",
                  color: "#dc2626",
                  border: "none",
                  borderRadius: 12,
                  padding: "12px 24px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Find Ambulance
              </button>
            </div>
            <div
              style={{
                ...S.gradCard,
                background: "linear-gradient(135deg, #0891b2, #0e7490)",
                marginBottom: 20,
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>
                🗺️ Find Nearby Services
              </div>
              <div style={{ fontSize: 13, opacity: 0.9, marginBottom: 14 }}>
                Live map of hospitals, clinics, pharmacies
              </div>
              <button
                onClick={() => setNav("map")}
                style={{
                  background: "white",
                  color: "#0e7490",
                  border: "none",
                  borderRadius: 12,
                  padding: "12px 24px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Open Map
              </button>
            </div>

            <div
              style={{
                display: "flex",
                overflowX: "auto",
                gap: 6,
                marginBottom: 20,
                paddingBottom: 4,
              }}
            >
              {[
                ["hospitals", "🏥 Hospitals"],
                ["doctors", "👨‍⚕️ Doctors"],
                ["pharmacy", "💊 Pharmacy"],
                ["blood", "🩸 Blood Bank"],
                ["insurance", "🛡️ Insurance"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  style={{
                    padding: "10px 16px",
                    borderRadius: 12,
                    border: "1.5px solid",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: 13,
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    borderColor: tab === id ? "#2563eb" : "#e5e7eb",
                    background: tab === id ? "#2563eb" : "white",
                    color: tab === id ? "white" : "#64748b",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            {tab === "hospitals" && (
              <ProviderList
                type="hospital"
                userId={profile.id}
                title="Hospitals & Labs"
                color="#7c3aed"
                emptyMsg="No hospitals registered yet. Hospitals can sign up to appear here."
              />
            )}
            {tab === "doctors" && (
              <ProviderList
                type="doctor"
                userId={profile.id}
                title="Doctors"
                color="#2563eb"
                emptyMsg="No doctors registered yet. Doctors can sign up to appear here."
              />
            )}
            {tab === "pharmacy" && <EPharmacy userId={profile.id} />}
            {tab === "blood" && (
              <BloodBank userId={profile.id} userName={profile.name} />
            )}
            {tab === "insurance" && (
              <ProviderList
                type="insurance"
                userId={profile.id}
                title="Insurance Providers"
                color="#0891b2"
                emptyMsg="No insurance providers registered yet."
              />
            )}
          </div>
        )}
        {nav === "map" && <MapSearch userId={profile.id} />}
        {nav === "ambulance" && <AmbulanceSearch userId={profile.id} />}
        {nav === "wellness" && (
          <div>
            <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 16 }}>
              🌿 Wellness Hub
            </div>
            {[
              [
                "💆 Mental Health & Meditation",
                "Start a 10-min guided session",
              ],
              ["📅 Menstrual Cycle Tracker", "Log & predict your cycle"],
              ["🏃 Fitness Tracker", "Track steps, water & calories"],
              ["😴 Sleep Tracker", "Monitor sleep patterns"],
              ["🧘 Breathing Exercises", "Reduce stress with breathing"],
            ].map(([title, desc]) => (
              <div
                key={title}
                style={{
                  ...S.card,
                  marginBottom: 12,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{title}</div>
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
                    {desc}
                  </div>
                </div>
                <button
                  style={{
                    ...S.btn,
                    width: "auto",
                    padding: "8px 16px",
                    height: 36,
                    fontSize: 12,
                    background: "#16a34a",
                  }}
                >
                  Start
                </button>
              </div>
            ))}
          </div>
        )}
        {nav === "profile" && (
          <ProfilePage
            profile={profile}
            onAI={() => setNav("ai")}
            onLogout={onLogout}
          />
        )}
        {nav === "ai" && (
          <div>
            <button
              onClick={() => setNav("profile")}
              style={{
                background: "#f1f5f9",
                border: "none",
                borderRadius: 10,
                padding: "8px 14px",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              ← Back
            </button>
            <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 4 }}>
              🤖 AI Health Assistant
            </div>
            <div style={{ color: "#64748b", fontSize: 14, marginBottom: 20 }}>
              Powered by Cosmocare AI
            </div>
            <AIAssistant userId={profile.id} />
          </div>
        )}
      </div>

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "white",
          borderTop: "1px solid #e5e7eb",
          padding: "8px 12px",
          zIndex: 50,
          boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
        }}
      >
        <div
          style={{
            maxWidth: 680,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setNav(item.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                padding: "6px 10px",
                border: "none",
                background: nav === item.id ? `${item.color}12` : "transparent",
                cursor: "pointer",
                borderRadius: 12,
                color: nav === item.id ? item.color : "#94a3b8",
              }}
            >
              <span style={{ fontSize: 20 }}>{item.emoji}</span>
              <span style={{ fontSize: 11, fontWeight: 600 }}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [session, setSession] = useState(undefined); // undefined = loading
  const [profile, setProfile] = useState(null);
  const [needsSetup, setNeedsSetup] = useState(false);

  const loadProfile = async (userId) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    if (data) {
      setProfile(data);
      if (data.role !== "patient") {
        const { data: prov } = await supabase
          .from("providers")
          .select("id")
          .eq("user_id", userId)
          .single();
        if (!prov) setNeedsSetup(true);
      }
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) loadProfile(session.user.id);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) loadProfile(session.user.id);
      else {
        setProfile(null);
        setNeedsSetup(false);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = () => supabase.auth.signOut();

  if (session === undefined)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8fafc",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 56,
              height: 56,
              border: "4px solid #dbeafe",
              borderTop: "4px solid #2563eb",
              borderRadius: "50%",
              margin: "0 auto 16px",
              animation: "spin 1s linear infinite",
            }}
          />
          <div style={{ fontWeight: 700, color: "#1e293b" }}>
            Loading Cosmocare...
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } } * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }`}</style>
      </div>
    );

  if (!session)
    return (
      <>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } } * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; } input:focus { outline: 2px solid #2563eb; } button:active { transform: scale(0.97); }`}</style>
        <LoginScreen onAuth={() => {}} />
      </>
    );

  if (!profile)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            border: "4px solid #dbeafe",
            borderTop: "4px solid #2563eb",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } } * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui; }`}</style>
      </div>
    );

  return (
    <>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; } input:focus { outline: 2px solid #2563eb; } button:active { transform: scale(0.97); } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }`}</style>
      {needsSetup && (
        <ProviderSetup profile={profile} onDone={() => setNeedsSetup(false)} />
      )}
      {!needsSetup && profile.role === "patient" && (
        <PatientDashboard profile={profile} onLogout={handleLogout} />
      )}
      {!needsSetup && profile.role !== "patient" && (
        <ProviderDashboard profile={profile} onLogout={handleLogout} />
      )}
    </>
  );
}

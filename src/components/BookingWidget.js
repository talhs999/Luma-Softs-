"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Clock, X, User, Mail, Phone, ChevronRight, CheckCircle } from "lucide-react";
import { ALL_SERVICES } from "../data/services";

export default function BookingWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: Date/Time, 2: Details, 3: Success
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Show only if NOT on Home (/) and NOT on Admin (/admin...)
    if (pathname !== "/" && !pathname.startsWith("/admin")) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [pathname]);

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    service: ALL_SERVICES[0]?.title || "General Consultation",
    name: "",
    email: "",
    phone: ""
  });

  const TIME_SLOTS = ["10:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM", "07:00 PM"];

  // Generate next 14 days for calendar selection
  const getNextDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      // Skip Sundays
      if (d.getDay() !== 0) {
        days.push(d);
      }
    }
    return days;
  };

  const upcomingDays = getNextDays();

  const handleNext = () => {
    if (step === 1 && (!formData.date || !formData.time)) {
      alert("Please select a date and time to continue.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setStep(3); // Success
      } else {
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("Error submitting booking.");
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStep(1);
      setFormData({ ...formData, date: "", time: "", name: "", email: "", phone: "" });
    }, 500);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {showButton && (
          <motion.button 
            className="booking-widget-btn"
            initial={{ scale: 0, x: "-50%" }}
            animate={{ scale: 1, x: "-50%" }}
            exit={{ scale: 0, x: "-50%" }}
            transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
            onClick={() => setIsOpen(true)}
            style={{
              position: "fixed", bottom: "30px", left: "50%", zIndex: 9998,
              background: "var(--primary)", color: "#000",
              border: "none", borderRadius: "9999px", padding: "14px 28px",
              display: "flex", alignItems: "center", gap: "10px",
              fontWeight: 700, fontSize: "16px", cursor: "pointer",
              boxShadow: "0 10px 25px rgba(194,255,5,0.3)"
            }}
            whileHover={{ scale: 1.05, x: "-50%" }}
            whileTap={{ scale: 0.95, x: "-50%" }}
          >
            <CalendarIcon size={20} />
            Book a Meeting
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal Popup */}
      <AnimatePresence>
        {isOpen && (
          <div style={{
            position: "fixed", inset: 0, zIndex: 9999,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.8)", backdropFilter: "blur(5px)", padding: "1rem"
          }}>
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              style={{
                background: "#0a0a0a", border: "1px solid var(--border)",
                borderRadius: "20px", width: "100%", maxWidth: "500px",
                overflow: "hidden", position: "relative",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)"
              }}
            >
              {/* Header */}
              <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)" }}>
                <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "10px" }}>
                  <CalendarIcon color="var(--primary)" /> Schedule Meeting
                </h3>
                <button onClick={resetAndClose} style={{ background: "none", border: "none", color: "var(--gray)", cursor: "pointer" }}><X size={24} /></button>
              </div>

              {/* Body */}
              <div style={{ padding: "24px" }}>
                
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <p style={{ color: "var(--gray)", marginBottom: "20px", fontSize: "0.9375rem" }}>Select a suitable date and time for our 30-minute discovery call.</p>
                    
                    <label style={{ display: "block", marginBottom: "10px", fontSize: "0.875rem", fontWeight: 600 }}>Select Date</label>
                    <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "15px", marginBottom: "10px", scrollbarWidth: "thin" }}>
                      {upcomingDays.map((d, i) => {
                        const dateString = d.toISOString().split('T')[0];
                        const isSelected = formData.date === dateString;
                        return (
                          <button key={i} onClick={() => setFormData({...formData, date: dateString})} style={{
                            flexShrink: 0, padding: "10px 15px", borderRadius: "12px", cursor: "pointer", transition: "all 0.2s",
                            background: isSelected ? "var(--primary)" : "transparent",
                            color: isSelected ? "#000" : "var(--fg)",
                            border: isSelected ? "1px solid var(--primary)" : "1px solid var(--border)",
                            display: "flex", flexDirection: "column", alignItems: "center", gap: "4px"
                          }}>
                            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 600, opacity: isSelected ? 0.8 : 0.5 }}>
                              {d.toLocaleDateString('en-US', { weekday: 'short' })}
                            </span>
                            <span style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                              {d.getDate()}
                            </span>
                            <span style={{ fontSize: "0.75rem", fontWeight: 500 }}>
                              {d.toLocaleDateString('en-US', { month: 'short' })}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <label style={{ display: "block", marginBottom: "10px", fontSize: "0.875rem", fontWeight: 600 }}>Select Time</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "24px" }}>
                      {TIME_SLOTS.map((t, i) => {
                        const isSelected = formData.time === t;
                        return (
                          <button key={i} onClick={() => setFormData({...formData, time: t})} style={{
                            padding: "12px", borderRadius: "8px", cursor: "pointer", transition: "all 0.2s",
                            background: isSelected ? "rgba(194,255,5,0.1)" : "transparent",
                            color: isSelected ? "var(--primary)" : "var(--fg)",
                            border: isSelected ? "1px solid var(--primary)" : "1px solid var(--border)",
                            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontWeight: 600
                          }}>
                            <Clock size={16} /> {t}
                          </button>
                        );
                      })}
                    </div>

                    <button onClick={handleNext} className="btn-primary" style={{ width: "100%", padding: "14px", display: "flex", justifyContent: "center", gap: "8px" }}>
                      Next Step <ChevronRight size={20} />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.form initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} onSubmit={handleSubmit}>
                    <p style={{ color: "var(--gray)", marginBottom: "20px", fontSize: "0.9375rem" }}>
                      You've selected <strong>{new Date(formData.date).toLocaleDateString()}</strong> at <strong>{formData.time}</strong>. Please provide your details.
                    </p>
                    
                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "6px", fontSize: "0.8125rem", color: "var(--gray)" }}>Service of Interest</label>
                      <select required value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})} className="form-input" style={{ width: "100%", appearance: "auto" }}>
                        {ALL_SERVICES.map((s, i) => <option key={i} value={s.title} style={{ color: "#000", background: "#fff" }}>{s.title}</option>)}
                      </select>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "6px", fontSize: "0.8125rem", color: "var(--gray)" }}>Full Name</label>
                      <div style={{ position: "relative" }}>
                        <User size={18} style={{ position: "absolute", left: "12px", top: "12px", color: "var(--gray)" }} />
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="form-input" style={{ width: "100%", padding: "12px 16px 12px 42px" }} placeholder="John Doe" />
                      </div>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "6px", fontSize: "0.8125rem", color: "var(--gray)" }}>Email Address</label>
                      <div style={{ position: "relative" }}>
                        <Mail size={18} style={{ position: "absolute", left: "12px", top: "12px", color: "var(--gray)" }} />
                        <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="form-input" style={{ width: "100%", padding: "12px 16px 12px 42px" }} placeholder="john@example.com" />
                      </div>
                    </div>

                    <div style={{ marginBottom: "24px" }}>
                      <label style={{ display: "block", marginBottom: "6px", fontSize: "0.8125rem", color: "var(--gray)" }}>Phone Number</label>
                      <div style={{ position: "relative" }}>
                        <Phone size={18} style={{ position: "absolute", left: "12px", top: "12px", color: "var(--gray)" }} />
                        <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="form-input" style={{ width: "100%", padding: "12px 16px 12px 42px" }} placeholder="+1 234 567 890" />
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                      <button type="button" onClick={() => setStep(1)} className="btn-outline" style={{ flex: 1, padding: "14px" }}>Back</button>
                      <button type="submit" disabled={loading} className="btn-primary" style={{ flex: 2, padding: "14px", opacity: loading ? 0.7 : 1 }}>
                        {loading ? "Confirming..." : "Confirm Booking"}
                      </button>
                    </div>
                  </motion.form>
                )}

                {step === 3 && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "20px 0" }}>
                    <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(194,255,5,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                      <CheckCircle size={40} color="var(--primary)" />
                    </div>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "10px" }}>Booking Confirmed!</h3>
                    <p style={{ color: "var(--gray)", lineHeight: 1.6, marginBottom: "30px" }}>
                      Thank you, {formData.name}. We have sent a confirmation email to <strong>{formData.email}</strong>. Our team will prepare for the meeting and contact you shortly.
                    </p>
                    <button onClick={resetAndClose} className="btn-primary" style={{ width: "100%", padding: "14px" }}>Done</button>
                  </motion.div>
                )}
                
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <style>{`
        body.chatbot-open .booking-widget-btn {
          display: none !important;
        }
      `}</style>
    </>
  );
}

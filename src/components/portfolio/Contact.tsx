import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const CONTACT_EMAIL = "3003mukulkumar@gmail.com";

const initialForm = {
  name: "",
  email: "",
  designation: "",
  company: "",
  message: "",
};

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState(initialForm);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (field: keyof typeof initialForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      toast.success("Message sent! I'll get back to you soon.");
      setForm(initialForm);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.", {
        description: `You can also email me directly at ${CONTACT_EMAIL}.`,
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-32 relative" ref={ref}>
      {/* Background */}
      <div className="hero-glow opacity-30" style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)' }} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Info */}
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-xs font-mono text-muted-foreground">Available for new opportunities</span>
              </motion.div>

              <div>
                <span className="text-primary font-mono">07. What's Next?</span>
              </div>

              <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6">Get In Touch</h2>

              <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                I'm currently looking for new opportunities and my inbox is always open.
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>

              {/* Contact Info */}
              <div className="flex flex-col gap-4 mb-10">
                {[
                  {
                    key: "email",
                    as: "a",
                    href: "mailto:3003mukulkumar@gmail.com",
                    icon: Mail,
                    label: "3003mukulkumar@gmail.com",
                  },
                  {
                    key: "phone",
                    as: "a",
                    href: "tel:+918218264744",
                    icon: Phone,
                    label: "+91-8218264744",
                  },
                  {
                    key: "location",
                    as: "div",
                    icon: MapPin,
                    label: "Aligarh, India",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;
                  const content = (
                    <>
                      <Icon className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        {item.label}
                      </span>
                    </>
                  );
                  return (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      whileHover={{ x: 4 }}
                    >
                      {item.as === "a" ? (
                        <a
                          href={item.href}
                          className="flex items-center gap-3 px-5 py-3 glass-card rounded-xl hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-center gap-3 px-5 py-3 glass-card rounded-xl group">
                          {content}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4 }}
                  className="p-4 glass-card rounded-xl text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
                >
                  <Github size={24} />
                </motion.a>
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4 }}
                  className="p-4 glass-card rounded-xl text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
                >
                  <Linkedin size={24} />
                </motion.a>
              </div>
            </div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card rounded-2xl p-6 md:p-8"
            >
              <h3 className="text-lg font-semibold mb-1">Say Hello 👋</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Fill this out and your message lands straight in my inbox.
                I'll reply to the email you provide.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-name">Name</Label>
                    <Input
                      id="contact-name"
                      required
                      value={form.name}
                      onChange={handleChange("name")}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange("email")}
                      placeholder="jane@company.com"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-designation">Designation</Label>
                    <Input
                      id="contact-designation"
                      value={form.designation}
                      onChange={handleChange("designation")}
                      placeholder="Engineering Manager"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-company">Company</Label>
                    <Input
                      id="contact-company"
                      value={form.company}
                      onChange={handleChange("company")}
                      placeholder="Acme Inc."
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea
                    id="contact-message"
                    required
                    value={form.message}
                    onChange={handleChange("message")}
                    placeholder="Let's talk about..."
                    rows={5}
                  />
                </div>

                <Button type="submit" className="w-full gap-2" disabled={isSending}>
                  {isSending ? "Sending..." : "Send Message"}
                  {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong.");
        return;
      }

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setErrorMessage("Couldn't reach the server. Check your connection.");
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-border bg-bg px-4 py-3.5 text-base text-text-primary placeholder:text-text-muted focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral-soft transition-colors";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-semibold text-text-secondary"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your name"
          className={inputClass}
          {...register("name")}
        />
        {errors.name && (
          <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold text-text-secondary"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="name@company.com"
          className={inputClass}
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-semibold text-text-secondary"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="What do you want to build?"
          className={inputClass}
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-coral px-7 py-3.5 text-base font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>

      {status === "success" && (
        <p className="text-sm font-semibold text-teal">
          Message sent. I&apos;ll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm font-semibold text-red-600 dark:text-red-400">{errorMessage}</p>
      )}
    </form>
  );
}

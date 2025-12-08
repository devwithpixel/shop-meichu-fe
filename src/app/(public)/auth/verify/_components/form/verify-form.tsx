"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";
import AuthHeader from "@/components/header/auth-header";
import Link from "next/link";

export default function VerifyForm() {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyOtp = () => {
    console.log("Verifying OTP:", otp);
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      alert("Verification successful! (Dummy action)");
    }, 1500);
  };

  const handleResend = () => {
    console.log("Resending OTP");
    alert("OTP resent! Check your email. (Dummy action)");
  };

  return (
    <>
      <AuthHeader title="Create Account" description="Verify your email" />

      <div className="space-y-6">
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
          <p className="text-sm text-green-700 font-medium">
            Account created! Enter the 6-digit code sent to your email.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="otp" className="text-sm font-semibold text-slate-700">
            Verification Code
          </Label>
          <Input
            id="otp"
            type="text"
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            maxLength={6}
            className="h-12 border-2 border-slate-200 focus:border-blue-600 focus-visible:ring-0 rounded-xl transition-all text-center text-lg tracking-widest text-slate-700"
          />
          <p className="text-xs text-slate-500">
            Didn&apos;t receive it?{" "}
            <button
              type="button"
              onClick={handleResend}
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Resend
            </button>
          </p>
        </div>

        <Button
          onClick={handleVerifyOtp}
          disabled={otp.length !== 6 || isVerifying}
          className="w-full h-12 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isVerifying ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Verifying...
            </>
          ) : (
            <>
              Verify & Continue
              <CheckCircle2 className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
            </>
          )}
        </Button>

        <p className="text-center text-sm text-slate-600">
          Wrong email?{" "}
          <Link
            href="/auth/signup"
            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Go back
          </Link>
        </p>
      </div>
    </>
  );
}

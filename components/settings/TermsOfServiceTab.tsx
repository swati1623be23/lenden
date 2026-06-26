"use client";

export default function TermsOfServiceTab() {
  return (
    <div className="mt-8">
      <div className="rounded-3xl border border-white/10 bg-slate-950/80 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-400/90">Terms of Service</p>
          <p className="mt-2 text-sm text-slate-400">Last updated: June 24, 2026</p>
        </div>

        <div className="max-h-96 overflow-y-auto p-6 space-y-6 text-sm text-slate-300 leading-6">
          <div>
            <h3 className="font-semibold text-white mb-2">1. Acceptance of Terms</h3>
            <p>
              By accessing and using LenDen (the "Service"), you accept and agree to be bound by the terms and provision
              of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-2">2. Use License</h3>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) from
              LenDen for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer
              of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-slate-400">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software contained on LenDen</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
              <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-2">3. Disclaimer</h3>
            <p>
              The materials on LenDen are provided on an 'as is' basis. LenDen makes no warranties, expressed or implied,
              and hereby disclaims and negates all other warranties including, without limitation, implied warranties or
              conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual
              property or other violation of rights.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-2">4. Limitations</h3>
            <p>
              In no event shall LenDen or its suppliers be liable for any damages (including, without limitation, damages
              for loss of data or profit, or due to business interruption) arising out of the use or inability to use the
              materials on LenDen, even if LenDen or an authorized representative has been notified orally or in writing
              of the possibility of such damage.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-2">5. Accuracy of Materials</h3>
            <p>
              The materials appearing on LenDen could include technical, typographical, or photographic errors. LenDen
              does not warrant that any of the materials on LenDen are accurate, complete, or current. LenDen may make
              changes to the materials contained on LenDen at any time without notice.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-2">6. Links</h3>
            <p>
              LenDen has not reviewed all of the sites linked to its Internet web site and is not responsible for the
              contents of any such linked site. The inclusion of any link does not imply endorsement by LenDen of the
              site. Use of any such linked website is at the user's own risk.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-2">7. Modifications</h3>
            <p>
              LenDen may revise these terms of service for its website at any time without notice. By using this website,
              you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-2">8. Governing Law</h3>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in
              which LenDen operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that
              location.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-2">9. User Accounts</h3>
            <p>
              If you create an account on LenDen, you are responsible for maintaining the confidentiality of your account
              information and password and for restricting access to your computer. You agree to accept responsibility for
              all activities that occur under your account. You must notify LenDen immediately of any unauthorized use of
              your account.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-2">10. Data Privacy</h3>
            <p>
              Your use of LenDen is also governed by our Privacy Policy. Please review our Privacy Policy to understand
              our privacy practices regarding the collection and use of your personal information.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-2">11. Contact Information</h3>
            <p>
              If you have any questions about these Terms of Service, please contact us at support@lenden.dev or visit
              our website documentation at docs.lenden.dev.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 p-6">
          <p className="text-xs text-slate-500">
            © 2026 LenDen. All rights reserved. These Terms of Service constitute the entire agreement between you and
            LenDen regarding the use of the Service.
          </p>
        </div>
      </div>
    </div>
  );
}

'use client'
import React from "react";

const TermsConditions = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Terms & Conditions
      </h1>

      <p className="text-gray-600 mb-8">
        Last Updated: March 2026
      </p>

      <div className="space-y-8 text-gray-700 leading-relaxed">

        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
          <p>
            Welcome to <strong>LPUDeals</strong>, a campus marketplace created
            for students of Lovely Professional University (LPU). By using this
            platform, you agree to follow the terms and conditions mentioned
            below. These terms are designed to ensure safe and responsible use
            of the marketplace.
          </p>
        </section>

        {/* Eligibility */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">2. Eligibility</h2>
          <p>
            LPUDeals is intended only for students of Lovely Professional
            University. Users must provide accurate information while
            registering and using the platform.
          </p>
        </section>

        {/* User Responsibilities */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            3. User Responsibilities
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate product descriptions.</li>
            <li>Do not post illegal, harmful, or misleading listings.</li>
            <li>Respect other users on the platform.</li>
            <li>Use the marketplace only for legitimate buying and selling.</li>
          </ul>
        </section>

        {/* Prohibited Items */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            4. Prohibited Items
          </h2>

          <p>The following items are not allowed to be sold on the platform:</p>

          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Illegal products</li>
            <li>Weapons or dangerous materials</li>
            <li>Fake or counterfeit items</li>
            <li>Stolen goods</li>
          </ul>
        </section>

        {/* Transactions */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            5. Transactions
          </h2>

          <p>
            LPUDeals only provides a platform to connect buyers and sellers.
            All transactions occur directly between users. The platform is not
            responsible for payment disputes or product quality.
          </p>
        </section>

        {/* Safety */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            6. Safety Guidelines
          </h2>

          <p>
            Users are encouraged to meet in safe public places on campus and
            verify the product before completing any transaction.
          </p>
        </section>

        {/* Account Termination */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            7. Account Suspension
          </h2>

          <p>
            LPUDeals reserves the right to suspend or remove accounts that
            violate these terms, misuse the platform, or post inappropriate
            content.
          </p>
        </section>

        {/* Policy Updates */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            8. Changes to Terms
          </h2>

          <p>
            These terms may be updated at any time. Continued use of the
            platform indicates acceptance of the updated terms.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            9. Contact
          </h2>

          <p>
            If you have any questions regarding these Terms & Conditions,
            please contact the LPUDeals support team.
          </p>
        </section>

      </div>
    </div>
  );
};

export default TermsConditions;
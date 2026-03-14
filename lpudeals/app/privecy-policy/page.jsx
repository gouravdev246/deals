'use client'

import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        Privacy Policy
      </h1>

      <p className="text-gray-600 mb-8">
        Last Updated: March 2026
      </p>

      <div className="space-y-8 text-gray-700 leading-relaxed">

        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
          <p>
            LPUDeals is a campus marketplace designed for students of Lovely
            Professional University (LPU). This Privacy Policy explains how we
            collect, use, and protect your information when you use our
            platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            2. Information We Collect
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>Name and email address during registration</li>
            <li>Profile information provided by users</li>
            <li>Product listings and item details</li>
            <li>Messages between buyers and sellers</li>
            <li>Usage data such as searches and interactions</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            3. How We Use Your Information
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>To create and manage user accounts</li>
            <li>To enable buying and selling within the platform</li>
            <li>To improve the marketplace experience</li>
            <li>To ensure platform security and prevent misuse</li>
            <li>To allow communication between buyers and sellers</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            4. Data Security
          </h2>
          <p>
            We implement appropriate security measures to protect your personal
            information. However, users are also responsible for keeping their
            account credentials secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            5. Information Sharing
          </h2>
          <p>
            LPUDeals does not sell or share your personal information with
            third parties. Your data is only used to operate and improve the
            platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            6. User Responsibilities
          </h2>
          <p>
            Users must provide accurate information while listing products and
            interacting with other students. Misuse of the platform may lead to
            account suspension.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            7. Updates to This Policy
          </h2>
          <p>
            This Privacy Policy may be updated from time to time. Changes will
            be reflected on this page with the updated date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            8. Contact Us
          </h2>
          <p>
            If you have any questions regarding this Privacy Policy, you may
            contact us through the platform support section.
          </p>
        </section>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
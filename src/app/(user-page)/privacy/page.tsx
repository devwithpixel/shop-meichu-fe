import React from "react";
import Footer from "@/components/footer/footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Shop Meichu",
  description: "Privacy Policy for Shop Meichu (shop-meichu.com).",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="max-w-6xl mx-auto py-18">
        {/* TITLE */}
        <h1 className="text-center text-6xl md:text-7xl font-extrabold mb-12">
          Privacy policy
        </h1>

        {/* INTRO */}
        <div className="prose prose-lg max-w-none mb-10">
          <p>Last updated: December 3, 2025</p>
          <p>
            This Privacy Policy describes how Shop Meichu (the "Site", "we",
            "us", or "our") collects, uses, and discloses your personal
            information when you visit, use our services, or make a purchase
            from shop-meichu.com (the "Site") or otherwise communicate with us
            regarding the Site (collectively, the "Services"). For purposes of
            this Privacy Policy, "you" and "your" means you as the user of the
            Services, whether you are a customer, website visitor, or another
            individual whose information we have collected pursuant to this
            Privacy Policy.
          </p>

          <p>
            Please read this Privacy Policy carefully. By using and accessing
            any of the Services, you agree to the collection, use, and
            disclosure of your information as described in this Privacy Policy.
            If you do not agree to this Privacy Policy, please do not use or
            access any of the Services.
          </p>
        </div>

        {/* SECTION: Changes */}
        <h2 className="text-3xl font-bold mt-8 mb-4">
          Changes to This Privacy Policy
        </h2>
        <div className="mb-8 prose max-w-none">
          <p>
            We may update this Privacy Policy from time to time, including to
            reflect changes to our practices or for other operational, legal, or
            regulatory reasons. We will post the revised Privacy Policy on the
            Site, update the "Last updated" date and take any other steps
            required by applicable law.
          </p>
        </div>

        {/* HOW WE COLLECT */}
        <h2 className="text-3xl font-bold mt-8 mb-4">
          How We Collect and Use Your Personal Information
        </h2>
        <div className="mb-8 prose max-w-none">
          <p>
            To provide the Services, we collect and have collected over the past
            12 months personal information about you from a variety of sources,
            as set out below. The information that we collect and use varies
            depending on how you interact with us.
          </p>
          <p>
            In addition to the specific uses set out below, we may use
            information we collect about you to communicate with you, provide or
            improve the Services, comply with any applicable legal obligations,
            enforce any applicable terms of service, and to protect or defend
            the Services, our rights, and the rights of our users or others.
          </p>
        </div>

        {/* WHAT PERSONAL INFORMATION */}
        <h2 className="text-3xl font-bold mt-8 mb-4">
          What Personal Information We Collect
        </h2>
        <div className="prose max-w-none mb-8">
          <h3 className="text-xl font-semibold">
            Information We Collect Directly from You
          </h3>
          <p>
            Information that you directly submit to us through our Services may
            include:
          </p>
          <ul className="list-disc pl-6">
            <li>
              <strong>Contact details</strong> including your name, address,
              phone number, and email.
            </li>
            <li>
              <strong> Order information</strong> including your name, billing
              address, shipping address, payment confirmation, email address,
              and phone number.
            </li>
            <li>
              <strong> Account information</strong> including your username,
              password, security questions and other information used for
              account security purposes.
            </li>
            <li>
              <strong> Customer support information</strong> including the
              information you choose to include in communications with us, for
              example, when sending a message through the Services.
            </li>
          </ul>
          <p>
            Some features of the Services may require you to directly provide us
            with certain information about yourself. You may elect not to
            provide this information, but doing so may prevent you from using or
            accessing these features.
          </p>

          <h3 className="text-xl font-semibold mt-4">
            Information We Collect about Your Usage
          </h3>
          <p>
            We may also automatically collect certain information about your
            interaction with the Services ("Usage Data"). To do this, we may use
            cookies, pixels and similar technologies ("Cookies"). Usage Data may
            include information about how you access and use our Site and your
            account, including device information, browser information,
            information about your network connection, your IP address and other
            information regarding your interaction with the Services.
          </p>

          <h3 className="text-xl font-semibold mt-4">
            Information We Obtain from Third Parties
          </h3>
          <p>
            Finally, we may obtain information about you from third parties,
            including from vendors and service providers who may collect
            information on our behalf, such as:
          </p>
          <ul className="list-disc pl-6">
            <li>
              Companies who support our Site and Services, such as Shopify.
            </li>
            <li>
              Our payment processors, who collect payment information (e.g.,
              bank account, credit or debit card information, billing address)
              to process your payment in order to fulfill your orders and
              provide you with products or services you have requested, in order
              to perform our contract with you.
            </li>
            <li>
              When you visit our Site, open or click on emails we send you, or
              interact with our Services or advertisements, we, or third parties
              we work with, may automatically collect certain information using
              online tracking technologies such as pixels, web beacons, software
              developer kits, third-party libraries, and cookies.
            </li>
          </ul>
          <p>
            Any information we obtain from third parties will be treated in
            accordance with this Privacy Policy. Also see the section below,
            Third Party Websites and Links.
          </p>
        </div>

        {/* HOW WE USE */}
        <h2 className="text-3xl font-bold mt-8 mb-4">
          How We Use Your Personal Information
        </h2>
        <ul className="prose max-w-none mb-8 list-disc pl-6">
          <li>
            <strong>Providing Products and Services.</strong> We use your
            personal information to provide you with the Services in order to
            perform our contract with you, including to process your payments,
            fulfill your orders, to send notifications to you related to your
            account, purchases, returns, exchanges or other transactions, to
            create, maintain and otherwise manage your account, to arrange for
            shipping, facilitate any returns and exchanges and other features
            and functionalities related to your account. We may also enhance
            your shopping experience by enabling Shopify to match your account
            with other Shopify services that you may choose to use. In this
            case, Shopify will process your information as set forth in its
            Privacy Policy and Consumer Privacy Policy.
          </li>

          <li>
            <strong>Marketing and Advertising.</strong> We may use your personal
            information for marketing and promotional purposes, such as to send
            marketing, advertising and promotional communications by email, text
            message or postal mail, and to show you advertisements for products
            or services. This may include using your personal information to
            better tailor the Services and advertising on our Site and other
            websites.
          </li>

          <li>
            <strong>Security and Fraud Prevention.</strong> We use your personal
            information to detect, investigate or take action regarding possible
            fraudulent, illegal or malicious activity. If you choose to use the
            Services and register an account, you are responsible for keeping
            your account credentials safe. We highly recommend that you do not
            share your username, password, or other access details with anyone
            else. If you believe your account has been compromised, please
            contact us immediately.
          </li>

          <li>
            <strong>Communicating with You and Service Improvement.</strong> We
            use your personal information to provide you with customer support
            and improve our Services. This is in our legitimate interests in
            order to be responsive to you, to provide effective services to you,
            and to maintain our business relationship with you.
          </li>
        </ul>

        {/* COOKIES */}
        <h2 className="text-3xl font-bold mt-8 mb-4">Cookies</h2>
        <div className="prose max-w-none mb-8">
          <p>
            Like many websites, we use Cookies on our Site. We use Cookies to
            power and improve our Site and our Services (including to remember
            your actions and preferences), to run analytics and better
            understand user interaction with the Services (in our legitimate
            interests to administer, improve and optimize the Services). We may
            also permit third parties and services providers to use Cookies on
            our Site to better tailor the services, products and advertising on
            our Site and other websites.
          </p>

          <p>
            Most browsers automatically accept Cookies by default, but you can
            choose to set your browser to remove or reject Cookies through your
            browser controls. Please keep in mind that removing or blocking
            Cookies can negatively impact your user experience and may cause
            some of the Services, including certain features and general
            functionality, to work incorrectly or no longer be available.
            Additionally, blocking Cookies may not completely prevent how we
            share information with third parties such as our advertising
            partners.
          </p>

          <p>
            Our website also recognizes the Global Privacy Control (GPC) signal,
            which enables you to opt-out of certain uses or disclosures of your
            information. If you notify us of your preference through GPC, we
            will treat such signal as a valid request to opt out of sharing /
            targeted advertising for the associated browser or device, and, if
            we are able to associate the device sending the signal to a Shopify
            account, we will apply the opt out request to the account as well.
            Other than the Global Privacy Control, we do not recognize other “Do
            Not Track” signals that may be sent from your web browser or device.
          </p>
        </div>

        {/* HOW WE DISCLOSE */}
        <h2 className="text-3xl font-bold mt-8 mb-4">
          How We Disclose Personal Information
        </h2>
        <div className="prose max-w-none mb-6">
          <p>
            In certain circumstances, we may disclose your personal information
            to third parties for contract fulfillment purposes, legitimate
            purposes and other reasons subject to this Privacy Policy. Such
            circumstances may include:
          </p>
          <ul className="list-disc pl-6">
            <li>
              With vendors or other third parties who perform services on our
              behalf (e.g., IT management, payment processing, data analytics,
              customer support, cloud storage, fulfillment and shipping).
            </li>
            <li>
              With business and marketing partners to provide services and
              advertise to you. Our business and marketing partners will use
              your information in accordance with their own privacy notices.
            </li>
            <li>
              When you direct, request us or otherwise consent to our disclosure
              of certain information to third parties, such as to ship you
              products or through your use of social media widgets or login
              integrations, with your consent.
            </li>
            <li>
              With our affiliates or otherwise within our corporate group, in
              our legitimate interests to run a successful business.
            </li>
            <li>
              In connection with a business transaction such as a merger or
              bankruptcy, to comply with any applicable legal obligations
              (including to respond to subpoenas, search warrants and similar
              requests), to enforce any applicable terms of service, and to
              protect or defend the Services, our rights, and the rights of our
              users or others.
            </li>
          </ul>
        </div>

        <div className="prose max-w-none mb-6">
          <p>
            We have in the past 12 months disclosed the following categories of
            personal information and sensitive personal information about users
            for the purposes set out above in "How we Collect and Use your
            Personal Information" and "How we Disclose Personal Information":
          </p>
        </div>
        {/* TABLE 1 */}
        <div className="border border-gray-300 w-full text-[15px] leading-relaxed">
          {/* Header */}
          <div className="grid grid-cols-2 border-b border-gray-300">
            <div className="p-4 font-semibold border-r border-gray-300">
              Category
            </div>
            <div className="p-4 font-semibold">Categories of Recipients</div>
          </div>

          {/* Body */}
          <div className="grid grid-cols-2">
            {/* LEFT */}
            <div className="p-4 border-r border-gray-300">
              <ul className="list-disc ml-5 space-y-2">
                <li>
                  Identifiers such as basic contact details and certain order
                  and account information
                </li>
                <li>
                  Personal information categories listed in the California
                  Customer Records statute such as basic contact details and
                  certain order and account information
                </li>
                <li>
                  Commercial information such as order information, shopping
                  information and customer support information
                </li>
                <li>
                  Internet or other similar network activity, such as Usage Data
                </li>
                <li>
                  Geolocation data such as locations determined by an IP address
                  or other technical measures
                </li>
              </ul>
            </div>

            {/* RIGHT */}
            <div className="p-4">
              <ul className="list-disc ml-5 space-y-2">
                <li>
                  Vendors and third parties who perform services on our behalf
                  (such as Internet service providers, payment processors,
                  fulfillment partners, customer support partners and data
                  analytics providers)
                </li>
                <li>Business and marketing partners</li>
                <li>Affiliates</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="prose max-w-none mb-6">
          <p>
            We do not use or disclose sensitive personal information without
            your consent or for the purposes of inferring characteristics about
            you.
          </p>

          <p>
            We have “sold” and “shared” (as those terms are defined in
            applicable law) personal information over the preceding 12 months
            for the purpose of engaging in advertising and marketing activities,
            as follows.
          </p>
        </div>

        {/* TABLE 2 */}
        <div className="mb-10 border border-gray-300 w-full text-[15px] leading-relaxed">
          {/* HEADER */}
          <div className="grid grid-cols-2 border-b border-gray-300">
            <div className="p-4 font-semibold border-r border-gray-300">
              Category of Personal Information
            </div>
            <div className="p-4 font-semibold">Categories of Recipients</div>
          </div>

          {/* ROW 1 */}
          <div className="grid grid-cols-2 border-b border-gray-300">
            <div className="p-4 border-r border-gray-300">
              Identifiers such as name, e-mail address and phone number
            </div>
            <div className="p-4">Business and marketing partners</div>
          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-2 border-b border-gray-300">
            <div className="p-4 border-r border-gray-300">
              Commercial information such as records of products or services
              purchased
            </div>
            <div className="p-4">Business and marketing partners</div>
          </div>

          {/* ROW 3 */}
          <div className="grid grid-cols-2">
            <div className="p-4 border-r border-gray-300">Usage Data</div>
            <div className="p-4">Business and marketing partners</div>
          </div>
        </div>

        {/* THIRD PARTY LINKS */}
        <h2 className="text-3xl font-bold mt-8 mb-4">
          Third Party Websites and Links
        </h2>
        <div className="prose max-w-none mb-8">
          <p>
            Our Site may provide links to websites or other online platforms
            operated by third parties. If you follow links to sites not
            affiliated or controlled by us, you should review their privacy and
            security policies and other terms and conditions. We do not
            guarantee and are not responsible for the privacy or security of
            such sites, including the accuracy, completeness, or reliability of
            information found on these sites. Information you provide on public
            or semi-public venues, including information you share on
            third-party social networking platforms may also be viewable by
            other users of the Services and/or users of those third-party
            platforms without limitation as to its use by us or by a third
            party. Our inclusion of such links does not, by itself, imply any
            endorsement of the content on such platforms or of their owners or
            operators, except as disclosed on the Services.
          </p>
        </div>

        {/* CHILDREN */}
        <h2 className="text-3xl font-bold mt-8 mb-4">Children's Data</h2>
        <div className="prose max-w-none mb-8">
          <p>
            The Services are not intended to be used by children, and we do not
            knowingly collect any personal information about children. If you
            are the parent or guardian of a child who has provided us with their
            personal information, you may contact us using the contact details
            set out below to request that it be deleted.
          </p>

          <p>
            As of the Effective Date of this Privacy Policy, we do not have
            actual knowledge that we “share” or “sell” (as those terms are
            defined in applicable law) personal information of individuals under
            16 years of age.
          </p>
        </div>

        {/* SECURITY & RETENTION */}
        <h2 className="text-3xl font-bold mt-8 mb-4">
          Security and Retention of Your Information
        </h2>
        <div className="prose max-w-none mb-8">
          <p>
            Please be aware that no security measures are perfect or
            impenetrable, and we cannot guarantee “perfect security.” In
            addition, any information you send to us may not be secure while in
            transit. We recommend that you do not use insecure channels to
            communicate sensitive or confidential information to us.
          </p>

          <p>
            How long we retain your personal information depends on different
            factors, such as whether we need the information to maintain your
            account, to provide the Services, comply with legal obligations,
            resolve disputes or enforce other applicable contracts and policies.
          </p>
        </div>

        {/* YOUR RIGHTS */}
        <h2 className="text-3xl font-bold mt-8 mb-4">Your Rights</h2>
        <div className="prose max-w-none mb-8">
          <p>
            Depending on where you live, you may have some or all of the rights
            listed below in relation to your personal information. However,
            these rights are not absolute, may apply only in certain
            circumstances and, in certain cases, we may decline your request as
            permitted by law.
          </p>

          <ul className="list-disc pl-6">
            <li>
              <strong>Right to Access / Know:</strong> You may have a right to
              request access to personal information that we hold about you,
              including details relating to the ways in which we use and share
              your information.
            </li>
            <li>
              <strong>Right to Delete:</strong> You may have a right to request
              that we delete personal information we maintain about you.
            </li>
            <li>
              <strong>Right to Correct:</strong> You may have a right to request
              that we correct inaccurate personal information we maintain about
              you.
            </li>
            <li>
              <strong>Right of Portability:</strong> You may have a right to
              receive a copy of the personal information we hold about you and
              to request that we transfer it to a third party, in certain
              circumstances and with certain exceptions.
            </li>
            <li>
              <strong>Restriction of Processing:</strong> You may have the right
              to ask us to stop or restrict our processing of personal
              information.
            </li>
            <li>
              <strong>Withdrawal of Consent:</strong> Where we rely on consent
              to process your personal information, you may have the right to
              withdraw this consent.
            </li>
            <li>
              <strong>Appeal:</strong> You may have a right to appeal our
              decision if we decline to process your request. You can do so by
              replying directly to our denial.
            </li>
            <li>
              <strong>Managing Communication Preferences:</strong> We may send
              you promotional emails, and you may opt out of receiving these at
              any time by using the unsubscribe option displayed in our emails
              to you. If you opt out, we may still send you non-promotional
              emails, such as those about your account or orders that you have
              made.
            </li>
          </ul>

          <p>
            You may exercise any of these rights where indicated on our Site or
            by contacting us using the contact details provided below.
          </p>

          <p>
            We will not discriminate against you for exercising any of these
            rights. We may need to collect information from you to verify your
            identity, such as your email address or account information, before
            providing a substantive response to the request. In accordance with
            applicable laws, you may designate an authorized agent to make
            requests on your behalf to exercise your rights. Before accepting
            such a request from an agent, we will require that the agent provide
            proof you have authorized them to act on your behalf, and we may
            need you to verify your identity directly with us. We will respond
            to your request in a timely manner as required under applicable law.
          </p>
        </div>

        {/* COMPLAINTS */}
        <h2 className="text-3xl font-bold mt-8 mb-4">Complaints</h2>
        <div className="prose max-w-none mb-8">
          <p>
            If you have complaints about how we process your personal
            information, please contact us using the contact details provided
            below. If you are not satisfied with our response to your complaint,
            depending on where you live you may have the right to appeal our
            decision by contacting us using the contact details set out below,
            or lodge your complaint with your local data protection authority.
          </p>
        </div>

        {/* INTERNATIONAL USERS */}
        <h2 className="text-3xl font-bold mt-8 mb-4">International Users</h2>
        <div className="prose max-w-none mb-8">
          <p>
            Please note that we may transfer, store and process your personal
            information outside the country you live in. Your personal
            information is also processed by staff and third party service
            providers and partners in these countries.
          </p>

          <p>
            If we transfer your personal information out of Europe, we will rely
            on recognized transfer mechanisms like the European Commission's
            Standard Contractual Clauses, or any equivalent contracts issued by
            the relevant competent authority of the UK, as relevant, unless the
            data transfer is to a country that has been determined to provide an
            adequate level of protection.
          </p>
        </div>

        {/* CONTACT */}
        <h2 className="text-3xl font-bold mt-8 mb-4">Contact</h2>
        <div className="prose max-w-none mb-16">
          <p>
            Should you have any questions about our privacy practices or this
            Privacy Policy, or if you would like to exercise any of the rights
            available to you, please call or email us at
            maya.support@shinedezign.com
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}

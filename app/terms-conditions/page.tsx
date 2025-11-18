import Header from '@/components/Header';
import Footer from '@/components/footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 container-main mx-auto px-4 py-0">
        {/* Banner Header */}
        <div className="w-full bg-[#f9efe3] py-12 mb-10 rounded-b-3xl shadow-md">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center tracking-tight">Terms &amp; Conditions</h1>
          <p className="text-lg md:text-xl text-gray-700 text-center mt-4 max-w-2xl mx-auto opacity-90">Please read these terms and conditions carefully before using TheWeddingandevent platform.</p>
        </div>
        <div className="prose max-w-4xl mx-auto text-gray-800">
          <p><strong>TheWeddingandevent</strong></p>
          <p>TheWeddingandevent is a subsidiary of  MCT Business Private Ltd (the “Company”) operates a website (*) (the “Website”). The Website is referred to as the “Online Platform”. These terms and conditions (“Terms”) govern the use of or access to the Online Platform and the Services (as defined below). These Terms constitute a binding and enforceable legal contract between the Company and a User (as defined below) or any end user of the Services (collectively, “you”). You represent and warrant that you (a) have full legal capacity and authority to agree and bind yourself to these Terms, (b) are 18 (eighteen) years of age or older in order to avail any service in which age limit is a pre-condition, and (c) in case you are not 18 (eighteen) years of age, you have sought adult guidance from your guardian/parent etc. so that you may understand in full these terms and conditions of use of the Online Platform.</p>
          <p>If you represent an entity, organization, or any other legal person, you confirm and represent that you have the necessary power and authority to bind such entity, organization, or legal person to these Terms. These Terms also include our privacy policy and any internal guidelines, supplementary terms, policies, or disclaimers made available or issued by us from time to time. By continuing to access or use the Online Platform, or any Service on the Online Platform, you signify your acceptance of the Terms. Further, you understand that the Online Platform is intended for the use of all having full legal capacity and authority to bind themselves to these Terms and are 18 (eighteen) years of age. The Company reserves the right to make changes to these Terms by posting the new/updated version and your continued use and/or non-deletion of the Online Platform shall indicate your agreement to such changes.</p>
          <p>Accordingly, we encourage you to kindly continue to review the Terms whenever accessing or using the Online Platform so as to be abreast with the changes that we may be carrying out to these Terms. By using these Services, you agree that you have read, understood, and are bound by these Terms, and that you comply with the requirements listed herein. If you do not agree to all of these Terms or comply with the requirements herein, please do not access the Online Platform or use the Services.</p>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-[#d13f43]">Services</h2>
          <p>The Company (i) provides a Online Platform wherein the users (“Users”), can hire third-party vendors specific to the wedding and events industry, which shall include amongst others, wedding halls, marquee, banquets, catering service provider, Decor, Beauty parlour, Boutiques, car rental, equipment rentals, flowers and related service providers  (collectively, “Services”). For the purposes of this clause, Services would include any other future services the Company provides/proposes to provide.</p>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-[#d13f43]">On-boarding</h2>
          <ul>
            <li>To avail the Services, a User would be required to create a profile/sign up on the Online Platform (“Profile”) using his/her email ID and/or mobile number, gender, among other details. In addition to setting up a username and password to create the Profile, the User will be required to furnish certain details, including but not limited to mobile numbers, email addresses, and details of its friends and Users it wishes to contact using the Online Platform. The User warrants that all information furnished in connection with its Profile is and shall remain accurate and true in all respects. The User further agrees and undertakes to promptly update its details on the Online Platform in the event of any change or modification of such details.</li>
            <li>The User is solely responsible for maintaining the security and confidentiality of its username and password and agrees to immediately notify the Company in writing at (*) of any disclosure or unauthorized use of its Profile or any other breach of security with respect to its Profile.</li>
            <li>The User expressly agrees to be liable and accountable for all activities that take place through its Profile in furtherance of the use of the Service or otherwise. The Company expressly excludes any liability for any unauthorized access to a User’s Profile.</li>
            <li>The User agrees to receive communications from the Company regarding: (i) information relating to transactions recorded on the Online Platform; (ii) requests for payment; (iii) information about the Company and the Services; (iv) promotional offers and services from the Company and its third-party partners, and (v) any other matter in relation to the Services.</li>
          </ul>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-[#d13f43]">Third Party Services</h2>
          <ul>
            <li>The Services may include services, content, documents, and information owned by, licensed to, or otherwise made available by a third party (“Third Party Services”) or contain links to Third Party Services. Users understand that Third Party Services are the responsibility of the third party that created or provided it and acknowledge that use of such Third-Party Services is solely at their own risk.</li>
            <li>The vendors or service providers using the Online Platform undertake to at all times to provide true and correct information regarding their area-specific services. In case such service providers upload any images/videos/information to further their profile and seek business from other Users, the service providers undertake that any such images/videos/information belong solely to such service provider or that the service provider has obtained all the necessary approvals to post such material on the Online Platform. In case any such images/videos/information are copied by any of the Users, the Company hold no liability of any nature whatsoever.</li>
            <li>The Company makes no representations and hereby expressly excludes all warranties and liabilities arising out of or pertaining to such Third-Party Services, including their accuracy or completeness. Further, all intellectual property rights in and to Third Party Services are the property of the respective third parties.</li>
            <li>The Company enables payments via payment service providers (“PSP”) partners and the User should take care not to share their personal pin, bank account details or OTP with any third party intentionally or unintentionally. The Company never solicits information such as pin or OTP over a call or otherwise. The Company shall not be liable for any fraud due to the sharing of such details by the User. The providers providing Third Party Services / PSP partners shall not be liable for any fraud due to the sharing of such details by the User. If any of such fraudulent transactions occur and where the User shares his debit/credit card or information, the Company may share relevant information of such transaction if the victim approaches the Company via proper channels, including the customer support number and (support email address.</li>
          </ul>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-[#d13f43]">User Responsibilities</h2>
          <ol className="list-decimal ml-6">
            <li>The User hereby represents and warrants that all information that is provided by the User, including the service provider Users through or in relation to the Services is valid, complete, true, and correct on the date of agreeing to these Terms and shall continue to be valid, complete, true, and correct throughout the duration of the User’s use of the Online Platform. The Company does not accept any responsibility or liability for any loss or damage the User may suffer or incur if any information, documentation, material, or data provided to avail the Services is incorrect, incomplete, inaccurate, or misleading, or if the User fails to disclose any material fact. This includes any misinformation by the third-party service provider Users.</li>
            <li>The Online Platform is merely a connecting service provider for Users  wanting to avail the Services and bears no liability/responsibility for any User providing false, incorrect or misleading information.</li>
            <li>The User shall be solely responsible for ensuring compliance with applicable laws and shall be solely liable for any liability that may arise due to a breach of its obligations in this regard.</li>
            <li>The User shall extend all cooperation to the Company in its defending of any proceedings that may be initiated against it due to a breach of the User’s obligations or covenants under these Terms.</li>
            <li>The User shall not use the Services in any manner except as expressly permitted in these Terms. Without limiting the generality of the preceding sentence, the User may not:
              <ul className="list-disc ml-6">
                <li>Infringe either directly or indirectly any third-party proprietary rights, including but not limited to copyrights, patents, trademarks, or trade secrets, of any party;</li>
                <li>except as may be provided hereunder, use in any manner, including copying, displaying, distributing, modifying, publishing, reproducing, storing, transmitting, posting, translating, creating any derivative works from, or licensing the Services;</li>
                <li>use the Services to transmit any data or send or upload any material that contains viruses, Trojan horses or any other harmful programmes or similar computer code designed to adversely affect the operation of any computer software or hardware;</li>
                <li>use any robot, spider, other automated device, or manual process to monitor or copy the Online Platform or Services or any portion thereof;</li>
                <li>use the Services in furtherance of / to engage in any activity which may be grossly harmful, harassing, blasphemous, defamatory, obscene, pornographic, paedophilic, libelous, invasive of another's privacy, hateful, or racially, ethnically objectionable, disparaging, relating or encouraging money laundering or gambling, or otherwise unlawful in any manner whatever; or unlawfully threatening or unlawfully harassing including but not limited to indecent representation of men and women;</li>
                <li>engage in the systematic retrieval of content from the Online Platform or Services to create or compile, directly or indirectly, a collection, compilation, database or directory; or</li>
                <li>violate applicable laws in any manner.</li>
              </ul>
            </li>
            <li>Users are expected to conduct proper research to ensure that the goods and services they send payment links for are in compliance with all applicable laws and we encourage users to cross-check before generating a payment link for prohibited content may result in the suspension or removal of the user’s account.</li>
            <li>The User shall not use the Services for / in furtherance of any sale or supply of prohibited products or services, including but not limited to:
              <ul className="list-disc ml-6">
                <li>sale of regulated goods;</li>
                <li>sale of counterfeit, replicas, and pirated goods and goods infringing any intellectual property rights, including pirated recordings or copies of unauthorized copyrighted materials, whether in electronic or physical form or any other medium which may not be in existence at present;</li>
                <li>sale of tobacco and cigarettes, which includes cigarettes, cigars, chewing tobacco, and related products;</li>
                <li>sale of liquor or any narcotic drugs and psychotropic substances;</li>
                <li>sale/supply of any good or service which may not be in the public interest;</li>
                <li>gambling or other prohibited activities; and</li>
                <li>sale/supply of goods or services which results in non-compliance with any applicable law.</li>
              </ul>
            </li>
            <li>The User shall be solely responsible for compliance with all the applicable laws, including, without limitation, the Anti Money Laundering Act, 2010 and the rules made thereunder. The Company shall not be responsible for any claims or liability or losses that may arise due to non-compliance with the anti-money laundering laws in Pakistan.</li>
          </ol>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-[#d13f43]">Intellectual Property</h2>
          <ol className="list-decimal ml-6">
            <li>All rights, title, and interest in and to the Online Platform and Services, including all intellectual property rights arising out of the Online Platform and Services, are owned by or otherwise lawfully licensed by the Company or the service provider providing their images, videos, etc. to which they themselves own all rights and interests. Subject to compliance with these Terms, the Company grants the User a non-exclusive, non-transferable, non-sub licensable, royalty-free, revocable, and limited licence to use the Online Platform and Services in accordance with these Terms and its written instructions issued from time to time.</li>
            <li>The User should assume that everything the User sees or reads on the Online Platform is protected under all the applicable intellectual property laws of Pakistan and may not be used except with the prior written permission of the Company.</li>
            <li>The Company may freely use, copy, disclose, publish, display, distribute without any payment of royalty, acknowledgement, prior consent, or any other form of restriction arising out of the User’s intellectual property rights.</li>
            <li>Except as stated in these Terms, nothing in these Terms should be construed as conferring any right in or license to the Company’s or any third party’s intellectual property rights.</li>
            <li>The contents of this Online Platform, including but not limited to the text, images and videos herein and their arrangements, unless otherwise noted, are copyright-protected in the whole and every part of this Online Platform and the same belongs to the Company or the service providers for their intellectual property information and may not be used, sold, licensed, copied or reproduced in whole or in part in any manner or form or in or on any media to any person without the prior written consent of the Company.</li>
          </ol>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-[#d13f43]">Term and Termination</h2>
          <ol className="list-decimal ml-6">
            <li>These Terms shall remain in effect unless terminated in accordance with the terms hereunder.</li>
            <li>The Company may terminate a User’s access to or use of the Services, or any portion thereof, immediately and at any point, at its sole discretion, if the User violates or breaches any of its obligations, responsibilities, or covenants under these Terms.</li>
            <li>Upon termination, these Terms shall terminate, except for those clauses that expressly or are intended to survive termination or expiry.</li>
            <li>Notwithstanding anything to the contrary contained in the Terms, upon termination of a User’s access to or use of the Services, all amounts or outstanding monies due by you in relation to your use of or access to the Services shall become immediately payable.</li>
          </ol>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-[#d13f43]">Disclaimers and Warranties</h2>
          <ol className="list-decimal ml-6">
            <li>The use of the Services is at your sole risk.</li>
            <li>The Company is not and will not be responsible for any claim or for any damages suffered, whether by the Users, the customers of the Users or any other person or party, that are related, directly or indirectly, to or arise out of the same, including any payments made by the User using the Online Platform. The User further agrees and undertakes to retain proof of sale documentation (in electronic or physical form) in connection with each transaction it generates or sends to customers.</li>
            <li>To the extent permitted by applicable law, the Services are provided on an “as is” and “as available” basis. The Company does not warrant that operation of the Services will be uninterrupted or error-free or that the functions contained in the Services will meet your requirements.</li>
            <li>To the fullest extent permissible under applicable law, the Company expressly disclaims all warranties of any kind, express or implied, arising out of the Services, including warranties of merchantability, fitness for a particular purpose, satisfactory quality, accuracy, title and non-infringement, compatibility, applicability, usability, appropriateness, and any warranty that may arise out of course of performance, course of dealing, or usage of trade.</li>
            <li>You hereby accept full responsibility for any consequences that may arise from your use of the Services, and expressly agree and acknowledge that the Company shall have absolutely no liability with respect to the same.</li>
            <li>To the fullest extent permissible by law, the Company, its affiliates, and its related parties each disclaim all liability to you for any loss or damage arising out of or due to:
              <ul className="list-disc ml-6">
                <li>your use of, inability to use, or availability or unavailability of the Services, including any Third Party Services;</li>
                <li>the occurrence or existence of any defect, interruption, or delays in the operation or transmission of information to, from, or through the Services, communications failure, theft, destruction or unauthorized access to the Company’s records, programmes, services, server, or other infrastructure relating to the Services; or</li>
                <li>the failure of the Services to remain operational for any period of time.</li>
              </ul>
            </li>
            <li>Notwithstanding anything to the contrary contained herein, neither the Company nor any of its affiliates or related parties shall have any liability to you or any third party for any indirect, incidental, special or consequential damages or any loss of revenue or profits arising under, directly or indirectly, or relating, in any manner whatsoever, to these Terms or the Services. To the maximum extent permitted by law, you agree to waive, release, discharge, and hold harmless the Company, its affiliated and subsidiary companies, its parent companies, and each of their directors, officers, employees, and agents, from any and all claims, losses, damages, liabilities, expenses and causes of action arising out of the Services.</li>
          </ol>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-[#d13f43]">Indemnity</h2>
          <p>You shall indemnify, defend at the Company’s option, and hold the Company, its parent companies, subsidiaries, affiliates, and their officers, associates successors, assigns, licensors, employees, directors, agents, and representatives, harmless from and against any claim, demand, lawsuits, judicial proceeding, losses, liabilities, damages and costs (including, without limitation, from all damages, liabilities, settlements, costs and attorneys’ fees) due to or arising out of your access to the Services, use of the Services, violation of these Terms or any infringement by any third party who may use your account with the Company, of these Terms.</p>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-[#d13f43]">Consent to Use Data</h2>
          <ul>
            <li>You agree that the Company and any third-party service providers it engages may, in accordance with its Privacy Policy, collect and use your information and technical data and related information.</li>
            <li>The Company may use information and data pertaining to your use of the Services for analytics, trends identification, and purposes of statistics to further enhance the effectiveness and efficiency of the Online Platform.</li>
            <li>Subject to applicable laws, the Company may be directed by law enforcement agencies or the government and related bodies to disclose data in relation to Users in connection with criminal proceedings. You understand and agree that in such instances, the Company shall have the right to share such data with relevant agencies or bodies.</li>
          </ul>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-[#d13f43]">Maintenance of Records</h2>
          <p>You shall maintain the records of all payment transactions on the Online Platform independently of the Online Platform (by way of physical copies etc) and the Company reserves the right to seek copies of such records for its own use, including record keeping.</p>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-[#d13f43]">Fees/Charges</h2>
          <p>The Company reserves the right to charge a convenience fee for the Services and non-payment may result in the denial of Services. The Services being offered in the Online Platform are non-transferable, and any payments made are non-refundable.</p>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-[#d13f43]">Modification</h2>
          <p>The Company reserves the right at any time to add, modify or discontinue, temporarily or permanently, the Services (or any part thereof) with or without cause. The Company shall not be liable for any such addition, modification, suspension or discontinuation of the Services.</p>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-[#d13f43]">Jurisdiction, Governing Laws, And Dispute Resolution</h2>
          <p>These Terms shall be governed by and construed and enforced in accordance with the laws of Pakistan. Subject to other provisions in this Clause, courts in Islamabad, Pakistan shall have exclusive jurisdiction over all issues arising out of these Terms or the use of the Services. Any controversies, conflicts, disputes, or differences arising out of these Terms shall be resolved by arbitration in Islamabad, Pakistan in accordance with the Arbitration Act, 1940 for the time being in force, which is deemed to be incorporated by reference in this Clause. The tribunal shall consist of 1 (one) arbitrator appointed by the Company. The language of the arbitration shall be English. The parties to the arbitration shall keep the arbitration confidential and not disclose to any person, other than on a need to basis or to legal advisors, unless required to do so by law. The decision of the arbitrator shall be final and binding on all the Parties hereto. Each party to the arbitration shall bear its own costs with respect to any dispute.</p>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-[#d13f43]">Miscellaneous Provisions</h2>
          <ol className="list-decimal ml-6">
            <li>Modification – The Company reserves the right at any time to modify these Terms and to add new or additional terms or conditions on use of the Services. Such modifications and additional terms and conditions will be communicated to you and, unless expressly rejected (in which these Terms shall terminate), will be effective immediately and will be incorporated into these Terms. In the event you refuse to accept such changes, these Terms will terminate.</li>
            <li>Severability - If any provision of these Terms is determined by any court or other competent authority to be unlawful or unenforceable, the other provisions of these Terms will continue in effect. If any unlawful or unenforceable provision would be lawful or enforceable if part of it were deleted, that part will be deemed to be deleted, and the rest of the provision will continue in effect (unless that would contradict the clear intention of the clause, in which case the entirety of the relevant provision will be deemed to be deleted).</li>
            <li>Assignment - You shall not license, sell, transfer or assign your rights, obligations, or covenants under these Terms in any manner without the Company’s prior written consent. The Company may grant or withhold this consent in its sole discretion and subject to any conditions it deems appropriate. The Company may assign its rights to any of its affiliates, subsidiaries, or parent companies, or to any successor in interest of any business associated with the Services, without any prior notice to you.</li>
            <li>Notices - All notices, requests, demands, and determinations for the Company under these Terms (other than routine operational communications) shall be sent to (*).</li>
            <li>Third Party Rights - No third party shall have any rights to enforce any terms contained herein.</li>
            <li>Translations –The Company may provide you with translated versions of these Terms solely to assist you with understanding these Terms in greater detail. The English version of these Terms shall be controlling in all respects. In the event of any inconsistency between the English version of these Terms and any translated version, the terms of the English version shall prevail.</li>
          </ol>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-[#d13f43]">Refund/Cancellation</h2>
          <p>1. Transactions cannot be cancelled after initiating the transaction. If the User has entered the wrong number/VPA ID, bank account details, then the Company is not a liable party in the transaction.</p>

        </div>
      </main>
      <Footer />
    </div>
  );
}

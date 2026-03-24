import Image from "next/image";

export default function RefundPolicyPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      {/* Banner Image */}
      <div className="w-full h-64 relative mb-10 rounded-xl overflow-hidden shadow-lg">
        <Image
          src="/refund-banner.jpg" // 🖼️ Replace with your image path
          alt="Refund Policy Banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-6">
        Our Company Refund Policy
      </h1>

      <p className="mb-6">
        Thank you for reading !
      </p>

      <p className="mb-6">
        We offer refund and/or exchange within the first 30 days of your purchase, 
        if 30 days have passed since your purchase, you will not be offered a 
        refund and/or exchange of any kind.
      </p>

      {/* Eligibility Section */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Eligibility for Refunds and Exchanges
      </h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Your item must be unused and in the same condition that you received it.</li>
        <li>The item must be in the original packaging.</li>
        <li>To complete your return, we require a receipt or proof of purchase.</li>
        <li>Only regular priced items may be refunded, sale items cannot be refunded.</li>
        <li>
          If the item in question was marked as a gift when purchased and shipped directly 
          to you, you will receive a gift credit for the value of your return.
        </li>
      </ul>

      {/* Exchanges */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">Exchanges (if applicable)</h2>
      <p className="mb-6">
        We only replace items if they are defective or damaged. If you need to 
        exchange it for the same item, send us an email at 
        <span className="font-medium"> (Add Relevant Email Address)</span> 
        and send your item to: <span className="font-medium">(Relevant Address)</span>.
      </p>

      {/* Exempt Goods */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">Exempt Goods</h2>
      <p>The following are exempt from refunds:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Gift cards</li>
        <li>Some health and personal care items</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-3">Partial Refunds (if applicable)</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>Any item not in its original condition, is damaged or missing parts for reasons not due to our error.</li>
        <li>Any item that is returned more than 30 days after delivery.</li>
      </ul>

      {/* Refund Process */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">Refund Process</h2>
      <p className="mb-6">
        Once your return is received and inspected, we will send you an email to notify you 
        that we have received your returned item. We will also notify you of the approval 
        or rejection of your refund.
      </p>
      <p className="mb-6">
        If you are approved, then your refund will be processed, and a credit will 
        automatically be applied to your credit card or original method of payment, 
        within a certain amount of days.
      </p>

      {/* Late Refunds */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">Late or Missing Refunds</h2>
      <p className="mb-6">
        If you have not received a refund yet, first check your bank account again. 
        Then contact your credit card company, it may take some time before your refund 
        is officially posted.
      </p>
      <p className="mb-6">
        If you have done all of this and you still have not received your refund yet, 
        please contact us at <span className="font-medium">(email and or phone number)</span>.
      </p>

      {/* Shipping */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping</h2>
      <p className="mb-6">
        Please do not send the product back to the manufacturer. It must be sent to the 
        following Address: <span className="font-medium">(Relevant Address)</span>.
      </p>
      <p className="mb-6">
        You will be responsible for paying for your own shipping costs for returning your item. 
        Shipping costs are non-refundable. If you receive a refund, the cost of return shipping 
        will be deducted from your refund.
      </p>
      <p className="mb-6">
        Depending on where you live, the time it may take for your exchanged product 
        to reach you may vary.
      </p>
      <p className="mb-6">
        Please note, we cannot guarantee that we will receive your returned item.
      </p>
    </section>
  );
}
export function ProcessSection() {
  const steps = [
    {
      tag: 'Discover',
      title: 'Discover',
      description: 'Browse through our curated list of verified vendors and find the perfect match for your special day.'
    },
    {
      tag: 'Organize',
      title: 'Organize & Schedule',
      description: 'Plan your event timeline and coordinate with multiple vendors seamlessly through our platform.'
    },
    {
      tag: 'Connect',
      title: 'Connect & Book',
      description: 'Get in touch with vendors directly, compare quotes, and book your favorites with ease.'
    },
    {
      tag: 'Celebrate',
      title: 'Plan & Celebrate',
      description: 'Enjoy your perfect day knowing everything is taken care of by trusted professionals.'
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple. Seamless. Stress-Free.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
                  {step.tag}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

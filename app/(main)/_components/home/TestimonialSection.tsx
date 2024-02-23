import React from 'react';

const TestimonialSection = () => {
  return (
    <section className="bg-teal-50 text-back py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What our customers are saying</h2>

        <div className="flex flex-wrap justify-center gap-8">
          {/* Testimonial 1 */}
          <div className="lg:w-1/3 bg-brand rounded-lg p-6 text-white shadow-lg">
            <blockquote className="text-lg italic">
              Flairnow has transformed the way we handle HR and payroll. It&apos;s intuitive and easy to use.
            </blockquote>
            <div className="flex items-center mt-4">
              {/* Replace with actual image */}
              <div className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 24H0V0h24v24z" fill="none" />
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="font-bold">Jane Doe</p>
                <p className="text-xs">CEO at Company</p>
              </div>
            </div>
          </div>
          {/* Testimonial 2 */}
          <div className="lg:w-1/3 bg-brand rounded-lg p-6 text-white shadow-lg">
            <blockquote className="text-lg italic">
              Flairnow has transformed the way we handle HR and payroll. It&apos;s intuitive and easy to use.
            </blockquote>
            <div className="flex items-center mt-4">
              {/* Replace with actual image */}
              <div className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 24H0V0h24v24z" fill="none" />
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="font-bold">Jane Doe</p>
                <p className="text-xs">CEO at Company</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="lg:w-1/3 bg-brand rounded-lg p-6 text-white shadow-lg">
            <blockquote className="text-lg italic">
              Flairnow has transformed the way we handle HR and payroll. It&apos;s intuitive and easy to use.
            </blockquote>
            <div className="flex items-center mt-4">
              {/* Replace with actual image */}
              <div className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 24H0V0h24v24z" fill="none" />
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="font-bold">Jane Doe</p>
                <p className="text-xs">CEO at Company</p>
              </div>
            </div>
          </div>
          {/* Repeat blocks for other testimonials as needed */}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

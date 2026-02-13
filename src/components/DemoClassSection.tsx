import { useState, FormEvent } from 'react';
import { CheckCircle2, Calendar, Clock, BookOpen, Users, Shield, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function DemoClassSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    courseInterest: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const sectionAnimation = useScrollAnimation({ direction: 'up', delay: 100 });
  const formAnimation = useScrollAnimation({ direction: 'right', delay: 150 });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase.from('demo_bookings').insert({
        full_name: formData.fullName,
        phone: formData.phone,
        email: formData.email || null,
        course_interest: formData.courseInterest,
        preferred_date: formData.preferredDate || null,
        preferred_time: formData.preferredTime || null,
        message: formData.message || null,
        status: 'pending',
      });

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        courseInterest: '',
        preferredDate: '',
        preferredTime: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting demo booking:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const courseOptions = [
    'RRB NTPC',
    'SSC CGL',
    'SSC CHSL',
    'Banking Exams',
    'Other',
  ];

  const timeSlots = [
    'Morning (9 AM - 12 PM)',
    'Afternoon (2 PM - 5 PM)',
    'Evening (6 PM - 9 PM)',
  ];

  const demoIncludes = [
    { icon: BookOpen, text: 'Full class experience with expert faculty' },
    { icon: Users, text: 'Interaction with current students' },
    { icon: CheckCircle2, text: 'Sample study material & syllabus overview' },
    { icon: Star, text: 'Personalized guidance & career counseling' },
  ];

  const trustBadges = [
    { icon: Shield, text: 'No Payment Required' },
    { icon: CheckCircle2, text: 'No Obligation' },
    { icon: Users, text: '500+ Demo Attendees' },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      text: 'The demo class gave me complete confidence. I joined immediately after experiencing the teaching quality.',
      course: 'SSC CGL'
    },
    {
      name: 'Rahul Das',
      text: 'Best decision was attending the free demo. The faculty cleared all my doubts before I enrolled.',
      course: 'RRB NTPC'
    }
  ];

  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionAnimation.ref} style={sectionAnimation.style} className="text-center mb-12">
          <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm mb-4">
            100% FREE - No Hidden Charges
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Experience Our Teaching - Absolutely Free
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Not sure if we're right for you? Attend a free demo class and see the difference yourself
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Included in Demo Class</h3>
              <div className="space-y-4">
                {demoIncludes.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="text-gray-900 font-medium">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">How It Works</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="font-semibold text-gray-900">Book Your Demo</h4>
                    <p className="text-sm text-gray-700">Fill the form and select your preferred time</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="font-semibold text-gray-900">Attend the Class</h4>
                    <p className="text-sm text-gray-700">Experience our teaching methodology firsthand</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="font-semibold text-gray-900">Make Your Decision</h4>
                    <p className="text-sm text-gray-700">No pressure, decide at your own pace</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {trustBadges.map((badge, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-md text-center border border-gray-100 hover:shadow-lg transition-shadow">
                  <badge.icon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-gray-900">{badge.text}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">What Demo Attendees Say</h3>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <p className="text-gray-700 italic mb-3">"{testimonial.text}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">Now enrolled in {testimonial.course}</p>
                    </div>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={formAnimation.ref} style={formAnimation.style}>
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 sticky top-24">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Book Your Free Demo Class</h3>
                <p className="text-gray-600">Fill in your details and we'll schedule your demo</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Full Name *"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    required
                    pattern="[0-9]{10}"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Email (Optional)"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <select
                    required
                    value={formData.courseInterest}
                    onChange={(e) => setFormData({ ...formData, courseInterest: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white cursor-pointer"
                  >
                    <option value="">Select Course *</option>
                    {courseOptions.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      placeholder="Preferred Date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white cursor-pointer"
                    >
                      <option value="">Preferred Time Slot</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <textarea
                    placeholder="Any questions or special requests? (Optional)"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Booking...' : 'Book Free Demo Class'}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 text-green-800 rounded-lg text-sm flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <span>Demo class booked successfully! We'll contact you soon to confirm.</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 text-red-800 rounded-lg text-sm">
                    Something went wrong. Please try again or call us directly.
                  </div>
                )}
              </form>

              <p className="text-xs text-gray-500 text-center mt-4">
                By submitting this form, you agree to receive calls/messages from our team
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { CalendarDaysIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

interface Event {
  id: number;
  title: string;
  description: string;
  date: {
    day: string;
    month: string;
    year: string;
  };
  time: string;
  location?: string;
  href: string;
}

export default function UpcomingEvents() {
  // Mock data - akan diganti dengan data dari API
  const events: Event[] = [
    {
      id: 1,
      title: 'Coral Reef Restoration',
      description: 'Coral reefs are built by tiny animals that reproduce in two main ways—sexually and asexually—to create and maintain living cities under the sea.',
      date: {
        day: '23',
        month: 'Oct',
        year: '2024',
      },
      time: 'Thursday, 11:20 AM',
      location: 'Marine Conservation Center',
      href: '/events/coral-reef-restoration',
    },
    {
      id: 2,
      title: "Don't litter the ocean",
      description: 'Every wrapper, bottle, or cigarette butt that reaches the water can injure wildlife, smother coral, and break down into microplastics that enter our food chain.',
      date: {
        day: '02',
        month: 'Dec',
        year: '2024',
      },
      time: 'Monday, 07:00 PM',
      location: 'Virtual Event',
      href: '/events/ocean-cleanup',
    },
    {
      id: 3,
      title: 'Marine Resources Conservation',
      description: 'Marine resources are the living, non-living, and service-based assets of the ocean—ranging from fish, shellfish, seaweeds, and microbes to minerals.',
      date: {
        day: '03',
        month: 'Dec',
        year: '2024',
      },
      time: 'Friday, 01:00 PM',
      location: 'Aquarium Research Center',
      href: '/events/marine-resources',
    },
  ];

  // Gallery images untuk sebelah kanan
  const galleryImages = [
    '/images/gal-1.jpg',
    '/images/gal-2.jpg',
    '/images/gal-3.jpg',
    '/images/gal-4.jpg',
    '/images/gal-5.jpg',
    '/images/gal-6.jpg',
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white via-slate-50/30 to-cyan-50/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-100/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-100/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Events List */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 tracking-wide">
                <span className="text-slate-800">
                  Upcoming
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-700">
                  Events
                </span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                Join our community events and make a meaningful impact together
              </p>
            </div>

            <div className="space-y-8">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 group border border-white/20 relative overflow-hidden"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  
                  <div className="flex gap-8 relative z-10">
                    {/* Date Badge */}
                    <div className="flex-shrink-0">
                      <motion.div 
                        className="bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white rounded-2xl p-6 text-center min-w-[100px] shadow-xl relative overflow-hidden"
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                          initial={{ x: -100 }}
                          whileHover={{ x: 100 }}
                          transition={{ duration: 0.6 }}
                        />
                        <div className="text-3xl font-bold relative z-10">{event.date.day}</div>
                        <div className="text-sm font-medium relative z-10">{event.date.month}</div>
                        <div className="text-xs opacity-90 relative z-10">{event.date.year}</div>
                      </motion.div>
                    </div>

                    {/* Event Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                          <ClockIcon className="h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                            <MapPinIcon className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>

                      <h4 className="text-2xl font-bold text-gray-900 mb-4 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-teal-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        <Link href={event.href}>{event.title}</Link>
                      </h4>

                      <p className="text-gray-600 leading-relaxed line-clamp-3 mb-6">
                        {event.description}
                      </p>

                      <motion.div 
                        whileHover={{ x: 5 }}
                        className="inline-flex"
                      >
                        <Link
                          href={event.href}
                          className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          Learn more
                          <motion.svg 
                            className="ml-2 w-5 h-5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            whileHover={{ x: 3 }}
                            transition={{ duration: 0.2 }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </motion.svg>
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View All Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/events"
                  className="inline-flex items-center bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  <CalendarDaysIcon className="h-5 w-5 mr-3" />
                  View All Events
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Gallery Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-6">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  className="relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer"
                >
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 via-transparent to-transparent group-hover:from-blue-600/50 transition-all duration-300" />
                  
                  {/* Overlay gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-teal-500/0 group-hover:from-blue-500/20 group-hover:to-teal-500/20 transition-all duration-300" />
                </motion.div>
              ))}
            </div>

            {/* Gallery Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-blue-700/90 to-teal-600/90 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10"
            >
              <div className="text-center text-white p-8">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Updates from our gallery</h3>
                <p className="text-white/90 mb-6 leading-relaxed">
                  Explore moments of impact and see how our community is making a difference
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/gallery"
                    className="inline-flex items-center bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20"
                  >
                    View All Photos
                    <motion.svg 
                      className="ml-2 w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
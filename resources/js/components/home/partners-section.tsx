import { motion } from 'framer-motion';

interface Partner {
  id: number;
  name: string;
  image: string;
  description: string;
}

export default function PartnersSection() {
  const partners: Partner[] = [
    {
      id: 1,
      name: 'Marine Debris Removal',
      image: '/images/ImpactNumbers2Rid-the-Ocean-of-Marine-Debris.webp',
      description: 'Removing harmful debris from our oceans',
    },
    {
      id: 2,
      name: 'Marine Protected Areas',
      image: '/images/Multiply-MPAs.jpg',
      description: 'Expanding protected marine habitats',
    },
    {
      id: 3,
      name: 'Vulnerable Marine Species',
      image: '/images/ImpactNumbers2Promote-Endangered-Species.webp',
      description: 'Protecting endangered marine life',
    },
    {
      id: 4,
      name: 'Marine Habitat Restoration',
      image: '/images/ImpactNumbers2Accelerate-Coral-Reef-Recovery.webp',
      description: 'Restoring coral reefs and marine ecosystems',
    },
    {
      id: 5,
      name: 'Community Grants',
      image: '/images/Blueprint-Marine-Grants-Icon 1_1.webp',
      description: 'Supporting local conservation efforts',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <h4 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
              A Global Plan for
              <br />
              <span className="text-blue-600">Ocean Protection</span>
            </h4>
          </motion.div>

          {/* Partners Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-9"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="group"
                >
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center h-full flex flex-col">
                    {/* Partner Image */}
                    <div className="mb-4 flex-shrink-0">
                      <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                        <img
                          src={partner.image}
                          alt={partner.name}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                    </div>

                    {/* Partner Content */}
                    <div className="flex-grow flex flex-col justify-between">
                      <h5 className="font-semibold text-gray-900 mb-2 text-sm leading-tight group-hover:text-blue-600 transition-colors duration-300">
                        {partner.name}
                      </h5>
                      
                      <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        {partner.description}
                      </p>
                    </div>

                    {/* Hover Effect Indicator */}
                    <motion.div
                      className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                    >
                      <div className="w-8 h-0.5 bg-blue-600 mx-auto rounded-full" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats or Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Together, We Can Make a Difference
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our comprehensive approach to ocean conservation addresses the most critical challenges 
              facing marine ecosystems today. Through targeted initiatives and community partnerships, 
              we're building a sustainable future for our blue planet.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4">
                <div className="text-2xl font-bold text-blue-600 mb-1">50+</div>
                <div className="text-sm text-gray-600">Conservation Projects</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-green-600 mb-1">1M+</div>
                <div className="text-sm text-gray-600">Square Meters Protected</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-purple-600 mb-1">25+</div>
                <div className="text-sm text-gray-600">Countries Involved</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
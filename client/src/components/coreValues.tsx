import { Leaf, Eye, Star, Users } from "lucide-react";

const coreValues = [
  {
    title: "Sustainability",
    description:
      "We are stewards of nature — preserving forests, safeguarding water sources, and nurturing our communities through responsible cultivation.",
    icon: Leaf,
    color: "text-tadegg-green",
    bg: "bg-tadegg-green/10",
  },
  {
    title: "Transparency",
    description:
      "From seed to shipment, our supply chain is open and traceable. We value honesty in every partnership and transaction.",
    icon: Eye,
    color: "text-tadegg-burgundy",
    bg: "bg-tadegg-burgundy/10",
  },
  {
    title: "Excellence",
    description:
      "Each bean we export carries Ethiopia’s coffee legacy — expertly harvested, meticulously processed, and flavor-rich.",
    icon: Star,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
  },
  {
    title: "Community Empowerment",
    description:
      "We invest in our farmers with training, fair pricing, and long-term relationships — ensuring shared success from crop to cup.",
    icon: Users,
    color: "text-tadegg-brown",
    bg: "bg-tadegg-brown/10",
  },
];

const CoreValues = () => {
  return (
    <section
      id="core-values"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-tadegg-cream/50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-tadegg-green mb-4">
            At Tade GG, We Believe In
          </h2>
          <p className="text-base sm:text-lg text-tadegg-brown/80">
            Our values guide every bean we export — rooted in heritage, driven by ethics.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-2">
          {coreValues.map((value, idx) => {
            const Icon = value.icon;
            return (
              <div
                key={idx}
                className={`rounded-2xl p-8 bg-white shadow-md hover:shadow-lg transition duration-300 border-l-4 border-tadegg-green group`}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center ${value.bg}`}
                  >
                    <Icon className={`w-7 h-7 ${value.color}`} />
                  </div>
                  <h3
                    className={`text-xl font-serif font-semibold text-tadegg-green group-hover:underline decoration-wavy`}
                  >
                    {value.title}
                  </h3>
                </div>
                <p className="text-tadegg-brown/80 leading-relaxed text-[15.5px]">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative SVG */}
      <div className="absolute bottom-0 right-0 w-48 h-48 opacity-10 pointer-events-none hidden md:block">
        <svg viewBox="0 0 200 200" className="w-full h-full fill-tadegg-green">
          <circle cx="100" cy="100" r="100" />
        </svg>
      </div>
    </section>
  );
};

export default CoreValues;

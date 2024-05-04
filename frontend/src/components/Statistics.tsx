export const Statistics = () => {
  interface StatsProps {
    quantity: string;
    description: string;
  }

  const stats: StatsProps[] = [
    {
      quantity: "50+",
      description: "Members",
    },
    {
      quantity: "100+",
      description: "Foods Shared",
    },
    {
      quantity: "50+",
      description: "Local Producers",
    },
    {
      quantity: "100+",
      description: "Community Workers",
    },
  ];

  return (
    <section id="statistics" className="mt-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map(({ quantity, description }: StatsProps) => (
          <div
            key={description}
            className="space-y-2 text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold">{quantity}</h2>
            <p className="text-xl text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

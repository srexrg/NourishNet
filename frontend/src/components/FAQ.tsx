import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "How can I donate food to your program?",
    answer: "You can donate food by signing up on our website.",
    value: "item-1",
  },
  {
    question: "What types of food donations do you accept?",
    answer:
      "We accept non-perishable food items such as canned goods, dry grains, and packaged foods. Fresh produce and refrigerated items are also welcome.",
    value: "item-2",
  },
  {
    question:
      "Can I volunteer to help distribute food to those in need?",
    answer:
      "Yes, we welcome volunteers to assist with various tasks including packing food parcels, organizing events, and delivering meals to underserved communities.",
    value: "item-3",
  },
  {
    question: "How can I request food assistance for myself or someone else?",
    answer: "You can request food assistance requesting from the available foods on the website.",
    value: "item-4",
  },
  {
    question:
      "Are there any eligibility criteria to receive food assistance?",
    answer:
      "While we strive to provide food assistance to all those in need, some programs may have specific eligibility criteria based on location, income, or household size.",
    value: "item-5",
  },
];

export const FAQ = () => {
  return (
    <section
      id="faq"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full AccordionRoot"
      >
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem
            key={value}
            value={value}
          >
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          href="#"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};

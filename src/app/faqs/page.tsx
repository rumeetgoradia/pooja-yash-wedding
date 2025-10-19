import { ChevronDown } from "lucide-react";
import LandingImage from "public/heros/faqs.jpeg";
import { Content } from "~/components/layout/content";
import { type HeroImageProps } from "~/components/layout/hero";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { FAQS_DATA } from "./data";

function FaqList() {
    return (
        <div className="mx-auto max-w-3xl">
            <div className="space-y-4">
                {FAQS_DATA.map((faq, index) => (
                    <div
                        key={index}
                        className="rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-md"
                    >
                        <Collapsible>
                            <CollapsibleTrigger className="flex w-full items-center justify-between gap-4 p-6 text-left">
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl" aria-hidden="true">
                                        {faq.icon}
                                    </span>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {faq.question}
                                    </h3>
                                </div>
                                <ChevronDown className="size-5 shrink-0 text-gray-500 transition-transform duration-300 ease-in-out [data-state=open]:rotate-180" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden transition-all">
                                <div className="space-y-4 px-6 pb-6 pl-16 leading-relaxed text-gray-600">
                                    {faq.answer.map((paragraph, pIndex) => (
                                        <p key={pIndex}>{paragraph}</p>
                                    ))}
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                ))}
            </div>
        </div>
    );
}

const HeroImage: HeroImageProps = {
    src: LandingImage,
    alt: "Frequently Asked Questions - Pooja & Yash",
    className: "max-sm:object-[60%]",
};

export default function FaqsPage() {
    return (
        <Content heroImage={HeroImage}>
            <FaqList />
        </Content>
    );
}

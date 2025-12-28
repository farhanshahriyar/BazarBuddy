
import { DashboardLayout } from "@/components/DashboardLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { getText } from "@/utils/translations";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
    Twitter,
    Mail,
    ChevronRight,
} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface Author {
    name: string;
    role: string;
    avatar?: string;
}

interface ChangelogItem {
    version: string;
    date: string;
    title: string;
    label: string;
    type: "added" | "improved" | "fixed" | "update";
    image?: string;
    description: string;
    points?: string[];
    author: Author;
}

const Changelog = () => {
    const { language } = useLanguage();
    const isEnglish = language === "en";

    const changelogData: ChangelogItem[] = [
        {
            version: "v1.2.0",
            date: isEnglish ? "Dec 27, 2025" : "২৭ ডিসেম্বর, ২০২৫",
            title: isEnglish
                ? "AI-Powered Grocery Management & Smart Printing"
                : "AI-চালিত মুদি ব্যবস্থাপনা ও স্মার্ট প্রিন্টিং",
            label: getText("newFeature", language),
            type: "added",
            image:
                "",
            description: isEnglish
                ? "This release delivers a major upgrade to grocery item management with AI-powered price suggestions, multilingual support, and professional-grade print exports."
                : "এই রিলিজে AI-চালিত মূল্য পরামর্শ, বহুভাষা সমর্থন এবং প্রফেশনাল প্রিন্ট এক্সপোর্ট সহ মুদি ব্যবস্থাপনায় বড় আপগ্রেড আনা হয়েছে।",
            points: isEnglish
                ? [
                    "Introduced a **Grocery Item Form** with AI-powered price suggestions using a custom Supabase function.",
                    "Enabled full grocery item creation and editing with clean table-based management.",
                    "Added **Print Preview & PDF export** with multilingual support and Bengali numeral formatting.",
                    "Implemented responsive sidebar navigation and guided tooltip system for better usability.",
                    "Improved loading stability by fixing race conditions and missing translations."
                ]
                : [
                    "কাস্টম Supabase ফাংশন ব্যবহার করে **AI-চালিত মূল্য পরামর্শসহ মুদি আইটেম ফর্ম** চালু করা হয়েছে।",
                    "পরিষ্কার টেবিল-ভিত্তিক ব্যবস্থাপনার মাধ্যমে সম্পূর্ণ মুদি আইটেম তৈরি ও সম্পাদনা সুবিধা যোগ করা হয়েছে।",
                    "বহুভাষা সমর্থন ও বাংলা সংখ্যাসহ **প্রিন্ট প্রিভিউ ও PDF এক্সপোর্ট** যুক্ত করা হয়েছে।",
                    "উন্নত ব্যবহারযোগ্যতার জন্য রেসপনসিভ সাইডবার ন্যাভিগেশন ও টুলটিপ সিস্টেম যোগ করা হয়েছে।",
                    "রেস কন্ডিশন ও অনুপস্থিত অনুবাদ ঠিক করে লোডিং স্থিতিশীলতা উন্নত করা হয়েছে।"
                ],
            author: {
                name: "Farhan Shahriyar",
                role: getText("Software Engineer", language),
                avatar:
                    "https://gmcbt9ucve.ufs.sh/f/u4KE8aYHPK05ZJU2qBzFdAKrCIUlGvLZtyxwo92X15qpjH3c"
            }
        },
        {
            version: "v1.1.0",
            date: isEnglish ? "Dec 9, 2025" : "৯ ডিসেম্বর, ২০২৫",
            title: isEnglish
                ? "Centralized Grocery State & UI Cleanup"
                : "কেন্দ্রীভূত মুদি স্টেট ও UI পরিস্কার",
            label: getText("improvement", language),
            type: "improved",
            image:
                "",
            description: isEnglish
                ? "This update focuses on cleaner state management and UI simplification for better maintainability and performance."
                : "এই আপডেটটি উন্নত রক্ষণাবেক্ষণ ও পারফরম্যান্সের জন্য স্টেট ম্যানেজমেন্ট এবং UI সহজ করার উপর কেন্দ্রীভূত।",
            points: isEnglish
                ? [
                    "Introduced **GroceryContext** to centralize grocery list state management.",
                    "Improved Register page visibility and interaction handling.",
                    "Removed unnecessary logic from AreaChart to reduce complexity."
                ]
                : [
                    "মুদি তালিকা ব্যবস্থাপনার জন্য **GroceryContext** চালু করা হয়েছে।",
                    "রেজিস্টার পেজের দৃশ্যমানতা ও ইন্টারঅ্যাকশন উন্নত করা হয়েছে।",
                    "জটিলতা কমাতে AreaChart থেকে অপ্রয়োজনীয় লজিক সরানো হয়েছে।"
                ],
            author: {
                name: "Farhan Shahriyar",
                role: getText("Software Engineer", language),
                avatar:
                    "https://gmcbt9ucve.ufs.sh/f/u4KE8aYHPK05ZJU2qBzFdAKrCIUlGvLZtyxwo92X15qpjH3c"
            }
        },
        {
            version: "v1.0.0",
            date: isEnglish ? "Dec 6, 2025" : "৬ ডিসেম্বর, ২০২৫",
            title: isEnglish
                ? "BazarBuddy Initial Release"
                : "বাজারবাডি প্রাথমিক রিলিজ",
            label: getText("appUpdate", language),
            type: "update",
            image:
                "https://gmcbt9ucve.ufs.sh/f/u4KE8aYHPK05jJ23fZtaALgYqunXrT1HeDdIGf9hR7BVOmlM",
            description: isEnglish
                ? "The first stable release of BazarBuddy, delivering core authentication, localization, and infrastructure setup."
                : "বাজারবাডির প্রথম স্থিতিশীল রিলিজ, যেখানে অথেনটিকেশন, লোকালাইজেশন এবং ইনফ্রাস্ট্রাকচার সেটআপ অন্তর্ভুক্ত।",
            points: isEnglish
                ? [
                    "Implemented registration, reset password, and settings pages.",
                    "Added currency conversion utilities and enhanced translation support.",
                    "Configured Vite and Supabase and released version 1.0.0."
                ]
                : [
                    "রেজিস্ট্রেশন, পাসওয়ার্ড রিসেট ও সেটিংস পেজ যুক্ত করা হয়েছে।",
                    "কারেন্সি কনভার্সন ইউটিলিটি ও উন্নত অনুবাদ সাপোর্ট যোগ করা হয়েছে।",
                    "Vite ও Supabase কনফিগার করে ভার্সন 1.0.0 রিলিজ করা হয়েছে।"
                ],
            author: {
                name: "Farhan Shahriyar",
                role: getText("Software Engineer", language),
                avatar:
                    "https://gmcbt9ucve.ufs.sh/f/u4KE8aYHPK05ZJU2qBzFdAKrCIUlGvLZtyxwo92X15qpjH3c"
            }
        }
    ];

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <DashboardLayout>
            <div className="bg-[#0a0a0a] min-h-screen text-gray-300 font-inter selection:bg-orange-500/30 selection:text-orange-200">
                {/* Modern Header */}
                <div className="border-b border-white/5 bg-white/[0.02]">
                    <div className="max-w-6xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                            <span className="tracking-widest uppercase font-bold text-[10px]">{getText("changelog", language)}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
                            {getText("changelogSubtitle", language)}
                        </h1>
                        <div className="text-2xl font-semibold text-orange-500/80 mb-10">BazarBuddy</div>

                        <div className="flex flex-wrap gap-8 items-center">
                            <button className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-all group">
                                <Mail size={18} className="group-hover:scale-110 transition-transform" />
                                {getText("subscribeUpdates", language)}
                                <ChevronRight size={14} className="opacity-30 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-all group">
                                <Twitter size={18} className="group-hover:scale-110 transition-transform" />
                                {getText("followTwitter", language)}
                                <ChevronRight size={14} className="opacity-30 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Timeline Content */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-20">

                        {/* Sticky Sidebar (Desktop only) */}
                        <div className="hidden lg:block border-r border-white/5 pr-10">
                            <div className="sticky top-24 space-y-8">
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500/50 mb-6">
                                    Timeline
                                </div>
                                {changelogData.map((release) => (
                                    <button
                                        key={release.version}
                                        onClick={() => scrollTo(`release-${release.version}`)}
                                        className="group cursor-pointer text-left block w-full focus:outline-none"
                                    >
                                        <div className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors">
                                            {release.date}
                                        </div>
                                        <div className="text-[10px] font-bold text-gray-600 group-hover:text-orange-500/50 mt-1 uppercase tracking-wider">{release.version}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Releases List */}
                        <div className="space-y-40">
                            {changelogData.map((release) => (
                                <div key={release.version} id={`release-${release.version}`} className="max-w-3xl scroll-mt-24">
                                    {/* Mobile Date Display */}
                                    <div className="lg:hidden flex items-center gap-3 mb-8">
                                        <span className="text-sm font-black text-white px-3 py-1 bg-white/5 rounded-full border border-white/10">{release.date}</span>
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{release.version}</span>
                                    </div>

                                    {/* Featured Image */}
                                    {release.image && (
                                        <div className="relative aspect-[16/9] mb-12 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 group bg-zinc-900/50 flex items-center justify-center">
                                            <img
                                                src={release.image}
                                                alt={release.title}
                                                className="object-contain w-full h-full transform group-hover:scale-105 transition-transform duration-[2s] ease-out"
                                            />
                                        </div>
                                    )}

                                    {/* Content Header */}
                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="border-orange-500/20 bg-orange-500/5 text-orange-500 text-[10px] font-bold tracking-widest uppercase py-0.5">
                                                {release.label}
                                            </Badge>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                                            {release.title}
                                        </h2>
                                    </div>

                                    {/* Description & Points */}
                                    <div className="space-y-8 text-gray-400 leading-relaxed text-lg font-medium">
                                        <p>{release.description}</p>

                                        {release.points && (release.points.length > 0 && (
                                            <ul className="space-y-4 pl-1">
                                                {release.points.map((point, idx) => (
                                                    <li key={idx} className="flex gap-4 items-start text-base">
                                                        <span className="mt-2 w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)] shrink-0"></span>
                                                        <span dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<b class="text-white font-bold">$1</b>') }}></span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ))}
                                    </div>

                                    <Separator className="my-12 bg-white/5" />

                                    {/* Author Block */}
                                    <div className="flex items-center justify-between bg-white/[0.02] p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-12 w-12 border-0 shadow-none">
                                                <AvatarImage src={release.author.avatar} className="object-cover object-top" />
                                                <AvatarFallback className="bg-orange-500 text-black font-black">
                                                    {release.author.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-white tracking-wide">{release.author.name}</span>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{release.author.role}</span>
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-600 font-bold uppercase tracking-tighter">
                                            {release.date}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Accent */}
                <div className="py-32 bg-white/[0.01] border-t border-white/5 mt-40 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full -z-10 animate-pulse"></div>
                    <p className="text-sm font-bold text-gray-600 mb-6 tracking-widest uppercase">{isEnglish ? "That's all for now!" : "আপাতত এটুকুই!"}</p>
                    <div className="inline-flex items-center gap-2 text-xs text-orange-500 tracking-[0.4em] font-black uppercase">
                        BazarBuddy made by
                        <span className="w-1 h-1 rounded-full bg-white/10 mx-1"></span>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className="hover:text-white transition-colors cursor-help border-b border-orange-500/30">
                                        Farhan Shahriyar
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent className="bg-zinc-900 border-white/10 text-white p-3 rounded-xl shadow-2xl backdrop-blur-xl">
                                    <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest">
                                        <a
                                            href="https://github.com/farhanshahriyar"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-orange-500 transition-colors"
                                        >
                                            GitHub
                                        </a>
                                        <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                        <a
                                            href="https://mdfarhanshahriyar2024.netlify.app/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-orange-500 transition-colors"
                                        >
                                            Portfolio
                                        </a>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Changelog;

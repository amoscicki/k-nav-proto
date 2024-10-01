import Image from 'next/image'
import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslations } from '@/hooks/use-translations';

const tools = [
    { name: "Next.js", link: "/sample/nextjs" },
    { name: "TypeScript", link: "/sample/typescript" },
    { name: "Tailwind CSS", link: "/sample/tailwind" },
    { name: "shadcn/ui", link: "/sample/shadcn-ui" },
    { name: "Zustand", link: "/sample/zustand" },
    { name: "Zod", link: "/sample/zod" },
    { name: "React Hook Form", link: "/sample/react-hook-form" },
    { name: "Stripe", link: "/sample/stripe" },
    { name: "Vercel", link: "/sample/vercel" },
    { name: "JSDoc", link: "/sample/jsdoc" },
    { name: "next-pwa", link: "/sample/next-pwa" },
    { name: "Inversify", link: "/sample/inversify" },
    { name: "Firebase", link: "/sample/firebase" },
    { name: "SQLite", link: "/sample/sqlite" },
    { name: "Framer Motion", link: "/sample/framer-motion" },
    { name: "next-intl", link: "/sample/next-intl" }
]

export function HomeContent() {
    const { t } = useTranslations('Home');

    return (
        <>
            <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
                <Image src="/kozakclilogo.webp" alt="KozakCLI Logo" width={500} height={500}
                       className="mb-8 relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"/>
            </div>
            <h1 className="text-5xl font-bold mb-8 ">{t`welcome`}</h1>
            <p className="text-xl mb-12 text-center max-w-2xl ">
                {t`description`}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {tools.map((tool) => (
                    <Link href={tool.link} key={tool.name}>
                        <Card className="hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <CardTitle>{tool.name}</CardTitle>
                                <CardDescription>{t`tools.${tool.name}`}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
            <p className="text-sm opacity-70">{t`poweredBy`}</p>
        </>
    )
}
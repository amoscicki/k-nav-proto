// import MarkdownDisplay from '@/components/blocks/markdown-display';
// import path from 'path';
// import {readdir} from "node:fs/promises";
// import {DocsMenu} from "@/components/blocks/docs-menu";


// export async function getDocs() {
//     const docsDirectory = path.join(process.cwd(), 'public', 'docs');
//     return await readdir(docsDirectory);
// }

// export default async function Docs({params: {doc}}: { params: { doc: string } }) {
//     const docs: string[] = await getDocs();
//     return (
//         <div className={'gap-4 grid md:grid-cols-[150px,1fr] p-4'}>
//             <DocsMenu current={doc} docs={docs}/>
//             <MarkdownDisplay path={`docs/${doc}`}/>
//         </div>
//     );
// }

export default function Docs() {
  return <div>Docs</div>;
}

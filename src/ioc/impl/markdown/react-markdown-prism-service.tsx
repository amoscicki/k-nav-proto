import { injectable } from "inversify";
import React, { useState, useEffect, PropsWithChildren } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { IMarkdownService } from "@/ioc/core/markdown";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

@injectable()
export class markdownService implements IMarkdownService {
  Markdown: React.FC<{ src: string }> = ({ src }) => {
    const [content, setContent] = useState<string>("");

    useEffect(() => {
      const fetchMarkdown = async () => {
        try {
          const response = await fetch(src);
          if (!response.ok) {
            throw new Error("Failed to fetch markdown content");
          }
          const text = await response.text();
          setContent(text);
        } catch (error) {
          console.error("Error fetching Markdown file:", error);
          setContent("Error loading content.");
        }
      };

      fetchMarkdown();
    }, [src]);

    return (
      <ReactMarkdown
        components={{
          code(codeProps) {
            const { node, className, children, ref, ...props } = codeProps;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                {...props}
                language={match[1]}
                PreTag="div"
                children={String(children).replace(/\n$/, "")}
                style={materialDark}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };
}

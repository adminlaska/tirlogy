'use client';
import React from 'react';
import { Highlight } from 'prism-react-renderer';

interface CodeBlockProps {
  code: string;
  language: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  return (
    <Highlight code={code.trim()} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }: any) => (
        <pre
          className={
            className +
            ' rounded-xl p-4 overflow-x-auto text-sm font-mono my-6 border border-zinc-800/40 dark:border-zinc-700/60 bg-zinc-900/90 dark:bg-zinc-900/90'
          }
          style={{ ...style, background: 'none' }}
        >
          {tokens.map((line: any, i: number) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token: any, key: number) => {
                const tokenProps = getTokenProps({ token, key });
                const { key: _key, ...rest } = tokenProps;
                return <span key={key} {...rest} />;
              })}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}; 
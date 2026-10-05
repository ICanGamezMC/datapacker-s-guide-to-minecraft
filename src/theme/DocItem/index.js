import React from 'react';
import DocItem from '@theme-original/DocItem';

export default function DocItemWrapper(props) {
  const {content: DocContent} = props;

  const version = DocContent.metadata?.frontMatter?.minecraft_version;

  return (
    <>
      {version && (
        <div
          className="minecraft-version"
          style={{
            marginBottom: '1rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.35rem 0.75rem',
            borderRadius: '0px',
            fontSize: '0.9rem',
            fontWeight: 0,
            border: 'none',
          }}
        >
          <span>* Last checked in Minecraft version: {version}</span>
        </div>
      )}

      <DocItem {...props} />
    </>
  );
}
import React, { useEffect, useState } from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';

export default function Contributors() {
  const { metadata } = useDoc();
  const [authors, setAuthors] = useState([]);

  // Replace with your actual details
  const REPO_OWNER = 'ICanGamezMC';
  const REPO_NAME = 'datapacker-s-guide-to-minecraft';

  useEffect(() => {
    // 1. Safety check: Ensure metadata and the internal 'source' exists
    if (!metadata || !metadata.source) {
      console.warn("Metadata not ready yet");
      return;
    }

    // 2. Extract the path. 
    // metadata.source usually looks like "@site/docs/intro.md" or "@site/docs/folder/file.md"
    // We want to remove the "@site/" prefix.
    const filePath = metadata.source.replace('@site/', '');

    console.log("Corrected GitHub Path:", filePath);

    fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits?path=${filePath}`)
      .then(res => res.json())
      .then(data => {
        if (data.message && data.message.includes("API rate limit")) {
          console.error("GitHub Rate Limit Hit. Avatars won't show for a while.");
          return;
        }

        if (Array.isArray(data) && data.length > 0) {
          const uniqueAuthors = [];
          const seenLogins = new Set();

          data.forEach(commit => {
            if (commit && commit.author && !seenLogins.has(commit.author.login)) {
              seenLogins.add(commit.author.login);
              uniqueAuthors.push(commit.author);
            }
          });
          setAuthors(uniqueAuthors);
        } else {
          console.warn("No commits found for:", filePath);
        }
      })
      .catch(err => console.error("Fetch error:", err));
  }, [metadata]);

  if (!authors.length) return null;

  return (
    <div style={{ marginTop: '2rem', borderTop: '1px solid var(--ifm-hr-border-color)', paddingTop: '1rem' }}>
      <h4 style={{ marginBottom: '1rem' }}>Wiki Contributors</h4>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {authors.map(a => (
          <a key={a.id} href={a.html_url} target="_blank" rel="noopener noreferrer">
            <img 
              src={a.avatar_url} 
              width="40" 
              height="40" 
              style={{ 
                borderRadius: '50%', 
                border: '2px solid var(--ifm-color-emphasis-300)',
                backgroundColor: 'var(--ifm-background-color)' 
              }} 
              title={a.login} 
              alt={a.login}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
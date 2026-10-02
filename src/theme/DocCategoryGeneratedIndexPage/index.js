import React, { useEffect } from 'react';
import {PageMetadata} from '@docusaurus/theme-common';
import {useCurrentSidebarCategory} from '@docusaurus/plugin-content-docs/client';
import useBaseUrl from '@docusaurus/useBaseUrl';
import DocCardList from '@theme/DocCardList';
import DocPaginator from '@theme/DocPaginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

function CategoryTheme({theme}) {
  useEffect(() => {
    if (!theme) return;

    document.body.classList.add(theme);

    return () => {
      document.body.classList.remove(theme);
    };
  }, [theme]);

  return null;
}

function DocCategoryGeneratedIndexPageMetadata({categoryGeneratedIndex}) {
  return (
    <PageMetadata
      title={categoryGeneratedIndex.title}
      description={categoryGeneratedIndex.description}
      keywords={categoryGeneratedIndex.keywords}
      image={useBaseUrl(categoryGeneratedIndex.image)}
    />
  );
}

function DocCategoryGeneratedIndexPageContent({categoryGeneratedIndex}) {
  const category = useCurrentSidebarCategory();

  const theme = category?.customProps?.theme;

  return (
    <>
      <CategoryTheme theme={theme} />

      <div className={styles.generatedIndexPage}>
        <DocVersionBanner />
        <DocBreadcrumbs />
        <DocVersionBadge />

        <header>
          <Heading as="h1" className={styles.title}>
            {categoryGeneratedIndex.title}
          </Heading>

          {categoryGeneratedIndex.description && (
            <p>{categoryGeneratedIndex.description}</p>
          )}
        </header>

        <article className="margin-top--lg">
          <DocCardList
            items={category.items}
            className={styles.list}
          />
        </article>

        <footer className="margin-top--md">
          <DocPaginator
            previous={categoryGeneratedIndex.navigation.previous}
            next={categoryGeneratedIndex.navigation.next}
          />
        </footer>
      </div>
    </>
  );
}

export default function DocCategoryGeneratedIndexPage(props) {
  return (
    <>
      <DocCategoryGeneratedIndexPageMetadata {...props} />
      <DocCategoryGeneratedIndexPageContent {...props} />
    </>
  );
}
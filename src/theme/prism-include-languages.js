import siteConfig from '@generated/docusaurus.config';

export default function prismIncludeLanguages(PrismObject) {
  const {themeConfig} = siteConfig;
  const {prism = {}} = themeConfig;
  const {additionalLanguages = []} = prism;

  // Make Prism globally available for the local file to find it
  if (typeof window !== 'undefined') {
    window.Prism = PrismObject;
  }

  additionalLanguages.forEach((lang) => {
    if (lang === 'mcfunction') {
      require('./prism-mcfunction.js');
    }else if (lang === 'console') {
      require('./prism-console.js');
    }else if (lang !== 'php') {
      try {
        require(`prismjs/components/prism-${lang}.js`);
      } catch (e) {}
    }
  });
}
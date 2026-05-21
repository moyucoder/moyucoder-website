// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'moyucode',
  tagline: '能智能化，就少哔哔',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'http://moyucode.cn',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'moyucoder', // Usually your GitHub org/user name.
  projectName: 'moyucode-website', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: '',
        },
        blog: {
          path: 'blog',
          routeBasePath: 'blog',
          showReadingTime: true,
          // feedOptions: {
          //   type: ['rss', 'atom'],
          //   xslt: true,
          // },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'moyucode - 能智能化，就少哔哔',
        logo: {
          alt: 'moyucode',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'claudeCodeSidebar',
            position: 'left',
            label: 'Claude Code',
          },
          {
            type: 'docSidebar',
            sidebarId: 'codexSidebar',
            position: 'left',
            label: 'Codex',
          },
          {
            type: 'docSidebar',
            sidebarId: 'cursorSidebar',
            position: 'left',
            label: 'Cursor',
          },
          {
            type: 'docSidebar',
            sidebarId: 'agentSidebar',
            position: 'left',
            label: 'AI Agent',
          },
          {
            type: 'docSidebar',
            sidebarId: 'toolSidebar',
            position: 'left',
            label: '工具',
          },
          {
            type: 'docSidebar',
            sidebarId: 'thinkingSidebar',
            position: 'left',
            label: '思维',
          },
          {to: '/blog', label: '博客', position: 'left'}
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '抖音',
            items: [
              {
                label: 'moyucode',
                href: 'https://www.douyin.com/user/MS4wLjABAAAAL3XTG71aKB-DpZSdHGFA7-v1dvg8XucDMM0WOHM_iyVAIdx2FgKsOg8BPD2hIxdO',
              },
            ]
          },
          {
            title: '公众号',
            items: [
              {
                label: 'moyucode',
                href: 'https://mp.weixin.qq.com/s/_SUzAu3aXgshel_RIb2M7w',
              },
            ]
          },
          {
            title: 'GitHub',
            items: [
              {
                label: 'moyucoder',
                href: 'https://github.com/moyucoder/moyucode-website',
              },
            ]
          },
          {
            title: '掘金',
            items: [
              {
                label: '我是云流',
                href: 'https://juejin.cn/user/1046390799881463',
              },
            ],
          },
        ],
        copyright: `Copyright © 2011~${new Date().getFullYear()}，希望在这你能找到想要的, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;

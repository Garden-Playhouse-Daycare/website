import { GetServerSidePropsContext } from "next";

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
       <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
         <url>
           <loc>https://gardenplayhouse.net</loc>
           <lastmod>${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}</lastmod>
         </url>
         <url>
           <loc>https://gardenplayhouse.net/guide</loc>
         </url>
       </urlset>
     `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const sitemap = generateSiteMap();

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;

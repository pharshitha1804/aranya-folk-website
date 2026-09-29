import markdownIt from "markdown-it";

const md = markdownIt({ html: false, breaks: true, linkify: true });

export default function (eleventyConfig) {
  // Escape CMS text by default so quotes or "&" in content can't break the HTML.
  eleventyConfig.setNunjucksEnvironmentOptions({ autoescape: true });

  // Static files copied as-is into the built site.
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");

  // Plant catalog: one Markdown file per product in src/products/ (edited in the CMS).
  eleventyConfig.addCollection("products", (api) =>
    api
      .getFilteredByGlob("src/products/*.md")
      .sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999) || a.data.name.localeCompare(b.data.name))
  );

  // Render a Markdown string (for longer text fields edited in the CMS).
  eleventyConfig.addFilter("md", (value) => md.render(value || ""));

  // Format a numeric price with the currency set in Site settings, e.g. 1200 -> "₹1,200".
  eleventyConfig.addFilter("price", (value, currency = "₹", locale = "en-IN") =>
    currency + Number(value || 0).toLocaleString(locale)
  );

  // Distinct values of a product field, in catalog order (used to build the shop filters).
  eleventyConfig.addFilter("distinct", (items, field) => [
    ...new Set(items.map((item) => item.data[field]).filter(Boolean)),
  ]);

  // Step/service numbers: 1 -> "01".
  eleventyConfig.addFilter("pad", (n) => String(n).padStart(2, "0"));

  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}

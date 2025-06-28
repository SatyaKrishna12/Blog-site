const blogData = 
    [
  {
    title: "Mastering Full-Stack Development in 2025",
    content: "<p>Full-stack development continues to evolve in 2025 with modern frameworks like Next.js, Express, and MongoDB. Developers need to stay current with JavaScript, REST APIs, and database integration. Building projects from scratch helps solidify understanding.</p><p>Start small and gradually add features such as authentication, file upload, and state management.</p>",
    slug: "mastering-full-stack-development-in-2025",
    createdAt: "2024-12-15T08:00:00Z",
    updatedAt: "2024-12-15T08:00:00Z"
  },
  {
    title: "Top 10 Mistakes New Developers Make",
    content: "<ul><li>Skipping the fundamentals</li><li>Overusing frameworks without understanding</li><li>Poor version control practices</li><li>Neglecting responsive design</li><li>Hardcoding sensitive data</li><li>No unit tests</li><li>Copy-pasting from StackOverflow without reading</li><li>Lack of project planning</li><li>Ignoring accessibility</li><li>Not asking for code reviews</li></ul>",
    slug: "top-10-mistakes-new-developers-make",
    createdAt: "2024-12-10T10:30:00Z",
    updatedAt: "2024-12-12T12:45:00Z"
  },
  {
    title: "How to Build a Blog with React and MongoDB",
    content: "<p>Learn to build a feature-rich blog using React for the frontend and MongoDB for storing posts. Use a rich text editor like Quill to allow WYSIWYG editing, and create slugs from titles automatically. Style the UI with Tailwind CSS and deploy on Vercel.</p>",
    slug: "how-to-build-a-blog-with-react-and-mongodb",
    createdAt: "2024-11-28T14:00:00Z",
    updatedAt: "2024-11-28T14:00:00Z"
  },
  {
    title: "The Power of SEO in Blog Platforms",
    content: "<p>Search Engine Optimization (SEO) plays a critical role in growing organic traffic. Use slugs, meta tags, and schema markup to improve your blog's visibility. Tools like Lighthouse and Ahrefs can help audit your SEO performance.</p>",
    slug: "the-power-of-seo-in-blog-platforms",
    createdAt: "2024-11-15T09:00:00Z",
    updatedAt: "2024-11-18T10:00:00Z"
  },
  {
    title: "Beginner's Guide to Mongoose Models",
    content: "<p>Mongoose makes working with MongoDB easier by allowing you to define schemas and validate documents. You can create a `Post` model with fields like title, content, and slug. Mongoose also supports middleware, population, and query helpers.</p>",
    slug: "beginners-guide-to-mongoose-models",
    createdAt: "2024-11-05T13:20:00Z",
    updatedAt: "2024-11-05T13:20:00Z"
  },
  {
    title: "Creating a Dynamic Admin Dashboard with React",
    content: "<p>An admin dashboard lets you manage content dynamically. Use React components to create reusable forms, tables, and modals. Integrate your backend API to perform CRUD operations. Protect routes using authentication.</p>",
    slug: "creating-a-dynamic-admin-dashboard-with-react",
    createdAt: "2024-10-25T11:00:00Z",
    updatedAt: "2024-10-26T12:30:00Z"
  },
  {
    title: "Using Tailwind CSS for Beautiful Blog Layouts",
    content: "<p>Tailwind CSS is a utility-first framework that helps you build responsive layouts quickly. Use grid and flexbox classes to structure your blog cards, typography utilities for clean text, and transitions for hover effects.</p>",
    slug: "using-tailwind-css-for-beautiful-blog-layouts",
    createdAt: "2024-10-15T10:15:00Z",
    updatedAt: "2024-10-15T10:15:00Z"
  },
  {
    title: "Implementing Slug-Based Routing in React Router",
    content: "<p>Slug-based routing allows users to access posts via clean URLs like `/blog/my-post-title`. In React Router, use `useParams()` to extract the slug and fetch the post data. This improves both UX and SEO.</p>",
    slug: "implementing-slug-based-routing-in-react-router",
    createdAt: "2024-10-01T09:45:00Z",
    updatedAt: "2024-10-01T09:45:00Z"
  },
  {
    title: "How to Secure Your Express + MongoDB API",
    content: "<p>Secure your API by using authentication middleware like JWT, input sanitization, and CORS protection. Always validate incoming data using libraries like Joi or Zod. Never expose sensitive environment variables in frontend code.</p>",
    slug: "how-to-secure-your-express-mongodb-api",
    createdAt: "2024-09-20T08:00:00Z",
    updatedAt: "2024-09-20T08:00:00Z"
  },
  {
    title: "Deploying Your Blog App with Vercel and MongoDB Atlas",
    content: "<p>Deploy your React (or Next.js) frontend to Vercel and use MongoDB Atlas for cloud-based database hosting. Set environment variables in Vercel, and ensure your API endpoints are properly connected using Mongoose.</p>",
    slug: "deploying-your-blog-app-with-vercel-and-mongodb-atlas",
    createdAt: "2024-09-10T07:30:00Z",
    updatedAt: "2024-09-10T07:30:00Z"
  }
];

module.exports = {data: blogData};
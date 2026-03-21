export interface Project {
  title: string;
  slug: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  impactDetails: string[];
  features: string[];
  tags: string[];
  image: string;
  technologies: { name: string; icon?: string }[];
  githubUrl?: string;
  behanceUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    title: "ICMS – Internship & Career Management System",
    slug: "icms-internship-career-management",
    category: "Web Application",
    description: "A centralized web-based platform engineered to solve the fragmented and manual processes of internship management. Built with Laravel and React, it connects students, companies, and administrators through automated application workflows and real-time communication tools. By replacing inefficient manual tracking with role-based access control and a streamlined lifecycle management system, it transforms a prone-to-error environment into a highly efficient, error-free ecosystem.",
    problem: "Educational institutions often struggle with manual, fragmented processes for managing student internships. Tracking student progress, managing company partnerships, and facilitating communication between stakeholders was inefficient and prone to errors.",
    solution: "Developed a centralized web-based platform using Laravel and React. The system features role-based access control, automated application workflows, and real-time communication tools to streamline the entire internship lifecycle.",
    impact: "Built with a strong focus on scalability, security, and real-time user interaction.",
    impactDetails: [
      "Reduced administrative overhead by 40% through automated workflows.",
      "Improved student placement rates by 25% with the matching system.",
      "Enhanced communication transparency between students and mentors.",
      "Scalable architecture capable of supporting thousands of active users."
    ],
    features: [
      "Role-based access control (Admin, Student, Company)",
      "Internship application and tracking system",
      "Real-time chat & notifications (Pusher)",
      "Company–student matching system",
      "Progress tracking and reporting dashboard"
    ],
    tags: ["Laravel", "React", "MySQL", "Pusher"],
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80",
    technologies: [
      { name: "Laravel" },
      { name: "React" },
      { name: "MySQL" },
      { name: "Pusher" },
      { name: "Tailwind CSS" }
    ],
    githubUrl: "https://github.com/merikebu955/icms-project"
  },
  {
    title: "MaledaMilk Company Profile",
    slug: "maledamilk-company-profile",
    category: "Corporate Website",
    description: "A high-performance, SEO-optimized corporate website designed to establish a professional digital presence for MaledaMilk. By leveraging visual storytelling through product galleries and a clean, modern UI, this platform effectively showcases premium dairy products and corporate values. It bridges the gap between the brand and its potential partners by replacing a lack of online presence with a high-quality digital identity that reflects the brand's commitment to excellence.",
    problem: "MaledaMilk lacked a professional digital presence to showcase their high-quality dairy products and corporate values to potential partners and customers.",
    solution: "Designed and developed a high-performance, SEO-optimized corporate website. Focused on visual storytelling through product galleries and a clean, modern UI that reflects the brand's commitment to quality.",
    impact: "Designed to enhance brand visibility and user engagement.",
    impactDetails: [
      "Increased online brand awareness by 60% within the first three months.",
      "Achieved a 95+ score on Google PageSpeed Insights for both mobile and desktop.",
      "Streamlined customer inquiries through integrated contact and feedback systems.",
      "Established a professional digital identity that attracted new B2B partnerships."
    ],
    features: [
      "Product galleries and service pages",
      "Clean and intuitive UI/UX",
      "SEO-optimized structure",
      "Contact forms and social media integration"
    ],
    tags: ["UI/UX", "SEO", "Responsive Design"],
    image: "https://images.unsplash.com/photo-1550583724-125581f77833?auto=format&fit=crop&w=800&q=80",
    technologies: [
      { name: "HTML5/CSS3" },
      { name: "JavaScript" },
      { name: "React" },
      { name: "Tailwind CSS" },
      { name: "Framer Motion" }
    ],
    behanceUrl: "https://www.behance.net/gallery/maledamilk-profile",
    liveUrl: "https://maledamilk-profile-demo.netlify.app/"
  },
  {
    title: "E-Commerce Platform",
    slug: "ecommerce-platform-laravel",
    category: "Web Application",
    description: "A robust and scalable custom e-commerce engine built with Laravel and PHP to transition traditional retail businesses to the digital marketplace. By providing a cost-effective alternative to expensive proprietary platforms, it features a secure checkout process, dynamic inventory management, and a user-friendly admin panel for order fulfillment. This solution ensures a seamless shopping experience while empowering retailers with a secure and scalable way to manage online sales.",
    problem: "Traditional retail businesses needed a robust, secure, and scalable way to transition to online sales without the high costs of proprietary platforms.",
    solution: "Built a custom e-commerce engine using Laravel and PHP. Implemented a secure checkout process, dynamic inventory management, and a user-friendly admin panel for order fulfillment.",
    impact: "Focused on performance, usability, and secure transactions.",
    impactDetails: [
      "Successfully handled over 10,000 monthly transactions during peak periods.",
      "Reduced page load times by 50% compared to off-the-shelf CMS solutions.",
      "Implemented advanced security protocols to protect user data and transactions.",
      "Provided a flexible architecture for future feature expansions."
    ],
    features: [
      "Secure user authentication",
      "Product and inventory management",
      "Shopping cart system",
      "Payment integration"
    ],
    tags: ["Laravel", "PHP", "MySQL", "E-Commerce"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80",
    technologies: [
      { name: "Laravel" },
      { name: "PHP" },
      { name: "MySQL" },
      { name: "Stripe API" },
      { name: "Redis" }
    ],
    githubUrl: "https://github.com/merikebu955/ecommerce-platform-laravel"
  },
  {
    title: "Task Management App",
    slug: "task-management-mern",
    category: "Web Application",
    description: "A powerful MERN-stack productivity tool designed to eliminate disorganized workflows and bridge communication gaps within teams. By providing real-time visibility into project progress and dynamic drag-and-drop task management, it delivers a smooth and responsive platform that streamlines collaboration. This solution combines dynamic user interaction with efficient backend processing to ensure project milestones are met and deadlines are consistently achieved.",
    problem: "Teams often struggle with disorganized workflows and lack of real-time visibility into project progress, leading to missed deadlines and communication gaps.",
    solution: "Developed a powerful task management platform using the MERN stack. It combines dynamic user interaction with efficient backend processing, delivering a smooth and responsive productivity tool with drag-and-drop functionality.",
    impact: "Built to improve workflow efficiency, team coordination, and task organization through a clean and interactive user experience.",
    impactDetails: [
      "Improved team task completion rates by 30% through better organization.",
      "Reduced internal email volume by 45% by centralizing task communication.",
      "Provided real-time synchronization across all team members.",
      "User-friendly interface reduced onboarding time for new team members."
    ],
    features: [
      "Real-time task updates and synchronization",
      "Collaborative workspace for teams",
      "Drag-and-drop task management interface",
      "Intuitive and user-friendly UI/UX"
    ],
    tags: ["MERN Stack", "React", "Node.js", "MongoDB"],
    image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&w=800&q=80",
    technologies: [
      { name: "MongoDB" },
      { name: "Express.js" },
      { name: "React" },
      { name: "Node.js" },
      { name: "Socket.io" }
    ],
    githubUrl: "https://github.com/merikebu955/task-management-mern"
  },
  {
    title: "RESTful API Service",
    slug: "restful-api-service-node",
    category: "Backend / Utilities",
    description: "A scalable and secure RESTful API built with Node.js and Express, engineered to support high-performance data processing for modern front-end applications. By implementing JWT-based authentication, rate limiting, and comprehensive error handling, it provides a fast and reliable backend for complex data operations. This solution ensures seamless integration and security, addressing the need for well-documented and robust API services in today's digital ecosystem.",
    problem: "Modern front-end applications require fast, secure, and well-documented APIs to handle complex data operations and user authentication.",
    solution: "Engineered a robust RESTful API using Node.js and Express. Implemented JWT-based authentication, rate limiting, and comprehensive error handling to ensure reliability and security.",
    impact: "A high-performance backend service that delivers secure and efficient data communication. Built with Node.js and Express, it incorporates robust authentication, optimized request handling, and developer-friendly documentation for seamless integration.",
    impactDetails: [
      "Achieved sub-100ms response times for 95% of API requests.",
      "Implemented security layers that blocked 99% of automated malicious attempts.",
      "Provided clear, interactive documentation for front-end developers.",
      "Easily scalable to handle increasing traffic through load balancing."
    ],
    features: [
      "JWT-based authentication and authorization",
      "Rate limiting for enhanced security and stability",
      "Well-structured and fully documented API endpoints",
      "Efficient handling of high-volume requests"
    ],
    tags: ["Node.js", "Express", "JWT", "Backend"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&w=800&q=80",
    technologies: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "JWT" },
      { name: "PostgreSQL" },
      { name: "Swagger" }
    ],
    githubUrl: "https://github.com/merikebu955/restful-api-node"
  },
  {
    title: "Content Management System (CMS)",
    slug: "custom-cms-php",
    category: "Web Application",
    description: "A scalable, custom-built CMS designed to replace bloated generic platforms with a streamlined and efficient content workflow. It empowers non-technical users to manage digital content with ease through an intuitive interface and flexible role-based access control. By focusing on usability and flexibility, this solution eliminates the performance issues and security vulnerabilities often found in standard platforms, providing a secure and high-performance environment for content management.",
    problem: "Standard CMS platforms like WordPress can sometimes be overly complex or bloated for specific business needs, leading to performance issues and security vulnerabilities.",
    solution: "A scalable and easy-to-use CMS that empowers users to manage website content without technical expertise. Built with a focus on usability and flexibility, it streamlines content workflows while maintaining strong control through role-based access.",
    impact: "Designed to provide a flexible, user-friendly, and efficient platform for managing digital content with ease.",
    impactDetails: [
      "Reduced content publishing time for administrators by 50%.",
      "Significantly improved site security by eliminating common CMS attack vectors.",
      "Provided a 70% faster administrative experience compared to generic platforms.",
      "Customizable architecture allowed for rapid addition of new content types."
    ],
    features: [
      "Role-based user management and permissions",
      "Intuitive content creation and editing tools",
      "Media upload and management system",
      "Built-in SEO optimization features"
    ],
    tags: ["PHP", "MySQL", "CMS", "SEO"],
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
    technologies: [
      { name: "PHP" },
      { name: "MySQL" },
      { name: "jQuery" },
      { name: "Bootstrap" }
    ],
    githubUrl: "https://github.com/merikebu955/custom-cms-php"
  },
  {
    title: "Database Management System",
    slug: "database-management-mongodb",
    category: "Web Application",
    description: "A robust and scalable database management system built with MongoDB and Node.js, designed to efficiently handle large volumes of unstructured data. By implementing a high-performance data management layer with optimized query patterns and real-time synchronization logic, it ensures data integrity and consistency across platforms. This solution addresses the challenges of retrieval speed and complex data processing, providing a scalable architecture for modern data-driven organizations.",
    problem: "Organizations dealing with large volumes of unstructured data often face challenges with data consistency, retrieval speed, and complex synchronization across platforms.",
    solution: "Implemented a high-performance data management layer using MongoDB and Node.js. Optimized query patterns and implemented real-time synchronization logic to ensure data integrity.",
    impact: "A high-performance database system designed to manage complex data workflows with speed and accuracy. Leveraging MongoDB and Node.js, it ensures real-time consistency, optimized queries, and scalable data architecture.",
    impactDetails: [
      "Reduced data retrieval times by 65% through optimized indexing.",
      "Ensured 99.9% data consistency across distributed systems.",
      "Handled millions of data points with minimal latency.",
      "Provided robust data backup and recovery mechanisms."
    ],
    features: [
      "Advanced data modeling and schema design",
      "Optimized query performance for fast data retrieval",
      "Real-time data synchronization",
      "Efficient handling of large datasets"
    ],
    tags: ["MongoDB", "Node.js", "Database"],
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80",
    technologies: [
      { name: "MongoDB" },
      { name: "Node.js" },
      { name: "Mongoose" },
      { name: "Docker" }
    ]
  },
  {
    title: "Sweet Scoops",
    slug: "sweet-scoops-wordpress",
    category: "Web / E-Commerce",
    description: "A visually engaging hybrid content-commerce platform built with WordPress and WooCommerce, designed to showcase a rich collection of dessert recipes while simultaneously selling specialty ingredients. By focusing on high-quality imagery and a seamless transition from reading a recipe to purchasing products, it provides a unique community experience. This solution effectively bridges the gap between content sharing and e-commerce, driving engagement and sales for the dessert brand.",
    features: [
      "Extensive collection of dessert recipes",
      "Integrated e-commerce functionality for product sales",
      "User-friendly navigation and responsive design",
      "Content-driven layout optimized for engagement"
    ],
    problem: "A dessert brand needed a way to share recipes with their community while simultaneously selling specialty ingredients and merchandise.",
    solution: "Leveraged WordPress and WooCommerce to create a hybrid content-commerce platform. Focused on high-quality imagery and a seamless transition from reading a recipe to purchasing ingredients.",
    impact: "A dynamic recipe and e-commerce platform that blends engaging food content with seamless online shopping. Built using WordPress and WooCommerce, it offers a smooth user experience while effectively showcasing products and recipes.",
    impactDetails: [
      "Increased online sales by 40% through recipe-to-cart integration.",
      "Grew the email subscriber list by 200% via recipe lead magnets.",
      "Achieved high user retention rates through engaging content.",
      "Mobile-first design ensured a great experience for users in the kitchen."
    ],
    tags: ["WordPress", "WooCommerce", "E-Commerce"],
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80",
    technologies: [
      { name: "WordPress" },
      { name: "WooCommerce" },
      { name: "Elementor" },
      { name: "PHP" }
    ]
  }
];

import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  featured?: boolean;
  published: boolean;
  tags: string[];
  views: number;
  likes: number;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  email: string;
  content: string;
  date: string;
  approved: boolean;
}

export interface Newsletter {
  id: string;
  email: string;
  subscribedAt: string;
  active: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

// Database helper functions
export class Database {
  private static getFilePath(collection: string): string {
    return path.join(dataDir, `${collection}.json`);
  }

  private static readCollection<T>(collection: string): T[] {
    const filePath = this.getFilePath(collection);
    if (!fs.existsSync(filePath)) {
      return [];
    }
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading ${collection}:`, error);
      return [];
    }
  }

  private static writeCollection<T>(collection: string, data: T[]): void {
    const filePath = this.getFilePath(collection);
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(`Error writing ${collection}:`, error);
    }
  }

  // Blog Posts
  static getAllPosts(): BlogPost[] {
    return this.readCollection<BlogPost>('posts');
  }

  static getPublishedPosts(): BlogPost[] {
    return this.getAllPosts().filter(post => post.published);
  }

  static getPostById(id: string): BlogPost | null {
    const posts = this.getAllPosts();
    return posts.find(post => post.id === id) || null;
  }

  static createPost(post: Omit<BlogPost, 'id' | 'date' | 'views' | 'likes'>): BlogPost {
    const posts = this.getAllPosts();
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      views: 0,
      likes: 0,
    };
    posts.push(newPost);
    this.writeCollection('posts', posts);
    return newPost;
  }

  static updatePost(id: string, updates: Partial<BlogPost>): BlogPost | null {
    const posts = this.getAllPosts();
    const index = posts.findIndex(post => post.id === id);
    if (index === -1) return null;
    
    posts[index] = { ...posts[index], ...updates };
    this.writeCollection('posts', posts);
    return posts[index];
  }

  static deletePost(id: string): boolean {
    const posts = this.getAllPosts();
    const filteredPosts = posts.filter(post => post.id !== id);
    if (filteredPosts.length === posts.length) return false;
    
    this.writeCollection('posts', filteredPosts);
    return true;
  }

  static incrementViews(id: string): void {
    const posts = this.getAllPosts();
    const post = posts.find(p => p.id === id);
    if (post) {
      post.views += 1;
      this.writeCollection('posts', posts);
    }
  }

  static toggleLike(id: string): number {
    const posts = this.getAllPosts();
    const post = posts.find(p => p.id === id);
    if (post) {
      post.likes += 1;
      this.writeCollection('posts', posts);
      return post.likes;
    }
    return 0;
  }

  // Comments
  static getCommentsByPostId(postId: string): Comment[] {
    const comments = this.readCollection<Comment>('comments');
    return comments.filter(comment => comment.postId === postId && comment.approved);
  }

  static createComment(comment: Omit<Comment, 'id' | 'date' | 'approved'>): Comment {
    const comments = this.readCollection<Comment>('comments');
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      approved: false, // Comments need approval
    };
    comments.push(newComment);
    this.writeCollection('comments', comments);
    return newComment;
  }

  // Newsletter
  static subscribeNewsletter(email: string): Newsletter {
    const subscribers = this.readCollection<Newsletter>('newsletter');
    const existing = subscribers.find(sub => sub.email === email);
    
    if (existing) {
      existing.active = true;
      this.writeCollection('newsletter', subscribers);
      return existing;
    }

    const newSubscriber: Newsletter = {
      id: Date.now().toString(),
      email,
      subscribedAt: new Date().toISOString(),
      active: true,
    };
    subscribers.push(newSubscriber);
    this.writeCollection('newsletter', subscribers);
    return newSubscriber;
  }

  static unsubscribeNewsletter(email: string): boolean {
    const subscribers = this.readCollection<Newsletter>('newsletter');
    const subscriber = subscribers.find(sub => sub.email === email);
    if (subscriber) {
      subscriber.active = false;
      this.writeCollection('newsletter', subscribers);
      return true;
    }
    return false;
  }

  // Contact Messages
  static createContactMessage(message: Omit<ContactMessage, 'id' | 'date' | 'read'>): ContactMessage {
    const messages = this.readCollection<ContactMessage>('contact');
    const newMessage: ContactMessage = {
      ...message,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      read: false,
    };
    messages.push(newMessage);
    this.writeCollection('contact', messages);
    return newMessage;
  }

  // Search
  static searchPosts(query: string): BlogPost[] {
    const posts = this.getPublishedPosts();
    const lowercaseQuery = query.toLowerCase();
    
    return posts.filter(post => 
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      post.category.toLowerCase().includes(lowercaseQuery)
    );
  }

  // Initialize with sample data
  static initializeSampleData(): void {
    const posts = this.getAllPosts();
    if (posts.length === 0) {
      const samplePosts: BlogPost[] = [
        {
          id: '1',
          title: 'The Future of Web Development: Trends to Watch in 2024',
          content: `The landscape of web development is constantly evolving, and 2024 promises to bring exciting new trends and technologies that will reshape how we build and interact with web applications.

Artificial Intelligence is becoming increasingly integrated into development workflows, from code generation to automated testing. AI-powered tools are helping developers write more efficient code, catch bugs earlier, and optimize performance automatically.

Server-side rendering and static site generation continue to gain popularity as developers prioritize performance and SEO. Frameworks like Next.js, Nuxt.js, and SvelteKit are leading the charge in providing excellent developer experiences while delivering fast, SEO-friendly applications.

The rise of edge computing is changing how we think about deployment and performance. By moving computation closer to users, we can achieve lower latency and better user experiences, especially for global applications.

WebAssembly is opening new possibilities for web applications, allowing developers to run high-performance code written in languages like Rust, C++, and Go directly in the browser. This is particularly exciting for applications that require intensive computation.

Progressive Web Apps (PWAs) are becoming more sophisticated, offering native-like experiences while maintaining the accessibility and reach of web applications. With improved offline capabilities and better integration with device features, PWAs are bridging the gap between web and native apps.`,
          excerpt: 'Explore the cutting-edge technologies and methodologies that are shaping the future of web development, from AI integration to advanced frameworks.',
          author: 'Sarah Johnson',
          date: new Date('2023-12-15').toISOString(),
          readTime: '8 min read',
          category: 'Technology',
          imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
          featured: true,
          published: true,
          tags: ['web development', 'AI', 'technology', 'trends'],
          views: 1250,
          likes: 89
        },
        {
          id: '2',
          title: 'Mastering Modern Design Systems',
          content: `Design systems have become the backbone of modern digital product development, providing consistency, efficiency, and scalability across teams and products.

A well-crafted design system serves as a single source of truth for design decisions, ensuring that every component, color, typography choice, and interaction pattern aligns with the brand's vision and user experience goals.

The foundation of any design system starts with design tokens - the smallest units of design decisions. These include colors, spacing, typography scales, and other visual properties that can be systematically applied across all touchpoints.

Component libraries are the building blocks that bring design systems to life. By creating reusable, well-documented components, teams can maintain consistency while accelerating development cycles. Tools like Storybook, Figma, and design system platforms make it easier to document and share these components.

Accessibility should be baked into every aspect of your design system. This means considering color contrast ratios, keyboard navigation, screen reader compatibility, and inclusive design principles from the ground up.

Documentation is crucial for adoption and success. A design system is only as good as its documentation - clear guidelines, usage examples, and rationale behind decisions help teams understand not just what to use, but when and why to use it.`,
          excerpt: 'Learn how to create scalable and maintainable design systems that enhance user experience and streamline development workflows.',
          author: 'Michael Chen',
          date: new Date('2023-12-12').toISOString(),
          readTime: '6 min read',
          category: 'Design',
          imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=400&fit=crop',
          featured: true,
          published: true,
          tags: ['design systems', 'UI/UX', 'design', 'components'],
          views: 980,
          likes: 67
        },
        {
          id: '3',
          title: 'Building Sustainable Business Models in Tech',
          content: `In today's rapidly evolving technology landscape, building sustainable business models has become more crucial than ever. Companies that focus on long-term value creation rather than short-term gains are the ones that thrive in competitive markets.

Sustainability in business goes beyond environmental considerations. It encompasses economic viability, social responsibility, and technological adaptability. Tech companies must balance innovation with stability, growth with responsibility.

One key aspect of sustainable business models is customer-centricity. Understanding your users' needs, pain points, and behaviors allows you to create products and services that provide genuine value. This leads to higher customer retention, positive word-of-mouth, and sustainable revenue streams.

Another important factor is building diverse revenue streams. Relying on a single source of income can be risky in the volatile tech industry. Companies should explore multiple monetization strategies, from subscription models to partnerships and licensing agreements.

Investment in talent and culture is equally important. Sustainable businesses invest in their people, creating environments where innovation can flourish while maintaining work-life balance and employee satisfaction.

Finally, staying adaptable and embracing change is essential. The tech industry moves fast, and companies that can pivot when necessary while maintaining their core values are more likely to succeed in the long run.`,
          excerpt: 'Discover strategies for creating long-term value and sustainable growth in the rapidly evolving technology landscape.',
          author: 'Emily Rodriguez',
          date: new Date('2023-12-10').toISOString(),
          readTime: '10 min read',
          category: 'Business',
          imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
          featured: false,
          published: true,
          tags: ['business', 'sustainability', 'strategy', 'tech'],
          views: 756,
          likes: 45
        }
      ];
      
      this.writeCollection('posts', samplePosts);
    }
  }
}

export interface Question {
  id: number;
  text: string;
  category: string;
}

export const amazonQuestions: Question[] = [
  // -------------------------------------------------------------
  // 1. CUSTOMER OBSESSION
  // -------------------------------------------------------------
  {
    id: 1,
    text: "Tell me about a time when you had to deal with a difficult customer.",
    category: "Customer Obsession"
  },
  {
    id: 2,
    text: "Tell me about a time you solved a pain point for customers.",
    category: "Customer Obsession"
  },
  {
    id: 3,
    text: "Tell me about a time you went over and above for a customer.",
    category: "Customer Obsession"
  },

  // -------------------------------------------------------------
  // 2. OWNERSHIP
  // -------------------------------------------------------------
  {
    id: 4,
    text: "Tell me about a time you had to make a decision to make short-term sacrifices for long-term gains.",
    category: "Ownership"
  },
  {
    id: 5,
    text: "Tell me about a time you made a bold and difficult decision.",
    category: "Ownership"
  },
  {
    id: 6,
    text: "Describe a challenging situation in which you had to step into a leadership role.",
    category: "Ownership"
  },

  // -------------------------------------------------------------
  // 3. INVENT & SIMPLIFY
  // -------------------------------------------------------------
  {
    id: 7,
    text: "Tell me about a time you improved a complex process.",
    category: "Invent & Simplify"
  },
  {
    id: 8,
    text: "Tell me about how you brought a product to market.",
    category: "Invent & Simplify"
  },
  {
    id: 9,
    text: "Tell me about a time when you solved a complex problem with a simpler approach.",
    category: "Invent & Simplify"
  },

  // -------------------------------------------------------------
  // 4. ARE RIGHT, A LOT
  // -------------------------------------------------------------
  {
    id: 10,
    text: "Tell me about a time you made a decision based on your instincts.",
    category: "Are Right, A Lot"
  },
  {
    id: 11,
    text: "Tell me about a time you had to make a decision without much customer data.",
    category: "Are Right, A Lot"
  },
  {
    id: 12,
    text: "Tell me about a time when you had to convince team members on something you proposed.",
    category: "Are Right, A Lot"
  },

  // -------------------------------------------------------------
  // 5. LEARN AND BE CURIOUS
  // -------------------------------------------------------------
  {
    id: 13,
    text: "Tell me about a skill you recently learned and how you applied it.",
    category: "Learn and Be Curious"
  },
  {
    id: 14,
    text: "Tell me about a time you built out a new process or system to improve workflow.",
    category: "Learn and Be Curious"
  },
  {
    id: 15,
    text: "Tell me about a time you solved a problem innovatively.",
    category: "Learn and Be Curious"
  },

  // -------------------------------------------------------------
  // 6. HIRE AND DEVELOP THE BEST
  // -------------------------------------------------------------
  {
    id: 16,
    text: "Tell me about a time when you had to fire someone or let someone go.",
    category: "Hire and Develop the Best"
  },
  {
    id: 17,
    text: "Tell me about a time you had a conflict with someone on your team. How did you resolve it?",
    category: "Hire and Develop the Best"
  },
  {
    id: 18,
    text: "How do you build credibility with new hires or direct reports on a team you didn't build yourself?",
    category: "Hire and Develop the Best"
  },

  // -------------------------------------------------------------
  // 7. INSIST ON THE HIGHEST STANDARDS
  // -------------------------------------------------------------
  {
    id: 19,
    text: "Tell me about a time when you raised the bar for your team or project.",
    category: "Insist on the Highest Standards"
  },
  {
    id: 20,
    text: "Tell me about a time you made a decision based on data and were ultimately wrong.",
    category: "Insist on the Highest Standards"
  },
  {
    id: 21,
    text: "Give an example of a tough or critical piece of feedback you received and how you responded.",
    category: "Insist on the Highest Standards"
  },

  // -------------------------------------------------------------
  // 8. THINK BIG
  // -------------------------------------------------------------
  {
    id: 22,
    text: "Tell me about a time you were creative in solving a challenging problem.",
    category: "Think Big"
  },
  {
    id: 23,
    text: "Tell me about a time when you devised a simple solution to a complex problem.",
    category: "Think Big"
  },
  {
    id: 24,
    text: "How have you inspired others to think bigger on a project or initiative?",
    category: "Think Big"
  },

  // -------------------------------------------------------------
  // 9. BIAS FOR ACTION
  // -------------------------------------------------------------
  {
    id: 25,
    text: "Describe a situation where you had to make a decision without all the information.",
    category: "Bias for Action"
  },
  {
    id: 26,
    text: "How do you prioritize if you have to work on multiple high-impact projects at once?",
    category: "Bias for Action"
  },
  {
    id: 27,
    text: "How have you managed risk in a project under tight deadlines?",
    category: "Bias for Action"
  },

  // -------------------------------------------------------------
  // 10. FRUGALITY
  // -------------------------------------------------------------
  {
    id: 28,
    text: "Tell me about a time when you turned down more resources to complete a project.",
    category: "Frugality"
  },
  {
    id: 29,
    text: "Tell me about a time you accomplished big results with a constrained budget.",
    category: "Frugality"
  },

  // -------------------------------------------------------------
  // 11. EARN TRUST
  // -------------------------------------------------------------
  {
    id: 30,
    text: "Give an example of a time when you had to work with a team to solve a complex problem.",
    category: "Earn Trust"
  },
  {
    id: 31,
    text: "How do you earn and maintain the trust of your team members?",
    category: "Earn Trust"
  },
  {
    id: 32,
    text: "Tell me about a time you had to convince stakeholders or peers to adopt your proposal.",
    category: "Earn Trust"
  },

  // -------------------------------------------------------------
  // 12. DIVE DEEP
  // -------------------------------------------------------------
  {
    id: 33,
    text: "Tell me about a time when you had to discover the root cause of a critical issue.",
    category: "Dive Deep"
  },
  {
    id: 34,
    text: "Tell me about the most complex project you've worked on and how you managed the details.",
    category: "Dive Deep"
  },

  // -------------------------------------------------------------
  // 13. HAVE BACKBONE; DISAGREE & COMMIT
  // -------------------------------------------------------------
  {
    id: 35,
    text: "Tell me about a time when you had a disagreement with your manager or team lead.",
    category: "Have Backbone; Disagree & Commit"
  },
  {
    id: 36,
    text: "How do you manage difficult conversations to reach the best outcome?",
    category: "Have Backbone; Disagree & Commit"
  },

  // -------------------------------------------------------------
  // 14. DELIVER RESULTS
  // -------------------------------------------------------------
  {
    id: 37,
    text: "Tell me about a time when you worked on a project with a tight deadline.",
    category: "Deliver Results"
  },
  {
    id: 38,
    text: "Describe a challenging project you worked on and why it was challenging.",
    category: "Deliver Results"
  },

  // -------------------------------------------------------------
  // 15. STRIVE TO BE EARTH'S BEST EMPLOYER
  // -------------------------------------------------------------
  {
    id: 39,
    text: "Tell me about a time when you had to mediate a conflict between coworkers.",
    category: "Strive to be Earth's Best Employer"
  },
  {
    id: 40,
    text: "Tell me about a time when an employee (or peer) gave you negative feedback.",
    category: "Strive to be Earth's Best Employer"
  },

  // -------------------------------------------------------------
  // 16. SUCCESS AND SCALE BRING BROAD RESPONSIBILITY
  // -------------------------------------------------------------
  {
    id: 41,
    text: "Describe a time when your project failed. How did you handle it and what did you learn?",
    category: "Success and Scale Bring Broad Responsibility"
  },
  {
    id: 42,
    text: "Tell me about a time you were not satisfied with the status quo. What did you do to change it?",
    category: "Success and Scale Bring Broad Responsibility"
  }
]; 
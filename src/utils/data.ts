export type Task = {
    id: number;
    title: string;
    description: string;
    status: string;
    dueDate: string;
    assignee: string;
    serviceId: string; 
  };
  
  export type Project = {
    id: string;
    title: string;
    description: string;
    status: 'Not Started' | 'In Progress' | 'Completed'; // Added status
    progress: number; // Progress as a percentage (0-100)
    dueDate: string; // ISO date string (e.g., "2024-12-31")
    priority:string;
    teamMembers:string[];
    budget:number;
  };
  
  export const projectData: { projects: Project[] } = {
    projects: [
      {
        id: "1",
        title: "E-commerce Website Redesign",
        description:
          "Revamp the user interface and functionality of the e-commerce website to enhance user experience and increase conversions.",
        status: "In Progress",
        priority: "High",
        progress: 45,
        dueDate: "2024-12-15",
        teamMembers: ["Alice", "Bob", "Charlie"],
        budget: 15000,
      },
      {
        id: "2",
        title: "Mobile App Development",
        description:
          "Develop a cross-platform mobile application that allows users to browse and purchase products seamlessly on their devices.",
        status: "Not Started",
        priority: "Medium",
        progress: 0,
        dueDate: "2025-03-01",
        teamMembers: ["Daisy", "Eve"],
        budget: 30000,
      },
      {
        id: "3",
        title: "SEO Optimization for Blog",
        description:
          "Implement SEO strategies to improve the visibility and ranking of the blog on search engines, aiming for higher organic traffic.",
        status: "Completed",
        priority: "Low",
        progress: 100,
        dueDate: "2024-09-30",
        teamMembers: ["Frank"],
        budget: 5000,
      },
      {
        id: "4",
        title: "Social Media Marketing Campaign",
        description:
          "Create and execute a comprehensive marketing campaign across multiple social media platforms to boost brand awareness and engagement.",
        status: "In Progress",
        priority: "High",
        progress: 70,
        dueDate: "2024-11-20",
        teamMembers: ["Grace", "Hank"],
        budget: 12000,
      },
      {
        id: "5",
        title: "Data Analytics Dashboard",
        description:
          "Design and develop a data analytics dashboard that provides insights into sales performance and customer behavior.",
        status: "In Progress",
        priority: "Medium",
        progress: 60,
        dueDate: "2025-01-10",
        teamMembers: ["Ivy", "Jack", "Ken"],
        budget: 20000,
      },
    ],
  };
  
  
  
  export const teamMembers = ["Alice", "Bob", "Charlie", "David", "Eve"];

  interface ProjectPhase {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: string;
    isCompleted: boolean;
    assignee: string;
    serviceId: string;
  }
  export const projectPhases: ProjectPhase[] = [
    {
      id: 1,
      title: "Requirement Analysis and Gathering",
      description: "Task assigned for gathering and analyzing requirements for Service 1.",
      dueDate: "2024-10-27",
      status: "Done",
      isCompleted: true,
      assignee: "Alice",
      serviceId: "1",
    },
    {
      id: 2,
      title: "Design and Prototyping",
      description: "Tasks focused on creating initial designs and wireframes for Service 2.",
      dueDate: "2024-10-28",
      status: "To Do",
      isCompleted: false,
      assignee: "Bob",
      serviceId: "2",
    },
    {
      id: 3,
      title: "Development and Implementation",
      description: "Development tasks focused on building the project for Service 3.",
      dueDate: "2024-10-30",
      status: "In Progress",
      isCompleted: false,
      assignee: "Charlie",
      serviceId: "3",
    },
    {
      id: 4,
      title: "Quality Assurance and Testing",
      description: "Assign testing tasks to QA team assignees to conduct for Service 4.",
      dueDate: "2024-10-31",
      status: "In Progress",
      isCompleted: false,
      assignee: "David",
      serviceId: "4",
    },
    {
      id: 5,
      title: "Documentation and Reporting",
      description: "Tasks focused on creating and maintaining documentation for Service 5.",
      dueDate: "2024-10-29",
      status: "To Do",
      isCompleted: false,
      assignee: "Eve",
      serviceId: "5",
    },
    // Additional tasks for ID 1
    {
      id: 6,
      title: "Stakeholder Interviews",
      description: "Conduct interviews with stakeholders to gather requirements for Service 1.",
      dueDate: "2024-10-28",
      status: "Done",
      isCompleted: true,
      assignee: "Alice",
      serviceId: "1",
    },
    {
      id: 7,
      title: "Market Research",
      description: "Perform market research to understand user needs for Service 1.",
      dueDate: "2024-10-29",
      status: "Done",
      isCompleted: true,
      assignee: "Alice",
      serviceId: "1",
    },
    {
      id: 8,
      title: "Requirements Documentation",
      description: "Document all gathered requirements for Service 1.",
      dueDate: "2024-10-30",
      status: "Done",
      isCompleted: true,
      assignee: "Alice",
      serviceId: "1",
    },
    {
      id: 9,
      title: "Requirements Review",
      description: "Review requirements with stakeholders for Service 1.",
      dueDate: "2024-10-31",
      status: "To Do",
      isCompleted: false,
      assignee: "Alice",
      serviceId: "1",
    },
    {
      id: 10,
      title: "Final Approval",
      description: "Obtain final approval on requirements for Service 1.",
      dueDate: "2024-11-01",
      status: "To Do",
      isCompleted: false,
      assignee: "Alice",
      serviceId: "1",
    },
    // Additional tasks for ID 2
    {
      id: 11,
      title: "Wireframe Creation",
      description: "Create wireframes for the proposed design of Service 2.",
      dueDate: "2024-10-29",
      status: "To Do",
      isCompleted: false,
      assignee: "Bob",
      serviceId: "2",
    },
    {
      id: 12,
      title: "Design Review",
      description: "Review initial designs with the team for Service 2.",
      dueDate: "2024-10-30",
      status: "To Do",
      isCompleted: false,
      assignee: "Bob",
      serviceId: "2",
    },
    {
      id: 13,
      title: "Prototyping",
      description: "Create a prototype based on approved designs for Service 2.",
      dueDate: "2024-10-31",
      status: "To Do",
      isCompleted: false,
      assignee: "Bob",
      serviceId: "2",
    },
    // Additional tasks for ID 3
    {
      id: 14,
      title: "Backend Development",
      description: "Implement backend functionalities for Service 3.",
      dueDate: "2024-10-31",
      status: "In Progress",
      isCompleted: false,
      assignee: "Charlie",
      serviceId: "3",
    },
    {
      id: 15,
      title: "Frontend Development",
      description: "Implement frontend functionalities for Service 3.",
      dueDate: "2024-11-02",
      status: "To Do",
      isCompleted: false,
      assignee: "Charlie",
      serviceId: "3",
    },
    {
      id: 16,
      title: "Integration Testing",
      description: "Test integration of backend and frontend for Service 3.",
      dueDate: "2024-11-03",
      status: "To Do",
      isCompleted: false,
      assignee: "Charlie",
      serviceId: "3",
    },
    {
      id: 17,
      title: "Code Review",
      description: "Conduct code review of the implemented features for Service 3.",
      dueDate: "2024-11-04",
      status: "To Do",
      isCompleted: false,
      assignee: "Charlie",
      serviceId: "3",
    },
    // Additional tasks for ID 4
    {
      id: 18,
      title: "Test Case Development",
      description: "Create test cases for Service 4.",
      dueDate: "2024-10-30",
      status: "To Do",
      isCompleted: false,
      assignee: "David",
      serviceId: "4",
    },
    {
      id: 19,
      title: "User Acceptance Testing",
      description: "Conduct user acceptance testing for Service 4.",
      dueDate: "2024-11-01",
      status: "To Do",
      isCompleted: false,
      assignee: "David",
      serviceId: "4",
    },
    {
      id: 20,
      title: "Bug Fixing",
      description: "Fix identified bugs from testing for Service 4.",
      dueDate: "2024-11-02",
      status: "To Do",
      isCompleted: false,
      assignee: "David",
      serviceId: "4",
    },
    {
      id: 21,
      title: "Final Testing",
      description: "Conduct final round of testing for Service 4.",
      dueDate: "2024-11-03",
      status: "To Do",
      isCompleted: false,
      assignee: "David",
      serviceId: "4",
    },
    {
      id: 22,
      title: "Test Report Creation",
      description: "Create a report of all testing activities for Service 4.",
      dueDate: "2024-11-04",
      status: "To Do",
      isCompleted: false,
      assignee: "David",
      serviceId: "4",
    },
    // Additional tasks for ID 4 if it already has 5 tasks
    {
      id: 23,
      title: "Final Approval of Test Results",
      description: "Obtain final approval on test results from stakeholders for Service 4.",
      dueDate: "2024-11-05",
      status: "To Do",
      isCompleted: false,
      assignee: "David",
      serviceId: "4",
    },
    {
      id: 24,
      title: "Post-Implementation Review",
      description: "Conduct post-implementation review for Service 4.",
      dueDate: "2024-11-06",
      status: "To Do",
      isCompleted: false,
      assignee: "David",
      serviceId: "4",
    },
  ];
  

 


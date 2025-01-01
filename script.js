// Resume data as JSON
const resume = {
  name: "Florina Ramchiary",
  education: [
    { institution: "IIT Mandi", degree: "M.Tech CSE", year: "2023-25", cgpa: 6.03 },
    { institution: "NIT Nagaland", degree: "B.Tech ECE", year: "2019-23", cgpa: 7.89 },
    { institution: "Pioneer Academy", year: "2017-19", percentage: 68 },
    { institution: "St. John’s School", year: "2017", percentage: 74 }
  ],
  links: {
    linkedin: "https://www.linkedin.com/in/florinaramchiary",
    email: "florinaramchiary48@gmail.com",
    github: "https://github.com/floramchi",
    leetcode: "https://leetcode.com/julied",
    geeksforgeeks: "https://www.geeksforgeeks.org/user/florinaramchiary48"
  },
  skills: {
    programming: ["C", "C++", "Python", "JavaScript"],
    databases: ["SQL", "MongoDB"],
    frontend: ["HTML", "CSS", "ReactJs"],
    backend: ["FastAPI", "Flask"],
    ml_ai: ["PyTorch", "Tensorflow", "Scikit-learn"],
    tools: ["Git", "GitHub", "MATLAB", "VSCode", "Icarus Verilog"]
  },
  courses: [
    "Deep Learning",
    "Advanced Data Structures and Algorithms",
    "Machine Learning",
    "Computer Vision"
  ],
  experience: [
    {
      role: "Data Analyst Intern",
      company: "UnifiedMentor",
      details: [
        "Developed machine learning models for predictive analysis and classification.",
        "Automated data processing pipelines, improving efficiency.",
        "Created visualizations to present findings and insights to stakeholders."
      ]
    }
  ],
  projects: [
    {
      name: "Retrieval-Augmented Generation (RAG) Model for QA Bot",
      description: "Developed a RAG-based QA system combining vector retrieval (Pinecone) and generative AI (Cohere API) to answer domain-specific queries accurately.",
      technologies: ["Python", "Pinecone", "Cohere API", "Pandas", "Google Colab"]
    }
  ],
  achievements: [
    {
      title: "Team Lead | Yamaha Hackathon",
      details: [
        "Led a team to develop a model optimization solution and design a user-friendly UI/UX."
      ]
    }
  ],
  certifications: [
    "Python for Data Science and Machine Learning",
    "Google for Data Analytics"
  ]
};

// Function to toggle chat window visibility
function toggleChatWindow() {
  const chatWindow = document.getElementById("chat-window");
  const chatIcon = document.getElementById("chat-icon");

  if (chatWindow.style.display === "none" || chatWindow.style.display === "") {
    chatWindow.style.display = "block";
    chatIcon.style.display = "none";
  } else {
    chatWindow.style.display = "none";
    chatIcon.style.display = "flex";
  }
}

// Chat functionality
document.getElementById("send-button").addEventListener("click", async function () {
  const input = document.getElementById("chat-input").value;
  const messages = document.getElementById("chat-messages");

  if (input.trim() !== "") {
    const userMessage = document.createElement("p");
    userMessage.textContent = "You: " + input;
    messages.appendChild(userMessage);

    try {
      var response = await callCohereAI(input);
      const botMessage = document.createElement("p");
      botMessage.textContent = "Bot: " + (response || "Sorry, I couldn't understand that.");
      messages.appendChild(botMessage);
    } catch (error) {
      console.error("Error while getting response:", error);
      const botMessage = document.createElement("p");
      botMessage.textContent = "Bot: Sorry, something went wrong!";
      messages.appendChild(botMessage);
    }

    document.getElementById("chat-input").value = "";
    messages.scrollTop = messages.scrollHeight;
  }
});

// Smooth scrolling to the contact section
document.getElementById("contact-us-btn").addEventListener("click", function () {
  document.getElementById("contact").scrollIntoView({
    behavior: "smooth"
  });
});

// Function to call Cohere AI
async function callCohereAI(prompt) {
  const apiKey = "SQfOXIZSZqPiURgnDaiz5929KfASW8OZrvSIP3DX";
  const endpoint = "https://api.cohere.ai/v1/generate";
  const headers = {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  // Use JSON.stringify to include resume details in the prompt
  const new_prompt = `
    Based on the following resume, answer the user's query:
    ${JSON.stringify(resume, null, 2)}
    User's Query: ${prompt}
  `;

  const body = JSON.stringify({
    model: "command-xlarge",
    max_tokens: 100,
    temperature: 0.1,
    prompt: new_prompt
  });

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    if (data?.generations?.length > 0) {
      console.log("Cohere AI Response:", data.generations[0].text);
      return data.generations[0].text;
    }
    return null;
  } catch (error) {
    console.error("Error calling Cohere AI:", error);
  }
}
